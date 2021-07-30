import React from 'react';
import Footer from '../Components/Footer';
import Login from './login';
const TeamList = React.lazy(() => import('./TeamList'));
const MatchList = React.lazy(() => import('./MatchList'));
const PlayerList = React.lazy(() => import('./PlayerList'));

export default function Home() {
  return (
    <React.Fragment>
      <div className='home-page-wrapper full-height'>
        <MatchList editMode={true} />
        <TeamList editMode={true} />
        <PlayerList editMode={true} />
        <Login/>
      </div>
      <Footer />
    </React.Fragment>
  );
}
