import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'

function MoviesCardList(props) {
  const [cardsPage, setCardsPage] = React.useState(0);
const [nextCards, setNextCards] = React.useState(0);
  function changeCardList() {
    if(window.innerWidth > 768) {
      setCardsPage(3);
      setNextCards(3);
    } else if(window.innerWidth > 520 && window.innerWidth <= 768) {
      setCardsPage(2);
      setNextCards(2);
    } else if(window.innerWidth < 520) {
      setCardsPage(1);
      setNextCards(1);
    }
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