import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (isAuthenticated) {
    return <Navigate to="/main" replace />
  }
  
  return children
}

export default PublicRoute
