import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';

import './App.css';

function App() {
  return (
    <div className="page">
      <Header loggedIn={true} />
      <Switch>
        <Route exact path="/"> 
          <Main />
        </Route>
        <Route path="/movies"> 
          <Movies />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
