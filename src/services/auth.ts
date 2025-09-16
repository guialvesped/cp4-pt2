import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuário registrado:", userCredential.user);
  } catch (error: any) {
    console.error("Erro ao registrar:", error.message);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Login realizado:", user.uid);

    await AsyncStorage.setItem("@user", JSON.stringify(user));

    return userCredential;
  } catch (error: any) {
    console.error("Erro no login:", error.message);
    throw error;
  }
};
