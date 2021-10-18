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
import {filtrKey} from '../Movies/FiltrMovies'
import {infoMessage, errorMessage, authErrors, succesOk} from '../../utils/constants';
import ModalInfo from '../ModalInfo/ModalInfo';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory(); 
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]); //масси впосле филтрации
  const [getMovie, setGetMovie] = React.useState([]);//массив сохраненных фильмов
  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [serverError, setServerError] = React.useState('');
  const [moviesData, setMoviesData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [textsucces, setTextsucces] = React.useState('');
  const [iconVisual,setIconVisual] = React.useState(false);
  let getLocaldata = JSON.parse(localStorage.getItem('newMassiv'));
  
  
  console.log('getLocaldata')
  console.log(getLocaldata)
  console.log('movies')
  console.log(movies)

  //Получение данных с сервера
  React.useEffect(() => {
    if(loggedIn) {
    Promise.all([apiFilms.getMovies(), api.getMovies()])
    .then(([ moviesData, SavedCardlist]) => {
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
    if(getLocaldata) {
      setMovies(getLocaldata)
    }
    
  }, [])

  React.useEffect(()=> {
    setMessageError('')
  },[location.pathname, setMessageError])

 

//Регистрация пользователя
  function onRegister( email,password, name ) {
    auth.register(name, email, password)
    .then((res) => {
      if(res){
        setShowModal(true);
        onLogin(email,password);
        history.push('/');
      }
      setShowModal(true)
      setIconVisual(true)
      setTextsucces(succesOk.signinOk)
    })
    .catch(err => {
      if(err === authErrors.conflictErr) { 
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
    if(err === authErrors.unauthorizedErr) { 
      setIconVisual(false)
      setShowModal(true)
      setTextsucces(errorMessage.emailandPasswordError)
      
    } else {
      setIconVisual(false)
      setShowModal(true)
      setTextsucces(errorMessage.tokenError) 
    } 
  });
}

//Изменение данных пользователя
function handleEditProfile(email, name) {
  setIsOpenPreloader(true)
  auth.editContent(email, name)
  .then((res) => {
    setCurrentUser({
      name: res.name,
      email: res.email
    })
    setIsOpenPreloader(false)
    setIconVisual(true)
    setShowModal(true)
    setTextsucces(succesOk.changeInfoUser)
  })
  .catch(err => {
    setIsOpenPreloader(false)
    if(err === 402) { 
      setIconVisual(false)
      setShowModal(true)
      setTextsucces(errorMessage.badRequestErr)
      
    } else {
      setIconVisual(false)
      setShowModal(true)
      setTextsucces(errorMessage.internalServerErr)
      console.log(`При обновлении профиля произошла ошибка: ${err}`)
    } 
  });
}

//Получение данных пользователя, email
function tokenCheck() {
  auth.getContent()
  .then((res) => {
    if(res){
      setCurrentUser({
        name: res.name,
        email: res.email,
        _id: res._id
      });
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
    localStorage.clear();
    setMoviesData([])
    setGetMovie([])
    setMovies([])
    history.push('/');
    setLoggedIn(false)
  })
  .catch(err => console.log(`Не удалось выйти из системы: ${err}`)) 
}

//закрытие модального окна
function handlerClose() {
  setShowModal(false)
}

//фильтрация по сабмтиту сохраненных фильмов
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

//фильтрация всех фильмов со стороннего Api
function habdlerSearchMoviesServer(data) {
  if (data.keyword) {
    console.log('тут')
    setMessageError('')
    setIsOpenPreloader(true)
    const newMassiv = filtrKey(moviesData, data)
    if(newMassiv.length !== 0) {
      setIsOpenPreloader(false)
      localStorage.setItem("newMassiv", JSON.stringify(newMassiv));
      setMovies(newMassiv)
    } else {
      console.log('z pltcm')
      setMovies([])
      setIsOpenPreloader(false)
      setMessageError(infoMessage.dontFindMovie)
      //удалить массив из локалки
      
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

//Удаление карточек из сохраненныx
function handleDeleteMovie (movie) {
  const usersaved = getMovie.find(i => i.movieId === movie.id);
  const mov = usersaved ? usersaved : movie
  api.deleteMovie(mov._id)
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
          messageError={messageError}
          onMovieDelete={handleDeleteMovie}

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
          messageError={messageError}
        />

        <ProtectedRoute
          path="/profile"
          component={Profile} 
          title="Привет, Виталий!"
          logOut={onSignOut}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfile}
        />
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <Footer loggedIn={loggedIn}/>
    </div>
    <ModalInfo
    isOpen={showModal}
    textError={textsucces}
    onClose={handlerClose}
    icon={iconVisual}
     />
    
  </CurrentUserContext.Provider>
  );
}

export default App;
