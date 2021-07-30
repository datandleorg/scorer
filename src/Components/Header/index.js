import React from 'react';
import { useHistory } from 'react-router-dom';
import ball from '../../assets/ball.svg';

export default function Header() {
  const history = useHistory();

  const redirectTo = (route) => {
    history.push(route);
  };

  return (
    <div className='header p-2'>
      <div className='title d-flex justify-content-between align-items-center' onClick={() => redirectTo('/')}>
        <img src={ball} style={{ width: '18px' }} className='mr-2' alt="" />
        <div className='text-secondary'>
          SCORE<span className='text-danger'>BOARD</span>
        </div>
      </div>
    </div>
  );
}
