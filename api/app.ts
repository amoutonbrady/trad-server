import { use, server, on, log, settings } from 'nexus'
import cors from 'cors'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { SECRET, protectedPaths } from './utils'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// Enables Prisma
use(
  prisma({
    migrations: true,
    paginationStrategy: 'prisma',
    client: {
      options: {
        log: ['query'],
      },
    },
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

on.start(async () => {
  const prisma = new PrismaClient()
  const admin = 'amoutonbrady@gmail.com'
  const adminPassword = 'alexandre'

  await prisma.$connect()

  const hasAdmin = await prisma.user.findOne({ where: { email: admin } })
  if (hasAdmin) {
    log.info('Admin already exists, no need to create one')
    prisma.$disconnect()
    return
  }

  log.info("Admin doesn't exists, creating one")
  await prisma.user.create({
    data: {
      email: admin,
      name: 'Alexandre',
      password: await bcrypt.hash(adminPassword, 10),
    },
  })
  await prisma.$disconnect()
})

server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))
server.express.use(cors({ origin: true }))
