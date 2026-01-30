import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UsersProvider } from './context/UsersContext'
import SignIn from './pages/SignIn'
import UsersPage from './pages/UsersPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/sign-in" 
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              } 
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </AuthProvider>
  )
}

export default App
