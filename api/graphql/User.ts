import { schema } from 'nexus'
import bcrypt from 'bcrypt'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()

    t.model.email()
    t.model.name()
    t.model.projects()

    t.model.createdAt()
    t.model.updatedAt()
  },
})

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.users()
  },
})

schema.mutationType({
  definition(t) {
    t.crud.createOneUser({
      async resolve(root, args, ctx, info, originalResolve) {
        const password = await bcrypt.hash(args.data.password, 10)
        return originalResolve(
          root,
          { data: { ...args.data, password } },
          ctx,
          info,
        )
      },
    })
    t.crud.updateOneUser()
    t.crud.deleteOneUser()
  },
})
