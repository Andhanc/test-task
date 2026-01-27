import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UsersPage.css'

function UsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([])
  const [displayedUsers, setDisplayedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Пользователи'
    
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      navigate('/sign-in', { replace: true })
      return
    }

    fetchUsers()
  }, [navigate])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://fakerapi.it/api/v2/users?_quantity=50')
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных')
      }
      const data = await response.json()
      const usersData = data.data || []
      setUsers(usersData)
      setOriginalUsers(usersData)
      setDisplayedUsers(usersData)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Ошибка загрузки пользователей:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSort = () => {
    const sorted = [...displayedUsers].sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase()
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase()
      return nameA.localeCompare(nameB)
    })
    setDisplayedUsers(sorted)
  }

  const handleFilter = () => {
    const filtered = originalUsers.filter((_, index) => (index + 1) % 10 === 0)
    setDisplayedUsers(filtered)
  }

  const handleReset = () => {
    setDisplayedUsers([...originalUsers])
  }

  if (loading) {
    return (
      <div className="users-page">
        <div className="loading">Загрузка...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="users-page">
        <div className="error">Ошибка: {error}</div>
      </div>
    )
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Пользователи</h1>
      </div>

      <div className="actions-container">
        <button onClick={handleSort} className="action-button">
          Сортировать
        </button>
        <button onClick={handleFilter} className="action-button">
          Фильтрация
        </button>
        <button onClick={handleReset} className="action-button">
          Отменить
        </button>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              displayedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
