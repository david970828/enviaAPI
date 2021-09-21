import { Prueba } from '../test/testAlfresco';
import { v4 } from 'uuid';

export const myAlfrescoApi = {
  test: async (req, res) => {
    const test = new Prueba('guia', v4());
    await test
      .prueba()
      .then(() => {
        res.send('OK');
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
  testPlanilla: async (req, res) => {
    const test = new Prueba('planilla', v4());
    await test
      .pruebaPlanilla()
      .then(() => {
        res.send('OK');
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};
