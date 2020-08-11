import { schema } from 'nexus'

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
