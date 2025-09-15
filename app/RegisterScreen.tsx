import { Link } from "expo-router";
import React, { useState } from "react";
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
import { useTheme } from "../src/context/ThemeContext";
import { registerUser } from "../src/services/auth";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { t } = useTranslation();

  const styles = getStyles(colors);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert(t("register.alertTitle"), t("register.alertMessage"));
      return;
    }
    await registerUser(email, senha);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: colors.text }]}>
          {t("register.title")}
        </Text>

        <Text
          style={{ color: colors.text, textAlign: "center", marginBottom: 20 }}
        >
          {t("register.alreadyHaveAccount")}{" "}
          <Link
            href="/"
            style={{ color: colors.button, textDecorationLine: "underline" }}
          >
            {t("register.loginLink")}
          </Link>
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t("register.namePlaceholder")}
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder={t("register.emailPlaceholder")}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder={t("register.passwordPlaceholder")}
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>{t("register.button")}</Text>
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
      color: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    botao: {
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
