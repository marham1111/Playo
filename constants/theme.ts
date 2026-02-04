/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// ============================================
// BRAND COLOR PALETTE
// ============================================

// Modern Design System Colors
// Primary: Softer Professional Green (action, success, primary CTAs)
const primaryGreen = '#5FD382';
const primaryGreenDark = '#4CAF50';
const lightGreen = '#A8D5BA';

// Dark: Near-Black (text, headers, structure)
const darkNavy = '#1F1F1F';
const darkNavyAlt = '#2D2D2D';

// Neutral: White & Grey (backgrounds, secondary, disabled)
const white = '#FFFFFF';
const lightGrey = '#F5F5F5';
const mediumGrey = '#9CA3AF';
const darkGrey = '#6B7280';

// Semantic Colors
const successGreen = '#10B981';
const errorRed = '#EF4444';
const warningYellow = '#F59E0B';

// Legacy/Accent (kept for compatibility, but primary should use green)
const teakAccent = '#00BFA5';
const warmOrange = '#FF7A3D';
const purpleAccent = '#7C3AED';

const tintColorLight = primaryGreen;
const tintColorDark = lightGreen;

export const Colors = {
  light: {
    // Primary Palette (Modern Green/Black/White System)
    primary: primaryGreen,
    primaryDark: primaryGreenDark,
    primaryLight: lightGreen,
    
    // Text & Backgrounds
    text: darkNavy,
    textSecondary: darkGrey,
    textLight: mediumGrey,
    background: white,
    
    // Brand / Tint
    tint: tintColorLight,
    
    // Accents (legacy, but available)
    accent: teakAccent,
    accentOrange: warmOrange,
    accentPurple: purpleAccent,
    success: successGreen,
    error: errorRed,
    warning: warningYellow,
    
    // UI Elements
    icon: darkGrey,
    iconSecondary: mediumGrey,
    tabIconDefault: mediumGrey,
    tabIconSelected: primaryGreen,
    
    // Cards & Containers
    card: white,
    cardElevated: lightGrey,
    border: '#E0E0E0',
    borderLight: lightGrey,
    
    // Interactive States
    inputBackground: white,
    inputBorder: '#D9D9D9',
    inputBorderFocus: primaryGreen,
    
    // Button States
    buttonDisabled: mediumGrey,
    buttonDisabledBg: lightGrey,
    
    // Semantic
    disabled: mediumGrey,
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    // Primary Palette (Dark Mode)
    primary: primaryGreen,
    primaryDark: primaryGreenDark,
    primaryLight: lightGreen,
    
    // Text & Backgrounds
    text: '#F5F5F5',
    textSecondary: '#BDBDBD',
    textLight: '#9CA3AF',
    background: '#1A1A1A',
    
    // Brand / Tint
    tint: tintColorDark,
    
    // Accents
    accent: '#00D9C4',
    accentOrange: '#FF8A50',
    accentPurple: '#8B5CF6',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    
    // UI Elements
    icon: '#BDBDBD',
    iconSecondary: '#9CA3AF',
    tabIconDefault: '#BDBDBD',
    tabIconSelected: primaryGreen,
    
    // Cards & Containers
    card: '#2D2D2D',
    cardElevated: '#3D3D3D',
    border: '#505050',
    borderLight: '#2D2D2D',
    
    // Interactive States
    inputBackground: '#2D2D2D',
    inputBorder: '#505050',
    inputBorderFocus: primaryGreen,
    
    // Button States
    buttonDisabled: '#9CA3AF',
    buttonDisabledBg: '#505050',
    
    // Semantic
    disabled: '#9CA3AF',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
};

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// ============================================
// TYPOGRAPHY SCALES
// ============================================

export const Typography = {
  // Display Styles
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '700' as const,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },

  // Heading Styles
  headingXL: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  headingLarge: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  headingMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  headingSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: 0.15,
  },

  // Title Styles
  titleLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600' as const,
    letterSpacing: 0.15,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.1,
  },

  // Body Styles
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },

  // Label Styles
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
};

// ============================================
// SPACING SYSTEM
// ============================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

// ============================================
// BORDER RADIUS SYSTEM
// ============================================

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

// ============================================
// SHADOW SYSTEM
// ============================================

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
};
