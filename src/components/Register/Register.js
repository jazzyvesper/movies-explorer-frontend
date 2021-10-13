import React from 'react';

import Form from '../Form/Form'
import './Register.css'

function Register(props) {
  const [name, setName] = React.useState(' ');
  const [email, setEmail] = React.useState(' ');
  const [password, setPassword] = React.useState('');

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword (e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({name, email, password})
    }

  return (
    <Form 
    title="Добро пожаловать!" 
    buttonName="Зарегистрироваться" 
    text="Уже зарегистрированы?"
    sign="Войти"
    rout="/signin"
    onSubmit={handleSubmit} 
    onChangeEmail={handleChangeEmail} 
    onChangePassword={handleChangePassword}
    email={email}
    password={password}
    >
    <label className="input__label" htmlFor="name">Имя</label>
    <input onChange={handleChangeName} autoComplete="off" value={name || ''} type="text"className="form__item form__item_type_name" name="name" id="name" required minLength="2" maxLength="40" />
    <span className="name-error form__item-error"></span>
    </Form>    
  )
}
 
export default Register;