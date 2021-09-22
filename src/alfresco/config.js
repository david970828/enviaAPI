import { AlfrescoApi } from '@alfresco/js-api';

export class ConfigAlfresco {
  instance = null;
  constructor() {
    this.instance = new AlfrescoApi({
      hostEcm: process.env.HOST_ALFRESCO,
      provider: 'ECM',
    });
  }
  isLoggedIn = () => this.instance.isLoggedIn();
}
