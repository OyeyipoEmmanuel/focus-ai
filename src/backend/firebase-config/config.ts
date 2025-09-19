import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const processEnv = import.meta.env

const firebaseConfig = {
  apiKey: processEnv.VITE_API_KEY,
  authDomain: processEnv.VITE_AUTH_DOMAIN,
  projectId: processEnv.VITE_PROJECTID,
  storageBucket: processEnv.VITE_STORAGE_BUCKET,
  messagingSenderId: processEnv.VITE_MESSAGING_SENDERID,
  appId: processEnv.VITE_APPID,
  measurementId: processEnv.VITE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)