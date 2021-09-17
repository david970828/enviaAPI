import express from 'express'
import { DistributionController } from '../envia/distribution';

const api = express.Router()

const Distribution = new DistributionController();

api.get('/distribution', Distribution.getDistribution)

export const distributionRoutes = api