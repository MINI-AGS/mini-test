import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import db from "../firebaseConfig.ts";

const example = async () => {
  try {
    await setDoc(doc(db, "ejemplos", "Ejemplo1"), {
      name: "Ejemplo1",
      description: "Este es un ejemplo de como escribir en la base de datos",
    });
    console.log("Document successfully written!");

    const docRef = doc(db, "ejemplos", "Ejemplo1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }

    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
};

export default example;
