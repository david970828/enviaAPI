import { AlfrescoController } from '../alfresco';
import { prueba } from '../docs';

const Alfresco = new AlfrescoController();

export const alfrescoApi = {
  loginApi: (req, res) => {
    const { user, password } = req.body;
    prueba();
    Alfresco.loginAlfresco(user, password)
      .then((result) => res.send(result))
      .catch((err) => res.status(400).send(err));
  },
};
