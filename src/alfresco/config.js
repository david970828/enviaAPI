import { AlfrescoApi } from '@alfresco/js-api';

const alfrescoInstance = new AlfrescoApi({
  hostEcm: process.env.HOST_ALFRESCO,
  provider: 'ECM',
});

export const alfrescoApi = alfrescoInstance;
