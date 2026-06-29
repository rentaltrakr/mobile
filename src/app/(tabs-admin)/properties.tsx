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

const mockProperties = [
  { name: "Oceanview Tower", units: 24, status: "Active" },
  { name: "Maple Gardens", units: 12, status: "Active" },
  { name: "Downtown Lofts", units: 8, status: "Maintenance" },
  { name: "Riverside Complex", units: 36, status: "Active" },
];

export default function AdminPropertiesScreen() {
  const { t } = useTranslation("home");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Properties</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color={colors.surface} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {mockProperties.map((prop, i) => (
          <View key={i} style={styles.propertyCard}>
            <View style={styles.propertyIconBox}>
              <Ionicons name="business" size={28} color={colors.primary} />
            </View>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyName}>{prop.name}</Text>
              <Text style={styles.propertyDetail}>{prop.units} units</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: prop.status === "Active" ? "#00A86B15" : "#FFAB0015" },
            ]}>
              <Text style={[
                styles.statusText,
                { color: prop.status === "Active" ? "#00A86B" : "#FFAB00" },
              ]}>
                {prop.status}
              </Text>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
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
  propertyDetail: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
