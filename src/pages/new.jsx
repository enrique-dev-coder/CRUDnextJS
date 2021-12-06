import {useState,useEffect} from 'react'
import Layout from '../components/Layout'
//importar estado desde el context
import { useTasks } from '../context/TaskContext';
import {useRouter} from "next/router"


export default function TaskFormPage() {
  //en TailwindCSS se puede usar la variable de disabled para indicar una clase de algo deshabilitado

  const [task,setTask] = useState({
    title:'',
    description:''
  });

  const {createTask,updateTask,tasks}=useTasks()
  const {push,query} = useRouter();

  console.log(query)
  //el query es lo que esta despues de tu ruta
  //el query id es lo que nos indica que trae una tarea porque creando una tarea es lo que nos hace un query id



  const handleChange = e =>{
    const {name,value} = e.target
    setTask({...task,[name]:value})
  }
  //el name es la identificación del formulario 
  //le estamos diciendo que ahota el valor del estado es el varibale de name que puede ser title o description y que a ese le asigne un valor
 //le pasamos el valor del estadoa  la funcion de crear
 //se empuja a la ruta principal cuando se cree la tarea
 //si no exites el query id entonces crea una task
  const handleSubmit=e=>{
    e.preventDefault();

    if(!query.id){
      createTask(task.title,task.description);
    }else{
      //recibe el id como parametro y el objeto
      updateTask(query.id,task)
    }



    push('/');
    
  }


  useEffect(() => {
    if(query.id){
      //algo parecido al index of
     const taskFound = tasks.find(task=>task.id===query.id);
     setTask({title:taskFound.title,description:taskFound.description})
    }
  }, [])

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-700 p-10 h-2/4">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-10 h-2/4">
          <h1 className="text-3xl mb-7">{query.id ? "Update a Tasks":"Create a Task"}</h1>
          <input 
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"
            type="text" 
            name="title"
            placeholder="Escribe una tarea"
            onChange={handleChange}
            value={task.title}
          />
          <textarea 
            rows="2" 
            name='description'
            placeholder="Descripción de tu tarea"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5"  
            onChange={handleChange}
            value={task.description}
          ></textarea>
          <button
            className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-50"
            //el disabled cuando NO exista nignun task title
            disabled={!task.title}

          >
            Save
          </button>
        </form>
        </div>
      </div>

    </Layout>
  )
}
