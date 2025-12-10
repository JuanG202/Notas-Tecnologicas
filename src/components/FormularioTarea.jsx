import { useState, useEffect } from 'react'
import '../styles/FormularioTarea.css'

function FormularioTarea({ tareaEditando, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    titulo: '',
    descripcion: '',
    tecnico: '',
    completada: false
  })

  // Cargar datos de la tarea cuando se está editando
  useEffect(() => {
    if (tareaEditando) {
      setFormulario({
        titulo: tareaEditando.titulo || '',
        descripcion: tareaEditando.descripcion || '',
        tecnico: tareaEditando.tecnico || '',
        completada: tareaEditando.completada || false
      })
    } else {
      setFormulario({
        titulo: '',
        descripcion: '',
        tecnico: '',
        completada: false
      })
    }
  }, [tareaEditando])

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (!formulario.titulo.trim()) {
      alert('Por favor ingresa un título para la tarea')
      return
    }

    onGuardar(formulario)
    setFormulario({
      titulo: '',
      descripcion: '',
      tecnico: '',
      completada: false
    })
  }

  return (
    <form className="formulario-tarea" onSubmit={manejarSubmit}>
      <div className="formulario-header">
        <h2 className="formulario-titulo">
          {tareaEditando ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}
        </h2>
      </div>

      <div className="formulario-body">
        <div className="formulario-campo">
          <label htmlFor="titulo" className="formulario-label">
            Título <span className="required">*</span>
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="formulario-input"
            value={formulario.titulo}
            onChange={manejarCambio}
            placeholder="Ej: Revisar sistema de facturación"
            required
            autoFocus
          />
        </div>

        <div className="formulario-campo">
          <label htmlFor="descripcion" className="formulario-label">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="formulario-textarea"
            value={formulario.descripcion}
            onChange={manejarCambio}
            placeholder="Detalles de la tarea..."
            rows="4"
          />
        </div>

        <div className="formulario-campo">
          <label htmlFor="tecnico" className="formulario-label">
            Asignar a Técnico
          </label>
          <select
            id="tecnico"
            name="tecnico"
            className="formulario-select"
            value={formulario.tecnico}
            onChange={manejarCambio}
          >
            <option value="">Sin asignar</option>
            <option value="Juan Granja">Juan Granja</option>
            <option value="Kevin Rivas">Kevin Rivas</option>
            <option value="Sistemas">Sistemas</option>
            <option value="Ambos">Ambos</option>
          </select>
        </div>

        {tareaEditando && (
          <div className="formulario-campo formulario-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="completada"
                className="checkbox-input"
                checked={formulario.completada}
                onChange={manejarCambio}
              />
              <span className="checkbox-text">Tarea completada</span>
            </label>
          </div>
        )}
      </div>

      <div className="formulario-footer">
        <button type="submit" className="btn btn-guardar">
          {tareaEditando ? '💾 Guardar Cambios' : '✅ Crear Tarea'}
        </button>
        <button
          type="button"
          className="btn btn-cancelar"
          onClick={onCancelar}
        >
          ❌ Cancelar
        </button>
      </div>
    </form>
  )
}

export default FormularioTarea
