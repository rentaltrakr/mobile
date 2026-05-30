import { ScreenContainer } from "@/components/layout/ScreenContainer";
import { presets } from "@/theme/typography";
import { StyleSheet, Text } from "react-native";

export default function ActivityScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={presets.h1}>Activity</Text>
      {/* <ActivityScreen /> */}
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
