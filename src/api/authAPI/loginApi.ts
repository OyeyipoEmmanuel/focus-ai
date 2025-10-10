import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../backend/firebase-config/config"

export const loginApi = async (email:string, password:string)=>{
    await signInWithEmailAndPassword(auth, email, password)
}

export const logOutApi = async()=>{
    await signOut(auth)
    console.log("logged out")
}