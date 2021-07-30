import React, { Suspense } from 'react';
import './App.scss';
import Header from './Components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './utils/ErrorBoundary';
import Loader from './Components/Common/Loader';
import Auth from './context/auth-context';

const Home = React.lazy(() => import('./pages/Home'));
const TeamList = React.lazy(() => import('./pages/TeamList'));
const Team = React.lazy(() => import('./pages/Team'));
const MatchList = React.lazy(() => import('./pages/MatchList'));
const Match = React.lazy(() => import('./pages/Match'));
const PlayerList = React.lazy(() => import('./pages/PlayerList'));
const Player = React.lazy(() => import('./pages/Player'));
const AddPlayer = React.lazy(() => import('./pages/AddPlayer'));
const AddTeam = React.lazy(() => import('./pages/AddTeam'));
const AddMatch = React.lazy(() => import('./pages/AddMatch'));

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <Suspense fallback={<Loader status={true} />}>
          <Auth.Provider>
          <Router>
            <Header />
            <Route exact path='/' component={Home} />
            <Route exact path='/teams' component={TeamList} />
            <Route exact path='/team/info/:teamId' component={Team} />
            <Route exact path='/team/add' component={AddTeam} />
            <Route exact path='/matches/' component={MatchList} />
            <Route exact path='/match/info/:matchId' component={Match} />
            <Route exact path='/match/add' component={AddMatch} />
            <Route exact path='/players/' component={PlayerList} />
            <Route exact path='/player/info/:playerId' component={Player} />
            <Route exact path='/player/add' component={AddPlayer} />
          </Router>
          </Auth.Provider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
