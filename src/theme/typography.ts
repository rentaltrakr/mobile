import { TextStyle } from "react-native";

export const typography = {
  fontFamily: {
    // Update these values to match the actual font file names you add to the project.
    // Common names: 'Poppins-Regular', 'Poppins-Medium', 'Poppins-Bold'
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    huge: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
  },
};

export const presets = {
  h1: {
    fontSize: typography.fontSize.huge,
    fontFamily: typography.fontFamily.bold,
    fontWeight: "700",
    lineHeight: 40,
  } as TextStyle,
  h2: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    fontWeight: "700",
    lineHeight: 32,
  } as TextStyle,
  h3: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.medium,
    fontWeight: "600",
    lineHeight: 28,
  } as TextStyle,
  body: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.md,
  } as TextStyle,
  caption: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.sm,
  } as TextStyle,
};
