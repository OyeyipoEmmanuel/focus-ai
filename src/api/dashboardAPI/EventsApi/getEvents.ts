import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";
import type { addEventValidationSchemaType } from "../../../schemas/events/addEventValidationSchema";

type GetTypes = {
  onData: (events: addEventValidationSchemaType[]) => void;
  onError?: (error: Error) => void;
};

export const getAllEvents = ({ onData, onError }: GetTypes) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    onError && onError(new Error("Authentication Failed!"));
    return;
  }

  const q = query(
    collection(db, "users", userId, "events"),
    orderBy("eventDate", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const events: addEventValidationSchemaType[] = snapshot.docs.map(
        (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as addEventValidationSchemaType;
        }
      );

      onData(events);
    },
    (error) => {
      onError && onError(error);
    }
  );
  return unsubscribe;
};
