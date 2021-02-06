import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { useHistory } from 'react-router-dom';
import plus from '../assets/plus2.svg';
import { getData } from '../utils/storgeService';

export default function MatchList({ editMode = false }) {
  const history = useHistory();

  const [matchList, setMatchList] = useState([]);

  const redirectTo = (route) => {
    history.push(route);
  };

  useEffect(() => {
    let matches = getData('matches');
    matches?.length > 0 && setMatchList([...matches]);
  }, []);

  return (
    <React.Fragment>
      <div className='matches-page-wrapper full-height'>
        <div className='p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between'>
          <div>Matches</div>
          {!editMode && (
            <div onClick={() => redirectTo(`/match/add`)}>
              <img src={plus} width='30px' />
            </div>
          )}
        </div>
        {matchList.map((match, matchIndex) => {
          return (
            <div
              className='border team-list-item p-2 shadow-sm mb-2'
              key={`team-${matchIndex}`}
              onClick={() => {
                redirectTo(`/match/info/${match.id}`);
              }}
            >
              <div className='d-flex align-items-center'>
                <img
                  src={'https://img2.pngio.com/clipart-cricket-batsman-logo-cricket-logo-png-900_520.jpg'}
                  className='rounded-circle teampic'
                />
                <div className='ml-2 w-100'>
                  <div>
                    <span className='font-weight-bold'>{match.team_1}</span> <span className='smaller'>Vs</span>{' '}
                    <span className='font-weight-bold'>{match.team_2}</span>
                  </div>
                  <div className='d-flex team-stats align-items-center text-secondary'>
                    <div className='mr-3'>
                      Overs: <span className='font-weight-bold'>{match.overs}</span>
                    </div>
                    <div className='mr-3'>
                      Players Per Side: <span className='font-weight-bold'>{match.players_per_team}</span>
                    </div>
                  </div>
                  <div className='text-secondary smaller'>11/09/1992</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </React.Fragment>
  );
}
