import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { storage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation("auth");

  const handleLogin = async () => {
    console.log("Logging in:", email);

    try {
      // Mock login: role based on email prefix
      const isAdmin = email.toLowerCase().includes("admin");
      const isLandlord = email.toLowerCase().includes("landlord");
      const roles = isAdmin ? ["admin"] : isLandlord ? ["landlord"] : ["tenant"];

      const user = {
        id: "mock-user-1",
        email,
        firstName: isAdmin ? "Admin" : isLandlord ? "Landlord" : "Tenant",
        lastName: "User",
        roles,
      };

      await storage.setIsAuthenticated(true);
      await storage.setUserToken("dummy-token-" + Date.now());
      await storage.setUserRoles(roles);

      dispatch(setCredentials({ user, token: "dummy-token-" + Date.now() }));

      const tabRoute = roles.includes("admin")
        ? "/(tabs-admin)"
        : roles.includes("landlord")
          ? "/(tabs-landlord)"
          : "/(tabs-tenant)";
      router.replace(tabRoute as any);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Language Switcher */}
      <View style={styles.switcherContainer}>
        <LanguageSwitcher />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo & Branding */}
        <View style={styles.brandingContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="home" size={36} color={colors.surface} />
          </View>
          <Text style={styles.brandName}>{t("welcome_header")}</Text>
          <Text style={styles.tagline}>{t("login_tagline")}</Text>
        </View>

        {/* Sign In Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{t("sign_in")}</Text>

          {/* Email Input */}
          <Text style={styles.label}>{t("label_email")}</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder={t("placeholder_login_email")}
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.passwordLabelRow}>
            <Text style={styles.label}>{t("label_password")}</Text>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>{t("forgot_password")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder={t("placeholder_password")}
              placeholderTextColor={colors.textLight}
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

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t("btn_login")}</Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t("or_divider")}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue with Google */}
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleIcon}>
              <Text style={styles.googleG}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>{t("continue_google")}</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.linkText}>
            {t("link_no_account")}{" "}
            <Text style={styles.linkBold}>{t("link_create_account")}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  switcherContainer: {
    position: "absolute",
    top: 50,
    right: 15,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  brandingContainer: {
    alignItems: "center",
    marginTop: spacing.xl + 20,
    marginBottom: spacing.xl,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: layout.borderRadius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 14,
    color: colors.textLight,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.xl,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  forgotPassword: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  inputIcon: {
    paddingLeft: spacing.lg,
  },
  inputField: {
    flex: 1,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  eyeButton: {
    padding: spacing.md,
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  loginButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: colors.textLight,
    marginHorizontal: spacing.md,
    fontWeight: "500",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  googleIcon: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  googleG: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: "bold",
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
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
