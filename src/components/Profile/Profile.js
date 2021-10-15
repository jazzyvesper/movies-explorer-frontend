import React from 'react';
import './Profile.css';
import ProfileForm from '../Form/ProfileForm';

function Profile(props) {
  return (
    <section className="profile">
      <ProfileForm 
      name={props.name}
      email={props.email}
      logOut={props.logOut}
      onEditProfile={props.onEditProfile}
       />
      
    </section>
  ) 
}

export default Profile;