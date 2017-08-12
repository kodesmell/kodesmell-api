import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import cors from 'cors'

// Load environment variables
// require('dotenv').config()

// import passport from 'passport'
import * as models from 'db/models'
import schema from 'api/schema'

const PORT = 8000


let app = express();
app.use(morgan('dev'))
app.use(cors());
// app.use(passport.initialize())
// app.use('/', require('router').default)

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(request => ({
    schema,
    context: {
      models
    }
  }))
)

app.listen(PORT)