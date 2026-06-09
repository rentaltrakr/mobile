import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { useRouter } from "expo-router";

export default function PostScreen() {
  const { t } = useTranslation("home");
  const router = useRouter();
  
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"listing" | "service" | "alert">("listing");
  const [title, setTitle] = useState("");

  const handlePublish = () => {
    if (!content.trim()) {
      Alert.alert(t("post_error_title", "Error"), t("post_error_desc", "Please write some content before publishing."));
      return;
    }

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
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("create_post_title", "Create Post")}</Text>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>{t("publish_btn", "Publish")}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Category Selector */}
        <Text style={styles.sectionTitle}>{t("select_category", "Select Category")}</Text>
        <View style={styles.categoryRow}>
          <TouchableOpacity 
            style={[styles.categoryCard, category === "listing" && styles.categoryCardActive]}
            onPress={() => setCategory("listing")}
          >
            <Ionicons name="business" size={24} color={category === "listing" ? colors.surface : colors.primary} />
            <Text style={[styles.categoryText, category === "listing" && styles.categoryTextActive]}>
              {t("category_listing", "Listing")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, category === "service" && styles.categoryCardActive]}
            onPress={() => setCategory("service")}
          >
            <Ionicons name="construct" size={24} color={category === "service" ? colors.surface : colors.primary} />
            <Text style={[styles.categoryText, category === "service" && styles.categoryTextActive]}>
              {t("category_service", "Service Request")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.categoryCard, category === "alert" && styles.categoryCardActive]}
            onPress={() => setCategory("alert")}
          >
            <Ionicons name="warning" size={24} color={category === "alert" ? colors.surface : colors.primary} />
            <Text style={[styles.categoryText, category === "alert" && styles.categoryTextActive]}>
              {t("category_alert", "Compliance Alert")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>{t("post_title_label", "Post Title (Optional)")}</Text>
          <TextInput
            style={styles.titleInput}
            placeholder={t("post_title_placeholder", "Enter post title...")}
            placeholderTextColor="#8E8E93"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>{t("post_content_label", "What would you like to share?")}</Text>
          <TextInput
            style={styles.contentInput}
            placeholder={t("post_content_placeholder", "Write details about properties, services, or updates...")}
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={6}
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        </View>

        {/* Upload Media Placeholders */}
        <View style={styles.mediaContainer}>
          <TouchableOpacity style={styles.mediaButton} activeOpacity={0.7}>
            <Ionicons name="image-outline" size={28} color={colors.primary} />
            <Text style={styles.mediaText}>{t("add_photo", "Add Photo / Video")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaButton} activeOpacity={0.7}>
            <Ionicons name="document-text-outline" size={28} color={colors.primary} />
            <Text style={styles.mediaText}>{t("attach_document", "Attach Document")}</Text>
          </TouchableOpacity>
        </View>

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
});
