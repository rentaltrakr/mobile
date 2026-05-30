import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const currentLangLabel = i18n.language === "fr" ? "FR" : "EN";

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.container}
      >
        <Text style={styles.text}>🌐 {currentLangLabel} ▼</Text>
      </TouchableOpacity>

      {isOpen && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setIsOpen(false)} />
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={[
                styles.option,
                i18n.language === "en" && styles.activeOption,
              ]}
              onPress={() => selectLanguage("en")}
            >
              <Text
                style={[
                  styles.optionText,
                  i18n.language === "en" && styles.activeOptionText,
                ]}
              >
                English
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={[
                styles.option,
                i18n.language === "fr" && styles.activeOption,
              ]}
              onPress={() => selectLanguage("fr")}
            >
              <Text
                style={[
                  styles.optionText,
                  i18n.language === "fr" && styles.activeOptionText,
                ]}
              >
                Français
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 9999,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0, 122, 255, 0.08)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 122, 255, 0.15)",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  backdrop: {
    position: "fixed" as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9998,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 8,
    width: 140,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    zIndex: 9999,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  activeOption: {
    backgroundColor: "rgba(0, 122, 255, 0.05)",
  },
  optionText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  activeOptionText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginHorizontal: 10,
  },
});
