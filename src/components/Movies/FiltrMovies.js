export function filtrKey (arr, data) {
    const keywordSearch = data.keyword.toLowerCase();
    const NewArray = arr.filter((item) => {
      return item.nameRU.toLowerCase().includes(keywordSearch)
    })
  return NewArray
}

//2. фильтр слово + range
  export function filtrKeyAndRange (arr, data) {
    console.log(data)
    const NewArray = arr.filter((item) => {
      return item.nameRU.includes(data.keyword) && item.duration < 40
    })
  return NewArray
  }
//3. фильтр при клике по рэндж
export function filtrRange (arr, range) {
    const NewArray = arr.filter((item) => {
      return item.duration < 40
    })
  return NewArray
  }