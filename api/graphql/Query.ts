import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.users()

    t.crud.project()
    t.crud.projects()

    t.crud.language()
    t.crud.languages({
      filtering: true,
      ordering: true,
      async resolve(root, args, ctx, info, originalResolve) {
        const languages = await originalResolve(root, args, ctx, info)
        return languages.sort()
      },
    })

    t.crud.languagesOnTranslations({ ordering: true })

    t.crud.translation()
    t.crud.translations({ ordering: true })

    t.crud.view()
    t.crud.views({ filtering: true })
  },
})
