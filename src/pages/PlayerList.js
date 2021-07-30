import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { useHistory } from "react-router-dom";
import plus from "../assets/plus2.svg";
import { addplayer } from "../actions/actions";
//import { getData } from "../utils/storgeService";
import { connect } from "react-redux";
import axios from "axios";

function PlayerList({ editMode = false, dispatch,player }) {
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  const [playersList, setPlayersList] = useState([]);
  
   useEffect(() => {
  //   let players = getData('players');
  //   players?.length > 0 && setPlayersList([...players]);
    axios({
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
          }
        }`,
      },
    })
      .then((res) => {
        console.log(res.data.data.players);
        const players = res.data.data.players;
       return setPlayersList(players);
      })
      .catch((err) => {
        console.log(err);
      });
      dispatch(addplayer(playersList));
    }, []);
     

  return (
    <React.Fragment>
      {console.log(playersList)}
      <div className="teams-page-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Players</div>
          {!editMode && (
            <div onClick={() => redirectTo(`/player/add`)}>
              <img src={plus} width="30px" alt=""/>
            </div>
          )}
        </div>
        {playersList.length > 0 ?
         playersList.map((player, playerIndex) => {
          console.log(player)
              return (
                <div
                  className="border player-list-item p-2 shadow-sm mb-2"
                  key={`team-${playerIndex}`}
                  onClick={() => {
                    redirectTo(`/player/info/${player._id}`);
                  }}
                >
                  <div className="d-flex align-items-center">
                    <img alt=""
                      src={player.image 
                       ||
                        "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
                      }
                      className="rounded-circle playerpic mr-2"
                    />
                    <div className="ml-2 w-100">
                      <div>{player.name}</div>
                      <div className="text-muted small">
                        {player.batting_style}
                      </div>
                      <div className="h-50 d-flex player-stats align-items-center text-secondary">
                        <div className="mr-3">
                          Matches:{" "}
                          <span className="font-weight-bold">
                            {player.matches ? player.matches : "-"}
                          </span>
                        </div>
                        <div className="mr-3">
                          Runs:{" "}
                          <span className="font-weight-bold">
                            {player.runs ? player.runs : "-"}
                          </span>
                        </div>
                        <div className="mr-3">
                          Avg:{" "}
                          <span className="font-weight-bold">
                            {player.avg ? player.avg : "-"}
                          </span>
                        </div>
                        <div>
                          SRate:{" "}
                          <span className="font-weight-bold">
                            {player.srate ? player.srate : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : !editMode && (
              <p className=" pt-5 pb-5 text-center">
                <button
                  type="submit"
                  class="btn btn-md btn-primary"
                  onClick={() => redirectTo(`/player/add`)}
                >
                  Create Player
                </button>
              </p>
            )}
      </div>
      <Footer />
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    player: state.player,
  };
};

export default connect(mapStateToProps)(PlayerList);
