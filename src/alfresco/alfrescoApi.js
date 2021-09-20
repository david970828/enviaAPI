import { Prueba } from '../test/testAlfresco';
import { v4 } from 'uuid';

export const myAlfrescoApi = {
  test: async (req, res) => {
    const test = new Prueba('guia', v4());
    await test
      .prueba()
      .then(() => {
        test.pruebaPlanilla();
        res.send('OK');
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};
