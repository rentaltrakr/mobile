import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "../../../components/layout/ScreenContainer";
import { colors } from "../../../theme/colors";
import { layout, spacing } from "../../../theme/spacing";
import { presets } from "../../../theme/typography";

export const OnboardingFour = () => {
  const router = useRouter();
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={presets.h1}>Step 4: Manage</Text>
        <Text style={[presets.body, styles.subtitle]}>
          Everything in one place, from leases to service requests.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.buttonText}>Finish</Text>
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
