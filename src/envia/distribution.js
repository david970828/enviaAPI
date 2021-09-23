import { v4 } from 'uuid';
import { Solicitudes } from '../model/Solicitudes';
import { CrudDistribution } from '../db/CrudDistribution';
import { MapperAlfresco } from '../mapper/MapperAlfresco';
import { Documentos } from '../pdf/index';
import { ESTADOS_GUIA } from '../util/constants';

export class DistributionController {
  constructor() {
    this.crudDistribution = new CrudDistribution();
  }
  createDistribution = async (req, res) => {
    const petition = new Solicitudes(req.body);
    const guias = new MapperAlfresco().mapSolicitudesToGuiasAlfresco(petition);
    this.documentos = new Documentos();
    let error = null;
    let id_solicitud = null;
    try {
      await Promise.all(
        guias.map(async (guia) => {
          const node = await this.documentos.crearGuia('guia', v4(), guia);
          guia.documento_relacionado = await node.entry.id;
        })
      );
      const response = await this.crudDistribution.newSolicitud(petition);
      id_solicitud = response[0][0].id_solicitud;
      guias.map((guide) => {
        guide.id_solicitud = id_solicitud;
      });
      const planillaModel = {
        ...petition,
        id_solicitud,
        titulo_planilla: 'Planilla de recolección',
        nombre_planilla: `Recolección ${petition.empresa_recoleccion}`,
        tipo_planilla: 'recolección',
      };
      const node = await this.documentos.crearPlanilla(
        'planilla',
        v4(),
        planillaModel
      );
      const documento_relacionado = await node.entry.id;
      await this.crudDistribution.addPlanillas({
        ...planillaModel,
        documento_relacionado,
      });
      await this.crudDistribution.addGuias(guias);
    } catch (err) {
      console.error(err);
      error = err;
    }
    if (error != null) {
      res.status(500).send({ error: 'internal error' });
    } else {
      res.status(200).send({
        idSolicitud: id_solicitud,
        message: 'STATUS 200',
      });
    }
  };
  getAllGuides = async (req, res) => {
    let idSolicitud = req.query.idSolicitud;
    let listGuides;
    let error = null;
    try {
      const response = await this.crudDistribution.getAllGuides(idSolicitud);
      listGuides = response[0];
    } catch (err) {
      console.error(err);
    }

    if (error != null) {
      res.status(500).send({ error: 'internal error' });
    } else {
      res.status(200).send(listGuides);
    }
  };
  // Actualizar estado guías
  updateState = async (req, res) => {
    const { id_guia } = req.params;
    const estado_guia = req.body;
    const guia = await this.crudDistribution.executeSingleQuery(
      `SELECT * FROM GUIAS WHERE id_guia=${id_guia}`
    );
    const newGuia = {
      id_guia,
      fecha_hora_actualizacion: new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      estado_inicial: guia.estado_guia,
      estado_actualizado: estado_guia,
    };
    await this.crudDistribution
      .executeQuery(
        `UPDATE GUIAS SET estado_guia = '${estado_guia}' WHERE id_guia=${id_guia};`
      )
      .then(() => {
        this.crudDistribution
          .addHistorico(newGuia)
          .then((response) => {
            res.status(200).send(response);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
  // Lista de guías -> No sigma
  getGuidesNoNovelty = async (req, res) => {
    const { id_solicitud } = req.params;
    const { ruta } = req.query;
    const solicitud = await this.crudDistribution.executeSingleQuery(
      `SELECT * FROM SOLICITUDES WHERE id_solicitud = ${id_solicitud}`
    );
    const { origen_solicitud } = solicitud;
    await this.crudDistribution
      .executeMultiQuery(
        `SELECT * FROM GUIAS WHERE id_solicitud = ${id_solicitud} AND estado_guia != '${ESTADOS_GUIA.SIGMA}';`
      )
      .then((response) => {
        const result = response;
        const guias = [];
        result.forEach((guia) => {
          if (ruta === 'local') {
            if (guia.destino_guia === origen_solicitud) {
              guias.push(guia);
            }
          } else {
            if (guia.destino_guia !== origen_solicitud) {
              guias.push(guia);
            }
          }
        });
        res.status(200).send(guias);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
  getAllGuidesNoNovelty = async (req, res) => {
    await this.crudDistribution
      .executeQuery(
        `SELECT * FROM GUIAS WHERE estado_guia != '${ESTADOS_GUIA.SIGMA}';`
      )
      .then((response) => {
        res.status(200).send(response[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
}
