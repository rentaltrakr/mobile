import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { storage } from "@/utils/storage";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export const useAppInitialization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const segments = useSegments();

  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const roles = useAppSelector((s) => s.auth.user?.roles ?? []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [onboardingStatus, authStatus, token, storedRoles] = await Promise.all([
          storage.getHasSeenOnboarding(),
          storage.getIsAuthenticated(),
          storage.getUserToken(),
          storage.getUserRoles(),
        ]);

        setHasSeenOnboarding(onboardingStatus);

        if (authStatus && token) {
          dispatch(
            setCredentials({
              user: {
                id: "mock-user-1",
                email: "",
                firstName: "",
                lastName: "",
                roles: storedRoles,
              },
              token,
            })
          );
        }
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
    const inTenantTabs = segments[0] === "(tabs-tenant)";
    const inAdminTabs = segments[0] === "(tabs-admin)";
    const inLandlordTabs = segments[0] === "(tabs-landlord)";
    const inAnyTabs = inTenantTabs || inAdminTabs || inLandlordTabs;
    const inOnboarding = segments[0] === "onboarding";

    if (!hasSeenOnboarding && !inOnboarding) {
      router.replace("/onboarding");
      return;
    }

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/welcome-page");
      return;
    }

    if (!isAuthenticated) return;

    // Authenticated user routing
    if (!inAnyTabs) {
      const tabRoute = roles.includes("admin")
        ? "/(tabs-admin)"
        : roles.includes("landlord")
          ? "/(tabs-landlord)"
          : "/(tabs-tenant)";
      router.replace(tabRoute as any);
    }
  }, [isLoading, hasSeenOnboarding, isAuthenticated, roles, segments]);

  return {
    isLoading,
    hasSeenOnboarding,
    isAuthenticated,
  };
};
