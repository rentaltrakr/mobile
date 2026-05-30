import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  HAS_SEEN_ONBOARDING: "@has_seen_onboarding",
  IS_AUTHENTICATED: "@is_authenticated",
  USER_TOKEN: "@user_token",
} as const;

export const storage = {
  // Onboarding
  async getHasSeenOnboarding(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
      return value === "true";
    } catch (error) {
      console.error("Error reading onboarding status:", error);
      return false;
    }
  },

  async setHasSeenOnboarding(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.HAS_SEEN_ONBOARDING,
        value.toString()
      );
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  },

  // Authentication
  async getIsAuthenticated(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED);
      return value === "true";
    } catch (error) {
      console.error("Error reading authentication status:", error);
      return false;
    }
  },

  async setIsAuthenticated(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.IS_AUTHENTICATED,
        value.toString()
      );
    } catch (error) {
      console.error("Error saving authentication status:", error);
    }
  },

  // User Token
  async getUserToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    } catch (error) {
      console.error("Error reading user token:", error);
      return null;
    }
  },

  async setUserToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
      await this.setIsAuthenticated(true);
    } catch (error) {
      console.error("Error saving user token:", error);
    }
  },

  async clearUserToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      await this.setIsAuthenticated(false);
    } catch (error) {
      console.error("Error clearing user token:", error);
    }
  },

  // Clear all data (for logout or app reset)
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.IS_AUTHENTICATED,
        STORAGE_KEYS.USER_TOKEN,
      ]);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
