import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { storage } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
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
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("auth");

  const handleUseMyLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log(t("permission_location_denied"));
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;

      // Reverse geocoding to get address
      let addressResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResult.length > 0) {
        const address = addressResult[0];
        const cityArea =
          `${address.city || ""}, ${address.region || ""}`.trim();
        setLocation(cityArea);
      }
    } catch (error) {
      console.error(t("error_getting_location"), error);
    }
  };

  const handleRegister = async () => {
    if (!agreeToTerms) {
      console.log(t("error_must_agree"));
      return;
    }

    if (password !== confirmPassword) {
      console.log(t("error_passwords_mismatch"));
      return;
    }

    console.log(t("registering_user"), {
      fullName,
      email,
      phoneNumber,
      location,
      password,
    });

    try {
      // TODO: Replace with actual registration API call
      await storage.setIsAuthenticated(true);
      await storage.setUserToken("dummy-token-" + Date.now());
      router.replace({ pathname: "/email-verified", params: { email } });
    } catch (error) {
      console.error(t("error_registering"), error);
    }
  };

  return (
    <ScreenContainer style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textLight} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("welcome_header")}</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons
            name="person-circle-outline"
            size={32}
            color={colors.textLight}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Subtitle */}
        <Text style={styles.title}>{t("register_title")}</Text>
        <Text style={styles.subtitle}>{t("register_subtitle")}</Text>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Full Name Input */}
          <Text style={styles.label}>{t("label_full_name")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("placeholder_full_name")}
            placeholderTextColor={colors.textLight}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          {/* Email Input */}
          <Text style={styles.label}>{t("label_email")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("placeholder_email")}
            placeholderTextColor={colors.textLight}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {/* Phone Number Input */}
          <Text style={styles.label}>{t("label_phone")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("placeholder_phone")}
            placeholderTextColor={colors.textLight}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          {/* Location Input */}
          <Text style={styles.label}>{t("label_location")}</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={styles.locationInput}
              placeholder={t("placeholder_location")}
              placeholderTextColor={colors.textLight}
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity
              style={styles.locationButton}
              onPress={handleUseMyLocation}
            >
              <Ionicons name="location" size={16} color={colors.surface} />
              <Text style={styles.locationButtonText}>
                {t("use_my_location")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Password Input */}
          <Text style={styles.label}>{t("label_password")}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
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

          {/* Confirm Password Input */}
          <Text style={styles.label}>{t("label_confirm_password")}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={t("placeholder_confirm_password")}
              placeholderTextColor={colors.textLight}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            >
              {agreeToTerms && (
                <Ionicons name="checkmark" size={16} color={colors.surface} />
              )}
            </View>
            <Text style={styles.checkboxText}>{t("terms_agree")}</Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            style={[styles.button, !agreeToTerms && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={!agreeToTerms}
          >
            <Text style={styles.buttonText}>{t("create_account")}</Text>
            <Ionicons name="person-add" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.linkText}>
            {t("link_have_account")}{" "}
            <Text style={styles.linkBold}>{t("link_log_in")}</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + 10,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: spacing.xl,
    lineHeight: 20,
    textAlign: "center",
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    marginBottom: spacing.md,
  },
  locationContainer: {
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  locationInput: {
    flex: 1,
    padding: spacing.lg,
    fontSize: 16,
    color: colors.text,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    margin: 2,
  },
  locationButtonText: {
    fontSize: 10,
    color: colors.surface,
    fontWeight: "600",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  passwordInput: {
    flex: 1,
    padding: spacing.lg,
    fontSize: 16,
  },
  eyeButton: {
    padding: spacing.md,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.sm,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 20,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
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
  buttonDisabled: {
    opacity: 0.5,
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
