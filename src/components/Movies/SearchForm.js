import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [keyword, setKeyword] = React.useState('')
  const [rangeValue, setRangeValue] = React.useState(0);

   function handleChangeName(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch({
      keyword,
      rangeValue
    })
    setKeyword('');
  } 

  function handleCheckBox() {
    if(rangeValue===0) {
      setRangeValue(1)
    } else {
      setRangeValue(0)
    }
  }
  
  function handleClick() {
    props.onRange(rangeValue)
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
          <input onClick={handleClick} onChange={handleCheckBox} type="range" min="0" max="1" step="1" value={rangeValue} className="search__content" name="search__content" id="search__content" />
          <p className="search__text">Короткометражки</p>
        </fieldset>
      </form>
    </section>
  ) 
}

export default SearchForm;