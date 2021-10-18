import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm';
import MoviesCardList from './MoviesCardList';
import Preloader from './Preloader';
import { filtrRange } from '../Movies/FiltrMovies'

function Movies(props) {
 const [shortMovie, setShortMovie] = React.useState([])
 const [range, setRange] = React.useState(0);
 const newMovie = range ? shortMovie : props.movies

React.useEffect(()=> {
if(range) {
  setShortMovie(filtrRange(props.movies))
}
}, [range, props])

  return (
    <main className="content">
      <SearchForm 
      onSearch={props.onSearch}
      onRange={props.onRange}
      errorSearch={props.errorSearch}
      messageError={props.messageError}
      onChange={setRange}
       />
      <Preloader 
      isOpen={props.isOpen}/>
      <MoviesCardList
       movies={newMovie}
       onMovieSave={props.onMovieSave}
       isSave={props.isSave}
       saveMovie={props.saveMovie}
       onMovieDelete={props.onMovieDelete}
        />
    </main>
  ) 
}

export default Movies;