import { auth } from "./firebase-config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  updatePassword,
} from "firebase/auth"

//auth.js - zajištění funkcionalit přihlašování, registrace, loginu, obecně všeho
// co má co dočinění s firebase/auth

export const currentUser = auth?.currentUser

export async function registerUser(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function authListener(setAuth) {
  onAuthStateChanged(auth, (user) => {
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

export async function changePassword(newPassword) {
  try {
    await updatePassword(auth.currentUser, newPassword)
  } catch (error) {
    console.error("Error while changing password: ", error)
  }
}
