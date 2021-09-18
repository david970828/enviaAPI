import Alfresco from 'alfresco-js-api-node';

const alfrescoInstance = new Alfresco({
  hostEcm: process.env.HOST_ALFRESCO,
  provider: 'ECM',
});

export const alfrescoApi = alfrescoInstance;
