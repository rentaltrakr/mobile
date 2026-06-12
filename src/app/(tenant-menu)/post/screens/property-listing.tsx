import { feedPosts, requestItems, userProfile } from "@/constants/dummyData";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SelectedDocument = { uri: string; name: string; size?: number | null };

export default function PropertyListingScreen() {
  const { t } = useTranslation("home");
  const router = useRouter();

  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"listing" | "service" | "alert">(
    "listing",
  );
  const [title, setTitle] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<SelectedDocument | null>(null);

  const handlePublish = () => {
    if (!content.trim()) {
      Alert.alert(
        t("post_error_title", "Error"),
        t("post_error_desc", "Please write some content before publishing."),
      );
      return;
    }

    // Create a new FeedPost
    const newPost = {
      id: String(feedPosts.length + 1),
      userName: userProfile.name,
      userRoleKey: "owner",
      userRoleColor: colors.primary,
      userRoleTextColor: "#FFFFFF",
      timeAgoKey: "post_just_now",
      divisionKey:
        category === "listing"
          ? "Commercial Division"
          : category === "service"
            ? "Service Request"
            : "NJC Regulations",
      textKey: content,
      likesCount: 0,
      reserveCount: category === "listing" ? 0 : undefined,
      hasLiked: false,
      hasReserved: false,
      hasSaved: false,
    };

    // Create a new RequestItem matching the RequestItem interface
    const newRequest = {
      id: String(requestItems.length + 1),
      title:
        title ||
        (category === "listing"
          ? t("new_property_listing", "New Property Listing")
          : category === "service"
            ? t("new_service_request", "New Service Request")
            : t("new_compliance_alert", "New Compliance Alert")),
      status: "pending" as const,
      statusLabel: t("status_pending", "Pending"),
      dateRange: t("just_now", "Just now"),
      location: "Skyline Apartments, Unit 201",
      image: selectedImages.length > 0 ? { uri: selectedImages[0] } : undefined,
    };

    // Prepend to display at the top of the feeds
    feedPosts.unshift(newPost);
    requestItems.unshift(newRequest);

    Alert.alert(
      t("post_success_title", "Success"),
      t("post_success_desc", "Your post has been shared successfully!"),
      [
        {
          text: "OK",
          onPress: () => {
            setContent("");
            setTitle("");
            router.push("/(tabs)");
          },
        },
      ],
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("permission_required", "Permission Required"),
        t(
          "gallery_permission_msg",
          "Please allow access to your photo library to add images.",
        ),
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newUris = result.assets.map((a) => a.uri);
      setSelectedImages((prev) => [...prev, ...newUris]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const doc = result.assets[0];
      setSelectedDocument({ uri: doc.uri, name: doc.name, size: doc.size });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("create_post_title", "Create Post")}
        </Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>
            {t("publish_btn", "Publish")}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Selector */}
        <Text style={styles.sectionTitle}>
          {t("select_category", "Select Category")}
        </Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === "listing" && styles.categoryCardActive,
            ]}
            onPress={() => setCategory("listing")}
          >
            <Ionicons
              name="business"
              size={24}
              color={category === "listing" ? colors.surface : colors.primary}
            />
            <Text
              style={[
                styles.categoryText,
                category === "listing" && styles.categoryTextActive,
              ]}
            >
              {t("category_listing", "Listing")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === "service" && styles.categoryCardActive,
            ]}
            onPress={() => setCategory("service")}
          >
            <Ionicons
              name="construct"
              size={24}
              color={category === "service" ? colors.surface : colors.primary}
            />
            <Text
              style={[
                styles.categoryText,
                category === "service" && styles.categoryTextActive,
              ]}
            >
              {t("category_service", "Service Request")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryCard,
              category === "alert" && styles.categoryCardActive,
            ]}
            onPress={() => setCategory("alert")}
          >
            <Ionicons
              name="warning"
              size={24}
              color={category === "alert" ? colors.surface : colors.primary}
            />
            <Text
              style={[
                styles.categoryText,
                category === "alert" && styles.categoryTextActive,
              ]}
            >
              {t("category_alert", "Compliance Alert")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>
            {t("post_title_label", "Post Title (Optional)")}
          </Text>
          <TextInput
            style={styles.titleInput}
            placeholder={t("post_title_placeholder", "Enter post title...")}
            placeholderTextColor="#8E8E93"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>
            {t("post_content_label", "What would you like to share?")}
          </Text>
          <TextInput
            style={styles.contentInput}
            placeholder={t(
              "post_content_placeholder",
              "Write details about properties, services, or updates...",
            )}
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={6}
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        </View>

        {/* Upload Media Buttons */}
        <View style={styles.mediaContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            activeOpacity={0.7}
            onPress={pickImage}
          >
            <Ionicons name="image-outline" size={28} color={colors.primary} />
            <Text style={styles.mediaText}>
              {t("add_photo", "Add Photo / Video")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mediaButton}
            activeOpacity={0.7}
            onPress={pickDocument}
          >
            <Ionicons
              name="document-text-outline"
              size={28}
              color={colors.primary}
            />
            <Text style={styles.mediaText}>
              {t("attach_document", "Attach Document")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selected Image Thumbnails */}
        {selectedImages.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailScroll}
            contentContainerStyle={styles.thumbnailContainer}
          >
            {selectedImages.map((uri, index) => (
              <View key={`${uri}-${index}`} style={styles.thumbnailWrapper}>
                <Image source={{ uri }} style={styles.thumbnail} />
                <TouchableOpacity
                  style={styles.thumbnailRemove}
                  onPress={() =>
                    setSelectedImages((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Ionicons
                    name="close-circle"
                    size={22}
                    color={colors.error}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Selected Document Badge */}
        {selectedDocument && (
          <View style={styles.documentBadge}>
            <Ionicons name="document-attach" size={20} color={colors.primary} />
            <View style={styles.documentInfo}>
              <Text style={styles.documentName} numberOfLines={1}>
                {selectedDocument.name}
              </Text>
              {selectedDocument.size != null && (
                <Text style={styles.documentSize}>
                  {(selectedDocument.size / 1024).toFixed(1)} KB
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => setSelectedDocument(null)}>
              <Ionicons name="close-circle" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}

        {/* Publish Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handlePublish}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>
            {t("publish_btn", "Publish")}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </KeyboardAvoidingView>
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
  publishButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: layout.borderRadius.md,
  },
  publishButtonText: {
    color: colors.surface,
    fontWeight: "bold",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
  },
  submitButtonText: {
    color: colors.surface,
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
  },
  categoryRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  categoryCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textLight,
    textAlign: "center",
  },
  categoryTextActive: {
    color: colors.surface,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.md,
    backgroundColor: "#F4F5F7",
  },
  contentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.md,
    padding: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: "#F4F5F7",
    height: 120,
  },
  mediaContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  mediaButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  mediaText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  bottomSpacing: {
    height: 100,
  },
  thumbnailScroll: {
    marginTop: spacing.md,
  },
  thumbnailContainer: {
    gap: spacing.sm,
  },
  thumbnailWrapper: {
    position: "relative",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbnailRemove: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: colors.surface,
    borderRadius: 11,
  },
  documentBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  documentSize: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },
});
