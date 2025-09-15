import { Stack } from "expo-router";
import { View } from "react-native";
import ThemeProvider from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";

export default function Layout() {
  return (
    
    <ThemeProvider>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}
