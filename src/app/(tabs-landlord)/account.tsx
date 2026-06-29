import { MenuItem } from "@/components/features/account/menu-item";
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

export default function LandlordAccountScreen() {
  const { t } = useTranslation("home");
  const { logout } = useAuth();
  const avatarSource =
    typeof userProfile.avatar === "number"
      ? userProfile.avatar
      : { uri: userProfile.avatar };

  const handleLogout = () => {
    Alert.alert(
      t("logout_alert_title", "Log Out"),
      t("logout_alert_message", "Are you sure you want to log out?"),
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
          <Text style={styles.profileRole}>Landlord</Text>
        </View>

        <View style={styles.menuGroup}>
          <MenuItem icon="person-outline" label="Profile" onPress={() => {}} />
          <MenuItem icon="settings-outline" label="Settings" onPress={() => {}} />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem icon="wallet-outline" label="Payout Methods" onPress={() => {}} value="Bank Account" />
          <MenuItem icon="document-text-outline" label="Tax Documents" onPress={() => {}} />
        </View>

        <View style={styles.menuGroup}>
          <MenuItem icon="help-circle-outline" label="Help & Support" onPress={() => {}} />
          <MenuItem icon="information-circle-outline" label="About" onPress={() => {}} />
        </View>

        <View style={[styles.menuGroup, styles.menuGroupOverflow]}>
          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIconBox}>
                <Ionicons name="language" size={20} color={colors.primary} />
              </View>
              <Text style={styles.menuLabel}>Language</Text>
            </View>
            <LanguageSwitcher />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
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
