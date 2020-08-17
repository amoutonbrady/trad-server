import { schema } from 'nexus'

schema.objectType({
  name: 'Project',
  definition(t) {
    t.model.id()
    t.model.index()

    t.model.name()
    t.model.screenshot()
    t.model.slug()

    t.model.users()
    t.model.views()
    t.model.languages()

    t.model.createdAt()
    t.model.updatedAt()
  },
})
