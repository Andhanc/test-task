import { createContext, useContext, useState, useCallback } from 'react'
import { fetchUsers } from '../services/api'

const UsersContext = createContext(null)

export const useUsers = () => {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsers must be used within UsersProvider')
  }
  return context
}

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [originalUsers, setOriginalUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadUsers = useCallback(async (quantity = 100) => {
    try {
      setLoading(true)
      setError(null)
      const usersData = await fetchUsers(quantity)
      setUsers(usersData)
      setOriginalUsers(usersData)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateUsers = useCallback((newUsers) => {
    setUsers(newUsers)
  }, [])

  const resetUsers = useCallback(() => {
    setUsers([...originalUsers])
  }, [originalUsers])

  return (
    <UsersContext.Provider
      value={{
        users,
        originalUsers,
        loading,
        error,
        loadUsers,
        updateUsers,
        resetUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
