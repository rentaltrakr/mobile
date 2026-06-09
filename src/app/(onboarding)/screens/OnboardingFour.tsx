import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../../components/layout/ScreenContainer";
import { colors } from "../../../theme/colors";
import { layout, spacing } from "../../../theme/spacing";
import { presets } from "../../../theme/typography";
import { OnboardingFooter } from "../components/OnboardingFooter";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";

interface OnboardingFourProps {
  onFinish: () => void;
  onDotPress: (step: number) => void;
}

export const OnboardingFour = ({
  onFinish,
  onDotPress,
}: OnboardingFourProps) => {
  const { t } = useTranslation("common");
  const { skipToWelcome } = useOnboardingNavigation();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/Smart-home-cuate.png")}
          style={styles.hero}
          resizeMode="contain"
        />
        <Text style={presets.h1}>{t("step4_title")}</Text>
        <Text style={[presets.body, styles.subtitle]}>
          {t("step4_subtitle")}
        </Text>
      </View>

      <OnboardingFooter
        currentStep={4}
        totalSteps={4}
        onSkip={skipToWelcome}
        onNext={onFinish}
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
