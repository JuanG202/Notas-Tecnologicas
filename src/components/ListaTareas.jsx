import TarjetaTarea from './TarjetaTarea'
import '../styles/ListaTareas.css'

function ListaTareas({ tareas, onEditar, onEliminar, onToggleCompletada }) {
  // Ordenar primero por completada y luego por fecha ASCENDENTE (viejo → nuevo)
  const tareasOrdenadas = [...tareas].sort((a, b) => {
    // 1️⃣ No completadas primero
    if (a.completada !== b.completada) {
      return a.completada ? 1 : -1
    }

    // 2️⃣ Dentro del grupo: fecha ascendente (más viejo primero)
    return new Date(a.fecha) - new Date(b.fecha)
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
