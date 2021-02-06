import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { useHistory } from 'react-router-dom';
import plus from '../assets/plus2.svg';
import { getData } from '../utils/storgeService';

export default function TeamList({ editMode }) {
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    let teams = getData('teams');
    teams?.length > 0 && setTeamsList([...teams]);
  }, []);

  return (
    <React.Fragment>
      <div className='teams-page-wrapper full-height'>
        <div className='p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between'>
          <div>Teams</div>
          {!editMode && (
            <div onClick={() => redirectTo(`/team/add`)}>
              <img src={plus} width='30px' />
            </div>
          )}
        </div>
        {teamsList.map((team, teamIndex) => {
          return (
            <div
              className='border team-list-item p-2 shadow-sm mb-2'
              key={`team-${teamIndex}`}
              onClick={() => {
                redirectTo(`/team/info/${team.id}`);
              }}
            >
              <div className='d-flex'>
                <img
                  src={'https://img2.pngio.com/clipart-cricket-batsman-logo-cricket-logo-png-900_520.jpg'}
                  className='rounded-circle teampic'
                />
                <div className='ml-2 w-100'>
                  <div className='h-50'>{team.name}</div>
                  <div className='h-50 d-flex team-stats align-items-center text-secondary'>
                    <div className='mr-3'>
                      Matches: <span className='font-weight-bold'>{team.matches}</span>
                    </div>
                    <div className='mr-3'>
                      Won: <span className='font-weight-bold text-success'>{team.won}</span>
                    </div>
                    <div className='mr-3'>
                      Loss: <span className='font-weight-bold text-danger'>{team.loss}</span>
                    </div>
                    <div>
                      Tied: <span className='font-weight-bold text-info'>{team.tied}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <Loader status={true} /> */}
      </div>
      <Footer />
    </React.Fragment>
  );
}
