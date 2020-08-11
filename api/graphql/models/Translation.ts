import { schema } from 'nexus'

schema.objectType({
  name: 'Translation',
  definition(t) {
    t.model.id()
    t.model.index()

    t.model.key()
    t.model.label()
    t.model.x()
    t.model.y()

    t.model.languages()
    t.model.view()

    t.model.createdAt()
    t.model.updatedAt()
  },
})
