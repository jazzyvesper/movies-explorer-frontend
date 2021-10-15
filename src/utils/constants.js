export const pattern = {
  email: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
  name: '^[a-zA-Zа-яА-ЯЁё\\s\\-]+$',
}


export const errorMessage = {
  emailandPasswordError: 'Ошибка авторизации. Неверный email или пароль.',
  registrationError: 'Пользователь с таким email уже существует.',
  searchError: 'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз».',
  keywordNull: "Нужно ввести ключевое слово"
}



export const infoMessage = {
  dontFindMovie: 'Ничего не найдено'
}

export const authErrors = {
  badRequestErr: 400,
  unauthorizedErr: 401,
  forbiddenErr: 403,
  notFoundErr: 404,
  conflictErr: 409,
  internalServerErr: 500,
  mongoErr: 11000,
}