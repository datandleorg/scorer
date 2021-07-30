import React, { useState, useEffect,useContext } from "react";
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
import axios from "axios";

function AddMatch({ dispatch,team }) {
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

  //const getTeamData = () => {
  //let teamsArr = getData('teams');

  axios({
    url: "http://localhost:8000/graphql",
    method: "post",
    data: {
      query: `query{
                  teams{
                _id
                name
                score
                matches
                won
                loss
                tie
              }
          }`,
    },
  })
    .then((res) => {
      return setTeams(res.data.data.teams);
    })
    .catch((err) => {
      console.log(err);
    });
  let teamsOptions = [];
  let teamsArr = teams;
  let teamsData = teamsArr ? teamsArr : [];

  let teamsOption = teamsData.map((t) => {
    return {
      label: t.name,
      value: t._id,
      color: "#000000",
    };
  });
  teamsOptions = teamsOption;
  // const getTeamById = (teamId) => {
  //   let team = teams.find((t) => t.id === teamId);
  //   return team;
  // };

  const createMatch = () => {
    let matches = []; // getData('matches');
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
    matches = { ...matchvalue, id: matches.length + 1 };
    //putData('matches', matches);
    //match = matches;
    // let match = matches.map((m,index)=>{
    //  return { m,
    //         id:index+1
    //       }
    // });
    dispatch(addingmatch(matches));
    console.log(matches);
    redirectTo("/matches");
    const overs = +matches.overs;
    const team1 = matches.team_1.label;
    const team2 = matches.team_2.label;
    const tossWonBy = matches.toss_won_by.label;
    const battingFirst = matches.batting_first.label;

    const token = context.token;
    axios({
      url: "http://localhost:8000/graphql",
      method: "post",
      data: {
        query: `mutation CreateMatch($overs:Int!,$team1:String!,$team2:String!,$tossWonBy:String!,$battingFirst:String!){
                    createMatch(matchInput:{overs:$overs,team1:$team1,team2:$team2,tossWonBy:$tossWonBy,battingFirst:$battingFirst}){
                     _id
                     overs
                     team1
                     team2
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
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const team2_validation = match.team_1 === "";
  const toss_won_by_validation = match.team_1 === "" || match.team_2 === "";
  const batting_first_validation = match.toss_won_by === "";

  return (
    <React.Fragment>
      <div className="add-players-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Add Match</div>
          <div onClick={() => redirectTo(`/matches`)}>
            <img src={close} width="30px" alt=""/>
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
              options={teamsOptions} //.filter((t) => t.value === match.team_1.value)}
              value={match.team_2} //match.team_2}
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
              options={teamsOptions}
              //   {
              //     label: match.team_1.label,
              //     value: match.team_1.value,
              //     color: '#000000',
              //   },
              //   {
              //     label: match.team_2.label,
              //     value: match.team_2.value,
              //     color: '#000000',
              //   },
              // ]}
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
              options={teamsOptions}
              // {[
              //   {
              //     label: match.team_1.label,
              //     value: match.team_1.value,
              //     color: '#000000',
              //   },
              //   {
              //     label: match.team_2.label,
              //     value: match.team_2.value,
              //     color: '#000000',
              //   },
              // ]}
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
