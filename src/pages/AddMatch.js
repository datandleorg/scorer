import React, { useState, useEffect } from 'react';
import close from '../assets/close.png';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import { getData, putData } from '../utils/storgeService';
import { colourOptions } from '../Components/SingleSelect/data';
import SingleSelect from '../Components/SingleSelect/SingleSelect';
import moment from 'moment';

export default function AddMatch() {
  const [matchForm, setMatchForm] = useState({
    team_1: '',
    team_2: '',
    toss_won_by: '',
    batting_first: '',
    overs: 8,
  });

  const [teams, setTeams] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getTeamData();
  }, []);

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setMatchForm({
      ...matchForm,
      [key]: value,
    });
  };

  const getTeamData = () => {
    let teamsArr = getData('teams');
    let teamsData = teamsArr ? teamsArr : [];
    let teams = teamsData.map((t) => {
      return {
        label: t.name,
        value: t.name,
        color: '#000000',
      };
    });

    setTeams([...teams]);
  };

  const createMatch = () => {
    let matches = getData('matches');
    if (!matches) matches = [];
    const date = moment();

    let match = {
      team_1: matchForm.team_1.value,
      team_2: matchForm.team_2.value,
      toss_won_by: matchForm.toss_won_by.value,
      batting_first: matchForm.batting_first.value,
      overs: matchForm.overs,
      date: date.format('DD/MM/YYYY'),
      scorecard: {
        innings_1: {
          runs: 0,
          wkts: 2,
          current_over: 0,
          current_ball: 1,
          balls: [],
          target: '',
          striker: '',
          non_striker: '',
          bowler_1: '',
          bowler_2: '',
        },
        innings_2: {
          runs: 0,
          wkts: 2,
          current_over: 0,
          current_ball: 1,
          balls: [],
          target: '',
          striker: '',
          non_striker: '',
          bowler_1: '',
          bowler_2: '',
        },
      },
    };
    matches.push({ ...match, id: matches.length + 1 });
    putData('matches', matches);
    redirectTo('/matches');
  };

  const team2_validation = matchForm.team_1 === '';
  const toss_won_by_validation = matchForm.team_1 === '' || matchForm.team_2 === '';
  const batting_first_validation = matchForm.toss_won_by === '';

  return (
    <React.Fragment>
      <div className='add-players-wrapper full-height'>
        <div className='p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between'>
          <div>Add Match</div>
          <div onClick={() => redirectTo(`/matches`)}>
            <img src={close} width='30px' />
          </div>
        </div>

        <div className='text-secondary'>
          <div class='form-group'>
            <label for=''>Team 1</label>
            <SingleSelect
              name={'team_1'}
              placeholder=''
              options={teams}
              value={matchForm.team_1}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, 'team_1');
              }}
            />
          </div>
          <div class='form-group'>
            <label for=''>Team 2</label>
            <SingleSelect
              name={'team_2'}
              placeholder=''
              options={teams.filter((t) => t.value !== matchForm.team_1.value)}
              value={matchForm.team_2}
              isDisabled={team2_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, 'team_2');
              }}
            />
          </div>
          <div class='form-group'>
            <label for=''>Toss Won By</label>
            <SingleSelect
              name={'toss_won_by'}
              placeholder=''
              options={[
                {
                  label: matchForm.team_1.value,
                  value: matchForm.team_1.value,
                  color: '#000000',
                },
                {
                  label: matchForm.team_2.value,
                  value: matchForm.team_2.value,
                  color: '#000000',
                },
              ]}
              value={matchForm.toss_won_by}
              isDisabled={toss_won_by_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, 'toss_won_by');
              }}
            />
          </div>
          <div class='form-group'>
            <label for=''>Batting First</label>
            <SingleSelect
              name={'batting_first'}
              placeholder=''
              options={[
                {
                  label: matchForm.team_1.value,
                  value: matchForm.team_1.value,
                  color: '#000000',
                },
                {
                  label: matchForm.team_2.value,
                  value: matchForm.team_2.value,
                  color: '#000000',
                },
              ]}
              value={matchForm.batting_first}
              isDisabled={batting_first_validation}
              isSearchable={true}
              onChange={(value) => {
                handleForm(value, 'batting_first');
              }}
            />
          </div>
          <div class='form-group'>
            <label for=''>Innings Overs</label>
            <input
              type='number'
              class='form-control'
              name='overs'
              id=''
              aria-describedby='helpId'
              placeholder='Enter Overs'
              value={matchForm.overs}
              onChange={(e) => {
                handleForm(e.target.value, 'overs');
              }}
            />
          </div>

          <br />
          <div class='form-group'>
            <button type='submit' class='btn btn-md btn-primary w-100' onClick={() => createMatch()}>
              Create Match
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
