import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard'
//import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const [cardsPage, setCardsPage] = React.useState(0);
  const [nextCards, setNextCards] = React.useState(0);
  const [movieShow, setMovieShow] = React.useState([]);

React.useEffect(()=> {
  quantityMovies(0, cardsPage)
},[cardsPage, props.movies])

React.useEffect(()=> {
  changeCardList()
})


// меняет количество добавленных карточек
function handleNextClick() {
  quantityMovies(0, movieShow.length + nextCards)
}


function quantityMovies(start, finish) {
  setMovieShow(props.movies.slice(start,finish))
}

//Изменение количества карточек в зависимости от ширины экрана
  function changeCardList() {
    if(window.innerWidth > 850) {
      setCardsPage(3);
      setNextCards(3);
    } else if(window.innerWidth > 520 && window.innerWidth <= 849) {
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
      movieShow.map((movie, i) => (
        <MoviesCard 
        movie={movie} 
        key={movie.id}
        onMovieSave={props.onMovieSave}
        isSave={props.isSave}
        saveMovie={props.saveMovie}
        />
      ))
      : <p>Ничего нет </p>
      }
    </div>
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