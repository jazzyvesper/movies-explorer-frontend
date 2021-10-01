import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'
import dataCardList from '../dataCardList';

function MoviesCardList(props) {
  function handleClick() {

  }
  return (
    <section className="cards"> 
    <div className="cards__conteiner">
      {dataCardList.map((card) => (
        //key прописан временно пока не придут с сервера id
        <MoviesCard card={card} key={card.name}/>
       ))}
    </div>
      <div className="cards__next">
        <button className="cards__button" onClick={handleClick}>Ещё</button>  
      </div>
    </section>
  ) 
}

export default MoviesCardList;