import { useNavigate, Link } from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Aquí podrías llamar a tu backend para crear el usuario.
    // De momento sólo redirigimos al login.
    navigate('/login')
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
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Crea una contraseña segura"
              autoComplete="new-password"
            />
          </div>

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
