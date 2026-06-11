import { options, userProfile } from "@/constants/dummyData";
import { spacing } from "@/theme/spacing";
import { PostOption } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostTabScreen() {
  const { t } = useTranslation("home");
  const router = useRouter();

  const avatarSource =
    typeof userProfile.avatar === "number"
      ? userProfile.avatar
      : { uri: userProfile.avatar };

  const handleOptionPress = (option: PostOption) => {
    if (option.route) {
      router.push(option.route as any);
    } else {
      alert(`${option.title} feature coming soon!`);
    }
  };

  const handleCancel = () => {
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* Gray Branding Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={avatarSource} style={styles.headerAvatar} />
          <Text style={styles.headerLogo}>RentalTrakr</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() =>
              Alert.alert(
                t("notifications_title", "Notifications"),
                t("no_new_notifications", "No new notifications."),
              )
            }
          >
            <Ionicons name="notifications-outline" size={22} color="#0052CC" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal-like Sheet Container */}
      <View style={styles.sheetContainer}>
        {/* Handle Bar */}
        <View style={styles.handleBar} />

        {/* Title */}
        <Text style={styles.titleText}>
          {t("create_post_title", "Create Post")}
        </Text>

        {/* Options List */}
        <ScrollView
          style={styles.optionsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => handleOptionPress(option)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: option.iconBgColor },
                  ]}
                >
                  <Ionicons
                    name={option.iconName as any}
                    size={22}
                    color={option.iconColor}
                  />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cancel Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelButtonText}>
              {t("cancel_btn", "Cancel")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },

  /* ── Gray Branding Header ── */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: spacing.md,
    backgroundColor: "#F4F5F7",
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DFE1E6",
  },
  headerLogo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0052CC",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerIconBtn: {
    padding: 4,
  },

  /* ── Modal Sheet ── */
  sheetContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DFE1E6",
    alignSelf: "center",
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#172B4D",
    textAlign: "center",
    marginBottom: 20,
  },
  optionsList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EAECF0",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#172B4D",
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: 12,
    color: "#5E6C84",
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 40,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F4F5F7",
  },
  cancelButton: {
    backgroundColor: "#172B4D",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
