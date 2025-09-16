import { Stack } from "expo-router";
import { View } from "react-native";
import ThemeProvider from "../src/context/ThemeContext";
import { AuthProvider } from "../src/context/AuthContext";
import QueryClientProvider from "../src/context/QueryClientProvider";

export default function Layout() {
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
