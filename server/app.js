const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose')

const schema = require('./schema/schema');

const app = express();


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('Now listening for request on port 4000');
    mongoose.connect('mongodb://localhost:27017/graphql-booklist', {useNewUrlParser: true},()=>{
        console.log("Database is Connected.");
    });
})


// var express = require('express');
// var graphqlHTTP = require('express-graphql');
// var { buildSchema } = require('graphql');

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = { hello: () => 'Hello world!' };

// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));