import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../backend/firebase-config/config";
import { doc, setDoc } from "firebase/firestore";

export const signUpApi = async (
  email: string,
  password: string,
  username: string
) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred?.user;

  if (!user) throw new Error("Not registered yet");
  await updateProfile(user, {
    displayName: username,
  });

  await setDoc(doc(db, "users", user.uid), {
    userInfo: {
      createdAt: user.metadata.creationTime,
      email: user.email,
      username: user.displayName,
    },
  });
};
