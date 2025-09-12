import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHTuyg21jIV_9BuxGL3YB5yG9oO2_XQcc",
  authDomain: "cp4-pt2.firebaseapp.com",
  projectId: "cp4-pt2",
  storageBucket: "cp4-pt2.firebasestorage.app",
  messagingSenderId: "257312449889",
  appId: "1:257312449889:web:45e30e3ec5746ffa185120",
  measurementId: "G-38XS1WEQK2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = getAuth(app)
export{auth,db,collection,addDoc,getDocs,doc,updateDoc,deleteDoc}