import express from 'express';
import { DistributionController } from '../envia/distribution';

const api = express.Router();

const Distribution = new DistributionController();

api.post('/distribution', Distribution.createDistribution);
api.get('/distribution', Distribution.getAllGuides);
api.put('/guias/:id_guia', Distribution.updateState);
api.put('/solicitudes/:id_solicitud', Distribution.updateStateSolicitud);
api.get('/guiasNoSigma/:id_solicitud', Distribution.getGuidesNoNovelty);
api.get('/guiasNoSigma/', Distribution.getAllGuidesNoNovelty);

export const distributionRoutes = api;
