import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmailVerifiedScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation("auth");
  const [resending, setResending] = useState(false);

  // Read passed email or use a premium placeholder fallback
  const email = (params.email as string) || "stephen@example.com";

  const handleResend = () => {
    setResending(true);
    console.log("Resending verification email to:", email);
    // Simulate API call
    setTimeout(() => {
      setResending(false);
    }, 1500);
  };

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
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
        {/* Verification Icon Box */}
        <View style={styles.illustrationContainer}>
          <View style={styles.outerBox}>
            <View style={styles.innerBox}>
              <View style={styles.firstBox}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="mail" size={54} color={colors.primary} />
                  <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={colors.primary}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{t("check_email_title")}</Text>

        {/* Subtitle with email bolded */}
        <Text style={styles.subtitle}>
          {t("check_email_subtitle_prefix")}{" "}
          <Text style={styles.boldText}>{email}</Text>.{" "}
          {t("check_email_subtitle_suffix")}
        </Text>

        {/* Resend Email Button */}
        <TouchableOpacity
          style={[styles.button, resending && styles.buttonDisabled]}
          onPress={handleResend}
          disabled={resending}
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color={colors.surface}
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>
            {resending ? "..." : t("btn_resend_email")}
          </Text>
        </TouchableOpacity>

        {/* Back to Login Link */}
        <TouchableOpacity style={styles.linkButton} onPress={handleBackToLogin}>
          <Text style={styles.linkText}>{t("btn_back_to_login")}</Text>
        </TouchableOpacity>

        {/* Info/Spam notice card */}
        <View style={styles.noticeCard}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.textLight}
            style={styles.noticeIcon}
          />
          <Text style={styles.noticeText}>{t("check_email_notice")}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>{t("copyright_text")}</Text>
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
    alignItems: "center",
  },
  illustrationContainer: {
    marginTop: spacing.xl + 40,
    marginBottom: spacing.xl * 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  outerBox: {
    width: 170,
    height: 170,
    borderRadius: 24,
    backgroundColor: "#d7e2f8",
    alignItems: "center",
    justifyContent: "center",
  },
  innerBox: {
    width: 124,
    height: 124,
    borderRadius: 16,
    backgroundColor: "#f8ebd8",
    alignItems: "center",
    justifyContent: "center",
  },
  firstBox: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "relative",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    position: "absolute",
    bottom: -4,
    right: -4,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F6EFE5",
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl * 1.5,
  },
  boldText: {
    fontWeight: "bold",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: layout.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: spacing.sm,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    paddingVertical: spacing.sm,
    marginBottom: spacing.xl * 1.5,
  },
  linkText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  noticeCard: {
    flexDirection: "row",
    backgroundColor: "#F0F2F5",
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: "flex-start",
    width: "100%",
    marginBottom: spacing.xl * 2,
  },
  noticeIcon: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  footerText: {
    fontSize: 11,
    color: colors.textLight,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
