import express from 'express'
import { DistributionController } from '../envia/distribution';

const api = express.Router()

const Distribution = new DistributionController();

api.post('/distribution', Distribution.createDistribution);
api.get('/distribution', Distribution.getAllGuides);

export const distributionRoutes = api