import { Prueba } from '../test/testAlfresco';
import { v4 } from 'uuid';

export const alfrescoApi = {
  test: async (req, res) => {
    const test = new Prueba('guia', v4());
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
