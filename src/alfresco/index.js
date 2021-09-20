import { ConfigAlfresco } from './config';
import { UploadApi } from '@alfresco/js-api';
import fs from 'fs';

export class AlfrescoController {
  constructor() {
    this.alfrescoApi = new ConfigAlfresco();
  }
  loginAlfresco = async () => {
    const user = process.env.USER_ALFRESCO;
    const password = process.env.PASSWORD_ALFRESCO;
    return await this.alfrescoApi.instance
      .login(user, password)
      .then((data) =>
        console.log(
          `API called successfully Login in  BPM and ECM performed ${data}`
        )
      )
      .catch((error) => console.log({ error }));
  };
  uploadFile = async (name, folder) => {
    const stream = fs.createReadStream(name);
    const uploadApi = new UploadApi(this.alfrescoApi.instance);
    await uploadApi
      .uploadFile(stream, folder)
      .then(() => {
        console.log(`File upload in ${folder}`);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };
}
