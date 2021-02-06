import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Footer from '../Components/Footer';
import undo from '../assets/undo.svg';
import { getMatchById } from '../utils/storgeService';

export default function Match() {
  const match = useRouteMatch();
  const {
    params: { matchId },
  } = match;
  const history = useHistory();
  const [matchData, setMatchData] = useState({});


  useEffect(() => {
    let match = getMatchById(+matchId);
    match && setMatchData({ ...match });
  }, []);

  const redirectTo = (route) => {
    history.push(route);
  };


  return (
    <React.Fragment>
      <div className='matches-page-wrapper full-height mt-2'>
        <div className='p-2 h5 text-secondary border-bottom justify-content-between d-flex align-items-center'>
          <div>
            {matchData.team_1} <span className='smaller'>Vs</span>  {matchData.team_2}
          </div>
          <div className='smaller'>
            <div>11/09/1992</div>
            <div>Overs: {matchData.overs}</div>
          </div>
        </div>
        <div className='border-bottom p-1'>
          <div className='d-flex align-items-center'>
            <div className='h1 mr-3'>24 - 3</div>
            <div className='mr-2 border-right pr-2'>(3.2 Overs)</div>
            <div className=''> Target 130</div>
          </div>
          <div className='small'>Need 3 from 42 balls with 3 wickets remaining.</div>
        </div>

        <div className='p-1 mb-1'>
          {/* <p className='font-weight-bold'>Batting</p> */}
          <div className='d-flex smaller justify-content-between border-bottom text-center pb-1'>
            <div className='flex-3 text-left'>Batsmen</div>
            <div className='flex-1'>Runs</div>
            <div className='flex-1'>Balls</div>
            <div className='flex-1'>4's</div>
            <div className='flex-1'>6's</div>
            <div className='flex-1'>S.Rate</div>
          </div>
          <div className='d-flex small justify-content-between text-center pt-1'>
            <div className='flex-3 text-left'>Kish *</div>
            <div className='flex-1'>12</div>
            <div className='flex-1'>7</div>
            <div className='flex-1'>1</div>
            <div className='flex-1'>1</div>
            <div className='flex-1'>33.6</div>
          </div>
          <div className='d-flex small justify-content-between text-center pt-1'>
            <div className='flex-3 text-left'>Dinesh </div>
            <div className='flex-1'>32</div>
            <div className='flex-1'>20</div>
            <div className='flex-1'>2</div>
            <div className='flex-1'>3</div>
            <div className='flex-1'>80.6</div>
          </div>
        </div>
        <div className='p-1'>
          {/* <p className='font-weight-bold'>Bowling</p> */}
          <div className='d-flex smaller justify-content-between border-bottom text-center pb-1'>
            <div className='flex-3 text-left'>Bowler</div>
            <div className='flex-1'>Overs</div>
            <div className='flex-1'>Runs</div>
            <div className='flex-1'>Wkts</div>
            <div className='flex-1'>Econ</div>
            <div className='flex-1'>Extras</div>
          </div>
          <div className='d-flex small justify-content-between text-center pt-1'>
            <div className='flex-3 text-left'>Bumrah *</div>
            <div className='flex-1'>12</div>
            <div className='flex-1'>7</div>
            <div className='flex-1'>1</div>
            <div className='flex-1'>1.2</div>
            <div className='flex-1'>3</div>
          </div>
          <div className='d-flex small justify-content-between text-center pt-1'>
            <div className='flex-3 text-left'>Dinesh </div>
            <div className='flex-1'>32</div>
            <div className='flex-1'>20</div>
            <div className='flex-1'>2</div>
            <div className='flex-1'>3.4</div>
            <div className='flex-1'>6</div>
          </div>
        </div>
        <div className='p-1 mt-2'>
          <div className='d-flex smaller align-items-center'>
            <div className='mr-2'>This Over: </div>
            <div className='d-flex match-over'>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value'>0</div>
                <div>WB</div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value border-danger bg-danger text-white font-weight-bol'>W</div>
                <div></div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value border-primary bg-primary text-white font-weight-bold'>4</div>
                <div></div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value border-info bg-info text-white font-weight-bold'>6</div>
                <div>NB</div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value'>0</div>
                <div></div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value'>1</div>
                <div></div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value'>3</div>
                <div></div>
              </div>
              <div className='text-center  mr-2 mb-1'>
                <div className='run-value'>0</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div className='p-1 mt-1 border-bottom mt-2'>
          <div className='d-flex align-items-center  border-bottom pb-2 justify-content-center' style={{ height: '4rem' }}>
            <button type='button' class='btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2'>
              Run
            </button>
            <button type='button' class='btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2'>
              Wide
            </button>
            <button type='button' class='btn btn-lg btn-outline-primary smaller pl-2 pr-2 mr-2'>
              No Ball
            </button>
            <button type='button' class='btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2'>
              Wicket
            </button>
            <button type='button' class='btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2'>
              Byes
            </button>
            <button type='button' class='btn btn-lg btn-outline-danger smaller pl-2 pr-2 mr-2'>
              Leg Byes
            </button>
          </div>

          <div className='d-flex align-items-center' style={{ height: '4rem' }}>
          <div className='flex-1 text-center border-right'>
              <img src={undo} width='40px' height='30px' className='mr-2' style={{transform:"scaleX(-1)"}} />
              <p className='small mb-1'>Undo</p>
            </div>
            <div className='flex-2 border-right'>
              <div className='d-flex align-items-center mt-2 pb-2 justify-content-center'>
                <button type='button' class='btn btn-outline-primary smaller pl-2 pr-2 mr-2'>
                  Swap Batsman
                </button>
                <button type='button' class='btn btn-outline-primary smaller pl-2 pr-2 mr-2'>
                  Retire
                </button>
              </div>
            </div>
            <div className='flex-1 text-center'>
              <img src={undo} width='40px' height='30px' className='mr-2' />
              <p className='small mb-1'>Redo</p>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
