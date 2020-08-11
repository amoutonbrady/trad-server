import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'

use(
  prisma({
    migrations: true,
    features: {
      crud: true,
    },
  }),
)
