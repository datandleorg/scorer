import React, { useState } from 'react';
import close from '../assets/close.png';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import plus from '../assets/plus2.svg';
import { getData, putData } from '../utils/storgeService';

const defaultStats = {
  stats: {
    matches: 0,
    runs: 0,
    innings: 0,
    HS: 0,
    avg: 0,
    st_rate: 0,
    thirties: 0,
    fifties: 0,
    fours: 0,
    sixes: 0,
    bowl_runs: 0,
    bowl_avg: 0,
    bowl_st_rate: 0,
    econ: 0,
    wkts: 0,
    BF: 0,
    overs: 0,
  },
};

export default function AddPlayer() {
  const [playerForm, setPlayerForm] = useState({
    name: '',
    batting_style: 'RHB',
    bowling_style: 'Fast Bowler',
    profile_img: '',
  });
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setPlayerForm({
      ...playerForm,
      [key]: value,
    });
  };

  const createPlayer = () => {
    let players = getData('players');
    if (!players) players = [];
    players.push({ ...playerForm, id: players.length + 1, ...defaultStats });
    putData('players', players);
    redirectTo('/players');
  };

  return (
    <React.Fragment>
      <div className='add-players-wrapper full-height'>
        <div className='p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between'>
          <div>Add Player</div>
          <div onClick={() => redirectTo(`/players`)}>
            <img src={close} width='30px' />
          </div>
        </div>

        <div className='text-secondary'>
          <div className='d-flex justify-content-center'>
            <div style={{ position: 'relative' }}>
              <img
                src={'https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png'}
                className='rounded-circle  mr-2'
                style={{ width: '80px' }}
              />
              <img
                src={plus}
                style={{
                  position: 'absolute',
                  width: '25px',
                  right: '10px',
                  background: 'white',
                  borderRadius: '50%',
                  bottom: '0',
                }}
              />
            </div>
          </div>

          <div class='form-group'>
            <label for=''>Player Name</label>
            <input
              type='text'
              class='form-control'
              name='name'
              id=''
              aria-describedby='helpId'
              placeholder='Enter player name '
              value={playerForm.name}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            />
            {/* <small id="helpId" class="form-text text-muted">Help text</small> */}
          </div>

          <div class='form-group'>
            <label for=''>Batting style</label>
            <select
              class='form-control'
              name='batting_style'
              value={playerForm.batting_style}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            >
              <option value='RHB'>RHB</option>
              <option value='LHB'>LHB</option>
            </select>
          </div>

          <div class='form-group'>
            <label for=''>Bowling style</label>
            <select
              class='form-control'
              name='bowling_style'
              value={playerForm.bowling_style}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            >
              <option value='fast'>Fast Bowler</option>
              <option value='spin'>Spin Bowler</option>
            </select>
          </div>
          <br />
          <div class='form-group'>
            <button type='submit' class='btn btn-md btn-primary w-100' onClick={() => createPlayer()}>
              Create
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
