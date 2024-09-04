import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure the path is correct

// Save user typing test results
export const saveTestResult = async (userId: string, result: any) => {
  try {
    const docRef = await addDoc(collection(db, "testResults"), {
      userId,
      result,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};
