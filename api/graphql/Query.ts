import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.crud.user()
    t.crud.users()

    t.crud.project()
    t.crud.projects()

    t.crud.language()
    t.crud.languages({ filtering: true })

    t.crud.languagesOnTranslations()

    t.crud.translation()
    t.crud.translations()

    t.crud.view()
    t.crud.views()
  },
})
