export const BASE_URL = 'https://api.jazzyvesper.diplom.nomoredomains.club';

const getResponsData = (res)=> {
    if(res.ok) {
      return res.json()
    
     }else {
       console.log('ошибка')
       return Promise.reject(res.status)
     } 
  }

  export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({name, email, password})
    })
    .then(getResponsData)
  };

  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({email, password})
    })
    .then(getResponsData);
  }; 

  export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    })
    .then(getResponsData);
  } 

  export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: "POST",
      credentials: "include",
    })
    .then(getResponsData);
  }