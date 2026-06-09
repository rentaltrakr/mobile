import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function MenuItem({
  icon,
  label,
  onPress,
  badge,
  value,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  badge?: string;
  value?: string;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <View style={styles.menuIconBox}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <View style={styles.menuRight}>
        {badge && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>{badge}</Text>
          </View>
        )}
        {value && <Text style={styles.menuValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  menuValue: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  activeBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#059669",
    letterSpacing: 0.5,
  },
});
