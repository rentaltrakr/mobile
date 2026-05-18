import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerRight: () => <LanguageSwitcher /> }} />
      <Text style={styles.text}>{t('hello_world')}</Text>
      <TouchableOpacity
        onPress={() => router.push("/onboarding/OnboardingOne" as any)}
      >
        <Text style={styles.button}>{t('go_onboarding')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    color: "#fff",
    fontSize: 16,
  },
});
