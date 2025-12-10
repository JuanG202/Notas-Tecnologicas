import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://notas-tecnologicas-backend.vercel.app/tareas";

function normalizeTarea(t) {
  // Convierte _id (Mongo) a id para no tocar los componentes
  return {
    ...t,
    id: t.id || t._id || t._id?.$oid || t._id?.toString?.() // defensivo
  };
}

export function useTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerTareas = async () => {
    try {
      const res = await axios.get(BASE_URL);
      if (Array.isArray(res.data)) {
        const normalized = res.data.map(normalizeTarea);
        setTareas(normalized);
      } else {
        setTareas([]);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const crearTarea = async (datosFormulario) => {
    try {
      const res = await axios.post(BASE_URL, datosFormulario);
      const tarea = normalizeTarea(res.data);
      setTareas(prev => [...prev, tarea]);
      return tarea;
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  const actualizarTarea = async (id, datosFormulario) => {
    try {
      // Si el id viene como string, lo enviamos tal cual; backend debe usar ese id
      const res = await axios.put(`${BASE_URL}/${id}`, datosFormulario);
      const tarea = normalizeTarea(res.data);
      setTareas(prev => prev.map(t => (t.id === id ? tarea : t)));
      return tarea;
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  const toggleCompletada = async (id) => {
    try {
      const tareaActual = tareas.find(t => t.id === id);
      if (!tareaActual) return;

      // Enviamos la tarea completa con completada invertida (igual que hacías en local)
      const payload = { ...tareaActual, completada: !tareaActual.completada };
      const res = await axios.put(`${BASE_URL}/${id}`, payload);
      const tarea = normalizeTarea(res.data);
      setTareas(prev => prev.map(t => (t.id === id ? tarea : t)));
      return tarea;
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return {
    tareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    toggleCompletada
  };
}
