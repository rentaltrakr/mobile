import { FeedPost, RequestItem, UpdateItem, UserProfile } from "@/types/types";

export const feedPosts: FeedPost[] = [
  {
    id: "1",
    userName: "Sarah Chen",
    userRoleKey: "post_role_broker",
    userRoleColor: "#FFAB00", // Gold/orange background
    userRoleTextColor: "#FFFFFF",
    timeAgoKey: "post_hours_ago",
    timeAgoValue: 2,
    divisionKey: "post_sarah_title",
    textKey: "post_sarah_text",
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
