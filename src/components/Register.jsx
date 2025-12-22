import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import '../styles/Auth.css'

function Register() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        "https://notas-tecnologicas-backend.vercel.app/auth/register",
        { nombre, email, password }
      )
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrarse')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Crear cuenta</h1>
          <p className="auth-subtitle">Regístrate para comenzar a organizar tus tareas</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Nombre completo</label>
            <input id="name" value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            Crear cuenta
          </button>
        </form>

        <p className="auth-footer-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
