import { Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              await AsyncStorage.removeItem("@user");

              router.replace("/login");
            } catch (error) {
              console.log("Erro ao deslogar:", error);
              Alert.alert("Erro", "Não foi possível realizar o logout.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return <Button title="Sair" onPress={handleLogout} color="red" />;
}