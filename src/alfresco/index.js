import { alfrescoApi } from './config';
import { UploadApi } from '@alfresco/js-api';
import fs from 'fs';

export class AlfrescoController {
  static alfresco = null;
  constructor() {}
  static getInstance = async () => {
    if (this.alfresco === null || this.alfresco === undefined) {
      this.alfresco = new AlfrescoController();
    }
    await this.loginAlfresco();
    return this.alfresco;
  };
  static loginAlfresco = async () => {
    const user = process.env.USER_ALFRESCO;
    const password = process.env.PASSWORD_ALFRESCO;
    return await alfrescoApi
      .login(user, password)
      .then((data) =>
        console.log(
          `API called successfully Login in  BPM and ECM performed ${data}`
        )
      )
      .catch((error) => console.log(error));
  };
  uploadFile = async (name, folder) => {
    const stream = fs.createReadStream(name);
    const uploadApi = new UploadApi(alfrescoApi);
    await uploadApi
      .uploadFile(stream, folder)
      .then(() => {
        console.log(`File upload in ${folder}`);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
}
