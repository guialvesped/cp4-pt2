import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSelector from "../src/components/LanguageSelector";
import TaskCard from "../src/components/TaskCard";
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import { useTheme } from "../src/context/ThemeContext";
import { collection, db, getDocs } from "../src/services/firebaseConfig";
import { useEffect, useState } from "react";
import { onSnapshot, Timestamp } from "firebase/firestore";
import TaskIdeas from "../src/components/TaskIdeas";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const mockTasks = [
  {
    id: "1",
    title: "Estudar React Native",
    description: "Revisar componentes e hooks principais.",
    completed: false,
    dueDate: "2025-09-20",
    createdAt: "2025-09-10",
    updatedAt: "2025-09-12",
  },
  {
    id: "2",
    title: "Finalizar projeto",
    description: "Terminar as telas e integração com backend.",
    completed: true,
    dueDate: "2025-09-15",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-14",
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = getStyles(colors);

  const [tasksList, setTasksList] = useState<Task[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (querySnapshot) => {
      const items: Task[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const parseDate = (value: any) => {
          if (!value) return "";
          if (value instanceof Timestamp) return value.toDate().toISOString();
          return value;
        };

        items.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          completed: data.completed,
          dueDate: parseDate(data.dueDate),
          createdAt: parseDate(data.createdAt),
          updatedAt: parseDate(data.updatedAt),
        });
      });

      setTasksList(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <ThemeToggleButton />
        <LanguageSelector />
      </View>
      <TaskIdeas/>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={[styles.header, { color: colors.text }]}>
          {t("home.title")}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/CreateTaskScreen")}
        >
          <AntDesign name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>


      {tasksList.length<=0?<ActivityIndicator/>:(
        <FlatList
          data={tasksList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard item={item} colors={colors} styles={styles} />
          )}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            <Text style={{ color: colors.text }}>{t("home.empty")}</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 16,
      marginBottom: 8,
    },
    button: {
      backgroundColor: colors.button,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    taskCard: {
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    taskDescription: {
      fontSize: 14,
      marginBottom: 8,
    },
    taskMeta: {
      fontSize: 12,
      color: "#888",
    },
  });
