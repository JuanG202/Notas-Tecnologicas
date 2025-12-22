import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/Auth.css'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "https://notas-tecnologicas-backend.vercel.app/auth/login",
        { email, password }
      )

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('notas_auth', 'true')

      onLogin()
      navigate('/tareas')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Credenciales inválidas')
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
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Iniciar sesión
          </button>
        </form>

        {/*<p className="auth-footer-text">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>*/}
      </div>
    </div>
  )
}

export default Login
