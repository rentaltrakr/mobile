export interface TabIconConfig {
  focused: string;
  unfocused: string;
  size?: number;
}

export interface TabConfig {
  name: string;
  title: string;
  icon: TabIconConfig;
}

export const TENANT_TABS: TabConfig[] = [
  {
    name: "index",
    title: "Home",
    icon: { focused: "home", unfocused: "home-outline" },
  },
  {
    name: "updates",
    title: "Updates",
    icon: { focused: "notifications", unfocused: "notifications-outline" },
  },
  {
    name: "post",
    title: "Post",
    icon: { focused: "add-circle", unfocused: "add-circle-outline", size: 24 },
  },
  {
    name: "requests",
    title: "Requests",
    icon: { focused: "swap-horizontal", unfocused: "swap-horizontal-outline" },
  },
  {
    name: "account",
    title: "Account",
    icon: { focused: "person", unfocused: "person-outline" },
  },
];

export const ADMIN_TABS: TabConfig[] = [
  {
    name: "index",
    title: "Dashboard",
    icon: { focused: "grid", unfocused: "grid-outline" },
  },
  {
    name: "users",
    title: "Users",
    icon: { focused: "people", unfocused: "people-outline" },
  },
  {
    name: "properties",
    title: "Properties",
    icon: { focused: "business", unfocused: "business-outline" },
  },
  {
    name: "reports",
    title: "Reports",
    icon: { focused: "bar-chart", unfocused: "bar-chart-outline" },
  },
  {
    name: "settings",
    title: "Settings",
    icon: { focused: "settings", unfocused: "settings-outline" },
  },
];

export const LANDLORD_TABS: TabConfig[] = [
  {
    name: "index",
    title: "Dashboard",
    icon: { focused: "home", unfocused: "home-outline" },
  },
  {
    name: "properties",
    title: "Properties",
    icon: { focused: "business", unfocused: "business-outline" },
  },
  {
    name: "payments",
    title: "Payments",
    icon: { focused: "card", unfocused: "card-outline" },
  },
  {
    name: "tenants",
    title: "Tenants",
    icon: { focused: "people", unfocused: "people-outline" },
  },
  {
    name: "account",
    title: "Account",
    icon: { focused: "person", unfocused: "person-outline" },
  },
];
