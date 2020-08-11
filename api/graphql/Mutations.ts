import { schema } from 'nexus'
import bcrypt, { compare } from 'bcrypt'
import { SECRET } from '../utils'
import { sign } from 'jsonwebtoken'

schema.mutationType({
  definition(t) {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, { db, res }) => {
        const user = await db.user.findOne({ where: { email } })
        if (!user) {
          res.statusCode = 400
          throw new Error(`No user found for email: ${email}`)
        }

        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          res.statusCode = 400
          throw new Error(`Invalid`)
        }

        return {
          user,
          token: sign({ userId: user.id }, SECRET),
        }
      },
    })

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

    t.crud.createOneProject()
    t.crud.updateOneProject()
    t.crud.deleteOneProject()

    t.crud.createOneView()
    t.crud.updateOneView()
    t.crud.deleteOneView()

    t.crud.createOneTranslation()
    t.crud.updateOneTranslation()
    t.crud.deleteOneTranslation()

    t.crud.createOneLanguage()
    t.crud.updateOneLanguage()
    t.crud.deleteOneLanguage()

    t.crud.createOneLanguagesOnTranslations()
    t.crud.updateOneLanguagesOnTranslations()
    t.crud.deleteOneLanguagesOnTranslations()
  },
})
