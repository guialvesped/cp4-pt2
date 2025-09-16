import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Alert, Button } from "react-native";
import { auth } from "../services/firebaseConfig";

export default function LogoutButton() {
  const { t } = useTranslation();
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

              router.push("/");
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

  return <Button title={t("home.logout")} onPress={handleLogout} color="red" />;
}
