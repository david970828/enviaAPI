import { Guias } from '../model/Guias';
import { Solicitudes } from '../model/Solicitudes';
import { CrudDistribution } from '../db/CrudDistribution';

export class DistributionController {

    getDistribution = async (req, res) => {
      const petition = new Solicitudes(req.body);
      const response = await new CrudDistribution().newSolicitud(petition);
      const guideList =[];
        let id_solicitud = response[0][0].id_solicitud;
      console.log(req.body.paquetes.length);
      req.body.paquetes.forEach(guide => {
        guide.id_solicitud =  id_solicitud;
        guideList.push(guide);
      });

      await new CrudDistribution().addGuias(guideList);

      if (req.body === null) {
       res.status(500).send({error: 'internal error'});
      } else {
       res.status(200).send({
         idSolicitud: id_solicitud,
         message: 'STATUS 200'
       });
     }
   }

  getOrders = async () => {
    try {
      let  pool = await  sql.connect(config);
      let  products = await  pool.request().query("SELECT * from Orders");
      return  products.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

}