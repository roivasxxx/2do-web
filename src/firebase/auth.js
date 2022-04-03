import { auth } from "./firebase-config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth"

export async function registerUser(email, password) {
  try {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(userCredential)
    })
  } catch (error) {
    console.error("Error while registering user: ", error)
  }
}

export async function login(email, password) {
  try {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("Login :", userCredential)
    })
  } catch (error) {
    console.error("Error while loging in: ", error)
  }
}

export async function authListener(setAuth) {
  await setPersistence(auth, browserSessionPersistence).then(() => {
    onAuthStateChanged(auth, (user) => {
      setAuth(user)
    })
  })
}
