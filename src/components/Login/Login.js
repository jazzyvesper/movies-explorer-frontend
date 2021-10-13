import React from 'react';
import Form from '../Form/Form'
import './Login.css'

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  
  console.log(email)
  function handleChangePassword (e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({email, password})
    setEmail('');
    setPassword('')
  } 
  return (
    <Form 
    title="Рады видеть!" 
    buttonName="Войти" 
    text="Ещё не зарегистрированы?"
    sign="Регистрация"
    rout="/signup"
    onSubmit={handleSubmit}
    onChangeEmail={handleChangeEmail} 
    onChangePassword={handleChangePassword}
    email={email}
    password={password}>
    </Form>   
  )
}
  
export default Login;