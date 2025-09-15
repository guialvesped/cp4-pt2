import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useTheme } from "../src/context/ThemeContext";
import { registerUser } from "../src/services/auth";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();
  const styles = getStyles(colors);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }
    await registerUser(email, senha);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titulo, { color: colors.text }]}>Criar Conta1</Text>
      <ThemeToggleButton />
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={[styles.textoBotao, { color: colors.text }]}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
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
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      backgroundColor: "#1E1E1E",
      color: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#333",
    },
    botao: {
      backgroundColor: "#00B37E",
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
