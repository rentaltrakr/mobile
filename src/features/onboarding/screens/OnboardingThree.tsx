import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ScreenContainer } from "../../../components/layout/ScreenContainer";
import { colors } from "../../../theme/colors";
import { layout, spacing } from "../../../theme/spacing";
import { presets } from "../../../theme/typography";

export const OnboardingThree = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={presets.h1}>{t('step3_title')}</Text>
        <Text style={[presets.body, styles.subtitle]}>
          {t('step3_subtitle')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding/OnboardingFour" as any)}
        >
          <Text style={styles.buttonText}>{t('next')}</Text>
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
