import React from 'react';
import './SavedMovies.css';
import MoviesCard from '../Movies/MoviesCard'
import Preloader from '../Movies/Preloader';
import SearchForm from '../Movies/SearchForm';

function SavedMovies(props) {


  return (
    <main className="content">
     <SearchForm 
      onSearch={props.onSearch}
      onRange={props.onRange}
      errorSearch={props.errorSearch}
      messageError={props.messageError}
      onChange={props.onChange}
       />
      <Preloader 
      isOpen={props.isOpen} />
      <section className="cards"> 
        <div className="cards__conteiner">
          {props.movies.map((movie) => (
        //key прописан временно пока не придут с сервера id
        <MoviesCard 
        movie={movie} 
        saveMovie={props.saveMovie}
        key={movie._id}
        onMovieDelete={props.onMovieDelete}
        />
       ))}
    </div>
    </section>
    </main>
  ) 
}

export default SavedMovies;