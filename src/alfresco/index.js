import { ConfigAlfresco } from './config';
import { UploadApi, NodesApi } from '@alfresco/js-api';
import fs from 'fs';

export class AlfrescoController {
  constructor() {
    this.alfrescoApi = new ConfigAlfresco();
  }
  isLoggedIn = () => this.alfrescoApi.isLoggedIn();
  loginAlfresco = async () => {
    const user = process.env.USER_ALFRESCO;
    const password = process.env.PASSWORD_ALFRESCO;
    return await this.alfrescoApi.instance
      .login(user, password)
      .then((data) => data)
      .catch((error) => console.log({ error }));
  };
  uploadFile = async (name, folder) => {
    try {
      const stream = fs.createReadStream(name);
      const uploadApi = new UploadApi(this.alfrescoApi.instance);
      return await uploadApi.uploadFile(stream, folder);
    } catch (error) {
      console.log(error);
    }
  };
  downloadFile = async (nodeId) => {
    try {
      const nodeApi = new NodesApi(this.alfrescoApi.instance);
      const document = await nodeApi.getNodeContent(nodeId);
      return document;
    } catch (error) {
      console.log(error);
    }
  };
}
