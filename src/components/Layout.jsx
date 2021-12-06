import React from 'react'
import {AiOutlinePlus} from "react-icons/ai"
import Link from "next/link";
//hook de router para el boton
import {useRouter} from "next/router"
//traer el estado porque quiero saber la cantidad de tareas
import {useTasks} from "../context/TaskContext"



export default function Layout({children}) {
  const router = useRouter()
  // traemos el arreglo del contexto de use tasks, el arreglo esta guardado en el value
  const {tasks}=useTasks()  
  
  return (
    <div className="h-screen bg-gray-900 text-white">
      <header className=" flex items-center bg-gray-800 text-white px-28 py-5">
        <Link href="/">
          <a>
           <h1 className="font-black text-lg">Task App</h1>
          </a>
        </Link>
        <span className="ml-2 text-gray-400 font-bold">
          {tasks.length} tasks
        </span>
        <div className="flex-grow text-right">
          {/*  aqui usamos el router push porque es un boton y NO un link*/}
          <button
          className= "bg-green-500 hover:bg-green-400 px-5 py-2 font-bold rounded-sm inline-flex items-center"
          onClick={()=> router.push("/new")}
          
          >
            <AiOutlinePlus className="mr-2"/>
              Add Task 
          </button>
        </div>
      </header>
      <main className="px-28 py-10">
        {children}
      </main>

    </div>
  )
}
