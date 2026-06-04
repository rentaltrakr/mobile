import { useAppInitialization } from "@/hooks/useAppInitialization";
import { Stack } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const { isLoading } = useAppInitialization();

  // Show splash screen while initializing
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Return null after initialization - navigation is handled by useAppInitialization
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
