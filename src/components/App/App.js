import React from 'react';
import { Route, Switch,useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {
const [loggedIn, setLoggedIn] = React.useState(false);
const history = useHistory(); 
//const [infoError, setInfoError] = React.useState('');

function handleLogout() {
  setLoggedIn(false)
  history.push('/signin')
}

function handleLoggedIn() {
  setLoggedIn(true);
  history.push('/')
}

//временная реализации вывода ошибок
const message = 'Вы ввели неправильный логин или пароль';

/*function handleError(message) {
  setInfoError(message);
}*/

  return (
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/"> 
          <Main />
          <Footer loggedIn={loggedIn}/>
        </Route>
        <Route path="/movies"> 
          <Movies />
          <Footer loggedIn={loggedIn}/>
        </Route>
        <Route path="/saved-movies"> 
          <Movies />
          <Footer loggedIn={loggedIn}/>
        </Route>
        <Route path="/profile"> 
          <Profile
          title="Привет, Виталий!"
          logOut={handleLogout}
          errorText={message}
          />
        </Route>
        <Route path="/signup"> 
          <Register
          errorText={message} />
        </Route>
        <Route path="/signin"> 
          <Login 
          loggedIn={handleLoggedIn}
          errorText={message}
          />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    
    </div>
  );
}

export default App;
