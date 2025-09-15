import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggleButton() {
  const { toggleTheme, colors, theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Feather
        name="sun"
        size={24}
        color={isDark ? colors.buttonText : "#facc15"}
      />

      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        trackColor={{ false: "#d1d5db", true: "#374151" }}
        thumbColor={isDark ? "#facc15" : "#3b82f6"}
        style={styles.switch}
      />

      <AntDesign
        name="moon"
        size={24}
        color={!isDark ? colors.buttonText : "#facc15"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    gap: 10,
  },
  switch: {
    marginHorizontal: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
