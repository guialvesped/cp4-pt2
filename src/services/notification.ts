import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () =>({
    shouldShowBanner:true,
    shouldShowList:true,
    shouldPlaySound:true, 
    shouldSetBadge:false 
  })
});

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permissão para notificações não foi concedida!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    alert("Precisa de um dispositivo físico para notificações push!");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}


export const scheduleTaskNotification = async (taskName: string, dueDate: string) => {
  const due = new Date(dueDate);

  const diffMs = due.getTime() - Date.now();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "📌 Nova tarefa criada",
      body: `Faltam ${daysLeft} dia(s) para concluir: ${taskName}`,
      sound: "default",
    },
    trigger: { seconds: 10 } as Notifications.TimeIntervalTriggerInput, 
  });
};
