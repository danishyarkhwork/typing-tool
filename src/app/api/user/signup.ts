import { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // Ensure this path is correct

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return res
        .status(200)
        .json({ message: "User created successfully", user });
    } catch (error: any) {
      console.error("Error during sign up:", error.message);
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
