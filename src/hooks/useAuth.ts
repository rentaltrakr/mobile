import { storage } from "@/utils/storage";
import { useRouter } from "expo-router";

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      // Clear authentication data
      await storage.clearAll();
      
      // Navigate to login
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const login = async (token: string) => {
    try {
      // Store authentication status and token
      await storage.setUserToken(token);
      await storage.setIsAuthenticated(true);
      
      // Navigate to main app
      router.replace("/(tabs)");
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
