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

const myTenants = [
  { name: "Alice Johnson", property: "Unit 101", leaseEnd: "Dec 2026", rating: 4.8 },
  { name: "Bob Smith", property: "Unit 102", leaseEnd: "Mar 2027", rating: 4.5 },
  { name: "Carol White", property: "Unit 201", leaseEnd: "Sep 2026", rating: 4.2 },
  { name: "David Brown", property: "Unit 202", leaseEnd: "Jan 2027", rating: 3.9 },
  { name: "Eve Davis", property: "Unit 301", leaseEnd: "Jun 2026", rating: 4.9 },
];

export default function LandlordTenantsScreen() {
  const { t } = useTranslation("home");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tenants</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {myTenants.map((tenant, i) => (
          <View key={i} style={styles.tenantCard}>
            <View style={styles.tenantAvatar}>
              <Ionicons name="person" size={22} color={colors.primary} />
            </View>
            <View style={styles.tenantInfo}>
              <Text style={styles.tenantName}>{tenant.name}</Text>
              <Text style={styles.tenantProperty}>{tenant.property}</Text>
              <Text style={styles.tenantLease}>Lease ends {tenant.leaseEnd}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#FFAB00" />
              <Text style={styles.ratingText}>{tenant.rating}</Text>
            </View>
          </View>
        ))}
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
  scrollContainer: {
    flex: 1,
    padding: spacing.md,
  },
  tenantCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tenantAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  tenantInfo: {
    flex: 1,
  },
  tenantName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  tenantProperty: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  tenantLease: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 1,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFAB0015",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFAB00",
  },
});
