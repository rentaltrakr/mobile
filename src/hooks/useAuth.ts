import { logout as reduxLogout } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { storage } from "@/utils/storage";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      dispatch(reduxLogout());
      await storage.clearAll();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const login = async (token: string, roles: string[] = ["tenant"]) => {
    try {
      await storage.setUserToken(token);
      await storage.setIsAuthenticated(true);
      await storage.setUserRoles(roles);

      const tabRoute = roles.includes("admin")
        ? "/(tabs-admin)"
        : roles.includes("landlord")
          ? "/(tabs-landlord)"
          : "/(tabs-tenant)";
      router.replace(tabRoute as any);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  return {
    login,
    logout,
  };
};
