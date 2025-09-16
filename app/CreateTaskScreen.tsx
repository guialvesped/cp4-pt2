import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { useTheme } from "../src/context/ThemeContext";
import { addDoc, collection, db } from "../src/services/firebaseConfig";
import { scheduleTaskNotification } from "../src/services/notification";

export default function CreateTaskScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const completed = false;
  const [dueDate, setDueDate] = useState("");
  const createdAt = Timestamp.fromDate(new Date());
  const updatedAt = Timestamp.fromDate(new Date());
  const dueDateTimestamp = dueDate
    ? Timestamp.fromDate(new Date(dueDate))
    : null;

  const styles = getStyles(colors);

  const salvarItem = async () => {
    if (!title.trim()) {
      alert(t("createTask.validationTitle"));
      return;
    }

    if (!description.trim()) {
      alert(t("createTask.validationDescription"));
      return;
    }

    if (!dueDate.trim() || isNaN(new Date(dueDate).getTime())) {
      alert(t("createTask.validationDueDate"));
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "items"), {
        userId: user?.uid,
        title: title,
        description: description,
        completed: completed,
        dueDate: dueDateTimestamp,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      await scheduleTaskNotification(title, dueDate);

      console.log("Task criada com o ID:", docRef.id);
      router.push("HomeScreen");
    } catch (e) {
      console.log("Erro ao criar o Task", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("createTask.title")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("createTask.namePlaceholder")}
        placeholderTextColor={colors.inputBorder}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder={t("createTask.descriptionPlaceholder")}
        placeholderTextColor={colors.inputBorder}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder={t("createTask.dueDatePlaceholder") || "Prazo"}
        placeholderTextColor={colors.inputBorder}
        value={dueDate}
        onChangeText={setDueDate}
      />
      <TouchableOpacity style={styles.button} onPress={salvarItem}>
        <Text style={styles.buttonText}>{t("createTask.button")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => router.push("HomeScreen")}
      >
        <Text
          style={{ color: colors.button, fontSize: 18, fontWeight: "bold" }}
        >
          {t("createTask.back")}
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
      padding: 20,
      justifyContent: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      backgroundColor: colors.inputBackground,
      color: colors.text,
      borderRadius: 10,
      padding: Platform.OS === "ios" ? 15 : 10,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.inputBorder,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      gap: 10,
    },
    button: {
      backgroundColor: colors.button,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonBack: {
      borderColor: colors.button,
      borderWidth: 2,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
