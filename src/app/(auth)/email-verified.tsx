import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { presets } from "@/theme/typography";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmailVerifiedScreen() {
  const router = useRouter();
  const { t } = useTranslation("auth");
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Mock user data - replace with actual user data from your auth system
  const userEmail = "alex.innovator@example.com";
  const userName = "Alex Innovator";

  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace("/(tabs)");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, router]);

  const handleContinue = () => {
    setAutoRedirect(false);
    router.replace("/(tabs)");
  };

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Ionicons name="checkmark" size={48} color={colors.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={[presets.h1, styles.title]}>
          {t("email_verified_title")}
        </Text>

        {/* Subtitle */}
        <Text style={[presets.body, styles.subtitle]}>
          {t("email_verified_subtitle")}
        </Text>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userIconContainer}>
            <Ionicons name="person" size={20} color={colors.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>{t("verified")}</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>{t("btn_continue_dashboard")}</Text>
        </TouchableOpacity>

        {/* Countdown */}
        {autoRedirect && (
          <View style={styles.countdownContainer}>
            <ActivityIndicator size="small" color={colors.textLight} />
            <Text style={styles.countdownText}>
              {t("redirecting_in", { seconds: countdown })}
            </Text>
          </View>
        )}

        {/* Feature Cards */}
        <View style={styles.featuresContainer}>
          {/* Security First */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.securityIcon]}>
              <Ionicons name="shield-checkmark" size={24} color="#1e3a8a" />
            </View>
            <Text style={styles.featureTitle}>
              {t("feature_security_title")}
            </Text>
            <Text style={styles.featureDescription}>
              {t("feature_security_desc")}
            </Text>
          </View>

          {/* Wallet Ready */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.walletIcon]}>
              <Ionicons name="wallet" size={24} color={colors.primary} />
            </View>
            <Text style={styles.featureTitle}>{t("feature_wallet_title")}</Text>
            <Text style={styles.featureDescription}>
              {t("feature_wallet_desc")}
            </Text>
          </View>

          {/* Priority Support */}
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.supportIcon]}>
              <Ionicons name="headset" size={24} color="#8b5cf6" />
            </View>
            <Text style={styles.featureTitle}>
              {t("feature_support_title")}
            </Text>
            <Text style={styles.featureDescription}>
              {t("feature_support_desc")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    padding: layout.gutter,
    paddingTop: spacing.xl * 2,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f9fafb",
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textLight,
  },
  verifiedBadge: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: layout.borderRadius.sm,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  countdownText: {
    fontSize: 14,
    color: colors.textLight,
  },
  featuresContainer: {
    width: "100%",
    gap: spacing.md,
  },
  featureCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  securityIcon: {
    backgroundColor: "#dbeafe",
  },
  walletIcon: {
    backgroundColor: "#d1fae5",
  },
  supportIcon: {
    backgroundColor: "#e9d5ff",
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
});
