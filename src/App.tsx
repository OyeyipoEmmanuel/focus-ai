import { useNavigate, useRoutes } from "react-router-dom"
import routes from "./routes/route"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./backend/firebase-config/config"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login')
        return;
      }
    })

    return ()=>unsubscribe()
  }, [])


  const routing = useRoutes(routes)

  return routing
}

export default App
