import React from 'react';

import Form from '../Form/Form'
import './Register.css'

function Register(props) {
  return (
    <Form 
    title="Добро пожаловать!" 
    buttonName="Зарегистрироваться" 
    text="Уже зарегистрированы?"
    sign="Войти"
    rout="/signin"
    >
    <label className="input__label" htmlFor="name">Имя</label>
    <input type="text"className="form__item form__item_type_name" name="name" id="name" required minLength="2" maxLength="40" />
    <span className="name-error form__item-error"></span>
    </Form>    
  )
}
 
export default Register;