import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'

const PORT = process.env.PORT || 3500
const app = express()

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true
  });

  await server.start();

  server.applyMiddleware({ app })

  app.get('/', (req, res) => {
    res.send({ hello: 'there!' })
  })

  app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}/graphql`)
  )
}
startApolloServer(typeDefs, resolvers);