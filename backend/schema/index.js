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
    balls:Int
    overs:Int
    fours:Int
    sixes:Int
    thirty:Int
    fifty:Int
    avg:Int
    matches:Int
    st_rate:Float
    bowl_avg:Int
    bowl_runs:Int
    bowl_rate:Float
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
    striker:Player
    non_striker:Player
    runs:Int
    wickets:Int
    current_over:Int
    current_ball:Int
    bowler_1:Player
    bowler_2:String
    balls:[Balls]
    target:Int
    end:Boolean
    batting:Batting
    bowling:Bowling
}
type Scorecard{
    _id:ID
    matchStatus:String
    innings1:Innings
    innings2:Innings
}
type Batting{
    scores:[Score]
    total:Total
    extras:Extras
}
type Bowling{
    bowlerscores:[BowlerScore]
}
type Score{
    batsmen:Player
    runs:Int
    balls:Int
    one:Int
    two:Int
    four:Int
    six:Int
    st_rate:Float
    out_by:String
}
type Extras{
    wide:Int
    no_ball:Int
    byes:Int
}
type Total{
    runs:Int
    wickets:Int
    over:Float
}
type BowlerScore{
    bowler:Player
    wickets:Int
    overs:Int
    maiden:Int
    runs:Int
    wide:Int
    no_ball:Int
    econ:Float 
}
type Match{
    _id:ID!
    overs:Int!
    tossWonBy:String!
    battingFirst:String!
    team1:Team
    team2:Team
    user:User
    scorecard:ID
    date:String
    matchWonby:String
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
type Balls{
    type:String
    value:Int
}
input BallsInput{
    type:String
    value:Int
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
    balls:Int
    overs:Int
    fours:Int
    sixes:Int
    thirty:Int
    fifty:Int
    avg:Int
    matches:Int
    st_rate:Float
    bowl_avg:Int
    bowl_runs:Int
    bowl_rate:Float
}
input InningsInput{
    striker:ID
    non_striker:ID
    runs:Int
    wickets:Int
    current_over:Int
    current_ball:Int
    bowler_1:ID
    bowler_2:String
    balls:[BallsInput]
    target:Int
    end:Boolean
    batting:BattingInput
    bowling:BowlingInput
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
    scorecard:ID
    date:String
    matchWonby:String
}
input BattingInput{
    scores:[ScoreInput]
    total:TotalInput
    extras:ExtrasInput
}
input BowlingInput{
    bowlerscores:[BowlerScoreInput]
}
input ScoreInput{
    batsmen:ID
    runs:Int
    balls:Int
    one:Int
    two:Int
    four:Int
    six:Int
    st_rate:Float
    out_by:String
}
input ExtrasInput{
    wide:Int
    no_ball:Int
    byes:Int
}
input TotalInput{
    runs:Int
    wickets:Int
    over:Float
}
input BowlerScoreInput{
    bowler:ID
    wickets:Int
    overs:Int
    maiden:Int
    runs:Int
    wide:Int
    no_ball:Int
    econ:Float   
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
    getScorecardById(Id:ID):Scorecard
}
type RootMutation{
    createPlayer(playerInput:PlayerInput):Player
    createTeam(teamInput:TeamInput):Team
    createMatch(matchInput:MatchInput):Match
    createUser(userInput:UserInput):User
    createInnings(inningsInput:InningsInput):Innings
    createScorecard(matchStatus:String,innings1:InningsInput,innings2:InningsInput):Scorecard
    updateScorecard(scorecardId:ID,matchStatus:String,innings1:InningsInput,innings2:InningsInput):Scorecard
    updatePlayer(playerId:ID,name:String,run:Int,balls:Int,fours:Int,sixes:Int,overs:Int,bowl_runs:Int,wickets:Int):Player
    updateTeam(teamId:ID,name:String,matches:Int,won:Int,loss:Int,tie:Int):Team
    updateMatch(matchId:ID,matchWonby:String):Match
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
