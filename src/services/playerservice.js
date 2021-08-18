import axios from "axios";

export const setData = async (data) => {
  const name = data.playerData.name;
  const battingStyle = data.playerData.batting_style;
  const bowlingStyle = data.playerData.bowling_style;
  const image = data.image;
  const token = data.token;

  const res = await axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `mutation CreatePlayer($name:String!,$battingStyle:String!,$bowlingStyle:String!,$image:String!){
        createPlayer(playerInput:{name:$name,battingStyle:$battingStyle,bowlingStyle:$bowlingStyle,wickets:6,run:50,image:$image}){
          _id
          name
          battingStyle
          bowlingStyle
          image
          wickets
          user{
            _id
        }
      }
      }`,
      variables: {
        name: name,
        battingStyle: battingStyle,
        bowlingStyle: bowlingStyle,
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

export const getPlayerData = () => {
  const res = axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query{
            players{
              name
              _id
              battingStyle
              bowlingStyle
              image
              user{
                _id
              }
            }
          }`,
    },
  });
  return res;
};

export const getPlayerById = async (playerId) => {
  const res = await axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query GetPlayerById($playerId:ID!){
            getPlayerById(playerId:$playerId){
              _id
              name
              image
              run
              wickets
              battingStyle
              bowlingStyle
            }
          }`,
      variables: {
        playerId: playerId,
      },
    },
  });
  return res;
};
