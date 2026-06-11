import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { requestItems } from "@/constants/dummyData";
import { RequestItem } from "@/types/types";

export default function RequestsScreen() {
  const { t } = useTranslation("home");
  const [requests, setRequests] = useState<RequestItem[]>(requestItems);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "resolved">("all");

  useFocusEffect(
    useCallback(() => {
      setRequests([...requestItems]);
    }, [])
  );

  const getStatusColor = (status: RequestItem["status"]) => {
    switch (status) {
      case "pending":
        return { bg: "#FFAB00", text: "#FFFFFF" }; // Gold
      case "approved":
        return { bg: "#36B37E", text: "#FFFFFF" }; // Success green
      case "resolved":
        return { bg: "#0052CC", text: "#FFFFFF" }; // Blue
      case "rejected":
        return { bg: "#DE350B", text: "#FFFFFF" }; // Red
      default:
        return { bg: "#DFE1E6", text: "#172B4D" };
    }
  };

  const handleCreateRequest = () => {
    Alert.alert(
      t("create_request_title", "New Request"),
      t("create_request_desc", "Would you like to file a new maintenance or lease request?"),
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, File Request",
          onPress: () => {
            const newReq: RequestItem = {
              id: String(requests.length + 1),
              titleKey: "request_new_plumbing",
              status: "pending",
              statusLabelKey: "status_pending",
              date: "Today",
              unit: "Skyline Apartments, Apt 104",
            };
            setRequests([newReq, ...requests]);
            Alert.alert("Success", "Request submitted successfully!");
          },
        },
      ]
    );
  };

  const filteredRequests = requests.filter(req => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("requests_title")}</Text>
        <TouchableOpacity style={styles.newButton} onPress={handleCreateRequest}>
          <Ionicons name="add" size={20} color={colors.surface} />
          <Text style={styles.newButtonText}>{t("new_req_btn", "New")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Filters */}
        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === "all" && styles.filterButtonActive]}
            onPress={() => setFilter("all")}
          >
            <Text style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, filter === "pending" && styles.filterButtonActive]}
            onPress={() => setFilter("pending")}
          >
            <Text style={[styles.filterText, filter === "pending" && styles.filterTextActive]}>
              Pending
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, filter === "approved" && styles.filterButtonActive]}
            onPress={() => setFilter("approved")}
          >
            <Text style={[styles.filterText, filter === "approved" && styles.filterTextActive]}>
              Approved
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterButton, filter === "resolved" && styles.filterButtonActive]}
            onPress={() => setFilter("resolved")}
          >
            <Text style={[styles.filterText, filter === "resolved" && styles.filterTextActive]}>
              Resolved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Requests List */}
        <View style={styles.listContainer}>
          {filteredRequests.map(item => {
            const statusStyle = getStatusColor(item.status);
            return (
              <View key={item.id} style={styles.requestCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.requestTitle}>
                    {item.titleKey === "request_new_plumbing" 
                      ? "Emergency Plumbing Leak" 
                      : t(item.titleKey)}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.text }]}>
                      {t(item.statusLabelKey)}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.cardDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="business-outline" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{item.unit}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textLight} />
                    <Text style={styles.detailText}>{item.date}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => Alert.alert("Request Details", `${t(item.titleKey)} status: ${t(item.statusLabelKey)}`)}
                >
                  <Text style={styles.detailsButtonText}>View Status Timeline</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

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
  newButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: layout.borderRadius.md,
    gap: 2,
  },
  newButtonText: {
    color: colors.surface,
    fontWeight: "bold",
    fontSize: 13,
  },
  scrollContainer: {
    flex: 1,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  filterTextActive: {
    color: colors.surface,
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  requestCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  cardDetails: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  detailText: {
    fontSize: 13,
    color: colors.textLight,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    gap: spacing.xs,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  bottomSpacing: {
    height: 100,
  },
});
