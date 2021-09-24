import React from 'react';
import { Link } from 'react-router-dom';
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
      >
      </Form>
        
    )
  }
  
  export default Login;