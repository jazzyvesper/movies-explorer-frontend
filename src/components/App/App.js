import React from 'react';
import { Route, Switch,useHistory,useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute'
import './App.css';
import * as auth from '../../utils/Auth.js';
import api from '../../utils/MainApi';
import apiFilms from '../../utils/MoviesApi';
import {filtrKey, filtrRange} from '../Movies/FiltrMovies'
import {infoMessage, errorMessage, authErrors} from '../../utils/constants'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory(); 
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [getMovie, setGetMovie] = React.useState([]);
  const localData = JSON.parse(localStorage.getItem('newMassiv'))
  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [moviesData, setMoviesData] = React.useState([]);

  //Получение данных с сервера
  React.useEffect(() => {
    if(loggedIn) {
    Promise.all([auth.getContent(), apiFilms.getMovies(), api.getMovies()])
    .then(([userData, moviesData, SavedCardlist]) => {
      setCurrentUser(userData);
      setMoviesData(moviesData)
      setGetMovie(SavedCardlist)
    })
    .catch(err => console.log(`Ошибка при загрузке профиля: ${err}`))
    }else {
    }
  }, [loggedIn])

//Получение токена при какждом мониторовании
  React.useEffect(()=>{
    tokenCheck();
  }, [])

  React.useEffect(()=>{
    if(localData) {
      setMovies(localData) 
    } else {
      setMovies(moviesData)
    }
  }, [ loggedIn, setMovies, moviesData ])

//Регистрация пользователя
  function onRegister( email,password, name ) {
    auth.register(name, email, password)
    .then((res) => {
      if(res){
        onLogin(email,password)
        history.push('/') 
      }
    })
    .catch(err => {
      if(err = authErrors.conflictErr) { 
        setServerError('Пользователь с таким email уже существует')
      } else {
        setServerError('При регистрации пользователя произошла ошибка.')
      }
    });
  }

//Вход в профиль
function onLogin(email,password){
  auth.authorize(email, password)
  .then(() => {
    tokenCheck();
  })
  .catch(err => { 
    if(err = authErrors.unauthorizedErr) { 
      setServerError('Ошибка авторизации. Неверный email или пароль')
    } else {
      setServerError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.')
    } 
  });
}

//Изменение данных пользователя
function handleEditProfile(email, name) {
  setIsOpenPreloader(true)
  auth.editContent(email, name)
  .then((res) => {
    setName(res.name)
    setEmail(res.email)
    setIsOpenPreloader(false)
  })
  .catch(err => {
    setIsOpenPreloader(false)
    if(err = authErrors.badRequestErr) { 
      setServerError('При обновлении профиля произошла ошибка.')
    } else {
      setServerError('На сервере произошла ошибка.')
      console.log(`При обновлении профиля произошла ошибка: ${err}`)
    } 
  });
}

//Получение данных пользователя, email
function tokenCheck() {
  auth.getContent()
  .then((res) => {
    if(res){
      setName(res.name)
      setEmail(res.email)
      setLoggedIn(true)
      if (location.pathname === '/signin' || location.pathname === '/signup') {
        history.push('/movies');
      } else {
        history.push(location.pathname);
      }
    }
  })
  .catch(err => console.log(`Зарегистрируйтесь или войдите в систему: ${err}`))  
}

//Выход из системы
function onSignOut(){
  auth.signOut()
  .then(()=> {
    history.push('/');
    setLoggedIn(false)
  })
  .catch(err => console.log(`Не удалось выйти из системы: ${err}`)) 
}

//фильтр по чексбоксу в сохраненных фильмаx
function handleChangeRangeMovie(rangeValue) {
  if (rangeValue===0) {
    handleGetSaveMovies();
  } else {
  handleClickRange(getMovie, rangeValue, setGetMovie)
  }
}

//фильтр по чекбоксу по фильмам
function handleChangeRange(rangeValue) {
  if (rangeValue===0) {
     setMovies(localData);
  } else {
  handleClickRange(localData, rangeValue, setMovies)
  }
}

//фильтрация по сабмтиту
function handleClickFiltrSaveMovie(data) {
  if(data.keyword) {
    setMessageError('')
    setIsOpenPreloader(true)
  api.getMovies()
  .then((SavedCardlist) => {
      const filterMovie = filtrKey(SavedCardlist,data)
      if(filterMovie.length !== 0) {
        setGetMovie(filterMovie)
        setIsOpenPreloader(false)
      } else {
        setIsOpenPreloader(false)
        setMessageError(infoMessage.dontFindMovie)
      }
  })
  .catch(err => { 
    setIsOpenPreloader(false)
    setMessageError(errorMessage.searchError)
    console.log(`Ошибка при поиске карточки: ${err}`)
  })
} else {
  setMessageError(errorMessage.keywordNull)
  }
}

//фильтрация по клику на ползунок
function handleClickRange(arr, rangeValue, setconst) {
  const newMassiv = filtrRange(arr, rangeValue)
  setconst(newMassiv)
}

//Запрос всех фильмов со стороннего Api
function habdlerSearchMoviesServer(data) {
  if (data.keyword) {
    setMessageError('')
    setIsOpenPreloader(true)
    const newMassiv = filtrKey(moviesData, data)
    if(newMassiv.length !== 0) {
      setMovies(newMassiv)
      setIsOpenPreloader(false)
      localStorage.setItem("newMassiv", JSON.stringify(newMassiv));
    } else {
      setIsOpenPreloader(false)
      setMessageError(infoMessage.dontFindMovie)
    }
  } else {
    setMessageError(errorMessage.keywordNull)
  }
}

//Сохранение фильмов на нашем сервере
function handleMovieSave(movie) {
  api.savedMovies(movie)
  .then((newMovie) => {
    console.log(`Фильм успешно сохранен`)
    api.getMovies()
    .then(savedMovies => setGetMovie(savedMovies))
  })
  .catch(err => console.log(`Ошибка при сохранении карточки: ${err}`))
  
}

//Получение сохраненых фильмов с нашего сервера
function handleGetSaveMovies() {
  api.getMovies()
  .then((SavedCardlist) => {
    setGetMovie(SavedCardlist)
  })
  .catch(err => console.log(`Ошибка при получении фильмов: ${err}`))
}

//Удаление карточек из сохраненныx
function handleDeleteMovie (movie) {
  api.deleteMovie(movie._id)
  .then((movie) => {
    console.log(`Фильм успешно удален`)
    setGetMovie((getMovie)=> getMovie.filter((c) => c.movieId !== movie.movieId
     ))
  })
   
  .catch(err => console.log(`Ошибка при удалении карточки: ${err}`))
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/"> 
          <Main />
          <Footer loggedIn={loggedIn}/>
        </Route>
        <Route path="/signup"> 
          <Register
          onRegister={onRegister}
          serverError={serverError}
        />
        </Route>
        <Route path="/signin"> 
          <Login 
          onLogin={onLogin}
          loggedIn={loggedIn}
          serverError={serverError}
          />
        </Route>
        <ProtectedRoute
          path="/movies"
          component={Movies} 
          loggedIn={loggedIn}
          movies={movies}
          saveMovie={getMovie}
          onMovieSave={handleMovieSave}
          isOpen={isOpenPreloader}
          onSearch={habdlerSearchMoviesServer}
          onRange={handleChangeRange}
          messageError={messageError}
        />

        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies} 
          loggedIn={loggedIn}
          movies={getMovie}
          saveMovie={getMovie}
          onMovieDelete={handleDeleteMovie}
          isOpen={isOpenPreloader}
          onSearch={handleClickFiltrSaveMovie}
          onRange={handleChangeRangeMovie}
          messageError={messageError}
        />

        <ProtectedRoute
          path="/profile"
          component={Profile} 
          title="Привет, Виталий!"
          logOut={onSignOut}
          loggedIn={loggedIn}
          email={email}
          name={name}
          onEditProfile={handleEditProfile}
        />
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Footer loggedIn={loggedIn}/>
    </div>
    
  </CurrentUserContext.Provider>
  );
}

export default App;
