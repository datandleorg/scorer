import React, { useState, useEffect, useContext } from "react";
import close from "../assets/close.png";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
//import { getData, putData } from "../utils/storgeService";
//import { colourOptions } from "../Components/SingleSelect/data";
import SingleSelect from "../Components/SingleSelect/SingleSelect";
import moment from "moment";
import { connect } from "react-redux";
import { addingmatch } from "../actions/actions";
import Auth from "../context/auth-context";
import { CreateMatch } from "../services/matchservice";
import { getTeam } from "../services/teamservice";
import Loader from "../Components/Common/Loader";

function AddMatch({ dispatch, team }) {
  const [match, setMatchForm] = useState({
    team_1: "",
    team_2: "",
    toss_won_by: "",
    batting_first: "",
    overs: 0,
  });
  const context = useContext(Auth);
  //const [teamsOptions, setTeamsOptions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  // useEffect(() => {
  //   getTeamData();
  // }, []);

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setMatchForm({ ...match, [key]: value });
  };

  useEffect(() => {
    getTeam()
      .then((res) => {
        console.log(res.data.data);
        return setTeams(res.data.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const userallowed = context.userId;
  const teamsOption = teams.filter((tm) => tm.user._id === userallowed);

  const teamsOptions = teamsOption.map((t) => {
    return {
      label: t.name,
      value: t._id,
    };
  });
  // const getTeamById = (teamId) => {
  //   let team = teams.find((t) => t.id === teamId);
  //   return team;
  // };
  const createMatch = () => {
    // getData('matches');
    console.log(match);

    // if (!matches) matches = [];
    const date = moment();
    let matchvalue = {
      //  [`team_${match.team_1.value}`]: match.team_1.id,//getTeamById(match.team_1.value),
      //  [`team_${match.team_2.value}`]: match.team_2.id,//getTeamById(match.team_2.value),
      team_1: match.team_1,
      team_2: match.team_2,
      toss_won_by: match.toss_won_by,
      batting_first: match.batting_first,
      overs: match.overs,
      date: date.format("DD/MM/YYYY"),
      teams: [match.team_1, match.team_2],
      scorecard: {
        innings_1: {
          runs: 0,
          wkts: 0,
          current_over: 0,
          current_ball: 0,
          balls: [],
          target: "",
          striker: "",
          non_striker: "",
          bowler_1: "",
          bowler_2: "",
          end: false,
          batting: {},
        },
        innings_2: {
          runs: 0,
          wkts: 0,
          current_over: 0,
          current_ball: 0,
          balls: [],
          target: "",
          striker: "",
          non_striker: "",
          bowler_1: "",
          bowler_2: "",
          end: false,
        },
      },
    };

    let matches = [];
    matches.push({ ...matchvalue, id: matches.length + 1 });
    dispatch(addingmatch(matches));
    console.log(matchvalue.team_1);
    const matchData = {
      overs: +matchvalue.overs,
      team1: matchvalue.team_1.value,
      team2: matchvalue.team_2.value,
      tossWonBy: matchvalue.toss_won_by.label,
      battingFirst: matchvalue.batting_first.label,
      token: context.token,
    };
    setloading(true);
    CreateMatch(matchData)
      .then((res) => {
        console.log(res);
        setloading(false);
        redirectTo("/matches");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //putData('matches', matches);
  //match = matches;
  // let match = matches.map((m,index)=>{
  //  return { m,
  //         id:index+1
  //       }
  // });

  const team2_validation = match.team_1 === "";
  const toss_won_by_validation = match.team_1 === "" || match.team_2 === "";
  const batting_first_validation = match.toss_won_by === "";

  return (
    <React.Fragment>
      <div className="add-players-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Add Match</div>
          <div onClick={() => redirectTo(`/matches`)}>
            <img
              src={close}
              width="30px"
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div className="text-secondary">
          <div class="form-group">
            <label for="">Team 1</label>
            <SingleSelect
              name={"team_1"}
              placeholder=""
              options={teamsOptions}
              value={match.team_1}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "team_1");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Team 2</label>
            <SingleSelect
              name={"team_2"}
              placeholder=""
              options={teamsOptions.filter(
                (t) => t.value !== match.team_1.value
              )}
              value={match.team_2}
              isDisabled={team2_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "team_2");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Toss Won By</label>
            <SingleSelect
              name={"toss_won_by"}
              placeholder=""
              options={[
                {
                  label: match.team_1.label,
                  value: match.team_1.value,
                  color: "#000000",
                },
                {
                  label: match.team_2.label,
                  value: match.team_2.value,
                  color: "#000000",
                },
              ]}
              value={match.toss_won_by}
              isDisabled={toss_won_by_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "toss_won_by");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Batting First</label>
            <SingleSelect
              name={"batting_first"}
              placeholder=""
              options={[
                {
                  label: match.team_1.label,
                  value: match.team_1.value,
                  color: "#000000",
                },
                {
                  label: match.team_2.label,
                  value: match.team_2.value,
                  color: "#000000",
                },
              ]}
              value={match.batting_first}
              isDisabled={batting_first_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, "batting_first");
              }}
            />
          </div>
          <div class="form-group">
            <label for="">Innings Overs</label>
            <input
              type="number"
              class="form-control"
              name="overs"
              id=""
              aria-describedby="helpId"
              placeholder="Enter Overs"
              value={match.overs}
              onChange={(e) => {
                handleForm(e.target.value, "overs");
              }}
            />
          </div>

          <br />
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-md btn-primary w-100"
              onClick={() => createMatch()}
            >
              Create Match
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {loading && <Loader status={true} />}
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    match: state.match,
    team: state.team,
  };
};
export default connect(mapStateToProps)(AddMatch);
