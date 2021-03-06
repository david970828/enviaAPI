import express from 'express';
import { myAlfrescoApi } from '../alfresco/alfrescoApi';

const api = express.Router();

api.post('/testAlfresco', myAlfrescoApi.test);
api.post('/testAlfrescoPlanilla', myAlfrescoApi.testPlanilla);
api.post('/testDownload', myAlfrescoApi.testDownload);

api.get('/fileDownload/:node', myAlfrescoApi.downloadFile);

export const alfrescoRoutes = api;
