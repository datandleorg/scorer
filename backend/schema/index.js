const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Player {
    _id:ID
    name:String
    run:Int
    wickets:Int
    battingStyle:String!
    bowlingStyle:String!
    image:String
    user:User
}
type Team {
    _id:ID!
    name:String!
    image:String
    score:Int!
    matches:Int!
    won:Int!
    loss:Int!
    tie:Int!
    players:[Player]
    user:User
}
type Innings{
    _id:ID
    striker:String
    nonstriker:String
    runs:Int
    wickets:Int
    currentover:Int
    currentball:Int
    bowler1:String
    bowler2:String
    balls:Int
    target:Int
    end:Boolean
}
type Scorecard{
    _id:ID
    innings1:Innings
    innings2:Innings
}
type Match{
    _id:ID!
    overs:Int!
    tossWonBy:String!
    battingFirst:String!
    team1:Team
    team2:Team
    user:User
    scorecard:Scorecard
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
input InningsInput{
    striker:String
    nonstriker:String
    runs:Int
    wickets:Int
    currentover:Int
    currentball:Int
    bowler1:String
    bowler2:String
    balls:Int
    target:Int
    end:Boolean
}
input TeamInput{
    name:String!
    image:String
    matches:Int
    score:Int
    won:Int!
    loss:Int!
    tie:Int!
}
input MatchInput{
    overs:Int!
    team1:ID!
    team2:ID!
    tossWonBy:String!
    battingFirst:String!
}
type RootQuery{
    players:[Player!]!
    teams:[Team!]!
    matches:[Match]
    innings:[Innings]
    scorecard:Scorecard
    login(email:String,password:String):Auth
    getPlayerById(playerId:ID!):Player!
    getTeamById(teamId:ID!):Team!
    getMatchById(matchId:ID!):Match!
}
type RootMutation{
    createPlayer(playerInput:PlayerInput):Player
    createTeam(teamInput:TeamInput):Team
    createMatch(matchInput:MatchInput):Match
    createUser(userInput:UserInput):User
    createInnings(inningsInput:InningsInput):Innings
    createScorecard(innings1:InningsInput,innings2:InningsInput):Scorecard
    updateScorecard(scorecardId:ID,innings1:InningsInput,innings2:InningsInput):Scorecard
    updatePlayer(playerId:ID!):Player
    updateTeam(teamId:ID!):Team
    addPlayerToTeam(teamId:ID!,playerId:ID!):Team
    deletePlayer(playerId:ID!):Player
    deleteTeam(teamId:ID!):Team
    deletePlayerFromTeam(teamId:ID!,playerId:ID!):Team
    deleteMatch(matchId:ID!):Match
}
 schema {
    query:RootQuery
    mutation:RootMutation
}
`);
