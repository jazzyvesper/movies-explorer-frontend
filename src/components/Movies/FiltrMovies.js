function FiltrMovies() {

//1. фильтр по поисковому слову
  function filtrKey (arr, data) {
    const NewArray = arr.filter((item) => {
     return item.nameRU.includes(data.keyword)
    })
  return NewArray
  }

//2. фильтр слово + range
  function filtrKeyAndRange (arr, data) {
    console.log(data)
    const NewArray = arr.filter((item) => {
      return item.nameRU.includes(data.keyword) && item.duration < 40
    })
  return NewArray
  }
//3. фильтр при клике по рэндж
  function filtrRange (arr, range) {
    const NewArray = arr.filter((item) => {
      return item.duration < 40
    })
  return NewArray
  }

  return { filtrKey, filtrKeyAndRange, filtrRange } 
}


export default FiltrMovies