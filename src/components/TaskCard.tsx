import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Task } from "../../app/HomeScreen";

interface TaskCardProps {
  item: Task;
  colors: any;
  styles: any;
}

export default function TaskCard({ item, colors, styles }: TaskCardProps) {
  const { t } = useTranslation();
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
        {item.title}
      </Text>
      <Text style={[styles.taskDescription, { color: colors.text }]}>
        {item.description}
      </Text>
      <Text style={{ color: colors.text, fontSize: 12 }}>
        {item.completed ? t("home.completed") : t("home.pending")}
      </Text>
      <Text style={styles.taskMeta}>
        {t("home.created")}: {item.createdAt} | {t("home.updated")}:{" "}
        {item.updatedAt}
      </Text>
      <Text style={styles.taskMeta}>
        {t("home.due")}: {item.dueDate}
      </Text>
    </View>
  );
}
