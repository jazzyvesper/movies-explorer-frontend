import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  function convertTime(num) {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }
const location = useLocation();
const usersaved = props.saveMovie.some(i => i.movieId === props.movie.id);
const [isDisabled, setIsDisabled] = React.useState(false);
const timeformat = convertTime(props.movie.duration);
  const urlImage = location.pathname ==='/saved-movies' 
  ? props.movie.image
  : `https://api.nomoreparties.co${props.movie.image.url}`

  
  function handleSaveClick() {
    props.onMovieSave(props.movie);
    setIsDisabled(true)
  }
  
  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }
 
  return (
    <article className="card">
      <a className="card__image__trailer-link" href={props.movie.trailerLink} target="_blank" rel="noreferrer">
      <img className="card__image" src={urlImage} alt={props.movie.director} />
      </a>
      {location.pathname ==='/saved-movies' ?
      <button type="button" onClick={handleDeleteClick} className="card__button_type_close section__link" aria-label="Удалить"></button>
      :
      <>
      <button onClick={handleSaveClick} disabled={isDisabled ? true : '' } type="button" className={`card__button_type_save section__link ${usersaved  ? ('card__button_none') : ''}`} aria-label="Сохранить" >Сохранить</button>
      <button type="button" onClick={handleDeleteClick} className={`card__button section__link ${usersaved ? ('card__button_type_ok') : ''}`} aria-label="Галочка"></button>
      </>
      }
      <div className="card__info">
        <h2 className="card__title">{props.movie.nameRU}</h2>
        <p className="card__time">{timeformat}</p>
      </div>
    </article>
  ) 
}

export default MoviesCard;