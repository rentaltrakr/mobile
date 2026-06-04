import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation("home");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t("greeting")}</Text>
          <Text style={styles.headerTitle}>{t("overview")}</Text>
          <Text style={styles.headerSubtitle}>{t("performance_text")}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Revenue Card */}
      <View style={styles.revenueCard}>
        <View style={styles.revenueHeader}>
          <Text style={styles.revenueLabel}>{t("revenue")}</Text>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.revenueAmount}>$12,450.00</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>{t("withdraw_funds")}</Text>
        </TouchableOpacity>
      </View>

      {/* Trade Assets Card */}
      <View style={styles.tradeCard}>
        <View style={styles.tradeHeader}>
          <View style={styles.tradeIconContainer}>
            <Ionicons name="trending-up" size={24} color={colors.surface} />
          </View>
          <TouchableOpacity>
            <Ionicons name="copy-outline" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.tradeButton}>
          <Text style={styles.tradeButtonText}>{t("trade_assets")}</Text>
        </TouchableOpacity>
      </View>

      {/* Next Rent Due Card */}
      <View style={styles.rentCard}>
        <View style={styles.rentHeader}>
          <Text style={styles.rentLabel}>{t("next_rent_due")}</Text>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.rentAmount}>$2,100.00</Text>
        <Text style={styles.rentDate}>{t("due_date")}</Text>
        <TouchableOpacity style={styles.autoPayButton}>
          <Text style={styles.autoPayButtonText}>{t("setup_auto_pay")}</Text>
        </TouchableOpacity>
      </View>

      {/* Upgrade Section */}
      <View style={styles.upgradeCard}>
        <Text style={styles.upgradeLabel}>{t("unlock_potential")}</Text>
        <Text style={styles.upgradeTitle}>{t("upgrade_title")}</Text>
        <Text style={styles.upgradeDescription}>
          {t("upgrade_description")}
        </Text>
        <View style={styles.upgradeButtons}>
          <TouchableOpacity style={styles.upgradeNowButton}>
            <Text style={styles.upgradeNowText}>{t("upgrade_now")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>{t("learn_more")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Property Image */}
      <View style={styles.propertyImageContainer}>
        <Image
          source={require("../../assets/images/react-logo.png")}
          style={styles.propertyImage}
          resizeMode="cover"
        />
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{t("recent_activity")}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{t("view_all")}</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Items */}
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.activityIconGreen]}>
            <Ionicons name="arrow-down" size={20} color="#10b981" />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityName}>
              {t("activity_rent_payment")}
            </Text>
            <Text style={styles.activityDate}>Dec 15, 2024 • 2:30 PM</Text>
          </View>
          <Text style={styles.activityAmount}>+$2,100.00</Text>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.activityIconDark]}>
            <Ionicons name="arrow-up" size={20} color={colors.surface} />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityName}>{t("activity_expense")}</Text>
            <Text style={styles.activityDate}>Dec 14, 2024 • 10:15 AM</Text>
          </View>
          <Text style={[styles.activityAmount, styles.activityAmountNegative]}>
            -$450.00
          </Text>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, styles.activityIconGray]}>
            <Ionicons name="document-text" size={20} color={colors.textLight} />
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityName}>{t("activity_transfer")}</Text>
            <Text style={styles.activityDate}>Dec 13, 2024 • 4:45 PM</Text>
          </View>
          <Text style={styles.activityAmount}>+$3,200.00</Text>
        </View>
      </View>

      {/* Bottom Spacing for Tab Bar */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
    backgroundColor: colors.surface,
  },
  greeting: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  notificationButton: {
    padding: spacing.sm,
  },
  revenueCard: {
    backgroundColor: colors.surface,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  revenueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  revenueLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  withdrawButton: {
    backgroundColor: "#000",
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  withdrawButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  tradeCard: {
    backgroundColor: "#1e293b",
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
  },
  tradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  tradeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  tradeButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  tradeButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  rentCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  rentLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  rentAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  rentDate: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  autoPayButton: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  autoPayButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  upgradeCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  upgradeLabel: {
    fontSize: 12,
    color: colors.textLight,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  upgradeDescription: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  upgradeButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  upgradeNowButton: {
    flex: 1,
    backgroundColor: "#000",
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  upgradeNowText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  learnMoreButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
  },
  learnMoreText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  propertyImageContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
    height: 200,
  },
  propertyImage: {
    width: "100%",
    height: "100%",
  },
  activitySection: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  activityIconGreen: {
    backgroundColor: "#d1fae5",
  },
  activityIconDark: {
    backgroundColor: "#1e293b",
  },
  activityIconGray: {
    backgroundColor: "#f3f4f6",
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
  },
  activityAmountNegative: {
    color: "#ef4444",
  },
  bottomSpacing: {
    height: 100,
  },
});
