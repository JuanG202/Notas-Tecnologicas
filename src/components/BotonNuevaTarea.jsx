import '../styles/BotonNuevaTarea.css'

function BotonNuevaTarea({ onClick }) {
  return (
    <button className="btn-nueva-tarea" onClick={onClick}>
      <span className="btn-nueva-tarea-icono">➕</span>
      <span className="btn-nueva-tarea-texto">Nueva Tarea</span>
    </button>
  )
}

export default BotonNuevaTarea

