import { Stack } from "expo-router";

export default function TenantDashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="updates" />
      <Stack.Screen name="post" options={{ presentation: "modal" }} />
      <Stack.Screen name="requests" />
      <Stack.Screen name="account" />
    </Stack>
  );
}
