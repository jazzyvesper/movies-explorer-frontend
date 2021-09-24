import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Preloader from './Preloader';

function Movies(props) {
  return (
    <section>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
    </section>
  ) 
}

export default Movies;