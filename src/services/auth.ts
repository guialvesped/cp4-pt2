import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado:", userCredential.user);
  } catch (error: any) {
    console.error("Erro ao registrar:", error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
        const user = userCredential.user
        console.log(user)
        await AsyncStorage.setItem('@user',JSON.stringify(user))
        router.push('/HomeScreen')
      })
    return userCredential;
  } catch (error: any) {
    console.error("Erro no login:", error.message);
  }
};
