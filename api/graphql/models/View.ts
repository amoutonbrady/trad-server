import { schema } from 'nexus'

schema.objectType({
  name: 'View',
  definition(t) {
    t.model.id()
    t.model.index()

    t.model.name()
    t.model.slug()
    t.model.screenshot()

    t.model.project()
    t.model.translation()

    t.model.createdAt()
    t.model.updatedAt()
  },
})
