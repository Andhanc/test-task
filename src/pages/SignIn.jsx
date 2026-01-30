import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateEmail, validatePassword } from '../utils/validation'
import '../App.css'

function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  useEffect(() => {
    document.title = 'Вход - Авторизация'
  }, [])
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (touched.email && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (touched.password && errors.password) {
      setErrors(prev => ({ ...prev, password: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    setTouched({ email: true, password: true })
    
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setErrors({
      email: emailError,
      password: passwordError
    })
    
    if (!emailError && !passwordError) {
      login()
      navigate('/')
    }
  }

  return (
    <div className="app">
      <div className="auth-container">
        <h1 className="auth-title">Вход</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-input ${touched.email && errors.email ? 'form-input-error' : ''}`}
              value={email}
              onChange={handleEmailChange}
              placeholder="example@mail.com"
            />
            {touched.email && errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`form-input ${touched.password && errors.password ? 'form-input-error' : ''}`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Введите пароль"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <>
                <span className="error-message">{errors.password}</span>
                <span className="hint-message">
                  • Минимум 6 символов<br />
                  • Минимум две цифры и один специальный символ (пример: !@#$%^&*)
                </span>
              </>
            )}
          </div>

          <button type="submit" className="submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
