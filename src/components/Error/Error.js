import React from 'react';
import './Error.css'

function Error(props) {

  
 
  return (
   <p className="profile__form_text-error">{props.errorText}</p>  
  )
}

export default Error;