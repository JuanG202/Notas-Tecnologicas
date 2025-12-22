import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://notas-tecnologicas-backend.vercel.app/tareas";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
}

function normalizeTarea(t) {
  return {
    ...t,
    id: t._id
  };
}

export function useTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    const res = await axios.get(BASE_URL, authHeader());
    setTareas(res.data.map(normalizeTarea));
  };

  const crearTarea = async (data) => {
    const res = await axios.post(BASE_URL, data, authHeader());
    setTareas(prev => [...prev, normalizeTarea(res.data)]);
  };

  const actualizarTarea = async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data, authHeader());
    setTareas(prev => prev.map(t => t.id === id ? normalizeTarea(res.data) : t));
  };

  const eliminarTarea = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`, authHeader());
    setTareas(prev => prev.filter(t => t.id !== id));
  };

  const toggleCompletada = async (id) => {
    const res = await axios.patch(`${BASE_URL}/${id}/toggle`, {}, authHeader());
    setTareas(prev => prev.map(t => t.id === id ? normalizeTarea(res.data) : t));
  };

  return {
    tareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea,
    toggleCompletada
  };
}
