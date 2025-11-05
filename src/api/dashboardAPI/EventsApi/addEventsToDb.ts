import { addDoc, collection } from "firebase/firestore";
import type { addEventValidationSchemaType } from "../../../schemas/events/addEventValidationSchema";
import { auth, db } from "../../../backend/firebase-config/config";

export const addEventsToDb = async (
  data: addEventValidationSchemaType
): Promise<string> => {
  const userId = auth.currentUser?.uid;

  if (!userId) return "Authentication Error";

  const q = collection(db, "users", userId, "events");

  try {
    await addDoc(q, data);

    return "Event Added!";
  } catch (error) {
    return "An Error Occured!";
  }
};
