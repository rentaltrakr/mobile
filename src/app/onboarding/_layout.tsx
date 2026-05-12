import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingOne" />
      <Stack.Screen name="OnboardingTwo" />
      <Stack.Screen name="OnboardingThree" />
      <Stack.Screen name="OnboardingFour" />
    </Stack>
  );
}
