import {
  COUNTRIES,
  Country,
  CountryCodePicker,
} from "@/components/CountryCodePicker";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { presets } from "@/theme/typography";
import { storage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
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

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default to US
  const router = useRouter();
  const { t } = useTranslation("auth");

  const handleRegister = async () => {
    console.log("Registering user:", {
      fullName,
      email,
      phoneNumber,
      password,
    });

    try {
      // TODO: Replace with actual registration API call
      // For now, we'll simulate a successful registration

      // After successful registration, you can either:
      // Option 1: Auto-login the user
      await storage.setIsAuthenticated(true);
      await storage.setUserToken("dummy-token-" + Date.now());
      router.replace("/email-verified");

      // Option 2: Send them to login (uncomment below and comment above)
      // router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (show error message to user)
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.switcherContainer}>
        <LanguageSwitcher />
      </View>

      <View style={styles.content}>
        {/* Progress Indicator */}
        {/* <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.stepText}>{t("step_of", { current: 1, total: 3 })}</Text>
            <Text style={styles.stepLabel}>{t("step_personal_info")}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View> */}

        {/* Title and Subtitle */}
        <Text style={[presets.h1, styles.title]}>
          {t("create_profile_title")}
        </Text>
        <Text style={[presets.body, styles.subtitle]}>
          {t("create_profile_subtitle")}
        </Text>

        {/* Full Name Input */}
        <Text style={styles.label}>{t("label_full_name")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("placeholder_full_name")}
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        {/* Email Input */}
        <Text style={styles.label}>{t("label_email")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("placeholder_email")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Phone Number Input */}
        <Text style={styles.label}>{t("label_phone")}</Text>
        <View style={styles.phoneContainer}>
          <CountryCodePicker
            selectedCountry={selectedCountry}
            onSelect={setSelectedCountry}
          />
          <TextInput
            style={styles.phoneInput}
            placeholder={t("placeholder_phone")}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password Input */}
        <Text style={styles.label}>{t("label_password")}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={t("placeholder_password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textLight}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordHint}>{t("password_hint")}</Text>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t("btn_continue_rental")}</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.surface} />
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.back()}
        >
          <Text style={styles.linkText}>
            {t("link_have_account")}{" "}
            <Text style={styles.linkBold}>{t("link_log_in")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    padding: layout.gutter,
    paddingTop: spacing.xl * 2,
  },
  switcherContainer: {
    position: "absolute",
    top: 30,
    right: 15,
    zIndex: 10,
  },
  content: {
    width: "100%",
    marginTop: 20,
  },
  progressContainer: {
    marginBottom: spacing.xl,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  stepLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "33.33%",
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textLight,
    lineHeight: 22,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
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
  phoneContainer: {
    flexDirection: "row",
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  passwordInput: {
    flex: 1,
    padding: spacing.lg,
    fontSize: 16,
  },
  eyeButton: {
    padding: spacing.md,
  },
  passwordHint: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
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
    color: colors.textLight,
    fontSize: 14,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: "600",
  },
});
