import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { presets } from "@/theme/typography";
import { StyleSheet, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={presets.h1}>Profile</Text>
      <Text style={presets.body}>Profile screen coming soon...</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
