import LanguageSwitcher from "@/components/LanguageSwitcher";
import { feedPosts } from "@/constants/dummyData";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { FeedPost } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { t } = useTranslation("home");
  const [activeFilter, setActiveFilter] = useState<"all" | "network" | "njc">(
    "all",
  );

  // Local state for interactive buttons
  const [postsState, setPostsState] = useState<
    Record<
      string,
      {
        likesCount: number;
        hasLiked: boolean;
        reserveCount?: number;
        hasReserved: boolean;
        hasSaved: boolean;
      }
    >
  >(() => {
    const initial: Record<string, any> = {};
    feedPosts.forEach((post) => {
      initial[post.id] = {
        likesCount: post.likesCount,
        hasLiked: post.hasLiked,
        reserveCount: post.reserveCount,
        hasReserved: post.hasReserved,
        hasSaved: post.hasSaved,
      };
    });
    return initial;
  });

  const handleLike = (postId: string) => {
    setPostsState((prev) => {
      const current = prev[postId];
      const newHasLiked = !current.hasLiked;
      return {
        ...prev,
        [postId]: {
          ...current,
          hasLiked: newHasLiked,
          likesCount: newHasLiked
            ? current.likesCount + 1
            : current.likesCount - 1,
        },
      };
    });
  };

  const handleReserve = (postId: string) => {
    setPostsState((prev) => {
      const current = prev[postId];
      const newHasReserved = !current.hasReserved;
      let newReserveCount = current.reserveCount;
      if (typeof newReserveCount === "number") {
        newReserveCount = newHasReserved
          ? newReserveCount + 1
          : newReserveCount - 1;
      }
      return {
        ...prev,
        [postId]: {
          ...current,
          hasReserved: newHasReserved,
          reserveCount: newReserveCount,
        },
      };
    });

    const current = postsState[postId];
    if (!current.hasReserved) {
      Alert.alert(
        t("action_reserve"),
        t("reserve_success_message", "Reservation request sent successfully!"),
      );
    }
  };

  const handleSave = (postId: string) => {
    setPostsState((prev) => {
      const current = prev[postId];
      return {
        ...prev,
        [postId]: {
          ...current,
          hasSaved: !current.hasSaved,
        },
      };
    });
  };

  const handleShare = async (post: FeedPost) => {
    try {
      await Share.share({
        message: `${post.userName} (${t(post.userRoleKey)}): ${t(post.textKey || post.cardData?.textKey || "")}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFabPress = () => {
    Alert.alert(
      t("fab_alert_title", "Verified Actions"),
      t(
        "fab_alert_message",
        "Your portfolio and regulatory compliance are in order.",
      ),
    );
  };

  // Filter logic
  const filteredPosts = feedPosts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "network") {
      // Network contains Sarah Chen and Elena Rodriguez
      return post.id === "1" || post.id === "3";
    }
    if (activeFilter === "njc") {
      // NJC regulations contains Marcus Thorne
      return post.id === "2" || post.id === "3"; // Elena Rodriguez's HVAC request is also NJC certified
    }
    return true;
  });

  return (
    <View style={styles.outerContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/me.png")}
            style={styles.avatar}
          />
          <Text style={styles.brandTitle}>RentalTrakr</Text>
        </View>

        <View style={styles.headerRight}>
          <LanguageSwitcher />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#0052CC" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#8E8E93"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder={t("search_placeholder")}
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
          />
        </View>

        {/* Filters / Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.pillsContainer}
          contentContainerStyle={styles.pillsContent}
        >
          <TouchableOpacity
            style={[styles.pill, activeFilter === "all" && styles.pillActive]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.pillText,
                activeFilter === "all" && styles.pillTextActive,
              ]}
            >
              {t("filter_all_activity")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.pill,
              activeFilter === "network" && styles.pillActive,
            ]}
            onPress={() => setActiveFilter("network")}
          >
            <Text
              style={[
                styles.pillText,
                activeFilter === "network" && styles.pillTextActive,
              ]}
            >
              {t("filter_my_network")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pill, activeFilter === "njc" && styles.pillActive]}
            onPress={() => setActiveFilter("njc")}
          >
            <Text
              style={[
                styles.pillText,
                activeFilter === "njc" && styles.pillTextActive,
              ]}
            >
              {t("filter_njc_regulations")}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Feed Posts */}
        <View style={styles.feedList}>
          {filteredPosts.map((post) => {
            const state = postsState[post.id] || {
              likesCount: post.likesCount,
              hasLiked: post.hasLiked,
              reserveCount: post.reserveCount,
              hasReserved: post.hasReserved,
              hasSaved: post.hasSaved,
            };

            return (
              <View key={post.id} style={styles.postCard}>
                {/* Post Header */}
                <View style={styles.postHeader}>
                  <View style={styles.postUserRow}>
                    <Image
                      source={{
                        uri:
                          post.id === "1"
                            ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                            : post.id === "2"
                              ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"
                              : "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
                      }}
                      style={styles.postAvatar}
                    />
                    <View style={styles.postMetadata}>
                      <View style={styles.nameBadgeRow}>
                        <Text style={styles.postUserName}>{post.userName}</Text>
                        <View
                          style={[
                            styles.roleBadge,
                            { backgroundColor: post.userRoleColor },
                          ]}
                        >
                          <Text
                            style={[
                              styles.roleText,
                              { color: post.userRoleTextColor },
                            ]}
                          >
                            {t(post.userRoleKey)}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.postTimeLocation}>
                        {t(post.timeAgoKey, { count: post.timeAgoValue })} •{" "}
                        {t(post.divisionKey)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.ellipsisButton}>
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#8E8E93"
                    />
                  </TouchableOpacity>
                </View>

                {/* Post Text Description */}
                {post.textKey ? (
                  <Text style={styles.postText}>{t(post.textKey)}</Text>
                ) : null}

                {/* Post Image */}
                {post.image && !post.additionalPhotos ? (
                  <View style={styles.postImageContainer}>
                    <Image
                      source={post.image}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  </View>
                ) : null}

                {/* Post Compliance Card (Marcus Thorne) */}
                {post.cardData ? (
                  <View style={styles.complianceCard}>
                    <Text style={styles.complianceTitle}>
                      {t(post.cardData.titleKey)}
                    </Text>
                    <Text style={styles.complianceText}>
                      {t(post.cardData.textKey)}
                    </Text>
                  </View>
                ) : null}

                {/* Post Image Grid (Elena Rodriguez) */}
                {post.image && post.additionalPhotos ? (
                  <View style={styles.imageGrid}>
                    <View style={styles.gridLeft}>
                      <Image
                        source={post.image}
                        style={styles.gridImage}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.gridRight}>
                      <Text style={styles.photosOverlayText}>
                        {t("post_elena_photos", {
                          count: post.additionalPhotos,
                        })}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {/* Post Actions Footer */}
                <View style={styles.dividerLine} />
                <View style={styles.postFooter}>
                  <TouchableOpacity
                    style={styles.footerAction}
                    onPress={() => handleLike(post.id)}
                  >
                    <Ionicons
                      name={state.hasLiked ? "heart" : "heart-outline"}
                      size={20}
                      color={state.hasLiked ? "#DE350B" : "#5E6C84"}
                    />
                    <Text
                      style={[
                        styles.actionLabel,
                        state.hasLiked && styles.actionLabelActive,
                      ]}
                    >
                      {t("action_like")} ({state.likesCount})
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.footerAction}
                    onPress={() => handleReserve(post.id)}
                  >
                    <Ionicons
                      name={state.hasReserved ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={state.hasReserved ? "#FFAB00" : "#5E6C84"}
                    />
                    <Text
                      style={[
                        styles.actionLabel,
                        state.hasReserved && styles.actionLabelReserved,
                      ]}
                    >
                      {t("action_reserve")}
                      {state.reserveCount !== undefined &&
                      state.reserveCount > 0
                        ? ` (${state.reserveCount})`
                        : ""}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.footerAction}
                    onPress={() => handleSave(post.id)}
                  >
                    <Ionicons
                      name={state.hasSaved ? "star" : "star-outline"}
                      size={20}
                      color={state.hasSaved ? "#0052CC" : "#5E6C84"}
                    />
                    <Text
                      style={[
                        styles.actionLabel,
                        state.hasSaved && styles.actionLabelSaved,
                      ]}
                    >
                      {t("action_save")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.footerAction}
                    onPress={() => handleShare(post)}
                  >
                    <Ionicons
                      name="share-social-outline"
                      size={20}
                      color="#5E6C84"
                    />
                    <Text style={styles.actionLabel}>{t("action_share")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom padding for ScrollView */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={handleFabPress}
        activeOpacity={0.85}
      >
        <View style={styles.fabOuter}>
          <View style={styles.fabInner}>
            <Ionicons name="checkmark-circle" size={32} color="#FFAB00" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconButton: {
    padding: spacing.xs,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DE350B", // Red alert badge
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    height: 44,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  pillsContainer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    maxHeight: 40,
  },
  pillsContent: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#DFE1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textLight,
  },
  pillTextActive: {
    color: colors.surface,
  },
  feedList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  postCard: {
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
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  postUserRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  postMetadata: {
    flex: 1,
    justifyContent: "center",
  },
  nameBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    flexWrap: "wrap",
  },
  postUserName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  roleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  roleText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  postTimeLocation: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  ellipsisButton: {
    padding: spacing.xs,
  },
  postText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  postImageContainer: {
    width: "100%",
    height: 180,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  complianceCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    backgroundColor: "#F4F5F7",
    padding: spacing.md,
    borderRadius: layout.borderRadius.md,
    marginBottom: spacing.md,
  },
  complianceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  complianceText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
  },
  imageGrid: {
    flexDirection: "row",
    gap: spacing.sm,
    height: 120,
    marginBottom: spacing.md,
  },
  gridLeft: {
    flex: 1,
    borderRadius: layout.borderRadius.md,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  gridRight: {
    flex: 1,
    borderRadius: layout.borderRadius.md,
    backgroundColor: "#DFE1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  photosOverlayText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: spacing.xs,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textLight,
  },
  actionLabelActive: {
    color: "#DE350B",
  },
  actionLabelReserved: {
    color: "#FFAB00",
  },
  actionLabelSaved: {
    color: colors.primary,
  },
  bottomSpacing: {
    height: 100,
  },
  fabContainer: {
    position: "absolute",
    bottom: 90,
    right: 20,
    zIndex: 99,
  },
  fabOuter: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#FFAB00", // Gold-yellow rounded square border container
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabInner: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#172B4D", // Dark navy/black circle container inside
    alignItems: "center",
    justifyContent: "center",
  },
});
