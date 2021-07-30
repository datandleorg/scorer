import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Footer from "../Components/Footer";
import undo from "../assets/undo.svg";
import {
  //getMatchById,
  getTeamById,
  //getPlayerById,
  deepCopy,
  //updateMatchById,
} from "../utils/storgeService";
import Modal from "../Components/Modal";
import BallEle from "../Components/BallEle";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
import { connect } from "react-redux";

const dismissalOptions = [
  {
    label: "Caught",
    value: "caught",
  },
  {
    label: "Bowled",
    value: "bowled",
  },
];
function Match({ matchData, player, team }) {
  const match = useRouteMatch();
  const {
    params: { matchId },
  } = match;
  const history = useHistory();
  const [matchdata, setMatchData] = useState({
    data: {},
    update: 0,
  });
  const [modalStatus, setModalStatus] = useState({
    status: false,
    type: "",
  });
  const [currentPlayers, setCurrentPlayers] = useState({
    striker: null,
    non_striker: null,
    bowler_1: null,
    dismissal_type: "",
    dismissal_caused_by: "",
    new_batsmen: null,
  });
    setMatchData({matchData})
  // useEffect(() => {
  //   let match = getMatchById(+matchId);
  //   match && setMatchData({ ...matchData, data: { ...match } });
  // }, []);

  // useEffect(() => {
  //   matchData.update > 0 && updateMatchById(matchData.matchData.id, matchData.matchData);
  // }, [matchData.update]);
  
  if (!matchdata?.matchData?.teams) return "";

  const getPlayerFromMatch = (id, teamId) => {
    let currTeam = matchdata.matchData[`team_${teamId}`];
    let currPlayer = currTeam.players.find((p) => p.id === id);
    return currPlayer;
  };

  const getPlayerListFromMatch = (teamId) => {
    let currTeam = matchdata.matchData[`team_${teamId}`];
    let currPlayerList = currTeam.players.map((p) => {
      return {
        label: p.name,
        value: p.id,
      };
    });
    return currPlayerList;
  };

  const firstInnings = !matchdata.matchData?.scorecard?.innings_1?.end
    ? true
    : false;
  const currentInning = firstInnings ? "innings_1" : "innings_2";

  const currentBattingTeam = firstInnings
    ? matchdata.matchData?.batting_first
    : matchdata.matchData?.teams.find((t) => t !== matchdata.matchData.batting_first);

  const currentBowlingTeam = firstInnings
    ? matchdata.matchData?.teams.find((t) => t !== matchdata.matchData.batting_first)
    : matchdata.matchData?.batting_first;

  const striker =
    currentBattingTeam &&
    getPlayerFromMatch(
      matchdata.matchData?.scorecard?.[currentInning]?.striker,
      currentBattingTeam
    );
  const non_striker =
    currentBattingTeam &&
    getPlayerFromMatch(
      matchdata.matchData?.scorecard?.[currentInning]?.non_striker,
      currentBattingTeam
    );
  const bowler_1 =
    currentBowlingTeam &&
    getPlayerFromMatch(
      matchdata.matchData?.scorecard?.[currentInning]?.bowler_1,
      currentBowlingTeam
    );
  const bowler_2 =
    currentBowlingTeam &&
    getPlayerFromMatch(
      matchdata.matchData?.scorecard?.[currentInning]?.bowler_2,
      currentBowlingTeam
    );

  const current_over = matchdata.matchData?.scorecard?.[currentInning]?.current_over;
  const balls = matchdata.matchData?.scorecard?.[currentInning]?.balls[current_over];

  const batsmanOptions = getPlayerListFromMatch(currentBattingTeam);
  const bowlerOptions = getPlayerListFromMatch(currentBowlingTeam);

  const redirectTo = (route) => {
    history.push(route);
  };

  const handlePlayer = (value, key) => {
    setCurrentPlayers({ ...currentPlayers, [key]: value });
  };

  const addRunEvent = (run) => {
    // check if there is a striker
  };

  const handleEvent = ({ ball, striker }) => {
    // check if there is a striker

    if (striker) {
      if (ball === "W") {
        setModalStatus({ status: true, ball, type: "wicket" });
      } else {
        setModalStatus({ status: true, ball, type: "run" });
      }
    } else {
      //set striker and non striker
      setModalStatus({ status: true, ball, type: "init" });
    }
  };

  // const ballDescriptor = (type, value ) =>{
  //   if()
  // }

  const submitEvent = (type, ball, value) => {
    if (type === "init") {
      const { scorecard } = deepCopy(matchData.matchData);

      if (
        !currentPlayers.striker?.value ||
        !currentPlayers.non_striker?.value ||
        !currentPlayers.bowler_1?.value
      )
        return false;

      scorecard[currentInning]["striker"] = currentPlayers.striker.value;
      scorecard[currentInning]["non_striker"] =
        currentPlayers.non_striker.value;
      scorecard[currentInning]["bowler_1"] = currentPlayers.bowler_1.value;

      matchdata = {
        ...matchdata,
        data: {
          ...matchdata.matchData,
          scorecard,
        },
        update: matchdata.update + 1,
      };

      setModalStatus({ status: false, type: "" });
    }

    if (type === "wicket") {
      const { scorecard } = deepCopy(matchData.matchData);

      if (
        !currentPlayers.dismissal_type?.value ||
        !currentPlayers.dismissal_caused_by?.value ||
        !currentPlayers.new_batsmen?.value
      )
        return false;

      scorecard[currentInning]["dismissal_type"] =
        currentPlayers.dismissal_type.value;
      scorecard[currentInning]["dismissal_caused_by"] =
        currentPlayers.dismissal_caused_by.value;
      scorecard[currentInning]["new_batsmen"] =
        currentPlayers.new_batsmen.value;

      matchdata = {
        ...matchdata,
        data: {
          ...matchdata.matchData,
          scorecard,
        },
        update: matchdata.update + 1,
      };

      setModalStatus({ status: false, type: "" });
    }

    if (type === "run") {
      const { scorecard } = deepCopy(matchData.matchData);
      const current_over = scorecard[currentInning]["current_over"];
      const current_ball = scorecard[currentInning]["current_ball"];
      const ballnum = `${current_over}`;
      let balls = scorecard[currentInning]["balls"];

      let ballObj = {
        type: ball,
        value,
      };

      balls = {
        [ballnum]: [...(balls[ballnum] ? balls[ballnum] : []), ballObj],
      };

      scorecard[currentInning]["balls"] = balls;

      if (current_ball === 6) {
        scorecard[currentInning]["current_ball"] = 0;
        scorecard[currentInning]["current_over"] = current_over + 1;
      } else {
        scorecard[currentInning]["current_ball"] = current_ball + 1;
      }

      matchdata = {
        ...matchdata,
        data: {
          ...matchdata.matchData,
          scorecard,
        },
        update: matchdata.update + 1,
      };

      setModalStatus({ status: false, type: "" });
    }
  };

  return (
    <React.Fragment>
      <div className="matches-page-wrapper full-height mt-2">
        <div className="p-2 h5 text-secondary border-bottom justify-content-between d-flex align-items-center">
          <div>
            {matchdata.team_1?.name} <span className="smaller">Vs</span>{" "}
            {matchdata.team_2?.name}
            <span className="smaller ml-2">
              {firstInnings ? "1st innings" : "2nd innings"}
            </span>
          </div>
          <div className="smaller">
            <div>11/09/1992</div>
            <div>Overs: {matchdata.overs}</div>
          </div>
        </div>
        <div className="border-bottom p-1">
          <div className="d-flex align-items-center">
            <div className="mr-3">
              {getTeamById(matchdata.matchData?.batting_first)?.name}
            </div>
            <div className="h1 mr-3">
              {matchdata.matchData?.scorecard?.[currentInning]?.runs} -{" "}
              {matchdata.matchData?.scorecard?.[currentInning]?.wkts}
            </div>
            <div className="mr-2 pr-2">
              ({matchdata.matchData?.scorecard?.[currentInning]?.current_over}.
              {matchdata.matchData?.scorecard?.[currentInning]?.current_ball} Overs)
            </div>
            {!firstInnings && <div className="border-left"> Target 130</div>}
          </div>
          {!firstInnings && (
            <div className="small">
              Need 3 from 42 balls with 3 wickets remaining.
            </div>
          )}
        </div>

        <div className="p-1 mb-1">
          {/* <p className='font-weight-bold'>Batting</p> */}
          <div className="d-flex smaller justify-content-between border-bottom text-center pb-1">
            <div className="flex-3 text-left">Batsmen</div>
            <div className="flex-1">Runs</div>
            <div className="flex-1">Balls</div>
            <div className="flex-1">4's</div>
            <div className="flex-1">6's</div>
            <div className="flex-1">S.Rate</div>
          </div>

          <div className="d-flex small justify-content-between text-center pt-1">
            <React.Fragment>
              <div className="flex-3 text-left">{striker?.name || "-"} *</div>
              <div className="flex-1">{striker?.runs || "-"}</div>
              <div className="flex-1">{striker?.balls || "-"}</div>
              <div className="flex-1">{striker?.fours || "-"}</div>
              <div className="flex-1">{striker?.sixes || "-"}</div>
              <div className="flex-1">{striker?.srate || "-"}</div>
            </React.Fragment>
          </div>
          <div className="d-flex small justify-content-between text-center pt-1">
            <React.Fragment>
              <div className="flex-3 text-left">
                {non_striker?.name || "-"} *
              </div>
              <div className="flex-1">{non_striker?.runs || "-"}</div>
              <div className="flex-1">{non_striker?.balls || "-"}</div>
              <div className="flex-1">{non_striker?.fours || "-"}</div>
              <div className="flex-1">{non_striker?.sixes || "-"}</div>
              <div className="flex-1">{non_striker?.srate || "-"}</div>
            </React.Fragment>
          </div>
        </div>
        <div className="p-1">
          {/* <p className='font-weight-bold'>Bowling</p> */}
          <div className="d-flex smaller justify-content-between border-bottom text-center pb-1">
            <div className="flex-3 text-left">Bowler</div>
            <div className="flex-1">Overs</div>
            <div className="flex-1">Runs</div>
            <div className="flex-1">Wkts</div>
            <div className="flex-1">Econ</div>
            <div className="flex-1">Extras</div>
          </div>
          <div className="d-flex small justify-content-between text-center pt-1">
            <div className="flex-3 text-left">{bowler_1?.name || "-"} *</div>
            <div className="flex-1">{bowler_1?.runs || "-"}</div>
            <div className="flex-1">{bowler_1?.balls || "-"}</div>
            <div className="flex-1">{bowler_1?.fours || "-"}</div>
            <div className="flex-1">{bowler_1?.sixes || "-"}</div>
            <div className="flex-1">{bowler_1?.srate || "-"}</div>
          </div>
          <div className="d-flex small justify-content-between text-center pt-1">
            <div className="flex-3 text-left">{bowler_2?.name || "-"} *</div>
            <div className="flex-1">{bowler_2?.runs || "-"}</div>
            <div className="flex-1">{bowler_2?.balls || "-"}</div>
            <div className="flex-1">{bowler_2?.fours || "-"}</div>
            <div className="flex-1">{bowler_2?.sixes || "-"}</div>
            <div className="flex-1">{bowler_2?.srate || "-"}</div>
          </div>
        </div>
        <div className="p-1 mt-2">
          <div className="d-flex smaller align-items-center">
            <div className="mr-2">This Over: </div>
            <div className="d-flex match-over">
              {balls &&
                balls.map((ball) => {
                  return <BallEle {...ball} />;
                })}
            </div>
          </div>
        </div>
        <div className="p-1 mt-1 border-bottom mt-2">
          <div
            className="d-flex align-items-center  border-bottom pb-2 justify-content-center"
            style={{ height: "4rem" }}
          >
            <button
              onClick={() => handleEvent({ ball: "Run", striker })}
              type="button"
              class="btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2"
            >
              Run
            </button>
            <button
              onClick={() => handleEvent({ ball: "Wd", striker })}
              type="button"
              class="btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2"
            >
              Wide
            </button>
            <button
              onClick={() => handleEvent({ ball: "Nb", striker })}
              type="button"
              class="btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2"
            >
              No Ball
            </button>
            <button
              onClick={() => handleEvent({ ball: "W", striker })}
              type="button"
              class="btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2"
            >
              Wicket
            </button>
            <button
              onClick={() => handleEvent({ ball: "B", striker })}
              type="button"
              class="btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2"
            >
              Byes
            </button>
            <button
              onClick={() => handleEvent({ ball: "LB", striker })}
              type="button"
              class="btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2"
            >
              Leg Byes
            </button>
          </div>

          <div className="d-flex align-items-center" style={{ height: "4rem" }}>
            <div className="flex-1 text-center border-right">
              <img alt=""
                src={undo}
                width="40px"
                height="30px"
                className="mr-2"
                style={{ transform: "scaleX(-1)" }}
              />
              <p className="small mb-1">Undo</p>
            </div>
            <div className="flex-2 border-right">
              <div className="d-flex align-items-center mt-2 pb-2 justify-content-center">
                <button
                  type="button"
                  class="btn btn-outline-primary smaller pl-2 pr-2 mr-2"
                >
                  Swap Batsman
                </button>
                <button
                  type="button"
                  class="btn btn-outline-primary smaller pl-2 pr-2 mr-2"
                >
                  Retire
                </button>
              </div>
            </div>
            <div className="flex-1 text-center">
              <img alt="" src={undo} width="40px" height="30px" className="mr-2" />
              <p className="small mb-1">Redo</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={"Select Runs"}
        footer={""}
        isOpen={modalStatus.status}
        onClose={() => setModalStatus({ status: false })}
      >
        <div className="player_select_form">
          {modalStatus.type === "run" && (
            <div className="p-4 text-center">
              {new Array(7).fill(0).map((v, i) => {
                return (
                  <button
                    onClick={() =>
                      submitEvent(modalStatus.type, modalStatus.ball, i)
                    }
                    key={`run${i}`}
                    type="button"
                    className="btn btn-outline-secondary pl-4 pr-4 mr-3 mb-2"
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          )}
          {modalStatus.type === "init" && (
            <React.Fragment>
              <div className="p-2">
                <p>
                  <b>Striker</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select Striker"
                  options={batsmanOptions}
                  value={currentPlayers.striker}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "striker");
                  }}
                />
              </div>

              <div className="p-2">
                <p>
                  <b>Non - Striker</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select Non - Striker"
                  options={batsmanOptions}
                  value={currentPlayers.non_striker}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "non_striker");
                  }}
                />
              </div>

              <div className="p-2">
                <p>
                  <b>Bowler</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select Bowler"
                  options={bowlerOptions}
                  value={currentPlayers.bowler_1}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "bowler_1");
                  }}
                />
              </div>
            </React.Fragment>
          )}

          {modalStatus.type === "wicket" && (
            <React.Fragment>
              <div className="p-2">
                <p>
                  <b>Dismissal Type</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select Bowler"
                  options={dismissalOptions}
                  value={currentPlayers.dismissal_type}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "dismissal_type");
                  }}
                />
              </div>

              <div className="p-2">
                <p>
                  <b>Who Helped ?</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select Bowler"
                  options={bowlerOptions}
                  value={currentPlayers.dismissal_caused_by}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "dismissal_caused_by");
                  }}
                />
              </div>

              <div className="p-2">
                <p>
                  <b>New Batsmen</b>
                </p>
                <SingleSelect
                  name={"players"}
                  placeholder="Select new batsmen"
                  options={batsmanOptions}
                  value={currentPlayers.new_batsmen}
                  isSearchable={true}
                  onChange={(value) => {
                    handlePlayer(value, "new_batsmen");
                  }}
                />
              </div>
            </React.Fragment>
          )}

          <div className="p-2 text-center">
            <button
              onClick={() => submitEvent(modalStatus.type, modalStatus.ball)}
              type="button"
              className="btn btn-outline-primary pl-4 pr-4 mr-3 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    matchData: state.match,
    player: state.player,
    team: state.team,
  };
};
export default connect(mapStateToProps)(Match);
