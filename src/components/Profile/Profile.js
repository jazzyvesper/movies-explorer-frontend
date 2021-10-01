import React from 'react';
import './Profile.css';
import ProfileForm from '../Form/ProfileForm';

function Profile(props) {
  return (
    <section className="profile">
      <ProfileForm 
      name="Виталий"
      email="pochta@yandex.ru"
      logOut={props.logOut}
      errorText={props.errorText}
       />
      
    </section>
  ) 
}

export default Profile;