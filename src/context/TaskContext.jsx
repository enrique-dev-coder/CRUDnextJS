import { createContext,useContext ,useState} from "react";
import {v4 as uuid} from 'uuid';
export const TaskContext =  createContext()


//usar el contexto de la aplicacion en el hook de use context
export const useTasks= ()=> useContext(TaskContext)


export const TasksProvider = ({children})=>{
  const [tasks,setTasks] = useState([
    { 
      id:"1",
      title:"First Task",
      description: "some task"
    }  
  ]);
  // setTasks([...tasks,{title,description,id:"2"}])
  //esto quiere decir que  vas a actualizar el estado copiando todas las tareas que ya teniamos y agregandole un 
  //nuevo objeto  que tiene como parametros el title y la description 
  const createTask =(title,description)=>{
    setTasks([...tasks,{title,description,id:uuid()}])
  }
  //vas a hacer un map de todas las tareas del arreglo 
  //de todo el arreglo de tareas tengo que revisar si el id que estoy recibiendo como parametro en mi funcion es elq eu ya tnego
  //si existe quiero que se actualice con todos los valores que tnego en la tarea y con una copia de los valores que estoy actualizando
  const updateTask = (id,updatedTask)=>{
    setTasks([...tasks.map(task=> task.id === id ? {...task,...updatedTask} : task)])
  }

  //borrar tarea
  // del array original cualquier id que reciba has un filtro con todos los diferentes
  const deleteTask = id=>setTasks([...tasks.filter(task=>task.id !== id )])

  return(
    <TaskContext.Provider value={{tasks,createTask,updateTask,deleteTask}}>{children}</TaskContext.Provider>
  )
}