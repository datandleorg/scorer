import axios from "axios";

export const CreateTeam = (data) => {
  const name = data.name;
  const image = data.image;
  const token = data.token;
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation CreateTeam($name:String!,$image:String){
              createTeam(teamInput:{name:$name,image:$image,score:450,matches:4,won:2,loss:1,tie:1}){
                _id
                name
                image
                score
                matches
                won
                loss
                tie
                user{
                  _id
                }
                players{
                  _id
                }
              }
          }`,
      variables: {
        name: name,
        image: image,
      },
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return res;
};
export const getTeam = () => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query{
                  teams{
                _id
                name
                image
                score
                matches
                won
                loss
                tie
                user{
                  _id
                }
                players{
                  _id
                  run
                  name
                battingStyle
                bowlingStyle
                }
              }
          }`,
    },
  });
  return res;
};
export const getTeamById = (teamId) => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query GetTeamById($teamId:ID!){
              getTeamById(teamId:$teamId){
              _id
              name
              image
              score
              won
              loss
              tie    
              players{
                _id
                name
                run
                battingStyle
                bowlingStyle
                image
              }             
            }
          }`,
      variables: {
        teamId: teamId,
      },
    },
  });
  return res;
};
export const AddPlayerToTeam = (playerId, teamId) => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation AddPlayerToTeam($playerId:ID!,$teamId:ID!){
        addPlayerToTeam(playerId:$playerId,teamId:$teamId){
          _id
              name
              image
              score
              matches
              won
              loss
              tie
              players{
                _id
                name
                image
                battingStyle
                bowlingStyle
              }
        }
      }
      `,
      variables: {
        playerId: playerId,
        teamId: teamId,
      },
    },
  });
  return res;
};
export const DeletePlayerFromTeam = async (playerId, teamId) => {
  const res = await axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutationDeletePlayerFromTeam($teamId:ID!,$playerId:ID!){
        deletePlayerFromTeam(teamId:$teamId,playerId:$playerId){
            _id
            name
            players{
                _id
                name
            }
        }
      }`,
      variables: {
        teamId: teamId,
        playerId: playerId,
      },
    },
  });
  return res;
};
