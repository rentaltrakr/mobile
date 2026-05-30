import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { presets } from "@/theme/typography";
import { storage } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { t } = useTranslation("auth");

  const handleLogin = async () => {
    console.log("Requesting OTP for:", email);
    
    try {
      // TODO: Replace with actual authentication logic
      // For now, we'll simulate a successful login
      
      // Store authentication status
      await storage.setIsAuthenticated(true);
      // Optionally store a token
      await storage.setUserToken("dummy-token-" + Date.now());
      
      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.switcherContainer}>
        <LanguageSwitcher />
      </View>

      <View style={styles.content}>
        <Text style={[presets.h1, { textAlign: "center" }]}>
          {t("welcome_title")}
        </Text>
        <Text style={[presets.body, styles.subtitle]}>
          {t("login_subtitle")}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t("placeholder_email")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t("btn_get_otp")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.linkText}>{t("link_go_register")}</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: layout.gutter,
  },
  switcherContainer: {
    position: "absolute",
    top: 50,
    right: 15,
    zIndex: 10,
  },
  content: {
    width: "100%",
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    color: colors.textLight,
    textAlign: "center",
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
