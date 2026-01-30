import { useEffect } from 'react'
import { useUsers } from '../context/UsersContext'
import UsersTable from '../components/UsersTable'
import './UsersPage.css'

function UsersPage() {
  const { users, loading, error, loadUsers } = useUsers()

  useEffect(() => {
    document.title = 'Пользователи'
    loadUsers(100)
  }, [loadUsers])

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

      <UsersTable users={users} />
    </div>
  )
}

export default UsersPage
