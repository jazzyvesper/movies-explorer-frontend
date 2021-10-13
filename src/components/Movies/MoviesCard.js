import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
const location = useLocation();
const usersaved = props.saveMovie.some(i => i.movieId === props.movie.id);
  const urlImage = location.pathname ==='/saved-movies' 
  ? props.movie.image
  : `https://api.nomoreparties.co${props.movie.image.url}`

  
  function handleSaveClick() {
    props.onMovieSave(props.movie);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie);
  }

  return (
    <article className="card">
      <img className="card__image" src={urlImage} alt={props.movie.director} />
      {location.pathname ==='/saved-movies' ?
      <button type="button" onClick={handleDeleteClick} className="card__button_type_close section__link" aria-label="Удалить"></button>
      :
      <>
      <button onClick={handleSaveClick} type="button" className={`card__button_type_save section__link ${usersaved  ? ('card__button_none') : ''}`} aria-label="Сохранить" >Сохранить</button>
      <button type="button" className={`card__button section__link ${usersaved ? ('card__button_type_ok') : ''}`} aria-label="Галочка"></button>
      </>
      }
      <div className="card__info">
        <h2 className="card__title">{props.movie.nameRU}</h2>
        <p className="card__time">{props.movie.duration}</p>
      </div>
    </article>
  ) 
}

export default MoviesCard;