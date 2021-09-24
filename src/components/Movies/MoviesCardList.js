import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'
import dataCardList from '../dataCardList';

function MoviesCardList(props) {
  function handleClick() {

  }
  return (
    <section className="cards__conteiner"> 
      {dataCardList.map((card) => (
        <MoviesCard card={card} />
       ))}
      <div className="cards__next">
        <button className="cards__button" onClick={handleClick}>Ещё</button>  
      </div>
    </section>
  ) 
}

export default MoviesCardList;