
class MoviesApi {
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
    return fetch(`${this._address}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }



}

  const apiFilms = new MoviesApi({
    address: 'https://api.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json'
  }
  });
  
  export default apiFilms