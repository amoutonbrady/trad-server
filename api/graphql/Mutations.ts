import { schema } from 'nexus'
import { sign } from 'jsonwebtoken'
import bcrypt, { compare } from 'bcrypt'
import slugify from '@sindresorhus/slugify'

import { SECRET } from '../utils'

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
        args.data.password = await bcrypt.hash(args.data.password, 10)
        return originalResolve(root, args, ctx, info)
      },
    })
    t.crud.updateOneUser({
      async resolve(root, args, ctx, info, originalResolve) {
        if (args.data.password) {
          args.data.password = await bcrypt.hash(args.data.password, 10)
        }

        const user = await originalResolve(root, args, ctx, info)
        if (!user) throw new Error('There was an error during the update')

        return user
      },
    })
    t.crud.deleteOneUser()

    t.crud.createOneProject({
      async resolve(root, args, ctx, info, originalResolve) {
        args.data.slug = slugify(args.data.name)
        return originalResolve(root, args, ctx, info)
      },
    })
    t.crud.updateOneProject({
      async resolve(root, args, ctx, info, originalResolve) {
        if (args.data.name) {
          args.data.slug = slugify(args.data.name)
        }
        const project = await originalResolve(root, args, ctx, info)
        if (!project) throw new Error('There was an error during the update')

        return project
      },
    })
    t.crud.deleteOneProject()

    t.crud.createOneView({
      async resolve(root, args, ctx, info, originalResolve) {
        args.data.slug = slugify(args.data.name)
        return originalResolve(root, args, ctx, info)
      },
    })
    t.crud.updateOneView({
      async resolve(root, args, ctx, info, originalResolve) {
        if (args.data.name) {
          args.data.slug = slugify(args.data.name)
        }
        const view = await originalResolve(root, args, ctx, info)
        if (!view) throw new Error('There was an error during the update')

        return view
      },
    })
    t.crud.deleteOneView()

    t.crud.createOneTranslation()
    t.crud.updateOneTranslation()
    t.crud.deleteOneTranslation()

    t.crud.createOneLanguage({
      async resolve(root, args, ctx, info, originalResolve) {
        args.data.slug = slugify(args.data.name)
        return originalResolve(root, args, ctx, info)
      },
    })
    t.crud.updateOneLanguage({
      async resolve(root, args, ctx, info, originalResolve) {
        if (args.data.name) {
          args.data.slug = slugify(args.data.name)
        }
        const language = await originalResolve(root, args, ctx, info)
        if (!language) throw new Error('There was an error during the update')

        return language
      },
    })
    t.crud.deleteOneLanguage()

    t.crud.createOneLanguagesOnTranslations()
    t.crud.updateOneLanguagesOnTranslations()
    t.crud.deleteOneLanguagesOnTranslations()
  },
})
