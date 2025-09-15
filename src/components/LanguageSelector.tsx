import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import i18n from "../services/i18n";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
] as const;

export default function LanguageSelector() {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "es" | "pt">(
    i18n.language as "en" | "es" | "pt"
  );
  const styles = getStyles(colors);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const selectLanguage = (code: "en" | "es" | "pt") => {
    setLanguage(code);
    i18n.changeLanguage(code);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openMenu}
        style={[styles.button, { backgroundColor: colors.button }]}
      >
        <Text style={[styles.buttonText]}>
          {LANGUAGES.find((lang) => lang.code === language)?.label}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeMenu}>
          <View style={[styles.menu, { backgroundColor: colors.background }]}>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => selectLanguage(item.code)}
                >
                  <Text style={{ color: colors.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 4,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#fff",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    menu: {
      borderRadius: 8,
      paddingVertical: 4,
      width: 200,
      elevation: 4,
    },
    menuItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
