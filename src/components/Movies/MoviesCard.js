import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();
  const [save, setSave] = React.useState(false);
  function handleSaveClick() {
    setSave(true);
  console.log(save)
  }

  return (
    <article className="card">
      <img className="card__image" src={props.card.img} alt={props.card.name} />
      {location.pathname ==='/saved-movies' ?
      <button type="button" className="card__button_type_close" aria-label="Галочка"></button>
      :
      <>
      <button type="button" className="card__button_type_save" aria-label="Сохранить" onClick={handleSaveClick}>Сохранить</button>
      <button type="button" className={`card__button ${save ? ('card__button_type_ok') : ''}`} aria-label="Галочка"></button>
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