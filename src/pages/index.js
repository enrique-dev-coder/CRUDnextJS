import React from 'react'
import {useTasks} from "../context/TaskContext"
import Layout from '../components/Layout'
import {VscTrash} from "react-icons/vsc"
import { useRouter } from 'next/router'
export default function index() {
  //destructuring del estado
  
  const {tasks , deleteTask} = useTasks()
  const {push}= useRouter()
 return (
    <Layout>
      <div  className = "flex justify-center">
          {
            tasks.length === 0 ? (
              <h2>There are no tasks</h2>
            ):(
              <div className="w-7/12">
                {tasks.map((t,i)=>(
                  
                    <div
                      className="bg-gray-700 
                      hover:bg-gray-600 
                      cursor-pointer px-20 py-5 m-2 
                      flex justify-start
                      items-center
                      "
                      key={t.id}
                      onClick={()=>push('/edit/' + t.id)}
                      >
                      <span className='text-5xl mr-5'>{i}</span>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <h1 className="font-bold">{t.title}</h1>
                          <button 
                            className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
                            //como hay un evento dentro de un contenedor padre se debe evitar la propagacion del evento padre
                            onClick={(e)=>{
                              e.stopPropagation()
                              deleteTask(t.id);
                            }}
                          >
                            <VscTrash className="mr-2"/>
                            Delete
                          </button>
                        </div>
                        <p className="text-gray-300">{t.description}</p>
                        <span className="text-gray-400">{t.id}</span>
                      </div>
                    </div>
                ))}
              </div>
            )
          }
      </div>


 
    </Layout>
  )
}
