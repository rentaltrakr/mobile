import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminSettingsScreen() {
  const { t } = useTranslation("home");

  const settingsItems = [
    { icon: "shield-outline", label: "Security", color: colors.primary },
    { icon: "globe-outline", label: "Region Settings", color: "#00A86B" },
    { icon: "notifications-outline", label: "Notifications", color: "#FFAB00" },
    { icon: "color-palette-outline", label: "Appearance", color: "#DE350B" },
    { icon: "information-circle-outline", label: "About", color: colors.textLight },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>General</Text>
          {settingsItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.settingItem}
              onPress={() => Alert.alert(item.label, `${item.label} settings`)}
            >
              <View style={[styles.settingIconBox, { backgroundColor: item.color + "15" }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
            </TouchableOpacity>
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
  },
  section: {
    padding: spacing.md,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
    textTransform: "uppercase",
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: "500",
  },
});
