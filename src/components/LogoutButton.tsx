import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/theme/colors";
import { layout, spacing } from "@/theme/spacing";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

interface LogoutButtonProps {
  variant?: "primary" | "danger";
  showConfirmation?: boolean;
}

export const LogoutButton = ({
  variant = "danger",
  showConfirmation = true,
}: LogoutButtonProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (showConfirmation) {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              await logout();
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      logout();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "danger" ? styles.dangerButton : styles.primaryButton,
      ]}
      onPress={handleLogout}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "danger" ? styles.dangerText : styles.primaryText,
        ]}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: spacing.lg,
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: colors.surface,
  },
  dangerText: {
    color: colors.surface,
  },
});
