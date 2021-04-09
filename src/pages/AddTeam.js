import React, { useState } from 'react';
import close from '../assets/close.png';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import plus from '../assets/plus2.svg';
import { getData, putData } from '../utils/storgeService';

export default function AddTeam() {
  const [teamForm, setTeamForm] = useState({
    name: '',
    image: '',
  });
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  const handleForm = (value, key) => {
    setTeamForm({
      ...teamForm,
      [key]: value,
    });
  };

  const createTeam = () => {
    let teams = getData('teams');
    if (!teams) teams = [];
    teams.push({ ...teamForm, id: teams.length + 1, players:[] });
    putData('teams', teams);
    redirectTo('/teams');
  };

  return (
    <React.Fragment>
      <div className='add-players-wrapper full-height'>
        <div className='p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between'>
          <div>Add Team</div>
          <div onClick={() => redirectTo(`/teams`)}>
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
            <label for=''>Team Name</label>
            <input
              type='text'
              class='form-control'
              name='name'
              id=''
              aria-describedby='helpId'
              placeholder='Enter team name '
              value={teamForm.name}
              onChange={(e) => handleForm(e.target.value, e.target.name)}
            />
            {/* <small id="helpId" class="form-text text-muted">Help text</small> */}
          </div>

          <br />
          <div class='form-group'>
            <button type='submit' class='btn btn-md btn-primary w-100' onClick={() => createTeam()}>
              Create Team
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
