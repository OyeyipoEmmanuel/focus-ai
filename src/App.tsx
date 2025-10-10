import { useNavigate, useRoutes } from "react-router-dom"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "./backend/firebase-config/config"
import { useEffect, useState } from "react"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import { routes } from "./routes/routes"


function App() {



  const routing = useRoutes(routes)

  return routing;

  
}

export default App
