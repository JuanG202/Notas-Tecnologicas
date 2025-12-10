import '../styles/Header.css'

function Header({ tareas }) {
  const tareasCompletadas = tareas.filter(t => t.completada).length
  const tareasPendientes = tareas.filter(t => !t.completada).length

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">📝 Gestión de Tareas</h1>
        <p className="header-subtitle">Sistema de notas y pendientes</p>
        <div className="header-stats">
          <div className="stat-badge stat-completadas">
            <span className="stat-label">Completadas</span>
            <span className="stat-value">{tareasCompletadas}</span>
          </div>
          <div className="stat-badge stat-pendientes">
            <span className="stat-label">Pendientes</span>
            <span className="stat-value">{tareasPendientes}</span>
          </div>
          <div className="stat-badge stat-total">
            <span className="stat-label">Total</span>
            <span className="stat-value">{tareas.length}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

