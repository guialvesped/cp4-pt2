import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../../app/HomeScreen";
import { Icon } from "react-native-paper";
import { db, deleteDoc, doc, updateDoc } from "../services/firebaseConfig";

interface TaskCardProps {
  item: Task;
  colors: any;
  styles: any;
}

export default function TaskCard({ item, colors, styles }: TaskCardProps) {
  const { t } = useTranslation();

  const toggleCompleted = async () => {
    try {
      const taskRef = doc(db, "items", item.id);
      await updateDoc(taskRef, {
        completed: !item.completed, 
        updatedAt: new Date().toISOString(), 
      });
    } catch (error) {
      console.log("Erro ao atualizar task:", error);
    }
  };

  const deleteTask = async () => {
    Alert.alert("Deseja Excluir?", "Essa ação não poderá ser desfeita", [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => await deleteDoc(doc(db, 'items', item.id))
      }
    ],{cancelable:true})

  }


  return (
    <View
      style={[
        styles.taskCard,
        {
          backgroundColor: colors.inputBackground,
          borderColor: colors.inputBorder,
          gap: 10,
        },
      ]}
    >
      <View>
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
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity 
          onPress={toggleCompleted}
          style={{backgroundColor: 'green', padding: 8, borderRadius: 4, width: 40}}
        >
          <Icon source='check' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={deleteTask}
          style={{backgroundColor: 'red', padding: 8, borderRadius: 4, width: 40}}
        >
          <Icon source='delete' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
