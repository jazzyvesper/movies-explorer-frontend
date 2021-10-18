import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [keyword, setKeyword] = React.useState('')
  const [isShortMovie, setIsShortMovie] = React.useState(false);

  function handleChangeName(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch({
      keyword
    })
    setKeyword('');
  } 

  function handleCheckBox() {
    setIsShortMovie(!isShortMovie)
    props.onChange(!isShortMovie)
    
    console.log('click')
  }
 
  
  return (
    <section className="form__conteiner">
      <form className="search__form" onSubmit={handleSubmit} >
        <fieldset className="search__form_type_films">
          <input className="search__input" value={keyword || ''} onChange={handleChangeName} name="search" placeholder="Фильм" type="search" id="search" />
          <button className="search__button" type="submit" >Найти</button>
          {props.messageError && <span className="form_search form__item-error">{props.messageError}</span>}
          
        </fieldset>
        <fieldset className="search__form_type_range">
          <input onChange={handleCheckBox} type="range" min="0" max="1" step="1" value={isShortMovie ? 1 : 0 } className="search__content" name="search__content" id="search__content" />
          <p className="search__text">Короткометражки</p>
        </fieldset>
      </form>
    </section>
  ) 
}

export default SearchForm;