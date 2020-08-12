import { use, server } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { SECRET, protectedPaths } from './utils'

// Enables Prisma
use(
  prisma({
    migrations: true,
    features: {
      crud: true,
    },
  }),
)

// Enables the JWT Auth plugin
use(
  auth({
    appSecret: SECRET,
    protectedPaths,
  }),
)

server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
