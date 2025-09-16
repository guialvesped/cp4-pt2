import { Stack } from "expo-router";
import { View } from "react-native";
import ThemeProvider from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";
import QueryClientProvider from "../src/context/QueryClientProvider";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "../src/services/notification";

export default function Layout() {

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);


  return (
    
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
