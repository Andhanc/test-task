import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn'
import UsersPage from './pages/UsersPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import './App.css'

function App() {
  return (
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
          path="/main"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
