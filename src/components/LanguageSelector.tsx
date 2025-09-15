import * as React from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";
import i18n from "../services/i18n";

export default function LanguageSelector() {
  const { colors } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [language, setLanguage] = React.useState<"en" | "es" | "pt">(
    i18n.language as "en" | "es" | "pt"
  );

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 4,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="contained"
            onPress={openMenu}
            style={{ backgroundColor: colors.button }}
          >
            {language === "en"
              ? "English"
              : language === "es"
              ? "Español"
              : "Português"}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            setLanguage("en");
            i18n.changeLanguage("en");
            closeMenu();
          }}
          title="English"
        />
        <Menu.Item
          onPress={() => {
            setLanguage("es");
            i18n.changeLanguage("es");
            closeMenu();
          }}
          title="Español"
        />
        <Menu.Item
          onPress={() => {
            setLanguage("pt");
            i18n.changeLanguage("pt");
            closeMenu();
          }}
          title="Português"
        />
      </Menu>
    </View>
  );
}
