import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../backend/firebase-config/config"
import { useEffect, useState } from "react"

export const useGetUsername = () => {
    const [username, setUsername] = useState<string>("")

    !navigator.onLine && console.log("Oops, seems you are offline")
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsername(user?.displayName ?? "No display name")
        })

        return () => unsubscribe()
    }, [])

    return username
}

export const useGetEmail = () => {
    const [email, setEmail] = useState<string>("")
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setEmail(user?.email ?? "No email")
        })

        return () => unsubscribe()
    }, [])

    return email
}

