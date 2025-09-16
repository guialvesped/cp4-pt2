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


export const scheduleTaskNotification = async (dueDate: string, taskName: string) => {
  const due = new Date(dueDate);
  const notifyAt = new Date(due);
  notifyAt.setDate(due.getDate() - 1); // 1 dia antes

  const secondsUntilNotify = Math.floor((notifyAt.getTime() - Date.now()) / 1000);
  if (secondsUntilNotify > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📌 Lembrete de tarefa",
        body: `Falta 1 dia para: ${taskName}`,
        sound: "default",
      },
      trigger: {
        type: "timeInterval",
        seconds: secondsUntilNotify,
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });
  }
};

