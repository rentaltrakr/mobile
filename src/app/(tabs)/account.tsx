import { MenuItem } from "@/components/features/account/menu-item";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { userProfile } from "@/constants/dummyData";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  const router = useRouter();
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
        { text: t("logout_alert_cancel", "Cancel"), style: "cancel" },
        { text: t("logout_alert_confirm", "Log Out"), style: "destructive", onPress: logout },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image source={avatarSource} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#fff" />
            </View>
          </View>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileRole}>{userProfile.role}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>{t("account_rating", "Rating")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>124</Text>
              <Text style={styles.statLabel}>{t("account_rentals", "Rentals")}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2.4k</Text>
              <Text style={styles.statLabel}>{t("account_njc_tokens", "NJC Tokens")}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.upgradeBanner}
          onPress={() =>
            router.push("/(tenant-menu)/account/screens/account-upgrade")
          }
          activeOpacity={0.85}
        >
          <View style={styles.upgradeIconBox}>
            <Ionicons name="person-circle-outline" size={28} color="#fff" />
          </View>
          <View style={styles.upgradeTextBox}>
            <Text style={styles.upgradeTitle}>{t("account_upgrade_title", "Upgrade Account")}</Text>
            <Text style={styles.upgradeSubtitle}>
              {t("account_upgrade_subtitle", "Unlock Pro management tools & priority listing")}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.menuGroup}>
          <MenuItem icon="person-outline" label={t("account_menu_profile", "Profile")} onPress={() => {}} />
          <MenuItem
            icon="settings-outline"
            label={t("account_menu_settings", "Settings")}
            onPress={() => {}}
          />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem
            icon="shield-checkmark-outline"
            label={t("account_menu_verification", "Verification")}
            onPress={() => {}}
            badge={t("account_menu_active", "ACTIVE")}
          />
          <MenuItem
            icon="lock-closed-outline"
            label={t("account_menu_security", "Security")}
            onPress={() => {}}
          />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem
            icon="wallet-outline"
            label={t("account_menu_wallets", "Wallets")}
            onPress={() => {}}
            value="$12,450.00"
          />
          <MenuItem icon="diamond-outline" label={t("account_menu_njc", "NJC")} onPress={() => {}} />
        </View>

        <View style={[styles.menuGroup, styles.menuGroupOverflow]}>
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <Ionicons name="language" size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>{t("account_language")}</Text>
            </View>
            <LanguageSwitcher />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>{t("account_menu_logout", "Logout")}</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F7",
  },
  profileCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 56,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: spacing.md,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#C8860A",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1D23",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: spacing.lg,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E5E7EB",
  },

  upgradeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  upgradeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeTextBox: {
    flex: 1,
  },
  upgradeTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  upgradeSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },

  menuGroup: {
    backgroundColor: "#fff",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F7",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    fontSize: 15,
    color: "#1A1D23",
    fontWeight: "500",
  },
  menuGroupOverflow: {
    overflow: "visible",
    zIndex: 10,
  },

  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.error,
  },
});
