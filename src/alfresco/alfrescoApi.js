import { Prueba } from '../test/testAlfresco';
import { v4 } from 'uuid';
import { AlfrescoController } from '.';

export const myAlfrescoApi = {
  downloadFile: async (req, res) => {
    const { node } = req.params;
    const alfrescoController = new AlfrescoController();
    await alfrescoController.loginAlfresco();
    await alfrescoController
      .downloadFile(node)
      .then((document) => {
        res.status(200).send(document);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
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
  testDownload: async (req, res) => {
    const test = new Prueba('', '');
    const result = test.pruebaDownload();
    res.status(200).send(result);
  },
};
