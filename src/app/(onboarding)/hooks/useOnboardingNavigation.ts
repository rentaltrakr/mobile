import { useRouter } from "expo-router";

export const useOnboardingNavigation = () => {
  const router = useRouter();

  const skipToWelcome = () => {
    router.replace("/(auth)/welcome-page");
  };

  return {
    skipToWelcome,
    skipToLogin: skipToWelcome,
  };
};
