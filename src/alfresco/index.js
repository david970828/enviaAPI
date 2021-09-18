import { alfrescoApi } from './config';

export class AlfrescoController {
  loginAlfresco = (user, password) =>
    alfrescoApi
      .login(user, password)
      .then(
        (data) =>
          `API called successfully Login in  BPM and ECM performed ${data}`
      )
      .catch((error) => error);
}
