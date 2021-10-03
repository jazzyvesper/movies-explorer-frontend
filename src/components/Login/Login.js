import React from 'react';
import Form from '../Form/Form'
import './Login.css'

function Login(props) {
  return (
    <Form 
    title="Рады видеть!" 
    buttonName="Войти" 
    text="Ещё не зарегистрированы?"
    sign="Регистрация"
    rout="/signup"
    loggedIn={props.loggedIn}
    >
    </Form>   
  )
}
  
export default Login;