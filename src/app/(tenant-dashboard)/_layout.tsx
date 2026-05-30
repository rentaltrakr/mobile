import { Stack } from "expo-router";

export default function TenantDashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="properties" />
      <Stack.Screen name="activities" />
      <Stack.Screen name="profile" />
     
    </Stack>
  );
}
