// src/components/TaskIdeas.tsx
import { useQuery } from "@tanstack/react-query"
import { fetchApi } from "../services/boredApi"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { useTranslation } from "react-i18next"

export default function TaskIdeas() {
  const { colors } = useTheme()
  const { t } = useTranslation()

  const { data, isLoading, error } = useQuery({
    queryKey: ["task-ideas"],
    queryFn: fetchApi,
  })

  if (isLoading) {
    return (
      <View style={[styles.taskCard, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.taskCard, { backgroundColor: colors.inputBackground, borderColor: colors.inputBorder }]}>
        <Text style={{ color: colors.text }}>{t("home.errorIdeas")}</Text>
      </View>
    )
  }

  return (
    <View
      style={[
        styles.taskCard,
        {
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
        },
      ]}
    >
      <Text style={[styles.taskTitle, { color: colors.text }]}>
        💡 {t("home.taskIdea")}
      </Text>
      <Text style={[styles.taskDescription, { color: colors.text }]}>
        {data?.activity}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  taskCard: {
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
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
  },
})
