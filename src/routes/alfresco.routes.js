import express from 'express';
import { alfrescoApi } from '../alfresco/alfrescoApi';

const api = express.Router();

api.post('/testAlfresco', alfrescoApi.test);

export const alfrescoRoutes = api;
