import TarjetaTarea from './TarjetaTarea'
import '../styles/ListaTareas.css'

function ListaTareas({ tareas, onEditar, onEliminar, onToggleCompletada }) {
  // Ordenar: primero no terminadas, luego terminadas
  const tareasOrdenadas = [...tareas].sort((a, b) => {
    // Si usas "completada" boolean
    return a.completada === b.completada ? 0 : a.completada ? 1 : -1
  })

  if (tareas.length === 0) {
    return (
      <div className="lista-tareas-vacia">
        <div className="lista-tareas-vacia-contenido">
          <div className="lista-tareas-vacia-icono">📋</div>
          <h3 className="lista-tareas-vacia-titulo">No hay tareas aún</h3>
          <p className="lista-tareas-vacia-texto">
            ¡Crea tu primera tarea para comenzar a organizar tus pendientes!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="lista-tareas">
      <div className="lista-tareas-header">
        <h2 className="lista-tareas-titulo">
          Tareas <span className="lista-tareas-contador">({tareas.length})</span>
        </h2>
      </div>
      <div className="lista-tareas-grid">
        {tareasOrdenadas.map(tarea => (
          <TarjetaTarea
            key={tarea.id}
            tarea={tarea}
            onEditar={onEditar}
            onEliminar={onEliminar}
            onToggleCompletada={onToggleCompletada}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaTareas
