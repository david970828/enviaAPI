import { Solicitudes } from '../model/Solicitudes';
import { CrudDistribution } from '../db/CrudDistribution';
import { MapperAlfresco } from "../mapper/MapperAlfresco";
import { Documentos } from "../pdf/index";

export class DistributionController {

  getDistribution = async (req, res) => {
    const petition = new Solicitudes(req.body);
    const guias = new MapperAlfresco().mapSolicitudesToGuiasAlfresco(petition);
    this.documentos = new Documentos();
    let error = null;
    let id_solicitud = null;

    try {
      await guias.forEach(guia => {
       this.documentos.crearGuia('guia', guia.documento_relacionado, guia);
      })
    } catch (err) {
      console.error(err);
      error = err;
    }

    try {
      const response = await new CrudDistribution().newSolicitud(petition);
      id_solicitud = response[0][0].id_solicitud;

      guias.map(guide => {
        guide.id_solicitud = id_solicitud;
      });

      await new CrudDistribution().addGuias(guias);
    } catch (err) {
      console.error(err);
      error = err;
    }

    if (error != null) {
      res.status(500).send({error: 'internal error'});
    } else {
      res.status(200).send({
        idSolicitud: id_solicitud,
        message: 'STATUS 200'
      });
    }
  }

}
