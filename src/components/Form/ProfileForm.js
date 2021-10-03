import React from 'react';
import './ProfileForm.css'
import Error from '../Error/Error';

function ProfileForm(props) {
  const [isDisabled, setIsDisabled] = React.useState(true)
  const [name, setName] = React.useState('');
  const [email, setEmail ] = React.useState('')

  function handleChangeName(e) {
    setName(e.target.value);
  }
    
  function handleChangeEmail (e) {
    setEmail(e.target.value);
  }

  function handleEditProfile() {
    setIsDisabled(false)
  }

  function handleSaveProfile() {
    setIsDisabled(true)
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
 
  return (
    <main className="profile__info">
      <h2 className="profile__title">{`Привет, ${props.name}!`}</h2>
      <form className="profile__form" onSubmit={handleSubmit} >
        <fieldset className="profile__form__info">
          <label className="profile__form__label" htmlFor="name">Имя
            <input disabled={isDisabled} value={name} onChange={handleChangeName} placeholder={props.name} type="text" className="profile__form__item" name="name" id="name" required minLength="2" maxLength="40" />
          </label>
          <span className="email-error form__item-error"></span>

          <label className="profile__form__label" htmlFor="email">E-mail
            <input disabled={isDisabled} type="email" value={email} onChange={handleChangeEmail} placeholder={props.email} className={`profile__form__item ${!isDisabled ? ('profile__form__item_active') : ''} `} name="email" id="email" required/>
          </label>
        </fieldset>
        <div className="profile__form__submit">
          {isDisabled ?
          <>
          <button onClick={handleEditProfile} className="profile__form__button profile__form__button_type_edit section__link" type="submit">Редактировать</button>
          <button onClick={props.logOut} className="profile__form__button profile__form__button_type_signout section__link" type="submit">Выйти из аккаунта</button> 
          </>
          : 
          <>
          <Error 
          errorText={props.errorText}
          />
            <button onClick={handleSaveProfile} className="profile__form__button_type_save section__link" type="submit">Сохранить</button>
          </>
          }
        </div>  
      </form>
    </main>
      
    )
  }
  
  export default ProfileForm;