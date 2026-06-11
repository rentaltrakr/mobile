import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { updateItems } from "@/constants/dummyData";
import { UpdateItem } from "@/types/types";

export default function UpdatesScreen() {
  const { t } = useTranslation("home");
  const [notifications, setNotifications] = useState<UpdateItem[]>(updateItems);

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, read: true })));
    Alert.alert(t("updates_title"), t("all_marked_read", "All notifications marked as read."));
  };

  const getIconDetails = (type: UpdateItem["type"]) => {
    switch (type) {
      case "alert":
        return { name: "warning", color: colors.error };
      case "like":
        return { name: "heart", color: "#DE350B" };
      case "payment":
        return { name: "cash", color: colors.success };
      case "message":
        return { name: "mail", color: colors.primary };
      default:
        return { name: "notifications", color: colors.textLight };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("update_title")}</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markReadText}>{t("mark_all_read", "Mark All Read")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={48} color={colors.textLight} />
            <Text style={styles.emptyText}>{t("update_empty")}</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {notifications.map(item => {
              const icon = getIconDetails(item.type);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.notificationCard, !item.read && styles.unreadCard]}
                  onPress={() => toggleRead(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name={icon.name as any} size={24} color={icon.color} />
                  </View>
                  <View style={styles.contentContainer}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.itemTitle, !item.read && styles.unreadText]}>
                        {t(item.titleKey)}
                      </Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text style={styles.itemDesc}>{t(item.descriptionKey)}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <View style={styles.bottomSpacing} />
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
  markReadText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: "500",
  },
  listContainer: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadCard: {
    borderColor: "rgba(0, 82, 204, 0.2)",
    backgroundColor: "rgba(0, 82, 204, 0.02)",
  },
  iconContainer: {
    marginRight: spacing.md,
    justifyContent: "flex-start",
    paddingTop: 2,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  unreadText: {
    fontWeight: "700",
    color: colors.primary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.xs,
  },
  itemDesc: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 6,
  },
  timeText: {
    fontSize: 11,
    color: colors.textLight,
  },
  bottomSpacing: {
    height: 100,
  },
});
