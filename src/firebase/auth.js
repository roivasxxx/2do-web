import { auth } from "./firebase-config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth"

export const currentUser = auth?.currentUser

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
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {})
  } catch (error) {
    console.error("Error while loging in: ", error)
  }
}

export async function authListener(setAuth) {
  onAuthStateChanged(auth, (user) => {
    console.log("listener: ", user)
    setAuth(user)
  })
}

export async function setAuthPersistence() {
  await setPersistence(auth, browserSessionPersistence)
}

export async function logOut() {
  try {
    await auth.signOut()
  } catch (error) {
    console.error("Error while loging out: ", error)
  }
}
