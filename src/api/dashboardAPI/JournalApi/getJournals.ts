import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";
import type { journalValidationSchemaType } from "../../../schemas/journal/journalValidationSchema";

type GetJournalsParams = {
  onData: (journals: journalValidationSchemaType[]) => void;
  onError?: (error: Error) => void;
};

export const getAllJournals = ({ onData, onError }: GetJournalsParams) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    onError?.(new Error("Authentication Failed!"));
    return;
  }

  const q = query(
    collection(db, "users", userId, "journals"),
    orderBy("journalDate", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const journals: journalValidationSchemaType[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as journalValidationSchemaType
      );

      onData(journals);
    },
    (error) => {
      onError?.(error);
    }
  );

  return unsubscribe;
};
