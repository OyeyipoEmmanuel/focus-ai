import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";

export const updateTaskCompletion = async (
  taskId: string,
  isCompleted: boolean
) => {
  const user = auth.currentUser?.uid;

  if (!user) return new Error("Not Authenticated");

  const taskRef = doc(db, "users", user, "tasks", taskId);

  await updateDoc(taskRef, {
    completed: isCompleted,
  });
};
