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

const payments = [
  { tenant: "Alice Johnson", property: "Unit 101", amount: "$1,200", status: "Paid", date: "Jun 1" },
  { tenant: "Bob Smith", property: "Unit 102", amount: "$1,350", status: "Paid", date: "Jun 2" },
  { tenant: "Carol White", property: "Unit 201", amount: "$1,100", status: "Pending", date: "Jun 5" },
  { tenant: "David Brown", property: "Unit 202", amount: "$1,250", status: "Overdue", date: "May 28" },
  { tenant: "Eve Davis", property: "Unit 301", amount: "$1,400", status: "Paid", date: "Jun 1" },
];

export default function LandlordPaymentsScreen() {
  const { t } = useTranslation("home");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid": return { color: "#00A86B", bg: "#00A86B15" };
      case "Pending": return { color: "#FFAB00", bg: "#FFAB0015" };
      case "Overdue": return { color: "#DE350B", bg: "#DE350B15" };
      default: return { color: colors.textLight, bg: "#F4F5F7" };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.totalEarned}>Total: $6,300</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {payments.map((p, i) => {
          const s = getStatusStyle(p.status);
          return (
            <View key={i} style={styles.paymentCard}>
              <View style={styles.paymentRow}>
                <View style={styles.paymentLeft}>
                  <View style={styles.tenantAvatar}>
                    <Ionicons name="person" size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.tenantName}>{p.tenant}</Text>
                    <Text style={styles.propertyName}>{p.property}</Text>
                  </View>
                </View>
                <View style={styles.paymentRight}>
                  <Text style={styles.amount}>{p.amount}</Text>
                  <Text style={styles.date}>{p.date}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                <Text style={[styles.statusText, { color: s.color }]}>{p.status}</Text>
              </View>
            </View>
          );
        })}
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
  totalEarned: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00A86B",
  },
  scrollContainer: {
    flex: 1,
    padding: spacing.md,
  },
  paymentCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  tenantAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  tenantName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  propertyName: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  paymentRight: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
