import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header'
import Main from '../Main/Main'
import './App.css';

function App() {
  return (
    <div className="page">
      <Header loggedIn={false} />
      <Switch>
        <Route exact path="/"> 
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
