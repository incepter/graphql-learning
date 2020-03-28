const express = require('express');
const gqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const mongoConnectionString = require('./private/mongo');

const app = express();

mongoose.connect(mongoConnectionString);
mongoose.connection.once('open', () => {
  console.log('connection to db');
});

app.use('/gql', gqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('now listening')
});
