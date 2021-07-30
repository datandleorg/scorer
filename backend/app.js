const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const{graphqlHTTP} = require("express-graphql");

const DbSchema = require("./schema/index");
const DbResolvers = require("./resolvers/index")
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

app.use(
    '/graphql',
    graphqlHTTP({
        schema:DbSchema,
        rootValue:DbResolvers,
        graphiql:true
    })
);

mongoose.connect(`mongodb+srv://keerthivasan010799:WubCUjYoxuqXpCHr@cluster0.4ncns.mongodb.net/scorerdb?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(8000);
}).catch(err=>
{
   console.log(err); 
});