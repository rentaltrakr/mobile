import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ActivityScreen() {
  const { t } = useTranslation("home");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    

      {/* Revenue Card */}
      <View style={styles.revenueCard}>
        <View style={styles.revenueHeader}>
          <Text style={styles.revenueLabel}>{t("revenue")}</Text>
          <TouchableOpacity>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.revenueAmount}>activities main screen</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>{t("withdraw_funds")}</Text>
        </TouchableOpacity>
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
