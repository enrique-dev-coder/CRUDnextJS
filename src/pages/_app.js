//se importa el css de tailwind
//https://tailwindcss.com/docs/guides/nextjs
import 'tailwindcss/tailwind.css'
import {TasksProvider} from "../context/TaskContext"

function MyApp({ Component, pageProps }) {
  return (
    <TasksProvider>
      <Component {...pageProps} />
    </TasksProvider>
  ) 
}

export default MyApp
