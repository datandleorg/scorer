import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Footer from "../Components/Footer";
import undo from "../assets/undo.svg";
import { GetMatchById } from "../services/matchservice";
import Modal from "../Components/Modal";
import BallEle from "../Components/BallEle";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
import Loader from "../Components/Common/Loader";
import { connect } from "react-redux";
import {
  getScorecardById,
  updateScorecard,
} from "../services/scorecardservice";
import {updateMatch} from "../services/matchservice";
import { updateScoreOfPlayers } from "../services/playerservice";

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
  const [scorecard, setScorecard] = useState({});
  const [isLoading, setLoading] = useState(false);

  const match = useRouteMatch();
  const {
    params: { matchId },
  } = match;

  console.log(matchId);
  const history = useHistory();
  // const [matchdata, setMatchData] = useState({
  //   // data: {},
  //   // update: 0,
  // });
const [isMatchEnd,setMatchEnd] = useState();
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
  const [MatchData, setMatch] = useState();

  useEffect(() => {
    GetMatchById(matchId)
      .then((res) => {
        setMatch(res.data.data.getMatchById);
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

  const Id = MatchData?.scorecard;
  useEffect(() => {
    if (Id) {
      getScorecardById(Id)
        .then((res) => {
          console.log(res.data.data.getScorecardById);
          setScorecard({ scorecard: res.data.data.getScorecardById });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [MatchData]);
  // const getPlayerFromMatch = (id, teamId) => {
  //   let currTeam = matchdata.matchData[`team_${teamId}`];
  //   let currPlayer = currTeam.players.find((p) => p.id === id);
  //   return currPlayer;
  // };
  let winner;
  const getPlayerListFromMatch = (team) => {
    const currPlayerList = team?.players.map((p) => {
      return {
        label: p.name,
        value: p._id,
      };
    });
    return currPlayerList;
  };

  const firstInnings = !scorecard?.scorecard?.innings1?.end ? true : false;
  const currentInning = firstInnings ? "innings1" : "innings2";
  const otherInning = !firstInnings ? "innings1" : "innings2";
  const currentBattingTeam = firstInnings
    ? MatchData && MatchData.team1.name === MatchData?.battingFirst
      ? MatchData?.team1
      : MatchData?.team2
    : MatchData && MatchData.team1.name !== MatchData?.battingFirst
    ? MatchData?.team1
    : MatchData?.team2;

  const currentBowlingTeam = firstInnings
    ? MatchData && MatchData.team1.name === currentBattingTeam.name
      ? MatchData?.team2
      : MatchData?.team1
    : MatchData && MatchData.team1.name === currentBattingTeam.name
    ? MatchData?.team2
    : MatchData?.team1;

  const striker = scorecard?.["scorecard"]?.[currentInning]?.striker;

  const batsmanOptions = getPlayerListFromMatch(currentBattingTeam);
  const bowlerOptions = getPlayerListFromMatch(currentBowlingTeam);
  const balls = scorecard?.["scorecard"]?.[currentInning]?.balls;
  const redirectTo = (route) => {
    history.push(route);
  };
  const handlePlayer = (value, key) => {
    setCurrentPlayers({ ...currentPlayers, [key]: value });
  };

  // const addRunEvent = (run) => {
  //   // check if there is a striker
  // };
  const swappingBatsmen = () => {
    const scorecardCopy = JSON.parse(JSON.stringify(scorecard));
    scorecardCopy["scorecard"][otherInning].striker =
      scorecardCopy["scorecard"]?.[otherInning]?.striker?._id;
    scorecardCopy["scorecard"][otherInning].non_striker =
      scorecardCopy["scorecard"]?.[otherInning]?.non_striker?._id;
    scorecardCopy["scorecard"][otherInning].bowler_1 =
      scorecardCopy["scorecard"]?.[otherInning]?.bowler_1?._id;

    let bowler1 = scorecardCopy["scorecard"]?.[currentInning]?.bowler_1?._id;
    let swap = scorecardCopy["scorecard"]?.[currentInning]?.striker?._id;
    scorecardCopy["scorecard"][currentInning].striker =
      scorecardCopy["scorecard"]?.[currentInning]?.non_striker?._id;
    scorecardCopy["scorecard"][currentInning].non_striker = swap;
    scorecardCopy["scorecard"][currentInning].bowler_1 = bowler1;

    let id = scorecardCopy.scorecard._id;
    let playersSwap = scorecardCopy.scorecard;
    setLoading(true);
    updateScorecard(id, playersSwap)
      .then((res) => {
        console.log(res.data.data.updateScorecard);
        setScorecard({ scorecard: res.data.data.updateScorecard });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const retireBatsman = () => {
    setModalStatus({ status: true, type: "retire" });
  };

  const handleEvent = ({ ball, striker }) => {
    // check if there is a striker
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
  // const ballDescriptor = (type, value ) =>{
  //   if()
  // }
  const submitEvent = (type, ball, value) => {
    const scorecardCopy = JSON.parse(JSON.stringify(scorecard));
    let Striker = scorecardCopy["scorecard"]?.[currentInning]?.["striker"];
    let nonStriker =
      scorecardCopy["scorecard"]?.[currentInning]?.["non_striker"];
    let bowler = scorecardCopy["scorecard"]?.[currentInning]?.["bowler_1"];
    if (type === "init") {
      scorecardCopy["scorecard"][currentInning]["striker"] =
        currentPlayers?.striker?.value;
      scorecardCopy["scorecard"][currentInning]["non_striker"] =
        currentPlayers?.non_striker?.value;
      scorecardCopy["scorecard"][currentInning]["bowler_1"] =
        currentPlayers?.bowler_1?.value;

      //     if (
      //       !currentPlayers.striker?.value ||
      //       !currentPlayers.non_striker?.value ||
      //       !currentPlayers.bowler_1?.value
      //     )
      //       return false;
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
      scorecardCopy["scorecard"][currentInning].wickets =
        scorecardCopy["scorecard"][currentInning].wickets + 1;
      scorecardCopy["scorecard"][currentInning]["bowler_1"].wickets =
        scorecardCopy["scorecard"][currentInning]["bowler_1"].wickets + 1;
      bowler = scorecardCopy["scorecard"]?.[currentInning]?.["bowler_1"];

      scorecardCopy["scorecard"][currentInning]["striker"] =
        currentPlayers?.new_batsmen?.value;
      scorecardCopy["scorecard"][currentInning]["non_striker"] =
        scorecardCopy["scorecard"]?.[currentInning]?.["non_striker"]?._id;
      scorecardCopy["scorecard"][currentInning]["bowler_1"] =
        scorecardCopy["scorecard"]?.[currentInning]?.["bowler_1"]?._id;
      setModalStatus({ status: false, type: "" });
    }

    if (type === "run") {
      const currentover =
        scorecardCopy?.["scorecard"]?.[currentInning]?.["current_over"];
      const currentball =
        scorecardCopy?.["scorecard"]?.[currentInning]?.["current_ball"];
      let balls = scorecardCopy?.["scorecard"]?.[currentInning]?.["balls"];
      let ballObj = {
        type: ball,
        value,
      };

      if (currentball === 5) {
        scorecardCopy["scorecard"][currentInning]["balls"] = {
          type: "",
          value: 0,
        };
      } else {
        balls.push(ballObj);
        scorecardCopy["scorecard"][currentInning]["balls"] = balls;
      }

      if (currentball === 5) {
        scorecardCopy["scorecard"][currentInning]["current_ball"] = 0;
        scorecardCopy["scorecard"][currentInning]["current_over"] =
          currentover + 1;
        scorecardCopy["scorecard"][currentInning].bowler_1.overs =
          scorecardCopy["scorecard"][currentInning].bowler_1.overs + 1;
        bowler =
          scorecardCopy["scorecard"][currentInning].bowler_1 &&
          scorecardCopy["scorecard"][currentInning]["bowler_1"];

        scorecardCopy["scorecard"][currentInning]["striker"] =
          scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?._id;
        scorecardCopy["scorecard"][currentInning]["non_striker"] =
          scorecardCopy["scorecard"]?.[currentInning]?.["non_striker"]?._id;
        scorecardCopy["scorecard"][currentInning]["bowler_1"] =
          currentPlayers?.bowler_1?.value;
      } else {
        scorecardCopy["scorecard"][currentInning]["current_ball"] =
          currentball + 1;
        //     matchdata = {
        //       ...matchdata,
        //       data: {
        //         ...matchdata.matchData,
        //         scorecard,
        //       },
        //       update: matchdata.update + 1,
        //     };

        let run = scorecardCopy?.["scorecard"]?.[currentInning]?.["runs"];
        let currentBall =
          scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["balls"];

        if (ball === "Run") {
          scorecardCopy["scorecard"][currentInning]["runs"] =
            run + ballObj.value;
          scorecardCopy["scorecard"][currentInning]["striker"]["run"] =
            scorecardCopy?.["scorecard"]?.[currentInning]?.["striker"]?.[
              "run"
            ] + ballObj.value;
          Striker =
            scorecardCopy["scorecard"]?.[currentInning]?.["striker"] &&
            scorecardCopy["scorecard"]?.[currentInning]?.["striker"];

          scorecardCopy["scorecard"][currentInning]["striker"]["balls"] =
            currentBall + 1;
          scorecardCopy["scorecard"][currentInning]["bowler_1"].bowl_runs =
            scorecardCopy["scorecard"][currentInning]["bowler_1"].bowl_runs +
            ballObj.value;
          bowler =
            scorecardCopy["scorecard"][currentInning]["bowler_1"] &&
            scorecardCopy["scorecard"][currentInning]["bowler_1"];
        }
        if (ballObj.value === 1 || ballObj.value === 3 || ballObj.value === 5) {
          let swap = scorecardCopy["scorecard"][currentInning].striker;
          scorecardCopy["scorecard"][currentInning].striker =
            scorecardCopy["scorecard"][currentInning].non_striker;
          scorecardCopy["scorecard"][currentInning].non_striker = swap;
        }

        if (ballObj.value === 4) {
          scorecardCopy["scorecard"][currentInning].striker.fours =
            scorecardCopy["scorecard"][currentInning].striker.fours + 1;
          Striker =
            scorecardCopy["scorecard"][currentInning].striker &&
            scorecardCopy["scorecard"][currentInning].striker;
        }
        if (ballObj.value === 6) {
          scorecardCopy["scorecard"][currentInning].striker.sixes =
            scorecardCopy["scorecard"][currentInning].striker.sixes + 1;
          Striker =
            scorecardCopy["scorecard"][currentInning].striker &&
            scorecardCopy["scorecard"][currentInning].striker;
        }
        if (ball === "Wd" || ball === "Nb" || ball === "B" || ball === "LB") {
          scorecardCopy["scorecard"][currentInning]["runs"] =
            run + ballObj.value;
        }

        if (currentInning === "innings1") {
          if (
            scorecardCopy["scorecard"][currentInning]["current_over"] ===
              MatchData.overs ||
            batsmanOptions.length ===
              scorecardCopy["scorecard"][currentInning].wickets
          ) {
            scorecardCopy["scorecard"][currentInning]["end"] = true;
            scorecardCopy["scorecard"]["innings1"].target =
              scorecardCopy["scorecard"].innings1.runs;
              scorecardCopy["scorecard"][currentInning]["striker"]["totalRuns"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalRuns"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalRuns"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalBalls"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalWickets"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalBalls"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalFours"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalFours"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalFours"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalSixes"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalSixes"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalSixes"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalWickets"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalWickets"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalWickets"];
            }
        }
        if (currentInning === "innings2") {
          if (
            scorecardCopy["scorecard"][currentInning]["current_over"] ===
              MatchData.overs ||
            scorecardCopy["scorecard"][currentInning].runs >=
              scorecardCopy["scorecard"][otherInning].target ||
            batsmanOptions.length ===
              scorecardCopy["scorecard"][currentInning].wickets
          ) {
            scorecardCopy["scorecard"][currentInning]["striker"]["totalRuns"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalRuns"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalRuns"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalBalls"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalBalls"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalBalls"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalFours"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalFours"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalFours"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalSixes"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalSixes"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalSixes"];
              scorecardCopy["scorecard"][currentInning]["striker"]["totalWickets"] = scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalWickets"] + scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?.["totalWickets"];
            scorecardCopy["scorecard"][currentInning]["end"] = true;
            scorecardCopy["scorecard"].matchStatus = "end";
          }
        }
        nonStriker =
          scorecardCopy["scorecard"][currentInning]["non_striker"] &&
          scorecardCopy["scorecard"][currentInning]["non_striker"];
        scorecardCopy["scorecard"][currentInning]["striker"] =
          scorecardCopy["scorecard"]?.[currentInning]?.["striker"]?._id;
        scorecardCopy["scorecard"][currentInning]["non_striker"] =
          scorecardCopy["scorecard"]?.[currentInning]?.["non_striker"]?._id;
        scorecardCopy["scorecard"][currentInning]["bowler_1"] =
          scorecardCopy["scorecard"]?.[currentInning]?.["bowler_1"]?._id;
      }

      setModalStatus({ status: false, type: "" });
    }

    if (type === "retire") {
      scorecardCopy["scorecard"][currentInning]["striker"] =
        currentPlayers.new_batsmen.value;
      setModalStatus({ status: false, type: "" });
    }

    let update = scorecardCopy.scorecard;
    let Id = scorecardCopy.scorecard._id;
    update[otherInning].striker = update[otherInning]?.striker?._id;
    update[otherInning].non_striker = update[otherInning]?.non_striker?._id;
    update[otherInning].bowler_1 = update[otherInning]?.bowler_1?._id;

    update[currentInning].striker = update[currentInning].striker;
    update[currentInning].non_striker = update[currentInning].non_striker;
    update[currentInning].bowler_1 = update[currentInning].bowler_1;

    setLoading(true);
    updateScoreOfPlayers(Striker, nonStriker, bowler, update)
      .then((res) => {
        console.log(res.data.data);
        setScorecard({ scorecard: res.data.data.updatedScorecard });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  winner = currentBattingTeam?.name;
  if (scorecard?.scorecard?.matchStatus === "end") {
    const Id = MatchData?._id;
    updateMatch(Id,winner)
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
    redirectTo("/winner");
  }
  console.log(scorecard);
  let totalBalls = MatchData?.overs * 6;
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
            <div>{MatchData && MatchData.date}</div>
            <div>{MatchData && MatchData.overs}</div>
          </div>
        </div>

        <div>
          <div className="border-bottom p-1">
            <div className="d-flex align-items-center">
              <div className="mr-3">{currentBattingTeam?.name}</div>
              <div className="h1 mr-3">
                {scorecard?.["scorecard"]?.[currentInning]?.["runs"] || "0"} -
                {scorecard?.["scorecard"]?.[currentInning]?.["wickets"] || "0"}
              </div>
              <div className="mr-2 pr-2">
                (
                {scorecard?.["scorecard"]?.[currentInning]?.current_over || "0"}
                .
                {scorecard?.["scorecard"]?.[currentInning]?.current_ball || "0"}{" "}
                Overs)
              </div>
              {!firstInnings && (
                <div className="border-left">
                  {" "}
                  Target:{scorecard?.["scorecard"]?.innings1?.runs}{" "}
                </div>
              )}
            </div>
            {!firstInnings && (
              <div className="small">
                Need{" "}
                {scorecard?.["scorecard"]?.[otherInning]?.runs -
                  scorecard?.["scorecard"]?.[currentInning]?.runs}{" "}
                runs from {totalBalls} balls with 3 wickets remaining.
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
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "name"
                  ] || "-"}
                  *
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "run"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "balls"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "fours"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "sixes"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["striker"]?.[
                    "st_rate"
                  ] || "0"}
                </div>
              </React.Fragment>
            </div>
            <div className="d-flex small justify-content-between text-center pt-1">
              <React.Fragment>
                <div className="flex-3 text-left">
                  {scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]
                    ?.name || "-"}
                </div>
                <div className="flex-1">
                  {
                    scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]
                      ?.run
                  }
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]?.[
                    "balls"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]?.[
                    "fours"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]?.[
                    "sixes"
                  ] || "0"}
                </div>
                <div className="flex-1">
                  {scorecard?.["scorecard"]?.[currentInning]?.["non_striker"]?.[
                    "st_rate"
                  ] || "0"}
                </div>
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
                {scorecard?.["scorecard"]?.[currentInning]?.["bowler_1"]
                  ?.name || "-"}
              </div>
              <div className="flex-1">
                {scorecard?.["scorecard"]?.[currentInning]?.["bowler_1"]
                  ?.overs || "0"}
              </div>
              <div className="flex-1">
                {scorecard?.["scorecard"]?.[currentInning]?.["bowler_1"]
                  ?.bowl_runs || "0"}
              </div>
              <div className="flex-1">
                {scorecard?.["scorecard"]?.[currentInning]?.["bowler_1"]
                  ?.wickets || "0"}
              </div>
              <div className="flex-1">{/*bowler_1?.sixes || "-"*/}-</div>
              <div className="flex-1">{/*bowler_1?.srate || "-"*/}-</div>
            </div>
            {/*<div className="d-flex small justify-content-between text-center pt-1">
                <div className="flex-3 text-left">
                  bowler_2?.name || "-" kholi
                </div>
                <div className="flex-1">bowler_2?.runs || "-"3</div>
                <div className="flex-1">bowler_2?.balls || "-"25</div>
                <div className="flex-1">bowler_2?.fours || "-"2</div>
                <div className="flex-1">bowler_2?.sixes || "-"-</div>
                <div className="flex-1">bowler_2?.srate || "-"-</div>
              </div>*/}
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
                    onClick={swappingBatsmen}
                  >
                    Swap Batsman
                  </button>
                  <button
                    type="button"
                    onClick={retireBatsman}
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
            {scorecard?.["scorecard"]?.[currentInning]?.current_ball === 5 && (
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
                {
                  <div className="p-2">
                    <p>
                      <b>Dismissal caused by ?</b>
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
                }
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
            {modalStatus.type === "retire" && (
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
      {isLoading && <Loader status={true} />}
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
