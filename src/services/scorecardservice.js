import axios from "axios";

export const createScorecard = (scorecard) => {
  const matchStatus = scorecard.matchStatus;
  const innings1 = scorecard.innings1;
  const innings2 = scorecard.innings2;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation CreateScorecard($matchStatus:String,$innings1:InningsInput,$innings2:InningsInput){
          createScorecard(matchStatus:$matchStatus,innings1:$innings1,innings2:$innings2){
            _id
            matchStatus
            innings1{
            striker{
              _id
              name
              run
              fours
              sixes
              overs
              balls
              st_rate
              wickets
              bowl_runs
            }
            non_striker{
              _id
              name
              run
              fours
              sixes
              overs
              balls
              wickets
              bowl_runs
              st_rate
            }
            bowler_1{
            _id
            name
            run
            fours
            sixes
            overs
            balls
            wickets
            bowl_runs
            st_rate
            }
            bowler_2
            runs
            wickets
            current_ball
            current_over
            balls{
              type
              value
            }
            target
            end
        }
        innings2{
            striker{
              _id
              name
              run
              fours
              sixes
              overs
              wickets
              bowl_runs
              balls
              st_rate
            }
            non_striker{
              _id
              name
              run
              fours
              wickets
              bowl_runs
              sixes
              overs
              balls
              st_rate
            }
            bowler_1{
            _id
            name
            run
            fours
            sixes
            wickets
            bowl_runs
            overs
            balls
            st_rate
            }
            bowler_2
            runs
            wickets
            current_ball
            current_over
            balls{
              type
              value
            }
            target
            end
        }
        }
    }`,
      variables: {
        matchStatus:matchStatus,
        innings1: innings1,
        innings2: innings2,
      },
    },
  });
  return res;
};
export const getScorecard = () => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query{
                scorecard{
                _id
                  matchStatus
                  innings1{
                  striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  wickets
                  bowl_runs
                  overs
                  balls
                  st_rate
                  }
                  non_striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  wickets
                  bowl_runs
                  balls
                  st_rate
                  }
                  bowler_1{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  wickets
                  bowl_runs
                  balls
                  st_rate
                  }
                  bowler_2
                  current_ball
                  current_over
                  runs
                  wickets
                  target
                  balls{
                    type
                    value
                  }
                  end
                }
                innings2{
                  striker{
                    _id
                    name
                    run
                    fours
                    sixes
                    wickets
                    bowl_runs
                    overs
                    balls
                    st_rate
                  }
                  non_striker{
                    _id
                    name
                    run
                    fours
                    wickets
                    bowl_runs
                    sixes
                    overs
                    balls
                    st_rate
                  }
                  bowler_1
                  {
                    _id
                    name
                    run
                    fours
                    wickets
                    bowl_runs
                    sixes
                    overs
                    balls
                    st_rate
                  }
                  bowler_2
                  current_ball
                  current_over
                  runs
                  wickets
                  target
                  balls{
                    type
                    value
                  }
                  end
                }
            }
        }`,
    },
  });
  return res;
};
export const updateScorecard = (scoreCardId,scoreCard) => {
  const scorecardId = scoreCardId;
  const matchStatus = scoreCard.matchStatus;
  const innings1 = scoreCard.innings1;
  const innings2 = scoreCard.innings2;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation UpdateScorecard($scorecardId:ID,$matchStatus:String,$innings1:InningsInput,$innings2:InningsInput){ 
        updateScorecard(scorecardId:$scorecardId,matchStatus:$matchStatus,innings1:$innings1,innings2:$innings2){
              _id
              matchStatus
              innings1{
                striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                non_striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_1{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_2
                runs
                wickets
                target
                current_ball
                current_over
                balls{
                  type
                  value
                }
                end
              }
              innings2{
                striker{
                  name
                  run
                  balls
                  st_rate
                  fours
                  sixes
                  overs
                  wickets
                  bowl_runs
                }
                non_striker{
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_1
                {
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_2
                runs
                wickets
                target
                current_ball
                current_over
                balls{
                  type
                  value
                }
                end
              }
            }
        }`,
      variables: {
        scorecardId: scorecardId,
        matchStatus:matchStatus,
        innings1: innings1,
        innings2: innings2,
      },
    },
  });
  return res;
};

export const updates = (scoreCardId, scoreCard, playerId, data) => {
  const scorecardId = scoreCardId;
  const innings1 = scoreCard.innings1;
  const innings2 = scoreCard.innings2;
  const name = data.name;
  const run = data.run;
  const balls = data.balls;
  const fours = data.fours;
  const sixes = data.sixes;
  const overs = data.overs;
  const bowl_runs = data.runs;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation Updates($scorecardId:ID,$innings1:InningsInput,$innings2:InningsInput,$playerId:ID!,$name:String,$run:Int,$balls:Int,$fours:Int,$sixes:Int,$overs:Int,$bowl_runs:Int){ 
        updateScorecard(scorecardId:$scorecardId,innings1:$innings1,innings2:$innings2){
              _id
              innings1{
                striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                non_striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_1{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_2
                runs
                wickets
                target
                current_ball
                current_over
                balls{
                  type
                  value
                }
                end
              }
              innings2{
                striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                non_striker{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_1{
                  _id
                  name
                  run
                  fours
                  sixes
                  overs
                  balls
                  st_rate
                  wickets
                  bowl_runs
                }
                bowler_2
                runs
                wickets
                target
                current_ball
                current_over
                balls{
                  type
                  value
                }
                end
              }
            }
              updatePlayer(playerId:$playerId,name:$name,run:$run,balls:$balls,fours:$fours,sixes:$sixes,overs:$overs,bowl_runs:$bowl_runs){
                _id
                name
                image
                run
                bowl_runs
                wickets
                battingStyle
                bowlingStyle
                overs
                matches
                bowl_rate
                bowl_avg
                st_rate
                avg
              }
        }`,
      variables: {
        scorecardId: scorecardId,
        innings1: innings1,
        innings2: innings2,
        playerId: playerId,
        name: name,
        run: run,
        balls: balls,
        fours: fours,
        sixes: sixes,
        overs: overs,
        bowl_runs: bowl_runs,
      },
    },
  });
  return res;
};