import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../backend/firebase-config/config"

export const loginApi = async (email:string, password:string)=>{
    await signInWithEmailAndPassword(auth, email, password)
}