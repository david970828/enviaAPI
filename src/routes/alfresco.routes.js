import express from 'express';
import { alfrescoApi } from '../alfresco/alfrescoApi';

const api = express.Router();

api.post('/alfresco', alfrescoApi.loginApi);

export const alfrescoRoutes = api;
