import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";
import type { addTaskValidationSchemaType } from "../../../schemas/tasks/addTaskValidationSchema";

// Delete Task
export const deleteTask = async (taskId: string) => {
  const userid = auth.currentUser?.uid;

  if (!userid) return "Authentication Failed!";

  const q = doc(db, "users", userid, "tasks", taskId);

  await deleteDoc(q);

  return "Deleted!";
};

// Edit task
export const editTask = async (
  taskId: string,
  data: addTaskValidationSchemaType
) => {
  const userid = auth.currentUser?.uid;

  if (!userid) return "Authentication Failed!";

  const q = doc(db, "users", userid, "tasks", taskId);

  try {
    await updateDoc(q, {
      ...data,
    });

    return "Successful";
  } catch (e) {
    return `Error - ${e}`;
  }
};
