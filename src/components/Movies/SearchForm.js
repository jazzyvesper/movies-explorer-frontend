import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

   function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="form__conteiner">
      <form className="search__form" onSubmit={handleSubmit} >
        <fieldset className="search__form_type_films">
          <input className="search__input"  name="search" placeholder="Фильм" type="search" id="search" />
          <span className="search-error entrance__item-error"></span>
          <button className="search__button" type="submit" onClick={props.search}>Найти</button>
        </fieldset>
        <fieldset className="search__form_type_range">
          <input type="range" className="search__content" name="search__content" id="search__content" />
          <p className="search__text">Короткометражки</p>
        </fieldset>
      </form>
    </section>
  ) 
}

export default SearchForm;