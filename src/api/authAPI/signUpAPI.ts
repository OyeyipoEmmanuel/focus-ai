import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../backend/firebase-config/config"


export const signUpApi = async (email:string, password:string, username:string)=>{
    
    const userCred = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCred?.user

    await updateProfile(user, {
        displayName: username
    })
}