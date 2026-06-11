import {
  FeedPost,
  PostOption,
  RequestItem,
  UpdateItem,
  UserProfile,
} from "@/types/types";

export const feedPosts: FeedPost[] = [
  {
    id: "1",
    userName: "Nfoua Eugene",
    userRoleKey: "post_role_broker",
    userRoleColor: "#FFAB00", // Gold/orange background
    userRoleTextColor: "#FFFFFF",
    timeAgoKey: "post_hours_ago",
    timeAgoValue: 2,
    divisionKey: "post_nfoua_title",
    textKey: "post_nfoua_text",
    image: require("../assets/images/glass-building.png"),
    likesCount: 14,
    reserveCount: 3,
    hasLiked: false,
    hasReserved: false,
    hasSaved: false,
  },
  {
    id: "2",
    userName: "Marcus Thorne",
    userRoleKey: "post_role_lawyer",
    userRoleColor: "#0052CC", // Blue background
    userRoleTextColor: "#FFFFFF",
    timeAgoKey: "post_hours_ago",
    timeAgoValue: 5,
    divisionKey: "post_marcus_title",
    textKey: "",
    likesCount: 32,
    reserveCount: 24,
    hasLiked: true,
    hasReserved: false,
    hasSaved: true,
    cardData: {
      titleKey: "post_marcus_card_title",
      textKey: "post_marcus_card_text",
    },
  },
  {
    id: "3",
    userName: "Elena Rodriguez",
    userRoleKey: "post_role_tenant",
    userRoleColor: "#DFE1E6", // Muted gray background
    userRoleTextColor: "#172B4D", // Dark navy text
    timeAgoKey: "post_yesterday",
    divisionKey: "post_elena_title",
    textKey: "post_elena_text",
    image: require("../assets/images/Smart-home-cuate.png"),
    likesCount: 8,
    reserveCount: 0,
    hasLiked: false,
    hasReserved: false,
    hasSaved: false,
    additionalPhotos: 2,
  },
];

export const updateItems: UpdateItem[] = [
  {
    id: "1",
    type: "alert",
    titleKey: "update_alert_title",
    descriptionKey: "update_alert_desc",
    time: "2h ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    titleKey: "update_like_title",
    descriptionKey: "update_like_desc",
    time: "4h ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    titleKey: "update_payment_title",
    descriptionKey: "update_payment_desc",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "message",
    titleKey: "update_message_title",
    descriptionKey: "update_message_desc",
    time: "2 days ago",
    read: true,
  },
];

export const requestItems: RequestItem[] = [
  {
    id: "1",
    titleKey: "request_hvac_title",
    status: "pending",
    statusLabelKey: "status_pending",
    date: "Jun 09, 2026",
    unit: "Warehouse B, Unit 4",
  },
  {
    id: "2",
    titleKey: "request_lease_title",
    status: "approved",
    statusLabelKey: "status_approved",
    date: "Jun 05, 2026",
    unit: "Skyline Apartments, Apt 302",
  },
  {
    id: "3",
    titleKey: "request_plumbing_title",
    status: "resolved",
    statusLabelKey: "status_resolved",
    date: "May 28, 2026",
    unit: "Oakridge House, Unit 12",
  },
];

export const userProfile: UserProfile = {
  name: "Nfoua Eugene",
  role: "Property Owner / Landlord",
  email: "nfouaeugene@rentaltrakr.com",
  avatar: require("../assets/images/me.png"),
  propertiesCount: 5,
  unitsCount: 12,
};

export const options: PostOption[] = [
  {
    id: "property_listing",
    title: "Property Listing",
    description: "List your space for rent or lease",
    iconName: "business",
    iconBgColor: "#EBF3FF",
    iconColor: "#0052CC",
    route: "/(tenant-menu)/post/screens/property-listing",
  },
  {
    id: "need_property",
    title: "Need Property",
    description: "Post your specific rental requirements",
    iconName: "search",
    iconBgColor: "#FFF3E6",
    iconColor: "#FF8F00",
  },
  {
    id: "need_lawyer",
    title: "Need Lawyer",
    description: "Find legal assistance for contracts",
    iconName: "hammer-outline",
    iconBgColor: "#F4F5F7",
    iconColor: "#5E6C84",
  },
  {
    id: "need_tax",
    title: "Need Tax Consultant",
    description: "Financial and tax advisory services",
    iconName: "wallet-outline",
    iconBgColor: "#F4F5F7",
    iconColor: "#5E6C84",
  },
  {
    id: "business_opp",
    title: "Business Opportunity",
    description: "Partnerships and investment deals",
    iconName: "trending-up",
    iconBgColor: "#FEF7E0",
    iconColor: "#C8860A",
  },
  {
    id: "general_post",
    title: "General Post",
    description: "Share updates or start a discussion",
    iconName: "document-text-outline",
    iconBgColor: "#E6F6FF",
    iconColor: "#00875A",
  },
];

export const PRO_ROLES = [
  {
    id: "landlord",
    icon: "business-outline",
    title: "Landlord",
    description:
      "Manage multiple properties, track payments, and verify tenant history.",
  },
  {
    id: "lawyer",
    icon: "briefcase-outline",
    title: "Lawyer",
    description:
      "Access legal document templates and provide consultation for rental disputes.",
  },
  {
    id: "tax_consultant",
    icon: "calculator-outline",
    title: "Tax Consultant",
    description:
      "Assist landlords with asset depreciation and rental income tax filing.",
  },
  {
    id: "partner",
    icon: "people-outline",
    title: "Partner",
    description:
      "Official service providers for cleaning, maintenance, and staging.",
  },
  {
    id: "merchant",
    icon: "storefront-outline",
    title: "Merchant",
    description:
      "List supplies and equipment for commercial or residential property upgrades.",
  },
  {
    id: "hotel",
    icon: "bed-outline",
    title: "Hotel",
    description:
      "Sync booking calendars and manage short-term corporate housing.",
  },
  {
    id: "real_estate_agent",
    icon: "home-outline",
    title: "Real Estate Agent",
    description:
      "Broker deals, list high-end units, and earn verified referral commissions.",
  },
  {
    id: "corporation",
    icon: "stats-chart-outline",
    title: "Corporation",
    description:
      "Scale operations with multi-user access and integrated portfolio analytics.",
  },
] as const;
