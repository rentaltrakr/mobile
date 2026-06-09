import LanguageSwitcher from "@/components/LanguageSwitcher";
import { userProfile } from "@/constants/dummyData";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccountScreen() {
  const { t } = useTranslation("home");
  const { logout } = useAuth();
  const avatarSource =
    typeof userProfile.avatar === "number"
      ? userProfile.avatar
      : { uri: userProfile.avatar };

  const handleLogout = () => {
    Alert.alert(
      t("logout_alert_title", "Log Out"),
      t(
        "logout_alert_message",
        "Are you sure you want to log out of RentalTrakr?",
      ),
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: logout },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("account_title")}</Text>
        <TouchableOpacity
          style={styles.logoutIconButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.profileCard}>
          <Image source={avatarSource} style={styles.avatar} />
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileRole}>{userProfile.role}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
        </View>

        {/* Property Metrics */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Ionicons name="business" size={28} color={colors.primary} />
            <Text style={styles.metricNumber}>
              {userProfile.propertiesCount}
            </Text>
            <Text style={styles.metricLabel}>{t("account_properties")}</Text>
          </View>

          <View style={styles.metricCard}>
            <Ionicons name="key" size={28} color={colors.primary} />
            <Text style={styles.metricNumber}>{userProfile.unitsCount}</Text>
            <Text style={styles.metricLabel}>{t("account_units")}</Text>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>{t("account_settings")}</Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="language"
                size={22}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>{t("account_language")}</Text>
            </View>
            <LanguageSwitcher />
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert(
                "Notifications",
                "Notification preferences coming soon.",
              )
            }
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications"
                size={22}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Notification Settings</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textLight}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() =>
              Alert.alert("Security", "Security settings coming soon.")
            }
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="lock-closed"
                size={22}
                color={colors.primary}
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Privacy & Security</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textLight}
            />
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color={colors.surface} />
          <Text style={styles.logoutButtonText}>{t("account_logout")}</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  logoutIconButton: {
    padding: spacing.xs,
  },
  scrollContainer: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.surface,
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: colors.textLight,
  },
  metricsRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontWeight: "500",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: spacing.md,
  },
  settingLabel: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: colors.error,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSpacing: {
    height: 100,
  },
});
