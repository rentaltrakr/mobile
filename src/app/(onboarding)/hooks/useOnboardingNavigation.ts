import { useRouter } from "expo-router";

export const useOnboardingNavigation = () => {
  const router = useRouter();

  const skipToLogin = () => {
    router.replace("/(auth)/login");
  };

  return {
    skipToLogin,
  };
};
