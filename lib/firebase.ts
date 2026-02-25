import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// make sure we have the necessary environment values; if they are missing Firebase
// will throw confusing errors such as "auth/invalid-api-key" at runtime.  You should
// create a `.env.local` file in the project root containing all of these variables
// (they must start with `NEXT_PUBLIC_` so that the client bundle can read them).

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// throw early if any required value is missing so we catch configuration issues at
// build/start time instead of getting vague Firebase errors in the browser.
const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);
if (missing.length > 0) {
    throw new Error(
        `Firebase configuration is incomplete, missing: ${missing.join(", ")}. ` +
        "Make sure you have a .env.local with NEXT_PUBLIC_FIREBASE_* variables."
    );
}

// Initialize Firebase (idempotent)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
