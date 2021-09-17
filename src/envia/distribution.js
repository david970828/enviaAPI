export class DistributionController {
    getDistribution = (req, res) = async => {
     console.log(req.body);
     let message = 'STATUS 200';
     if (req.body === null) {
       res.status(404).send({error: 'no position - no message'});
     } else {
       res.status(200).send({
         position: {
           x: 'X',
           y: 'Y'
         },
         message: message
       });
     }
   }
}