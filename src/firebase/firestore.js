import { onSnapshot, doc, setDoc, addDoc, deleteDoc, collection } from "firebase/firestore"
import { db } from "./firebase-config"

//zajištění crud operací, obecně vše co má co dočinění s firebase/firestore

export function callendarOnSnapshot(email, setData, setUnsub) {
  try {
    const unsub = onSnapshot(collection(db, "users", email, "callendar"), (snap) => {
      const temp = snap.docs.map((doc) => {
        const obj = doc.data()
        return { ...obj, start: obj?.start?.toDate() || new Date(), end: obj?.end?.toDate() || new Date(), id: doc.id }
      })
      console.log("?????")
      setData(temp)
    })
    if (unsub) setUnsub(() => () => unsub())
  } catch (error) {
    console.error("Error durring callendarOnSnapshot: ", error)
  }
}

export async function addNewEntry(data, email) {
  try {
    const docRef = await addDoc(collection(db, "users", email, "callendar"), {
      title: data.title,
      start: data.start,
      end: data.end,
    })
  } catch (error) {
    console.error("Error while adding new entry: ", error)
  }
}

export async function updateEntry(data, email) {
  try {
    const docRef = await setDoc(doc(db, "users", email, "callendar", data.id), {
      title: data.title,
      start: data.start,
      end: data.end,
    })
  } catch (error) {
    console.error("Error while updating entry: ", error)
  }
}

export async function deleteEntry(data, email) {
  try {
    const docRef = await deleteDoc(doc(db, "users", email, "callendar", data.id))
  } catch (error) {
    console.error("Error while updating entry: ", error)
  }
}
