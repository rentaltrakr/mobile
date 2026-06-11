// app/(tabs)/upgrade.tsx  (ou screens/UpgradeScreen.tsx selon ta structure)
import { PRO_ROLES } from "@/constants/dummyData";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AccountUpgradeScreen() {
  const { t } = useTranslation("home");
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RentalTrakr</Text>
        <View style={styles.headerRight}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.text}
          />
          <View style={styles.avatarChip}>
            <Text style={styles.avatarChipText}>JD</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          {/* Background image via tint overlay */}
          {/* <View style={styles.heroOverlay} /> */}
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/glass-building.png")}
              style={styles.buildingImage}
              resizeMode="cover"
            />
            <Text style={styles.heroTitle}>
              {t("upgrade_hero_title", "Become a Professional")}
            </Text>
          </View>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          {t(
            "upgrade_subtitle_text",
            "Select your professional role to unlock advanced tools, verified networking, and exclusive rental management features tailored to your industry.",
          )}
        </Text>

        {/* Role List */}
        <View style={styles.roleList}>
          {PRO_ROLES.map((role, index) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selected === role.id && styles.roleCardSelected,
                index === PRO_ROLES.length - 1 && styles.roleCardLast,
              ]}
              onPress={() => setSelected(role.id)}
              activeOpacity={0.7}
            >
              <View style={styles.roleIconBox}>
                <Ionicons
                  name={role.icon as any}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <View style={styles.roleTextBox}>
                <Text style={styles.roleTitle}>
                  {t(`role_${role.id}_title`, role.title)}
                </Text>
                <Text style={styles.roleDesc}>
                  {t(`role_${role.id}_desc`, role.description)}
                </Text>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selected === role.id && styles.radioOuterSelected,
                ]}
              >
                {selected === role.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerDisclaimer}>
          {t(
            "upgrade_disclaimer",
            "By continuing, you agree to provide industry-specific documentation for our verification process.",
          )}
        </Text>
        <TouchableOpacity
          style={[styles.ctaButton, !selected && styles.ctaButtonDisabled]}
          onPress={() => {
            if (!selected) return;
            // navigate to verification
          }}
          activeOpacity={selected ? 0.85 : 1}
        >
          <Text style={styles.ctaText}>
            {t("upgrade_cta", "Continue to Verification →")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F3F7" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 52,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EAECF0",
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  headerRight: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  avatarChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarChipText: { color: "#fff", fontSize: 12, fontWeight: "700" },

  scroll: { paddingBottom: 16 },

  // Hero
  heroBanner: {
    height: 190,
    //backgroundColor: "#0A2540",
    justifyContent: "flex-end",
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,37,64,0.55)",
  },

  imageContainer: {
    marginTop: -80,
    width: "100%",
    height: 160,
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    //marginBottom: spacing.lg,
  },
  buildingImage: {
    width: "100%",
    height: "100%",
  },
  heroTitle: {
    position: "absolute",
    bottom: 16,
    left: 12,
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },

  // Subtitle
  subtitle: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  // Role list
  roleList: {
    marginHorizontal: spacing.lg,
    backgroundColor: "#fff",
    borderRadius: layout.borderRadius.lg,
    borderWidth: 1,
    borderColor: "#EAECF0",
    overflow: "hidden",
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F3F7",
    gap: spacing.md,
  },
  roleCardSelected: {
    backgroundColor: "#EEF2FF",
  },
  roleCardLast: {
    borderBottomWidth: 0,
  },
  roleIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  roleTextBox: { flex: 1 },
  roleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1D23",
    marginBottom: 3,
  },
  roleDesc: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 17,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EAECF0",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 32,
  },
  footerDisclaimer: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: spacing.sm,
    lineHeight: 16,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  ctaButtonDisabled: {
    opacity: 0.5,
  },
  ctaText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
