import React from 'react';
import Form from '../Form/Form'
import './Login.css'
import {useFormValidation} from '../Validator.js';

function Login(props) {

  const { values, handleChange, errors, isValid } = useFormValidation({
    email: '', password: '' });
  const submitDisabled = values.email === '' || values.password === '' || !isValid;
  
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  
  } 

  return (
    <Form 
    title="Рады видеть!" 
    buttonName="Войти" 
    text="Ещё не зарегистрированы?"
    sign="Регистрация"
    rout="/signup"
    onLogin={props.onLogin}
    email={values.email}
    password={values.password}
    onSubmit={handleSubmit}
    onChange={handleChange}
    errorsEmail={errors.email}
    errorsPassword={errors.password}
    submitDisabled={submitDisabled}
    serverError={props.serverError}
    >
    </Form>   
  )
}

export default Login;