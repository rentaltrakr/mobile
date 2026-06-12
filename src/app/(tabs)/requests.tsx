import { requestItems } from "@/constants/dummyData";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { RequestItem } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RequestsScreen() {
  const [requests, setRequests] = useState<RequestItem[]>(requestItems);
  const [filter, setFilter] = useState<
    "all" | "my_requests" | "offers_received" | "saved"
  >("all");

  useFocusEffect(
    useCallback(() => {
      setRequests([...requestItems]);
    }, []),
  );

  const getStatusColor = (status: RequestItem["status"]) => {
    switch (status) {
      case "pending":
        return { bg: "#FFAB00", label: "#FFAB00", text: "Active" };
      case "approved":
        return { bg: "#F5F5F5", label: "#FFAB00", text: "Pending Approval" };
      case "resolved":
        return { bg: "#F5F5F5", label: "#DE350B", text: "Offer Expired" };
      case "rejected":
        return { bg: "#F5F5F5", label: "#DE350B", text: "Cancelled" };
      default:
        return { bg: "#F5F5F5", label: "#172B4D", text: "Unknown" };
    }
  };

  const getActionButtonStyle = (actionColor?: string) => {
    switch (actionColor) {
      case "#0052CC":
        return { bg: "#0052CC", text: "#FFFFFF" };
      case "#8B5A00":
        return { bg: "#8B5A00", text: "#FFFFFF" };
      default:
        return { bg: "#FFFFFF", text: "#172B4D", border: true };
    }
  };

  const handleViewOffers = (item: RequestItem) => {
    Alert.alert(
      "Offers",
      `You have ${item.offersCount} offers for ${item.title}`,
    );
  };

  const handleCancelRequest = (item: RequestItem) => {
    Alert.alert(
      "Cancel Request",
      `Are you sure you want to cancel the request for ${item.title}?`,
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          onPress: () =>
            Alert.alert("Success", "Request cancelled successfully!"),
          style: "destructive",
        },
      ],
    );
  };

  const handleRepostRequest = (item: RequestItem) => {
    Alert.alert("Repost", `Request for ${item.title} reposted successfully!`);
  };

  const handleAction = (item: RequestItem) => {
    if (item.actionLabel === "View Offers") {
      handleViewOffers(item);
    } else if (item.actionLabel === "Cancel Request") {
      handleCancelRequest(item);
    } else if (item.actionLabel === "Repost Request") {
      handleRepostRequest(item);
    }
  };

  const filteredRequests = requests;
  // TODO: Implement actual filtering based on filter state when backend distinguishes request types

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Image
              source={require("@/assets/images/me.png")}
              style={styles.avatar}
            />
            <Text style={styles.headerTitle}>RentalTrakr</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === "all" && styles.filterTabActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === "all" && styles.filterTabTextActive,
              ]}
            >
              My Requests
            </Text>
            {filter === "all" && <View style={styles.filterTabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === "offers_received" && styles.filterTabActive,
            ]}
            onPress={() => setFilter("offers_received")}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === "offers_received" && styles.filterTabTextActive,
              ]}
            >
              Offers Received
            </Text>
            {filter === "offers_received" && (
              <View style={styles.filterTabUnderline} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === "saved" && styles.filterTabActive,
            ]}
            onPress={() => setFilter("saved")}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === "saved" && styles.filterTabTextActive,
              ]}
            >
              Saved
            </Text>
            {filter === "saved" && <View style={styles.filterTabUnderline} />}
          </TouchableOpacity>
        </View>

        {/* Requests List */}
        <View style={styles.listContainer}>
          {filteredRequests.map((item) => {
            const statusStyle = getStatusColor(item.status);
            const actionStyle = getActionButtonStyle(item.actionColor);

            return (
              <View key={item.id} style={styles.requestCard}>
                {/* Status Label and Time */}
                <View style={styles.statusLabelRow}>
                  <View
                    style={[
                      styles.statusLabel,
                      { backgroundColor: statusStyle.label },
                    ]}
                  >
                    <Text style={styles.statusLabelText}>
                      {statusStyle.text}
                    </Text>
                  </View>
                  <Text style={styles.requestTime}>
                    {item.status === "pending"
                      ? "Requested 2h ago"
                      : "Requested 1d ago"}
                  </Text>
                </View>

                {/* Title */}
                <Text style={styles.requestTitle}>{item.title}</Text>

                {/* Image and Details Container */}
                <View style={styles.imageDetailsContainer}>
                  {/* Image */}
                  <Image source={item.image} style={styles.requestImage} />

                  {/* Details Column */}
                  <View style={styles.detailsColumn}>
                    <View style={styles.detailItem}>
                      <Ionicons
                        name="calendar-outline"
                        size={16}
                        color="#999999"
                      />
                      <Text style={styles.detailText}>{item.dateRange}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons
                        name="location-outline"
                        size={16}
                        color="#999999"
                      />
                      <Text style={styles.detailText}>{item.location}</Text>
                    </View>
                  </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Offers/Status and Action Button Row */}
                <View style={styles.bottomSection}>
                  <View style={styles.statusInfoContainer}>
                    {item.offersCount ? (
                      <View style={styles.offersInfo}>
                        <Ionicons
                          name="people-outline"
                          size={18}
                          color="#0052CC"
                        />
                        <Text style={styles.offersText}>
                          <Text style={styles.offersCount}>
                            {item.offersCount} Offers Received
                          </Text>
                        </Text>
                      </View>
                    ) : item.hasWaitingResponse ? (
                      <View style={styles.waitingInfo}>
                        <Ionicons
                          name="timer-outline"
                          size={18}
                          color="#999999"
                        />
                        <Text style={styles.waitingText}>
                          Waiting for owner response
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  {/* Action Button */}
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: actionStyle.bg,
                        borderWidth: actionStyle.border ? 1 : 0,
                        borderColor: actionStyle.border
                          ? "#999999"
                          : "transparent",
                      },
                    ]}
                    onPress={() => handleAction(item)}
                  >
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: actionStyle.text },
                      ]}
                    >
                      {item.actionLabel}
                    </Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0052CC",
  },
  notificationIcon: {
    padding: spacing.sm,
  },
  scrollContainer: {
    flex: 1,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filterTabActive: {},
  filterTabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999999",
  },
  filterTabTextActive: {
    color: "#172B4D",
  },
  filterTabUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#0052CC",
    borderRadius: 1.5,
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  requestCard: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statusLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  statusLabel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  requestTime: {
    fontSize: 12,
    color: "#999999",
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#172B4D",
    marginBottom: spacing.md,
  },
  imageDetailsContainer: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md,
    alignItems: "flex-start",
  },
  requestImage: {
    width: 100,
    height: 100,
    borderRadius: layout.borderRadius.md,
    backgroundColor: "#E8E8E8",
    flexShrink: 0,
  },
  detailsColumn: {
    flex: 1,
    gap: spacing.sm,
    justifyContent: "flex-start",
    paddingVertical: spacing.lg,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  detailText: {
    fontSize: 13,
    color: "#999999",
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginBottom: spacing.md,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  statusInfoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  offersInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  offersText: {
    fontSize: 13,
    color: "#172B4D",
    fontWeight: "500",
  },
  offersCount: {
    fontWeight: "700",
    color: "#0052CC",
  },
  waitingInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  waitingText: {
    fontSize: 13,
    color: "#999999",
    fontWeight: "400",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    minWidth: 100,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 100,
  },
});
