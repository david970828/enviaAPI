import express from 'express'
import { distributionRoutes } from '../routes/distribution'

const apiRoutes = express.Router()

apiRoutes.use(distributionRoutes)

export const api = apiRoutes