import { AlfrescoController } from '../alfresco';
import { Prueba } from '../pdf';

export const alfrescoApi = {
  test: async (req, res) => {
    const test = new Prueba();
    await test
      .prueba()
      .then(() => {
        res.send('OK');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
