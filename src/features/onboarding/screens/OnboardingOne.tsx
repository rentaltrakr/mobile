import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "../../../components/layout/ScreenContainer";
import { colors } from "../../../theme/colors";
import { layout, spacing } from "../../../theme/spacing";
import { presets } from "../../../theme/typography";

export const OnboardingOne = () => {
  const router = useRouter();
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={presets.h1}>Step 1: Discover Homes</Text>

        <Text style={[presets.body, styles.subtitle]}>
          Find apartments, houses, and rental spaces that match your lifestyle
          and budget. Browse verified listings with photos, prices, and location
          details all in one place.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding/OnboardingTwo" as any)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", padding: layout.gutter },
  content: { alignItems: "center" },
  subtitle: {
    marginTop: spacing.lg,
    color: colors.textLight,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
  },
  buttonText: { color: colors.surface, fontWeight: "bold" },
});
