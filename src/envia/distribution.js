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
    await this.crudDistribution
      .executeQuery(
        `UPDATE GUIAS SET estado_guia = '${estado_guia}' WHERE id_guia=${id_guia};`
      )
      .then((response) => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
  // Lista de guías -> No sigma
  getGuidesNoNovelty = async (req, res) => {
    const { id_solicitud } = req.params;
    await this.crudDistribution
      .executeQuery(
        `SELECT * FROM GUIAS WHERE id_solicitud = ${id_solicitud} AND estado_guia != '${ESTADOS_GUIA.SIGMA}';`
      )
      .then((response) => {
        res.status(200).send(response[0]);
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
