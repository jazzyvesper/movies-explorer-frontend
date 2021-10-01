import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Preloader from './Preloader';

function Movies(props) {
  const [search, setSearch] = React.useState(false)

  //Открытие прелоадера при нажатии найти фильмы
  function handlerOpen() {
    setSearch(true)
  }
  
  //закрытие прелоадера после получения данных с фильмам.
  //!Сейчас исчезает при перезагрузки страницы!
  function handleClose() {
    setSearch(false)
  }
 
  return (
    <main className="content">
      <SearchForm search={handlerOpen} />
      <Preloader isOpen={search} onClose={handleClose}/>
      <MoviesCardList />
    </main>
  ) 
}

export default Movies;