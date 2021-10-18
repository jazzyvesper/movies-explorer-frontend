import React from 'react';
import './ProfileForm.css'
import {useFormValidation} from '../Validator.js';
import {pattern} from '../../utils/constants';
import {CurrentUserContext} from '../../context/CurrentUserContext';


function ProfileForm(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormValidation({
    name: currentUser.name, email: currentUser.email });
  const submitAuth = props.submitAuth
  const submitDisabled = values.email === '' || values.name === '' || 
  ( values.name === currentUser.name && values.email === currentUser.email )
  || !isValid || submitAuth;
  const [isDisabled, setIsDisabled] = React.useState(true);

  function handleEditProfile() {
    setIsDisabled(false)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(true)
    props.onEditProfile(values.email, values.name)
  }
  
  return (
    <main className="profile__info">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form" onSubmit={handleSubmit} >
        <fieldset className="profile__form__info">
          <label className="profile__form__label" htmlFor="name">Имя
            <input 
            autoComplete="off" 
            disabled={isDisabled} 
            value={values.name}
            onChange={handleChange}
            type="text" 
            className="profile__form__item" 
            name="name" 
            id="name" 
            required 
            minLength="2" 
            maxLength="40"
            pattern={pattern.name}
             />
          </label>
          <span className="email-error form__item-error"></span>

          <label className="profile__form__label" htmlFor="email">E-mail
            <input 
            autoComplete="off" 
            disabled={isDisabled} 
            type="email" 
            value={values.email} 
            onChange={handleChange}
            className={`profile__form__item ${!isDisabled ? ('profile__form__item_active') : ''} `} 
            name="email" 
            id="email" 
            required
            pattern={pattern.email}
            />
          </label>
        </fieldset>
        <div className="profile__form__submit">
          {isDisabled ?
          <button onClick={handleEditProfile} className="profile__form__button profile__form__button_type_edit section__link" type="submit">Редактировать</button>
          : 
          <>
          {errors.email && <span className="password-error form__item-error">{errors.email}</span>}
          {errors.name && <span className="password-error form__item-error">{errors.name}</span>}
          
            <button disabled={submitDisabled ? true : ''}  className={`profile__form__button_type_save ${submitDisabled ? ('form__button_disabled') : 'section__link'}`} type="submit">Сохранить</button>
          </>
          }
        </div>  
      </form>
      <button onClick={props.logOut} className="profile__form__button profile__form__button_type_signout section__link" type="submit">Выйти из аккаунта</button> 
    
    </main>
      
    )
  }
  
  export default ProfileForm;