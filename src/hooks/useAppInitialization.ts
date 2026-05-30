import { storage } from "@/utils/storage";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export const useAppInitialization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check onboarding and authentication status
        const [onboardingStatus, authStatus] = await Promise.all([
          storage.getHasSeenOnboarding(),
          storage.getIsAuthenticated(),
        ]);

        setHasSeenOnboarding(onboardingStatus);
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const inOnboarding = segments[0] === "onboarding";

    // Navigation logic
    if (!hasSeenOnboarding && !inOnboarding) {
      // First time user - show onboarding
      router.replace("/onboarding");
    } else if (hasSeenOnboarding && !isAuthenticated && !inAuthGroup) {
      // Seen onboarding but not authenticated - show login
      router.replace("/(auth)/login");
    } else if (hasSeenOnboarding && isAuthenticated && !inTabsGroup) {
      // Authenticated user - show main app
      router.replace("/(tabs)");
    }
  }, [isLoading, hasSeenOnboarding, isAuthenticated, segments]);

  return {
    isLoading,
    hasSeenOnboarding,
    isAuthenticated,
  };
};
