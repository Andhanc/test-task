import { useState, useMemo } from 'react'
import './UsersTable.css'

const UsersTable = ({ users }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [filters, setFilters] = useState({
    id: '',
    fullname: '',
    email: '',
    username: '',
  })

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }))
  }

  const processedUsers = useMemo(() => {
    let filtered = [...users]

    if (filters.id) {
      filtered = filtered.filter((user) =>
        user.id.toString().toLowerCase().includes(filters.id.toLowerCase())
      )
    }
    if (filters.fullname) {
      filtered = filtered.filter((user) =>
        `${user.firstname} ${user.lastname}`
          .toLowerCase()
          .includes(filters.fullname.toLowerCase())
      )
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      )
    }
    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      )
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue

        switch (sortConfig.key) {
          case 'id':
            aValue = a.id
            bValue = b.id
            break
          case 'fullname':
            aValue = `${a.firstname} ${a.lastname}`.toLowerCase()
            bValue = `${b.firstname} ${b.lastname}`.toLowerCase()
            break
          case 'email':
            aValue = a.email.toLowerCase()
            bValue = b.email.toLowerCase()
            break
          case 'username':
            aValue = a.username.toLowerCase()
            bValue = b.username.toLowerCase()
            break
          default:
            return 0
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [users, filters, sortConfig])

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return '⇅'
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const handleResetFilters = () => {
    setFilters({
      id: '',
      fullname: '',
      email: '',
      username: '',
    })
    setSortConfig({ key: null, direction: 'asc' })
  }

  return (
    <div className="users-table-container">
      <div className="table-controls">
        <button onClick={handleResetFilters} className="reset-button">
          Сбросить фильтры и сортировку
        </button>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <span>ID</span>
                  <button
                    className="sort-button"
                    onClick={() => handleSort('id')}
                    title="Сортировать по ID"
                  >
                    {getSortIcon('id')}
                  </button>
                </div>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Фильтр..."
                  value={filters.id}
                  onChange={(e) => handleFilterChange('id', e.target.value)}
                />
              </th>
              <th>
                <div className="th-content">
                  <span>Full name</span>
                  <button
                    className="sort-button"
                    onClick={() => handleSort('fullname')}
                    title="Сортировать по имени"
                  >
                    {getSortIcon('fullname')}
                  </button>
                </div>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Фильтр..."
                  value={filters.fullname}
                  onChange={(e) => handleFilterChange('fullname', e.target.value)}
                />
              </th>
              <th>
                <div className="th-content">
                  <span>Email</span>
                  <button
                    className="sort-button"
                    onClick={() => handleSort('email')}
                    title="Сортировать по email"
                  >
                    {getSortIcon('email')}
                  </button>
                </div>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Фильтр..."
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                />
              </th>
              <th>
                <div className="th-content">
                  <span>Username</span>
                  <button
                    className="sort-button"
                    onClick={() => handleSort('username')}
                    title="Сортировать по username"
                  >
                    {getSortIcon('username')}
                  </button>
                </div>
                <input
                  type="text"
                  className="filter-input"
                  placeholder="Фильтр..."
                  value={filters.username}
                  onChange={(e) => handleFilterChange('username', e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {processedUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              processedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
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

export default UsersTable
