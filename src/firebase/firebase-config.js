import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth"

//konfigurace firebase

const firebaseConfig = {
  apiKey: "AIzaSyA6N5uJZlJfV-OmlXnZc-FCpGWOPCpei7w",
  authDomain: "doweb-9c07a.firebaseapp.com",
  projectId: "doweb-9c07a",
  storageBucket: "doweb-9c07a.appspot.com",
  messagingSenderId: "1096446565667",
  appId: "1:1096446565667:web:fa7e5e779bb2d0ffca8096",
  measurementId: "G-8Z8CD6QGYL",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
