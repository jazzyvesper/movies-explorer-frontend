import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Preloader from './Preloader';

function Movies(props) {
 
  return (
    <main className="content">
      <SearchForm 
      onSearch={props.onSearch}
      onRange={props.onRange}
      errorSearch={props.errorSearch}
      messageError={props.messageError}
       />
      <Preloader 
      isOpen={props.isOpen}/>
      <MoviesCardList
       movies={props.movies}
       onMovieSave={props.onMovieSave}
       isSave={props.isSave}
       saveMovie={props.saveMovie}
       onMovieDelete={props.onMovieDelete}
        />
    </main>
  ) 
}

export default Movies;