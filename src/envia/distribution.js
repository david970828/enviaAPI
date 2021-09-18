import { Guias } from '../model/Guias';
import { Solicitudes } from '../model/Solicitudes';
import { CrudDistribution } from '../db/CrudDistribution';

export class DistributionController {

    getDistribution = async (req, res) => {
      const petition = new Solicitudes(req.body);
      const guideList = new Array(Guias);

      const idSolicitud = new CrudDistribution().newSolicitud(petition);

      console.log(idSolicitud);
      req.body.paquetes.forEach(guide => {
        guideList.push(guide);
      });
      let message = 'STATUS 200';
      if (req.body === null) {
       res.status(404).send({error: 'no position - no message'});
      } else {
       res.status(200).send({
         idSolicitud: idSolicitud,
         message: message
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