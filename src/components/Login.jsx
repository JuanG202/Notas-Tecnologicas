import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('demo@notas.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const validEmail = 'demo@notas.com'
    const validPassword = '123456'

    if (email === validEmail && password === validPassword) {
      setError('')
      if (onLogin) {
        onLogin()
      }
      navigate('/tareas')
    } else {
      setError('Credenciales inválidas. Usa demo@notas.com / 123456')
    }

  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Bienvenido de nuevo</h1>
          <p className="auth-subtitle">Ingresa para gestionar tus tareas tecnológicas</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Iniciar sesión
          </button>
        </form>

        <p className="auth-footer-text">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
