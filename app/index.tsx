import { Link, router, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Provider } from "react-native-paper";
import LanguageSelector from "../src/components/LanguageSelector";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useAuth } from "../src/context/AuthContext";
import { useTheme } from "../src/context/ThemeContext";
import { loginUser } from "../src/services/auth";

export default function LoginScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { t } = useTranslation();

  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.push("HomeScreen");
    }
  }, [user, loading, pathname]);

  const styles = getStyles(colors);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert(t("login.alertTitle"), t("login.alertMessage"));
      return;
    }
    try {
      await loginUser(email, senha);
    } catch (error) {
      Alert.alert(t("login.errorTitle"), t("login.errorMessage"));
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>
          {t("login.title")}
        </Text>

        <Text
          style={{ color: colors.text, textAlign: "center", marginBottom: 20 }}
        >
          {t("login.dontHaveAccount")}{" "}
          <Link
            href="RegisterScreen"
            style={{ color: colors.button, textDecorationLine: "underline" }}
          >
            {t("login.registerLink")}
          </Link>
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t("login.emailPlaceholder")}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={t("login.passwordPlaceholder")}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.textoBotao}>{t("login.button")}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <ThemeToggleButton />
          <View style={styles.languageSelectorWrapper}>
            <LanguageSelector />
          </View>
        </View>
      </View>
    </Provider>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      padding: 20,
    },
    titulo: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 20,
    },
    languageSelectorWrapper: {
      marginTop: 16,
      minHeight: 48,
      justifyContent: "center",
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    button: {
      backgroundColor: colors.button,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    textoBotao: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
