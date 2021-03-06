import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AudioGame from './pages/AudioGame';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import Menu from './components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StartGallowsGame from './pages/GallowsGame';
import GameSavanna from './pages/GameSavanna';
import StartSprintGame from './pages/Sprint';

const App = () => (
  <BrowserRouter>
    <div>
      <Menu />
      <Switch>
        <Route path="/audio-game">
          <AudioGame />
        </Route>
        <Route path="/sprint">
          <StartSprintGame />
        </Route>
        <Route path="/gallows-game">
          <StartGallowsGame />
        </Route>
        <Route path="/savanna-game">
          <GameSavanna />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
