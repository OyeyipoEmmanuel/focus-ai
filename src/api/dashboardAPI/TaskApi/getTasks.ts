import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../../backend/firebase-config/config";
import type { addTaskValidationSchemaType } from "../../../schemas/addTaskValidationSchema";
import dayjs from "dayjs";

type GetTasksParams = {
  onData: (tasks: addTaskValidationSchemaType[]) => void;
  onError: (error: Error) => void;
};



// Get All tasks
export const getAllTasks = ({ onData, onError }: GetTasksParams) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    onError(new Error("Authentication Failed!"));
    return () => {};
  }

  const q = query(
    collection(db, "users", userId, "tasks"),
    orderBy("dueDate", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const tasks: addTaskValidationSchemaType[] = querySnapshot.docs.map(
        (doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as addTaskValidationSchemaType;
        }
      );

      onData(tasks);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};

// Get Today Tasks
export const getTodayTasks = ({ onData, onError }: GetTasksParams) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    onError(new Error("Authentication Failed!"));
    return () => {};
  }

  const q = query(
    collection(db, "users", userId, "tasks"),
    orderBy("dueDate", "desc")
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const todayDate = dayjs().format("YYYY-MM-DD");
      const tasks = querySnapshot.docs.filter(
        (doc) => doc.data().dueDate === todayDate
      );

      const filteredTask: addTaskValidationSchemaType[] = tasks.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as addTaskValidationSchemaType;
      });

      onData(filteredTask);
    },
    (error) => {
      onError(error);
    }
  );

  return unsubscribe;
};

//Get Upcoming Tasks

export const getUpcomingTasks = ({ onData, onError }: GetTasksParams) => {
  const userId = auth.currentUser?.uid;

  if (!userId) {
    onError(new Error("Authentication Failed!"));
    return () => {};
  }

  const q = query(
    collection(db, "users", userId, "tasks"),
    orderBy("dueDate", "desc")
  );
  const todayDate = dayjs().format("YYYY-MM-DD");

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tasks = querySnapshot.docs.filter((doc) =>
      dayjs(doc.data().dueDate).isAfter(todayDate, "day")
    );

    const filteredTask = tasks.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as addTaskValidationSchemaType;
    });

    onData(filteredTask);
  });

  return unsubscribe;
};

// Get Completed Tasks
export const getCompletedTasks = ({ onData, onError }: GetTasksParams) => {
  const userId = auth.currentUser?.uid;
  
  if (!userId) {
    onError(new Error("Authentication Failed!"));
    return () => {};
  }

  const q = query(
    collection(db, "users", userId, "tasks"),
    orderBy("dueDate", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tasks = querySnapshot.docs.filter((doc)=>(
      doc.data().completed === true
    ))

    const filteredTask = tasks.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as addTaskValidationSchemaType;
    });

    onData(filteredTask);
  });

  return unsubscribe;
};