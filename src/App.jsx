import { useState } from 'react'
import { useTareas } from './hooks/useTareas'
import Header from './components/Header'
import BotonNuevaTarea from './components/BotonNuevaTarea'
import FormularioTarea from './components/FormularioTarea'
import ListaTareas from './components/ListaTareas'
import './App.css'

function App() {
  const { tareas, crearTarea, actualizarTarea, eliminarTarea, toggleCompletada } = useTareas()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tareaEditando, setTareaEditando] = useState(null)

  const manejarGuardar = (datosFormulario) => {
    if (tareaEditando) {
      actualizarTarea(tareaEditando.id, datosFormulario)
      setTareaEditando(null)
    } else {
      crearTarea(datosFormulario)
    }
    setMostrarFormulario(false)
  }

  const manejarCancelar = () => {
    setMostrarFormulario(false)
    setTareaEditando(null)
  }

  const manejarEditar = (tarea) => {
    setTareaEditando(tarea)
    setMostrarFormulario(true)
  }

  const manejarEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      eliminarTarea(id)
      if (tareaEditando && tareaEditando.id === id) {
        setTareaEditando(null)
        setMostrarFormulario(false)
      }
    }
  }

  return (
    <div className="app">
      <Header tareas={tareas} />
      
      <main className="main">
        <div className="main-container">
          {!mostrarFormulario ? (
            <BotonNuevaTarea onClick={() => setMostrarFormulario(true)} />
          ) : (
            <FormularioTarea
              tareaEditando={tareaEditando}
              onGuardar={manejarGuardar}
              onCancelar={manejarCancelar}
            />
          )}

          <ListaTareas
            tareas={tareas}
            onEditar={manejarEditar}
            onEliminar={manejarEliminar}
            onToggleCompletada={toggleCompletada}
          />
        </div>
      </main>
    </div>
  )
}

export default App
