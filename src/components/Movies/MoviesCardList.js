import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'

function MoviesCardList(props) {
  function handleClick() {

  }
  return (
    <section className="cards"> 
    <div className="cards__conteiner">
      {props.movies ?
      props.movies.map((movie) => (
        //key прописан временно пока не придут с сервера id
        <MoviesCard 
        movie={movie} 
        key={movie.id}
        onMovieSave={props.onMovieSave}
        isSave={props.isSave}
        />
      ))
      : <p>Ничего нет </p>
      }
    </div>
      <div className="cards__next">
        <button className="cards__button" onClick={handleClick}>Ещё</button>  
      </div>
    </section>
  ) 
}

export default MoviesCardList;