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
import apiFilms from '../../utils/MoviesApi'
import succesImgErr from '../../images/succesErr.svg';
import succesImgOk from '../../images/succesOk.svg';


function App() {
const [loggedIn, setLoggedIn] = React.useState(false);
const history = useHistory(); 
const [currentUser, setCurrentUser] = React.useState({});
const [email, setEmail] = React.useState('');
const [name, setName] = React.useState('');

//переменная для хранения кликов по кнопке сохранения
const [isSave, setIsSave] = React.useState(false);

//стейт-переменная для полученных фильмов из внешнего Api и локального хранилища
const [movies, setMovies] = React.useState([]);

//стейт-переменная для сохраненных фильмов
const[getMovie, setGetMovie] = React.useState([]);

const [isSacces, setIsSacces] = React.useState(false)
  const [succesOk, setSuccesOk] =React.useState(false);
  const location = useLocation();
const savedMovies = location.pathname ==='/saved-movies';
const moviesPage = location.pathname ==='/movies';

//переменная для получения данных из локального хранилища
const localData = JSON.parse(localStorage.getItem('newMassiv'))

const [isOpenPreloader, setIsOpenPreloader] = React.useState(false);
//const [infoError, setInfoError] = React.useState('');

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

//Фильтр для Массиваполученных данных
function newData (arr, keyword) {
  console.log(keyword)
  const NewArray = arr.filter((item) => {
   return item.nameRU.includes(keyword)
  })
return NewArray
}

//временная реализации вывода ошибок
const message = 'Вы ввели неправильный логин или пароль';

//Запрос всех фильмов со стороннего Api
function habdlerSearchMoviesServer(keywords) {
  setIsOpenPreloader(true)
  apiFilms.getMovies()
  .then((MoviesCardlist) => {
    const newMassiv = newData(MoviesCardlist,keywords)
    setMovies(newMassiv)
    setIsOpenPreloader(false)
    console.log(movies)
    localStorage.setItem("newMassiv", JSON.stringify(newMassiv));
    
   })
   .catch(err => console.log(`Ошибка при поиске карточки: ${err}`))
}

console.log(movies)

/*function handleError(message) {
  setInfoError(message);
}*/
//Сохранение фильмов на нашем сервере
function handleMovieSave(movie) {
api.savedMovies(movie)
.then((NewMovie) => {
 
  console.log(`Фильм успешно сохранен`)
 })
 .catch(err => console.log(`Ошибка при сохранении карточки: ${err}`))
}

//Получение сохраненых фильмов с нашего сервера
function handleGetSaveMovies(keyword) {
  api.getMovies()
  .then((SavedCardlist) => {
    if(keyword) {
      const filterMovie = newData(SavedCardlist,keyword)
      setGetMovie(filterMovie)
    }else {
      setGetMovie(SavedCardlist)
    }
  })
  .catch(err => console.log(`Ошибка при получении фильмов: ${err}`))
}

//Удаление карточек из сохраненныx
function handleDeleteMovie (movie) {
  api.deleteMovie(movie._id)
  .then((movie) => {
    console.log(`Фильм успешно удален`)
    setGetMovie((movies)=> movies.filter((c) => c._id !== movie._id))
     
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
          onMovieSave={handleMovieSave}
          isOpen={isOpenPreloader}
          isSave={isSave}
          onSearch={habdlerSearchMoviesServer}
        />

        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies} 
          loggedIn={loggedIn}
          movies={getMovie}
          onMovieDelete={handleDeleteMovie}
          isOpen={isOpenPreloader}
          onSearch={handleGetSaveMovies}
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
