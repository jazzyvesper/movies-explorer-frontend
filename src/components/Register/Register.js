import React from 'react';
import Form from '../Form/Form'
import './Register.css'
import {useFormValidation} from '../Validator.js';
import {pattern} from '../../utils/constants';

function Register(props) {
  const submitAuth = props.submitAuth;
  const { values, handleChange, errors, isValid } = useFormValidation({
    email: '', password: '' });
  const submitDisabled = values.email === '' || values.password === '' || !isValid || submitAuth;
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values.email, values.password, values.name) 
  } 

  return (
    <Form 
    title="Добро пожаловать!" 
    buttonName="Зарегистрироваться" 
    text="Уже зарегистрированы?"
    sign="Войти"
    rout="/signin"
    onRegister={props.onRegister}
    email={values.email}
    password={values.password}
    onSubmit={handleSubmit}
    onChange={handleChange}
    errorsEmail={errors.email}
    errorsPassword={errors.password}
    submitDisabled={submitDisabled}
    >
    <label className="input__label" htmlFor="name">Имя</label>
    <input 
    onChange={handleChange} 
    autoComplete="off" 
    value={values.name} 
    type="text"
    className="form__item form__item_type_name" 
    name="name" 
    id="name" 
    required 
    minLength="2" 
    maxLength="40"
    pattern={pattern.name}
    />
    {errors.name && <span className="email-error form__item-error">{errors.name}</span>}   
    </Form>    
  )
}
 
export default Register;