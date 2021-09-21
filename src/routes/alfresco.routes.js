import express from 'express';
import { myAlfrescoApi } from '../alfresco/alfrescoApi';

const api = express.Router();

api.post('/testAlfresco', myAlfrescoApi.test);
api.post('/testAlfrescoPlanilla', myAlfrescoApi.testPlanilla);

export const alfrescoRoutes = api;
