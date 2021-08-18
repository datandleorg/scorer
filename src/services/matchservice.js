import axios from "axios";

export const CreateMatch = (matchData) => {
  const overs = matchData.overs;
  const team1 = matchData.team1;
  const team2 = matchData.team2;
  const tossWonBy = matchData.tossWonBy;
  const battingFirst = matchData.battingFirst;
  const token = matchData.token;

  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation CreateMatch($overs:Int!,$team1:ID!,$team2:ID!,$tossWonBy:String!,$battingFirst:String!){
                  createMatch(matchInput:{overs:$overs,team1:$team1,team2:$team2,tossWonBy:$tossWonBy,battingFirst:$battingFirst}){
                   _id
                   overs
                   team1{
                      _id
                      name
                   }
                   team2{
                      _id
                      name
                   }
                   tossWonBy
                   battingFirst 
                  }
           }`,
      variables: {
        overs: overs,
        team1: team1,
        team2: team2,
        tossWonBy: tossWonBy,
        battingFirst: battingFirst,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};

export const getMatch = () => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query{
                 matches{
                     _id
                   overs
                   team1{
                     _id
                     name 
                   }
                   team2{
                    _id
                    name 
                  }
                  user{
                    _id
                  }
                   tossWonBy
                   battingFirst 
                  }
           }`,
    },
  });
  return res;
};
export const GetMatchById = (matchId) => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query GetMatchById($matchId:ID!){
                    getMatchById(matchId:$matchId){
                   _id
                   overs
                   team1{
                     _id
                     name
                     score
                     players{
                       _id
                       name
                       run
                     }
                    }
                    team2{
                     _id
                     name
                     score
                     players{
                      _id
                      name
                      run
                    }
                   }
                   user{
                    _id
                  }
                   tossWonBy
                   battingFirst                
                  }
                }`,
      variables: {
        matchId: matchId,
      },
    },
  });
  return res;
};
