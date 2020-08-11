import { schema } from 'nexus'

schema.objectType({
  name: 'Language',
  definition(t) {
    t.model.id()
    t.model.index()

    t.model.name()
    t.model.slug()
    t.model.code()
    t.model.rtl()

    t.model.projects()
    t.model.translations()

    t.model.createdAt()
    t.model.updatedAt()
  },
})
