import { schema } from 'nexus'

schema.objectType({
  name: 'LanguagesOnTranslations',
  definition(t) {
    t.model.language()
    t.model.translation()
    t.model.value()
  },
})
