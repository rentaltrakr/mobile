import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { TENANT_TABS } from "@/assets/icons/icons";
import { HapticTab } from "@/components/haptic-tab";
import { colors } from "@/theme/colors";

export default function TenantTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "500" },
        tabBarStyle: Platform.select({
          ios: { position: "absolute", height: 96, paddingBottom: 36 },
          default: { height: 110, paddingBottom: 20 },
        }),
      }}
    >
      {TENANT_TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={(focused ? tab.icon.focused : tab.icon.unfocused) as any}
                size={tab.icon.size ?? 22}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
