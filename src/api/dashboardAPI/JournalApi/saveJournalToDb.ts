import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { auth, db } from "../../../backend/firebase-config/config";

type SaveJournalPayload = {
  id?: string;
  content: string;
  journalDate: string;
};

export const saveJournalToDb = async (
  data: SaveJournalPayload
): Promise<string> => {
  const userId = auth.currentUser?.uid;

  if (!userId) return "Authentication Error";

  const timestamp = dayjs().toISOString();

  try {
    if (data.id) {
      await updateDoc(doc(db, "users", userId, "journals", data.id), {
        content: data.content,
        journalDate: data.journalDate,
        updatedAt: timestamp,
      });

      return "Journal Updated!";
    }

    await addDoc(collection(db, "users", userId, "journals"), {
      content: data.content,
      journalDate: data.journalDate,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return "Journal Saved!";
  } catch {
    return "An Error Occured!";
  }
};
