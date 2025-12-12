import '../styles/TarjetaTarea.css'

function TarjetaTarea({ tarea, onEditar, onEliminar, onToggleCompletada }) {

  const formatearFecha = (fechaIso) => {
    if (!fechaIso) return '';

    const fecha = new Date(fechaIso);

    return new Intl.DateTimeFormat('es-CO', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(fecha);
  };

  return (
    <div className={`tarjeta-tarea ${tarea.completada ? 'completada' : ''}`}>
      {tarea.completada && (
        <div className="tarjeta-badge-completada">
          <span>✓ Completada</span>
        </div>
      )}

      <div className="tarjeta-header">
        <h3 className="tarjeta-titulo">{tarea.titulo}</h3>
        <div className="tarjeta-acciones">
          <button
            className="tarjeta-btn-icon"
            onClick={() => onToggleCompletada(tarea.id)}
            title={tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
            aria-label={tarea.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
          >
            {tarea.completada ? '✅' : '⏳'}
          </button>
          <button
            className="tarjeta-btn-icon"
            onClick={() => onEditar(tarea)}
            title="Editar tarea"
            aria-label="Editar tarea"
          >
            ✏️
          </button>
          <button
            className="tarjeta-btn-icon tarjeta-btn-eliminar"
            onClick={() => onEliminar(tarea.id)}
            title="Eliminar tarea"
            aria-label="Eliminar tarea"
          >
            🗑️
          </button>
        </div>
      </div>

      {tarea.descripcion && (
        <div className="tarjeta-descripcion">
          <p>{tarea.descripcion}</p>
        </div>
      )}

      <div className="tarjeta-footer">
        {tarea.tecnico && (
          <div className="tarjeta-tecnico">
            <span className="tarjeta-icono">👤</span>
            <span className="tarjeta-tecnico-nombre">{tarea.tecnico}</span>
          </div>
        )}

        <div className="tarjeta-fecha">
          <span className="tarjeta-icono">📅</span>

          <span className="tarjeta-fecha-texto">
            {formatearFecha(tarea.fechaCreacion)}

            {tarea.fechaActualizacion && (
              <span className="tarjeta-fecha-edicion">
                {' '} (Editada: {formatearFecha(tarea.fechaActualizacion)})
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TarjetaTarea
