const {buildSchema} = require("graphql");

module.exports = buildSchema(`
type Player {
    _id:ID!
    name:String!
    run:Int!
    battingStyle:String!
    bowlingStyle:String!
    image:String
    wickets:Int!
    team:Team!
}
type Team {
    _id:ID!
    name:String!
    score:Int!
    matches:Int!
    won:Int!
    loss:Int!
    tie:Int!
    player:Player!
    match:Match!
}
type Match{
    _id:ID!
    overs:Int!
    tossWonBy:String!
    battingFirst:String!
    team1:String!
    team2:String!
    team:Team!
    player:Player!
}
type User{
    _id:ID!
    email:String!
    password:String
}
type Auth{
    userId:ID!
    token:String
    tokenExpiration:Int
}
input UserInput{
    email:String!
    password:String!
}
input PlayerInput{
    name:String!
    image:String
    battingStyle:String!
    bowlingStyle:String!
    run:Int
    wickets:Int
}
input TeamInput{
    name:String!
    matches:Int
    score:Int
    won:Int!
    loss:Int!
    tie:Int!
}
input MatchInput{
    overs:Int!
    team1:String!
    team2:String!
    tossWonBy:String!
    battingFirst:String!
}
type RootQuery{
    players:[Player!]!
    teams:[Team!]!
    matches:[Match!]!
    login(email:String,password:String):Auth
    getPlayerById(playerId:ID!):Player!
    getTeamById(teamId:ID!):Team!
}
type RootMutation{
    createPlayer(playerInput:PlayerInput):Player
    createTeam(teamInput:TeamInput):Team
    createMatch(matchInput:MatchInput):Match
    createUser(userInput:UserInput):User
    updatePlayer(playerId:ID!):Player
    updateTeam(teamId:ID!):Team
    deletePlayer(playerId:ID!):Player
    deleteTeam(teamId:ID!):Team
    deleteMatch(matchId:ID!):Match
    
}
 schema {
    query:RootQuery
    mutation:RootMutation
}
`);