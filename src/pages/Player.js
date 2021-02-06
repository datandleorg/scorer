import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import { useRouteMatch } from 'react-router-dom';
import { getPlayerById } from '../utils/storgeService';

export default function Player() {
  const match = useRouteMatch();
  const {
    params: { playerId },
  } = match;

  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    let player = getPlayerById(+playerId);
    player && setPlayerData({ ...player });
  }, []);

  return (
    <React.Fragment>
      <div className='player-page full-height'>
        <div className='d-flex team-page-header justify-content-between align-items-center mt-3 border-bottom pb-2'>
          <img src={playerData.image || "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"} className='rounded-circle playerpic mr-3' />
          <div className='h5' style={{ textAlign: 'right' }}>
            <div>{playerData.name}</div>
            <div className='smaller text-muted'>Right Hand Batsmen</div>
          </div>
        </div>
        <div className='mt-2 w-100 border rounded p-3 player-stats-card'>
          <div className='font-weight-bold mb-2'>Info</div>
          <div className='text-secondary'>
            <div className='d-flex justify-content-between small mb-1'>
              <div>Matches</div>
              <div>{playerData.matches}</div>
            </div>
          </div>
        </div>
        <div className='mt-2 w-100 border rounded p-3 player-stats-card'>
          <div className='font-weight-bold mb-2'>Batting</div>
          <div className='text-secondary'>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Runs</div>
              <div className='h3 text-info'>{playerData.runs}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Avg</div>
              <div>{playerData.avg}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>SRate</div>
              <div>{playerData.srate} %</div>
            </div>
          </div>
        </div>
        <div className='mt-2 w-100 border rounded p-3 player-stats-card'>
          <div className='font-weight-bold mb-2'>Bowling</div>
          <div className='text-secondary'>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Wkts</div>
              <div className='h3 text-warning'>{playerData.matches}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Bowl Avg</div>
              <div>{playerData.runs}</div>
            </div>
            <div className='d-flex justify-content-between  align-items-center small mb-1'>
              <div>Bowl SRate</div>
              <div>{playerData.avg}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Overs</div>
              <div>{playerData.srate} %</div>
            </div>
          </div>
        </div>
        <div className='mt-2 w-100 border rounded p-3 player-stats-card'>
          <div className='font-weight-bold mb-2'>Fielding</div>
          <div className='text-secondary'>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Catches</div>
              <div className='h3 text-danger'>{playerData.matches}</div>
            </div>
            <div className='d-flex justify-content-between align-items-center small mb-1'>
              <div>Run Outs</div>
              <div>{playerData.runs}</div>
            </div>
            <div className='d-flex justify-content-between  align-items-center small mb-1'>
              <div>Stumpings</div>
              <div>{playerData.avg}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
