import React, { useState,useContext } from "react";
import close from "../assets/close.png";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import plus from "../assets/plus2.svg";
import Auth from "../context/auth-context";
//import { getData, putData } from "../utils/storgeService";
import { addteam } from "../actions/actions";
import { connect } from "react-redux";
import axios from "axios";

function AddTeam({ dispatch, team }) {
  const [teamForm, setTeamForm] = useState({
    name: "",
    image: "",
  });
  const history = useHistory();

  const context = useContext(Auth);
  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setTeamForm({ ...teamForm, [key]: value });
  };

  const createTeam = () => {
    let teams = team;
    teams.push({ ...teamForm, id: teams.length + 1, players: [] });
    console.log(teams);
    dispatch(addteam(teams));
    redirectTo("/teams");
console.log(teamForm.name);

    const name = teamForm.name;
    const token = context.token;
    axios({
      url: "http://localhost:8000/graphql",
      method: "post",
      data: {
        query: `mutation CreateTeam($name:String!){
                createTeam(teamInput:{name:$name,score:450,matches:4,won:2,loss:1,tie:1}){
                  _id
                  name
                  score
                  matches
                  won
                  loss
                  tie
                }
            }`,
        variables: {
          name: name,
        },
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then((res) => {
        console.log(res.data.data.createTeam);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="add-players-wrapper full-height">
        <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
          <div>Add Team</div>
          <div onClick={() => redirectTo(`/teams`)}>
            <img src={close} width="30px" alt=""/>
          </div>
        </div>

        <div className="text-secondary">
          <div className="d-flex justify-content-center">
            <div style={{ position: "relative" }}>
              <img alt=""
                src={
                  "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"
                }
                className="rounded-circle  mr-2"
                style={{ width: "80px" }}
              />
              <img alt=""
                src={plus}
                style={{
                  position: "absolute",
                  width: "25px",
                  right: "10px",
                  background: "white",
                  borderRadius: "50%",
                  bottom: "0",
                }}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="">Team Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id=""
              aria-describedby="helpId"
              placeholder="Enter team name "
              value={team.name}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            />
            {/* <small id="helpId" class="form-text text-muted">Help text</small> */}
          </div>

          <br />
          <div class="form-group">
            <button
              type="submit"
              class="btn btn-md btn-primary w-100"
              onClick={() => createTeam()}
            >
              Create Team
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
    team: state.team,
  };
};

export default connect(mapStateToProps)(AddTeam);
