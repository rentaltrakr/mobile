import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LandlordDashboardScreen() {
  const { t } = useTranslation("home");

  const stats = [
    { label: "Properties", value: "8", icon: "business", color: "#0052CC" },
    { label: "Total Units", value: "42", icon: "layers", color: "#00A86B" },
    { label: "Occupied", value: "38", icon: "home", color: "#FFAB00" },
    { label: "Revenue", value: "$28.4k", icon: "cash", color: "#DE350B" },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Landlord Dashboard</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statIconBox, { backgroundColor: stat.color + "15" }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Payments</Text>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.paymentItem}>
              <View style={styles.paymentLeft}>
                <Ionicons name="checkmark-circle" size={20} color="#00A86B" />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentTenant}>Tenant #{i}</Text>
                  <Text style={styles.paymentProperty}>Unit {100 + i}</Text>
                </View>
              </View>
              <Text style={styles.paymentAmount}>$1,{200 + i * 100}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
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
  notificationBtn: {
    padding: spacing.xs,
  },
  scrollContainer: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    width: "47%",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  paymentInfo: {},
  paymentTenant: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  paymentProperty: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00A86B",
  },
});
