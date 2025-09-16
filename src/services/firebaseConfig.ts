import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {  initializeAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const{getReactNativePersistence} = require("firebase/auth") as any;

const firebaseConfig = {
  apiKey: "AIzaSyCYxLC07vMc4Km_yfGBhlO_qEi1diJn5S0",
  authDomain: "cp4-pt2-e50b3.firebaseapp.com",
  projectId: "cp4-pt2-e50b3",
  storageBucket: "cp4-pt2-e50b3.firebasestorage.app",
  messagingSenderId: "600602350750",
  appId: "1:600602350750:web:40d9e327e42543c87e178f",
  measurementId: "G-38XS1WEQK2",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(AsyncStorage) 
})

export { addDoc, auth, collection, db, deleteDoc, doc, getDocs, updateDoc, query, where };
