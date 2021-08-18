import axios from "axios";

export const createScorecard = (scorecard) => {
  const innings1 = scorecard.innings1;
  const innings2 = scorecard.innings2;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation CreateScorecard($innings1:InningsInput,$innings2:InningsInput){
          createScorecard(innings1:$innings1,innings2:$innings2){
            _id
            innings1{
            striker
            nonstriker
            bowler1
            bowler2
            runs
            wickets
            currentball
            currentover
            balls
            target
            end
        }
        innings2{
            striker
            nonstriker
            bowler1
            bowler2
            runs
            wickets
            currentball
            currentover
            balls
            target
            end
        }
        }
    }`,
      variables: {
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
                  innings1{
                  striker
                  nonstriker
                  bowler1
                  bowler2
                  currentball
                  currentover
                  runs
                  wickets
                  target
                  balls
                  end
                }
                innings2{
                  striker
                  nonstriker
                  bowler1
                  bowler2
                  currentball
                  currentover
                  runs
                  wickets
                  target
                  balls
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
  const innings1 = scoreCard.innings1;
  const innings2 = scoreCard.innings2;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation UpdateScorecard($scorecardId:ID,$innings1:InningsInput,$innings2:InningsInput){ 
        updateScorecard(scorecardId:$scorecardId,innings1:$innings1,innings2:$innings2){
              _id
              innings1{
                striker
                nonstriker
                bowler1
                bowler2
                runs
                wickets
                target
                currentball
                currentover
                balls
                end
              }
              innings2{
                striker
                nonstriker
                bowler1
                bowler2
                runs
                wickets
                target
                currentball
                currentover
                balls
                end
              }
            }
        }`,
        variables: {
          scorecardId:scorecardId,
          innings1: innings1,
          innings2: innings2,
        },
    }
  });
  return res;
};