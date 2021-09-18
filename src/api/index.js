import express from 'express'
import { distributionRoutes } from '../routes/distribution.routes'
import { alfrescoRoutes } from '../routes/alfresco.routes'

const apiRoutes = express.Router()

apiRoutes.use(distributionRoutes, alfrescoRoutes)

export const api = apiRoutes