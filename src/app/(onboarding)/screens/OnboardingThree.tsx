import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../../components/layout/ScreenContainer";
import { colors } from "../../../theme/colors";
import { layout, spacing } from "../../../theme/spacing";
import { presets } from "../../../theme/typography";
import { OnboardingFooter } from "../components/OnboardingFooter";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";

interface OnboardingThreeProps {
  onNext: () => void;
  onDotPress: (step: number) => void;
}

export const OnboardingThree = ({ onNext, onDotPress }: OnboardingThreeProps) => {
  const { t } = useTranslation("common");
  const { skipToLogin } = useOnboardingNavigation();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../../public/assets/icons/E-Wallet-pana.svg")}
          style={styles.hero}
          resizeMode="contain"
        />
        <Text style={presets.h1}>{t("step3_title")}</Text>
        <Text style={[presets.body, styles.subtitle]}>
          {t("step3_subtitle")}
        </Text>
      </View>

      <OnboardingFooter
        currentStep={3}
        totalSteps={4}
        onSkip={skipToLogin}
        onNext={onNext}
        onDotPress={onDotPress}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "center", padding: layout.gutter },
  content: { alignItems: "center" },
  hero: {
    width: 320,
    height: 240,
    marginBottom: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.lg,
    color: colors.textLight,
    textAlign: "center",
  },
});
