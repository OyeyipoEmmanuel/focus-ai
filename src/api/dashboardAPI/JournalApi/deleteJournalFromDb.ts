import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";

export const deleteJournalFromDb = async (
  journalId: string
): Promise<string> => {
  const userId = auth.currentUser?.uid;

  if (!userId) return "Authentication Error";

  try {
    await deleteDoc(doc(db, "users", userId, "journals", journalId));
    return "Journal Deleted!";
  } catch {
    return "An Error Occured!";
  }
};
