import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';

import './App.css';

function App() {
  return (
    <div className="page">
      <Header loggedIn={false} />
      <Switch>
        <Route exact path="/"> 
          <Main />
        </Route>
        <Route path="/movies"> 
          <Movies />
        </Route>
        <Route path="/saved-movies"> 
          <Movies />
        </Route>
        <Route path="/profile"> 
          <Profile
          title="Привет, Виталий!"
          />
        </Route>
        <Route path="/signup"> 
          <Register />
        </Route>
        <Route path="/signin"> 
          <Login />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
