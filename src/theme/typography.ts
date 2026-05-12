import { TextStyle } from 'react-native';

export const typography = {
  fontFamily: {
    regular: 'System',
    bold: 'System',
    medium: 'System',
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
    fontWeight: 'bold',
    lineHeight: 40,
  } as TextStyle,
  h2: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    lineHeight: 32,
  } as TextStyle,
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    lineHeight: 28,
  } as TextStyle,
  body: {
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
  } as TextStyle,
  caption: {
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
  } as TextStyle,
};
