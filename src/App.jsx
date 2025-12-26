import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTareas } from './hooks/useTareas'
import Header from './components/Header'
import BotonNuevaTarea from './components/BotonNuevaTarea'
import FormularioTarea from './components/FormularioTarea'
import ListaTareas from './components/ListaTareas'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function TareasPage({ onLogout }) {
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
    <>
      <Header tareas={tareas} />

      <main className="main">
        <div className="main-container">
          <div className="acciones-superiores">
            {!mostrarFormulario && (
              <BotonNuevaTarea onClick={() => setMostrarFormulario(true)} />
            )}

            <button
              type="button"
              className="btn-logout"
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </div>

          {mostrarFormulario && (
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
    </>
  )
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    
  }
  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('notas_auth') === 'true'
    setIsAuthenticated(stored)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    window.localStorage.setItem('notas_auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    window.localStorage.removeItem('notas_auth')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tareas"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TareasPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
