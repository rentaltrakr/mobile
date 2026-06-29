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

const myProperties = [
  { name: "Sunset Apartments", units: 8, occupancy: "100%", address: "123 Main St" },
  { name: "Pine Grove Estates", units: 12, occupancy: "83%", address: "456 Oak Ave" },
  { name: "Harbor View", units: 6, occupancy: "67%", address: "789 Harbor Blvd" },
  { name: "Cedar Heights", units: 16, occupancy: "94%", address: "321 Cedar Ln" },
];

export default function LandlordPropertiesScreen() {
  const { t } = useTranslation("home");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Properties</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.surface} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {myProperties.map((prop, i) => (
          <View key={i} style={styles.propertyCard}>
            <View style={styles.propertyHeader}>
              <View style={styles.propertyIconBox}>
                <Ionicons name="business" size={28} color={colors.primary} />
              </View>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{prop.name}</Text>
                <Text style={styles.propertyAddress}>{prop.address}</Text>
              </View>
            </View>
            <View style={styles.propertyStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{prop.units}</Text>
                <Text style={styles.statLabel}>Units</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{prop.occupancy}</Text>
                <Text style={styles.statLabel}>Occupied</Text>
              </View>
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
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    padding: spacing.md,
  },
  propertyCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  propertyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  propertyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  propertyAddress: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  propertyStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
});
