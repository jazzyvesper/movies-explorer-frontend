import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();
  const [isSave, setIsSave] = React.useState(false);

  function handleSaveClick() {
    setIsSave(true);
  }



  return (
    <article className="card">
      <img className="card__image" src={props.card.img} alt={props.card.name} />
      {location.pathname ==='/saved-movies' ?
      <button type="button" className="card__button_type_close section__link" aria-label="Закрыть"></button>
      :
      <>
      <button type="button" className={`card__button_type_save section__link ${isSave ? ('card__button_none') : ''}`} aria-label="Сохранить" onClick={handleSaveClick}>Сохранить</button>
      <button type="button" className={`card__button section__link ${isSave ? ('card__button_type_ok') : ''}`} aria-label="Галочка"></button>
      </>
      }
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <p className="card__time">{props.card.time}</p>
      </div>
    </article>
  ) 
}

export default MoviesCard;