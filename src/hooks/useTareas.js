import { useState, useEffect } from 'react'

const STORAGE_KEY = 'tareas'

export function useTareas() {
  const [tareas, setTareas] = useState([])

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem(STORAGE_KEY)
    if (tareasGuardadas) {
      try {
        setTareas(JSON.parse(tareasGuardadas))
      } catch (error) {
        console.error('Error al cargar tareas:', error)
        setTareas([])
      }
    }
  }, [])

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas))
  }, [tareas])

  const crearTarea = (datosFormulario) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo: datosFormulario.titulo,
      descripcion: datosFormulario.descripcion || '',
      tecnico: datosFormulario.tecnico || '',
      completada: false,
      fechaCreacion: new Date().toLocaleString('es-ES')
    }
    setTareas(prev => [...prev, nuevaTarea])
    return nuevaTarea
  }

  const actualizarTarea = (id, datosFormulario) => {
    setTareas(prev =>
      prev.map(tarea =>
        tarea.id === id
          ? {
              ...tarea,
              titulo: datosFormulario.titulo,
              descripcion: datosFormulario.descripcion || '',
              tecnico: datosFormulario.tecnico || '',
              completada: datosFormulario.completada || false,
              fechaActualizacion: new Date().toLocaleString('es-ES')
            }
          : tarea
      )
    )
  }

  const eliminarTarea = (id) => {
    setTareas(prev => prev.filter(tarea => tarea.id !== id))
  }

  const toggleCompletada = (id) => {
    setTareas(prev =>
      prev.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    )
  }

  return {
    tareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    toggleCompletada
  }
}

