import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";

interface OnboardingFooterProps {
  currentStep: number;
  totalSteps: number;
  onSkip: () => void;
  onNext: () => void;
  onDotPress?: (step: number) => void;
}

export const OnboardingFooter = ({
  currentStep,
  totalSteps,
  onSkip,
  onNext,
  onDotPress,
}: OnboardingFooterProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.dotsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onDotPress?.(index + 1)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View
              style={[
                styles.dot,
                index === currentStep - 1 && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onNext} style={styles.arrowButton}>
        <Ionicons name="arrow-forward" size={24} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  skipButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  skipText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "500",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  arrowButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
