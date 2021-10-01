import React from 'react';
import './Form.css'
import { Link } from 'react-router-dom';

function Form(props) {
  return (
    <div className="form__container">
      <h2 className="form__title">{props.title}</h2>
      <form className="form__info" onSubmit={props.loggedIn} >
        <fieldset className="form__data">
        {props.children}
          <label className="input__label" htmlFor="email">E-mail</label>
          <input type="email" onChange={props.onChangeEmail} placeholder="" className="form__item form__item_type_email" name="email" id="email" required/>
          <span className="email-error form__item-error"></span>
          <label className="input__label" htmlFor="password">Пароль</label>
          <input type="text" placeholder="" className="form__item form__item_type_password" name="password" id="password" required minLength="8" maxLength="40"/>
          <span className="password-error form__item-error"></span>
        </fieldset>
        <button className="form__button section__link" type="submit" aria-label={props.buttonName}>{props.buttonName}</button> 
      </form>
      <div className="form__signup">
        <p className="form__text">{props.text}</p>
        <Link to={props.rout} className="form__link section__link">{props.sign}</Link>
      </div>
    </div> 
  )
}
  
  export default Form;