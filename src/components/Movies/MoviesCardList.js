import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'
//import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const [cardsPage, setCardsPage] = React.useState(0);
  const [nextCards, setNextCards] = React.useState(0);
  const [movieShow, setMovieShow] = React.useState([]);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  function checkWindowWidth() {
    setTimeout(() => setWindowWidth(window.innerWidth), 500);
  };


React.useEffect(()=> {
  quantityMovies(0, cardsPage)
},[ cardsPage, props.movies ])

React.useEffect(()=> {

  window.addEventListener('resize', checkWindowWidth);

  if(window.innerWidth > 850) {
      setCardsPage(3);
      setNextCards(3);
    } else if(window.innerWidth > 500 && window.innerWidth <= 849) {
      setCardsPage(2);
      setNextCards(2);
    } else if(window.innerWidth < 500) {
      setCardsPage(1);
      setNextCards(1);
    }
    return () => window.removeEventListener('resize', checkWindowWidth);

}, [windowWidth])


// меняет количество добавленных карточек
function handleNextClick() {
  quantityMovies(0, movieShow.length + nextCards)
}

function quantityMovies(start, finish) {
  setMovieShow(props.movies.slice(start,finish))
}
console.log()
  return (
    <section className="cards"> 
    {props.movies.length
    ?
     <div className="cards__conteiner">
        {props.movies.length ?
        movieShow.map((movie) => (
        <MoviesCard 
        movie={movie} 
        key={movie.id}
        onMovieSave={props.onMovieSave}
        isSave={props.isSave}
        saveMovie={props.saveMovie}
        onMovieDelete={props.onMovieDelete}
        />
      ))
      : ''}
    </div>
    : <p className="cards_not-found">Ничего не найдено</p>
    }
    
    {props.movies.length >2 && movieShow.length < props.movies.length
    ? 
    <div className="cards__next">
      <button onClick={handleNextClick} className="cards__button" >Ещё</button>  
    </div>
  : ''
  }
      
    </section>
  ) 
}

export default MoviesCardList;