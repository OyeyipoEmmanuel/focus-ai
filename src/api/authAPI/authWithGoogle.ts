import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../backend/firebase-config/config";

export const authWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    // const token = credential?.accessToken;
    
    return {res}
    
  } catch (error) {
    console.error(error)
  }
};
