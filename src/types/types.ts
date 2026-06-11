export interface FeedPost {
  id: string;
  userName: string;
  userRoleKey: string; // Key in home.json
  userRoleColor: string; // Background color for the role badge
  userRoleTextColor: string; // Text color for the role badge
  timeAgoKey: string; // Key in home.json
  timeAgoValue?: number; // Value to pass to translation if needed
  divisionKey: string; // Key in home.json
  textKey: string; // Key in home.json
  image?: any; // require() image or image URL
  likesCount: number;
  reserveCount?: number;
  hasLiked: boolean;
  hasReserved: boolean;
  hasSaved: boolean;
  cardData?: {
    titleKey: string;
    textKey: string;
  };
  additionalPhotos?: number;
}

export interface UpdateItem {
  id: string;
  type: "like" | "alert" | "payment" | "message";
  titleKey: string;
  descriptionKey: string;
  time: string;
  read: boolean;
}

export interface RequestItem {
  id: string;
  titleKey: string;
  status: "pending" | "approved" | "resolved" | "rejected";
  statusLabelKey: string;
  date: string;
  unit: string;
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatar: string;
  propertiesCount: number;
  unitsCount: number;
}

export interface PostOption {
  id: string;
  title: string;
  description: string;
  iconName: any;
  iconBgColor: string;
  iconColor: string;
  route?: string;
}
