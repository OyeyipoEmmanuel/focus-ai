import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../../backend/firebase-config/config"
import type { addTaskValidationSchemaType } from "../../../schemas/tasks/addTaskValidationSchema"

export const addTaskToDb = async(data: addTaskValidationSchemaType)=>{
    const uid = auth.currentUser?.uid

    if (!uid) throw new Error("No userID")

   await addDoc(collection(db, "users", uid, "tasks"), data)
}