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

const reports = [
  { title: "Monthly Revenue", value: "$124,500", change: "+12%", icon: "cash", color: "#00A86B" },
  { title: "Occupancy Rate", value: "94%", change: "+2%", icon: "home", color: "#0052CC" },
  { title: "Maintenance Requests", value: "23", change: "-8%", icon: "construct", color: "#FFAB00" },
  { title: "New Tenants", value: "156", change: "+18%", icon: "person-add", color: "#DE350B" },
];

export default function AdminReportsScreen() {
  const { t } = useTranslation("home");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reports</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {reports.map((r, i) => (
          <View key={i} style={styles.reportCard}>
            <View style={[styles.reportIconBox, { backgroundColor: r.color + "15" }]}>
              <Ionicons name={r.icon as any} size={24} color={r.color} />
            </View>
            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>{r.title}</Text>
              <Text style={styles.reportValue}>{r.value}</Text>
            </View>
            <View style={[
              styles.changeBadge,
              { backgroundColor: r.change.startsWith("+") ? "#00A86B15" : "#DE350B15" },
            ]}>
              <Text style={[
                styles.changeText,
                { color: r.change.startsWith("+") ? "#00A86B" : "#DE350B" },
              ]}>
                {r.change}
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
  scrollContainer: {
    flex: 1,
    padding: spacing.md,
  },
  reportCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  reportValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: 2,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
