
class MainApi {
  constructor ({address, headers}) {
    this._address = address;
    this._headers = headers;
  }
  
  _getResponseData(res) {
    if(res.ok) {
      return res.json()
    }else {
      return Promise.reject(res.status)
    } 
  }
  
  getMovies () {
    return fetch(`${this._address}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._getResponseData)
  }

  savedMovies(data) {
    return fetch(`${this._address}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailer: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.url}`,
        movieId: data.id
      })
    })
    .then(this._getResponseData)
  }

  deleteMovie(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._getResponseData)
  }
  
  }
  
    const api = new MainApi({
      address: 'https://api.jazzyvesper.diplom.nomoredomains.club',
      headers: {
        'Content-Type': 'application/json'
    }
    });
    
    export default api