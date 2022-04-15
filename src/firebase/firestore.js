import { onSnapshot, doc, setDoc, addDoc, deleteDoc, collection } from "firebase/firestore"
import { db } from "./firebase-config"

export function callendarOnSnapshot(email, setData) {
  try {
    const unsub = onSnapshot(collection(db, "users", email, "callendar"), (snap) => {
      const temp = snap.docs.map((doc) => {
        const obj = doc.data()
        return { ...obj, date: obj?.date?.toDate() || new Date() }
      })
      console.log(temp)
      setData(temp)
    })
    if (!email) unsub()
  } catch (error) {
    console.error("Error durring callendarOnSnapshot: ", error)
  }
}

// export async function setIpfsLink(newLink) {
//     try {
//       const docRef = doc(db, "data", "ipfsStorage")
//       await setDoc(docRef, { uri: newLink }, { merge: true })
//     } catch (error) {
//       console.error("Error while setting ipfsLink: ", error)
//     }
//   }
