import { useEffect } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { useLocalStorage } from "./hooks/UseLocalStorage";

const COLUMNS = [
  { id: "todo", title: "Por hacer" },
  { id: "doing", title: "En progreso" },
  { id: "done", title: "Hecho" },
  { id: "review", title: "En revisión" },
];

const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "doing", priority: "media" },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", initialTasks);
  useEffect(() => {
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]);


  function addTask(title, priority) {
    // RETO 2: Evitar repetidos (sin importar mayúsculas)
    const existe = tasks.some(t => t.title.toLowerCase() === title.toLowerCase());
    if (existe) {
      return "Ya existe una tarea con ese nombre."; // Retorna el error
    }

    const newTask = { id: Date.now(), title, status: "todo", priority };
    setTasks([...tasks, newTask]);
    return null; // Todo salió bien
  }

  function moveTask(id, newStatus) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // RETO 3: Eliminar todas las tareas terminadas
  function vaciarHechos() {
    setTasks(tasks.filter((t) => t.status !== "done"));
  }

  // RETO 4: Función para guardar el nuevo título
  function updateTaskTitle(id, newTitle) {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  }

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Kanban ({tasks.length} tareas)</h1>
        <button onClick={vaciarHechos} style={{ background: "#dc2626", color: "white" }}>
          Vaciar columna Hecho
        </button>
      </div>
      
      <TaskForm onAdd={addTask} />
      
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
            onUpdateTitle={updateTaskTitle}
          />
        ))}
      </div>
    </main>
  );
}

/*import Column from "./components/Column.jsx";
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./Columns.js";

const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "doing", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "todo", priority: "alta" },
];
 
export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  
 
  function addTask(title, priority) {
    const newTask = { id: Date.now(), title, status: "todo", priority };
    setTasks([...tasks, newTask]);
  }
 
  function moveTask(id, newStatus) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }
 
  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
 
  return (

    <main>
      <h1>Kanban</h1>
      <TaskForm onAdd={addTask} />
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
          />
        ))}
      </div>
    </main>
  );
  
}

/*
const COLUMNS = [
  { id: "todo", title: "Por hacer" },
  { id: "doing", title: "En progreso" },
  { id: "done", title: "Hecho" },
  { id: "review", title: "Revisión" },
];

const tasks = [
  {
    id: 1,
    title: "Diseñar la base de datos",
    status: "done",
    priority: "alta",
  },
  {
    id: 2,
    title: "Crear el login",
    status: "doing",
    priority: "media",
  },
  {
    id: 3,
    title: "Escribir pruebas",
    status: "todo",
    priority: "baja",
  },
  {
    id: 4,
    title: "Preparar la demo",
    status: "todo",
    priority: "alta",
  },
  {
    id: 5,
    title: "Revisar el código",
    status: "review",
    priority: "media",
  },
];

export default function App() {
  return (
    <main>
      <h1>Kanban ({tasks.length} Tareas)</h1>

      <ContadorBueno />

      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </main>
  );
}

function ContadorBueno() {
  const [clics, setClics] = useState(0);

  return (
    <button onClick={() => setClics(clics + 1)}>
      Clics: {clics}
    </button>
  );
}
*/


