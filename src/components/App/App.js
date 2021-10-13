import React from 'react';
import { Route, Switch,useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import ModalInfo from '../ModalInfo/ModalInfo.js';
//import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute'
import './App.css';
import * as auth from '../../utils/Auth.js';
import api from '../../utils/MainApi';
import apiFilms from '../../utils/MoviesApi';
import FiltrMovies from '../Movies/FiltrMovies'
//import succesImgErr from '../../images/succesErr.svg';
//import succesImgOk from '../../images/succesOk.svg';


function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory(); 
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const { filtrKey, filtrRange } = FiltrMovies()
//стейт-переменная для полученных фильмов из внешнего Api и локального хранилища
  const [movies, setMovies] = React.useState([]);
//стейт-переменная для сохраненных фильмов
  const[getMovie, setGetMovie] = React.useState([]);
  const [isSacces, setIsSacces] = React.useState(false)
  const [succesOk, setSuccesOk] =React.useState(false);
  const location = useLocation();
  const savedMovies = location.pathname ==='/saved-movies';
  const moviesPage = location.pathname ==='/movies';
  const [movieArr, setMovieArr] = React.useState([]);
  const saveLocalData = JSON.parse(localStorage.getItem('newArr'))
//переменная для получения данных из локального хранилища
  const localData = JSON.parse(localStorage.getItem('newMassiv'))
  const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);

//Получение токена при какждом мониторовании
  React.useEffect(()=>{
    tokenCheck();
  }, [])

  React.useEffect(()=>{
    handleGetSaveMovies();
  }, [savedMovies, loggedIn ]);

  React.useEffect(()=>{
    setMovies(localData) 
  }, [ moviesPage,loggedIn, setMovies ])

//открытие модального окна с ошибкой
/*function handleSubmitClick(err) {
  setIsSacces(true)
  setSuccesOk(err)
}*/
//закрытия сообщения об ошибке
  function closeModalInfo() {
    setIsSacces(false) 
  }
//Регистрация пользователя
  function onRegister({name,email,password}) {
  auth.register(name, email, password)
  .then((res) => {
    if(res){
     
    //текст об успешной регистрации
      history.push('/signin') 
    }
  })
  .catch(err => {
    console.log(err)
    
  });
  }

//Вход в профиль
function onLogin({email,password}){
  auth.authorize(email, password)
  .then(() => {
      tokenCheck();
  })
  .catch(err => {
    console.log(err)
    
  });
}

//Получение данных пользователя, email
function tokenCheck() {
  auth.getContent()
  .then((res) => {
    console.log('я и тут')
    if(res){
    setCurrentUser(res)
      setName(res.name)
      setEmail(res.email)
      setLoggedIn(true)
      history.push('/movies')
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

//фильтр по чексбоксу в сохраненных фильмач
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
    console.log('click0')
     setMovies(localData);
  } else {
    console.log('click')
  handleClickRange(movies, rangeValue, setMovies)
  }
}

function handleClickRange(arr, rangeValue, setconst) {
  const newMassiv = filtrRange(arr, rangeValue)
  setconst(newMassiv)
}

//временная реализации вывода ошибок
const message = 'Вы ввели неправильный логин или пароль';

//Запрос всех фильмов со стороннего Api
function habdlerSearchMoviesServer(data) {
  setIsOpenPreloader(true)
  apiFilms.getMovies()
  .then((MoviesCardlist) => {
    const newMassiv = filtrKey(MoviesCardlist, data)
    setMovies(newMassiv)
    setIsOpenPreloader(false)
    localStorage.setItem("newMassiv", JSON.stringify(newMassiv));
   })
   .catch(err => console.log(`Ошибка при поиске карточки: ${err}`))
}

/*function handleError(message) {
  setInfoError(message);
}*/

//Сохранение фильмов на нашем сервере
function handleMovieSave(movie) {
  api.savedMovies(movie)
  .then((newMovie) => {
    console.log(`Фильм успешно сохранен`)
    /*setGetMovie((getMovie) => {
      console.log(getMovie)
     const userdata = getMovie.some((c) => c.movieId === movie.movieId)
     console.log(userdata)
     console.log(getMovie)
     const newarr = getMovie.push(newMovie)
     console.log(newarr)
     return getMovie
    })
    console.log(setGetMovie)
   */
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

//фильтрация по сабмтиту
function handleClickFiltrSaveMovie(data) {
  api.getMovies()
  .then((SavedCardlist) => {
    if(data.keyword) {
      const filterMovie = filtrKey(SavedCardlist,data)
      setGetMovie(filterMovie)
    } else {
      console.log("Поск не может быть пустым")
    } 
  })
  .catch(err => console.log(`Ошибка при получении фильмов: ${err}`))
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
          errorText={message} />
        </Route>
        <Route path="/signin"> 
          <Login 
           onLogin={onLogin}
          loggedIn={loggedIn}
          errorText={message}
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
        />

        <ProtectedRoute
          path="/profile"
          component={Profile} 
          title="Привет, Виталий!"
          logOut={onSignOut}
          errorText={message} 
          loggedIn={loggedIn}
          email={email}
          name={name}
        />
        
      </Switch>
      <Footer loggedIn={loggedIn}/>
      <ModalInfo 
        isOpen={isSacces}
        onClose={closeModalInfo}
        textError={succesOk}
      />
    </div>

   </CurrentUserContext.Provider>
  );
}

export default App;
