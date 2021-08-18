import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Footer from "../Components/Footer";
import undo from "../assets/undo.svg";
// import {
//   getMatchById,
//   getTeamById,
//   getPlayerById,
// deepCopy,
//   getMatchById,
//   updateMatchById,
//} from "../utils/storgeService";
import { GetMatchById } from "../services/matchservice";
import Modal from "../Components/Modal";
import BallEle from "../Components/BallEle";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
import { connect } from "react-redux";
import { createScorecard, getScorecard,updateScorecard } from "../services/scorecardservice";

function Match({ matchData, player, team }) {
  const dismissalOptions = [
    {
      label: "Caught",
      value: "caught",
    },
    {
      label: "Bowled",
      value: "bowled",
    },
    {
      label: "Runout",
      value: "Runout",
    },
  ];
  const [scorecard, setScorecard] = useState({
    //matchStatus:'start',
    innings1: {
      runs: 0,
      wickets: 0,
      currentover: 0,
      currentball: 0,
      balls: [ ],
      target: 0,
      striker: " ",
      nonstriker: " ",
      bowler1: " ",
      bowler2: " ",
      end: false,
      //batting: {},
    },
    innings2: {
      runs: 0,
      wickets: 0,
      currentover: 0,
      currentball: 0,
      balls: 0,
      target: 0,
      striker: " ",
      nonstriker: " ",
      bowler1: " ",
      bowler2: " ",
      end: false,
    },
  });
  const match = useRouteMatch();
  const {
    params: { matchId },
  } = match;

  const history = useHistory();
  // const [matchdata, setMatchData] = useState({
  //   // data: {},
  //   // update: 0,
  // });

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

  const matchStartHandler = () => {
    setScorecard({ ...scorecard, matchStatus: "red" });
    console.log(scorecard);
  };

  //const [scorecard,setscorecard] = useState({});
  const [MatchData, setMatch] = useState(null);
  // useEffect(() => {
  //   createScorecard(scorecard)
  //     .then((res) => {
  //       console.log(res.data.data.createScorecard);
  //       setScorecard(res.data.data.createScorecard);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    GetMatchById(matchId)
      .then((res) => {
        return setMatch(res.data.data.getMatchById);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   let match = getMatchById(+matchId);
  //   match && setMatchData({ ...matchData, data: { ...match } });
  // }, []);

  // useEffect(() => {
  //   matchData.update > 0 && updateMatchById(matchData.matchData.id, matchData.matchData);
  // }, [matchData.update]);

  useEffect(() => {
    getScorecard()
      .then((res) => {
        console.log(res.data.data.scorecard);
        setScorecard(res.data.data.scorecard)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // if (!matchdata?.matchData?.teams) return "";

  // const getPlayerFromMatch = (id, teamId) => {
  //   let currTeam = matchdata.matchData[`team_${teamId}`];
  //   let currPlayer = currTeam.players.find((p) => p.id === id);
  //   return currPlayer;
  // };

  const getPlayerListFromMatch = () => {
    // currTeam = matchdata.matchData[`team_${teamId}`];
    //let currPlayerList = currTeam.players.map((p) => {
    console.log(scorecard)
    let currPlayerList =
      MatchData &&
      MatchData.team1.players.map((p) => {
        return {
          label: p.name,
          value: p._id,
          runs: p.run,
        };
      });
    return currPlayerList;
  };

  const getPlayerbListFromMatch = () => {
    // currTeam = matchdata.matchData[`team_${teamId}`];
    //let currPlayerList = currTeam.players.map((p) => {
    let currPlayerList =
      MatchData &&
      MatchData.team2.players.map((p) => {
        return {
          label: p.name,
          value: p._id,
        };
      });
    return currPlayerList;
  };
  const firstInnings = !scorecard.innings1.end ? true : false;
  const currentInning = firstInnings ? "innings1" : "innings2";
  //const firstInnings = true;
  const currentBattingTeam =
    MatchData &&
    (firstInnings
      ? MatchData.battingFirst
      : MatchData.teams.find((t) => t !== MatchData.battingFirst));

  // const currentBowlingTeam = firstInnings
  //   ? matchdata.matchData?.teams.find((t) => t !== matchdata.matchData.batting_first)
  //   : matchdata.matchData?.batting_first;
  const striker = currentPlayers.striker && currentPlayers.striker.label;
  //   currentBattingTeam &&
  //   getPlayerFromMatch(
  //     matchdata.matchData?.scorecard?.[currentInning]?.striker,
  //     currentBattingTeam
  //   );
  //const non_striker = currentPlayers.non_striker && currentPlayers.non_striker.label;
  //   currentBattingTeam &&
  //   getPlayerFromMatch(
  //     matchdata.matchData?.scorecard?.[currentInning]?.non_striker,
  //     currentBattingTeam
  //   );
  //const bowler_1 = currentPlayers.bowler_1 && currentPlayers.bowler_1.label;
  //   currentBowlingTeam &&
  //   getPlayerFromMatch(
  //     matchdata.matchData?.scorecard?.[currentInning]?.bowler_1,
  //     currentBowlingTeam
  //   );
  // const bowler_2 =
  //   currentBowlingTeam &&
  //   getPlayerFromMatch(
  //     matchdata.matchData?.scorecard?.[currentInning]?.bowler_2,
  //     currentBowlingTeam
  //   );

  const currentover = scorecard?.[currentInning]?.currentover;
  const balls = scorecard?.[currentInning]?.balls;

  const batsmanOptions = getPlayerListFromMatch("team1"); //(currentBattingTeam);
  const bowlerOptions = getPlayerbListFromMatch("team2"); //(currentBowlingTeam);
  const redirectTo = (route) => {
    history.push(route);
  };

  const handlePlayer = (value, key) => {
    setCurrentPlayers({ ...currentPlayers, [key]: value });
  };

  // const addRunEvent = (run) => {
  //   // check if there is a striker
  // };
  const handleEvent = ({ ball, striker }) => {
    // check if there is a striker
  //   const scorecardId = "611b9a706450ee2e3cd090e9";
  //   updateScorecard(scorecardId,ScoreCard)
  //   .then(res=>{
  //     console.log(res.data.data.updateScorecard)
  //   }).catch(err=>{
  //     console.log(err)
  //   })  

    if (striker) {
      if (ball === "w") {
        setModalStatus({ status: true, ball, type: "wicket" });
      } else {
        setModalStatus({ status: true, ball, type: "run" });
      }
    } else {
      //set striker and non striker
      setModalStatus({ status: true, ball, type: "init" });
    }
  };

  // // const ballDescriptor = (type, value ) =>{
  // //   if()
  // // }

  const submitEvent = (type, ball, value) => {
    //  e.preventdefault();
    if (type === "init") {
      //    };
      //     const { scorecard } = deepCopy(matchData.matchData);

      //   }
      //     if (
      //       !currentPlayers.striker?.value ||
      //       !currentPlayers.non_striker?.value ||
      //       !currentPlayers.bowler_1?.value
      //     )
      //       return false;

      scorecard[currentInning]["striker"] = currentPlayers.striker.label;
      scorecard[currentInning]["nonstriker"] = currentPlayers.non_striker.label;
      scorecard[currentInning]["bowler1"] = currentPlayers.bowler_1.label;
      console.log(currentPlayers.striker.runs);
        console.log(scorecard._id);
        const ScoreCard = scorecard;
        const scorecardId = scorecard._id;
        updateScorecard(scorecardId,ScoreCard)
        .then(res=>{
          console.log(res.data.data.updateScorecard)
        }).catch(err=>{
          console.log(err)
        }) 
      //     matchdata = {
      //       ...matchdata,
      //       data: {
      //         ...matchdata.matchData,
      //         scorecard,
      //       },
      //       update: matchdata.update + 1,
      //     };

      setModalStatus({ status: false, type: "" });
    }
    if (type === "wicket") {
      //     const { scorecard } = deepCopy(matchData.matchData);

      //     if (
      //       !currentPlayers.dismissal_type?.value ||
      //       !currentPlayers.dismissal_caused_by?.value ||
      //       !currentPlayers.new_batsmen?.value
      //     )
      //       return false;

      //     scorecard[currentInning]["dismissal_type"] =
      //       currentPlayers.dismissal_type.value;
      //     scorecard[currentInning]["dismissal_caused_by"] =
      //       currentPlayers.dismissal_caused_by.value;
      //     scorecard[currentInning]["new_batsmen"] =
      //       currentPlayers.new_batsmen.value;

      //     matchdata = {
      //       ...matchdata,
      //       data: {
      //         ...matchdata.matchData,
      //         scorecard,
      //       },
      //       update: matchdata.update + 1,
      //     };

      setModalStatus({ status: false, type: "" });
    }

    if (type === "run") {
      //     const { scorecard } = deepCopy(matchData.matchData);
      const currentover = scorecard[currentInning]["currentover"];
      const currentball = scorecard[currentInning]["currentball"];
      const ballnum = currentover;
      let balls = scorecard[currentInning]["balls"];

      let ballObj = {
        type: ball,
        value,
      };
      let run = scorecard[currentInning]["runs"];
      let playerRun = currentPlayers.striker.runs;
      // balls = {
      //   [ballnum]: [...(balls[ballnum] ? balls[ballnum] : []), ballObj],
      // };

      scorecard[currentInning]["balls"] = balls;

      if(ballObj.value === 1 || ballObj.value === 3||ballObj.value === 5){
        currentPlayers.striker = currentPlayers.non_striker;
        console.log(currentPlayers.striker);
      }

      scorecard[currentInning]["runs"] = run + ballObj.value;
      currentPlayers.striker.runs = playerRun + ballObj.value;
      
      if (currentball === 5) {
        scorecard[currentInning]["currentball"] = 0;
        scorecard[currentInning]["currentover"] = currentover + 1;
      } else {
        scorecard[currentInning]["currentball"] = currentball + 1;

        //     matchdata = {
        //       ...matchdata,
        //       data: {
        //         ...matchdata.matchData,
        //         scorecard,
        //       },
        //       update: matchdata.update + 1,
        //     };
      }
      setModalStatus({ status: false, type: "" });
    }
  };
  return (
    <React.Fragment>
      <div className="matches-page-wrapper full-height mt-2">
        <div className="p-2 h5 text-secondary border-bottom justify-content-between d-flex align-items-center">
          <div>
            {MatchData && MatchData.team1.name}
            <span className="smaller">{"  "}Vs</span>{" "}
            {MatchData && MatchData.team2.name}
            <span className="smaller ml-2">
              {firstInnings ? "1st innings" : "2nd innings"}
            </span>
          </div>
          <div className="smaller">
            <div>11/09/1992</div>
            <div>{MatchData && MatchData.overs}</div>
          </div>
        </div>
        {scorecard.matchStatus === "start" ? (
          <button class="btn btn-primary" onClick={matchStartHandler}>
            start match
          </button>
        ) : (
          <div>
            <div className="border-bottom p-1">
              <div className="d-flex align-items-center">
                <div className="mr-3">{MatchData && MatchData.team2.name}</div>
                <div className="h1 mr-3">
                  {
                    //MatchData && MatchData.team1.score -5
                  }
                  {scorecard?.[currentInning]?.runs -
                    scorecard?.[currentInning]?.wickets}
                </div>
                <div className="mr-2 pr-2">
                  ({scorecard?.[currentInning]?.currentover}.
                  {scorecard?.[currentInning]?.currentball} Overs)
                </div>
                {!firstInnings && (
                  <div className="border-left"> Target 370</div>
                )}
              </div>
              {!firstInnings && (
                <div className="small">
                  Need 25 runs from 46 balls with 5 wickets remaining.
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
                  <div className="flex-3 text-left">
                    {scorecard[currentInning]["striker"] || "-"}
                  </div>
                  <div className="flex-1">
                    {currentPlayers.striker?.runs || "-"}{" "}
                  </div>
                  <div className="flex-1">{/*striker?.balls || "-"*/}40</div>
                  <div className="flex-1">{/*striker?.fours || "-"*/}2</div>
                  <div className="flex-1">{/*striker?.sixes || "-"*/}1</div>
                  <div className="flex-1">{/*striker?.srate || "-"*/}-</div>
                </React.Fragment>
              </div>
              <div className="d-flex small justify-content-between text-center pt-1">
                <React.Fragment>
                  <div className="flex-3 text-left">
                    {scorecard[currentInning]["nonstriker"] || "-"}
                  </div>
                  <div className="flex-1">
                    {currentPlayers.non_striker?.runs || "-"}
                  </div>
                  <div className="flex-1">
                    {/*non_striker?.balls || "-"*/}30
                  </div>
                  <div className="flex-1">{/*non_striker?.fours || "-"*/}1</div>
                  <div className="flex-1">{/*non_striker?.sixes || "-"*/}1</div>
                  <div className="flex-1">{/*non_striker?.srate || "-"*/}-</div>
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
                <div className="flex-3 text-left">
                  {scorecard[currentInning]["bowler1"] || "-"}
                </div>
                <div className="flex-1">{/*bowler_1?.runs || "-"*/}2</div>
                <div className="flex-1">{/*bowler_1?.balls || "-"*/}17</div>
                <div className="flex-1">{/*bowler_1?.fours || "-"*/}1</div>
                <div className="flex-1">{/*bowler_1?.sixes || "-"*/}-</div>
                <div className="flex-1">{/*bowler_1?.srate || "-"*/}-</div>
              </div>
              <div className="d-flex small justify-content-between text-center pt-1">
                <div className="flex-3 text-left">
                  {/*bowler_2?.name || "-"*/} dhawan
                </div>
                <div className="flex-1">{/*bowler_2?.runs || "-"*/}3</div>
                <div className="flex-1">{/*bowler_2?.balls || "-"*/}25</div>
                <div className="flex-1">{/*bowler_2?.fours || "-"*/}2</div>
                <div className="flex-1">{/*bowler_2?.sixes || "-"*/}-</div>
                <div className="flex-1">{/*bowler_2?.srate || "-"*/}-</div>
              </div>
            </div>
            <div className="p-1 mt-2">
              <div className="d-flex smaller align-items-center">
                <div className="mr-2">This Over: </div>
                <div className="d-flex match-over">
                  {balls &&
                    balls.map((ball) => {
                      return (
                        <BallEle
                          {...ball}
                          className="border-danger bg-danger text-white font-weight-bold"
                        />
                      );
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
                  onClick={() => handleEvent({ ball: "w", striker })}
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

              <div
                className="d-flex align-items-center"
                style={{ height: "4rem" }}
              >
                <div className="flex-1 text-center border-right">
                  <img
                    alt=""
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
                  <img
                    alt=""
                    src={undo}
                    width="40px"
                    height="30px"
                    className="mr-2"
                  />
                  <p className="small mb-1">Redo</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {
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
                    placeholder="Dismissal Type"
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
      }
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
