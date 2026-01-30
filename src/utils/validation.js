export const validateEmail = (email) => {
  if (!email) {
    return 'Email обязателен для заполнения'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Некорректный формат email (пример: example@gmail.com)'
  }
  
  return ''
}

export const validatePassword = (password) => {
  if (!password) {
    return 'Пароль обязателен для заполнения'
  }

  if (password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов'
  }

  const digitCount = (password.match(/\d/g) || []).length
  if (digitCount < 2) {
    return 'Пароль должен содержать минимум две цифры'
  }

  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  if (!specialCharRegex.test(password)) {
    return 'Пароль должен содержать минимум один специальный символ'
  }

  return ''
}
