import { v4 } from 'uuid';
import { Solicitudes } from '../model/Solicitudes';
import { CrudDistribution } from '../db/CrudDistribution';
import { MapperAlfresco } from '../mapper/MapperAlfresco';
import { Documentos } from '../pdf/index';
import { ESTADOS_GUIA } from '../util/constants';
import {
  guiasByIdSolicitud,
  obtenerLocalONacional,
  solicitudesById,
  updateStateGuias,
} from './cambioEstado';

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
    const guias = await guiasByIdSolicitud(id_guia, this.crudDistribution);
    await updateStateGuias(guias, estado_guia, this.crudDistribution);
  };
  // Lista de guías -> No sigma
  getGuidesNoNovelty = async (req, res) => {
    const { id_solicitud } = req.params;
    const { ruta } = req.query;
    const solicitud = await solicitudesById(
      id_solicitud,
      this.crudDistribution
    );
    const { origen_solicitud } = solicitud;
    await this.crudDistribution
      .executeMultiQuery(
        `SELECT * FROM GUIAS WHERE id_solicitud = ${id_solicitud} AND estado_guia != '${ESTADOS_GUIA.NOVEDAD}';`
      )
      .then((response) => {
        const result = response;
        const guias = obtenerLocalONacional(result, ruta, origen_solicitud);
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
        `SELECT * FROM GUIAS WHERE estado_guia != '${ESTADOS_GUIA.NOVEDAD}';`
      )
      .then((response) => {
        res.status(200).send(response[0]);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  };
  updateStateSolicitud = async (req, res) => {
    const { id_solicitud } = req.params;
    const { ruta } = req.query;
    const estado_guia = req.body;
    const result = await guiasByIdSolicitud(
      id_solicitud,
      this.crudDistribution
    );
    const solicitud = await solicitudesById(
      id_solicitud,
      this.crudDistribution
    );
    const { origen_solicitud } = solicitud;
    let guias = [];
    if (ruta === 'todos') {
      guias = [...result];
    } else {
      guias = obtenerLocalONacional(result, ruta, origen_solicitud);
    }
    await pdateStateGuias(guias, estado_guia, this.crudDistribution);
  };
}
