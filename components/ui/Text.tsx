import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    // Display
    | 'displayLarge'
    | 'displayMedium'
    | 'displaySmall'
    // Headings
    | 'headingXL'
    | 'headingLarge'
    | 'headingMedium'
    | 'headingSmall'
    // Titles
    | 'titleLarge'
    | 'titleMedium'
    | 'titleSmall'
    // Body
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall'
    // Labels
    | 'labelLarge'
    | 'labelMedium'
    | 'labelSmall';
  color?: 'primary' | 'secondary' | 'light' | 'success' | 'error' | 'warning' | 'accent';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  color = 'primary',
  ...rest
}: ThemedTextProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Get typography style based on type
  const getTypographyStyle = () => {
    switch (type) {
      // Display
      case 'displayLarge':
        return styles.displayLarge;
      case 'displayMedium':
        return styles.displayMedium;
      case 'displaySmall':
        return styles.displaySmall;
      // Headings
      case 'headingXL':
        return styles.headingXL;
      case 'headingLarge':
        return styles.headingLarge;
      case 'headingMedium':
        return styles.headingMedium;
      case 'headingSmall':
        return styles.headingSmall;
      // Titles
      case 'titleLarge':
        return styles.titleLarge;
      case 'titleMedium':
        return styles.titleMedium;
      case 'titleSmall':
        return styles.titleSmall;
      // Body
      case 'bodyLarge':
        return styles.bodyLarge;
      case 'bodyMedium':
        return styles.bodyMedium;
      case 'bodySmall':
        return styles.bodySmall;
      // Labels
      case 'labelLarge':
        return styles.labelLarge;
      case 'labelMedium':
        return styles.labelMedium;
      case 'labelSmall':
        return styles.labelSmall;
      // Legacy types
      case 'title':
        return styles.title;
      case 'defaultSemiBold':
        return styles.defaultSemiBold;
      case 'subtitle':
        return styles.subtitle;
      case 'link':
        return styles.link;
      default:
        return styles.default;
    }
  };

  return (
    <Text
      style={[
        { color: textColor },
        getTypographyStyle(),
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Legacy styles (for backward compatibility)
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: Fonts.sans,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: Fonts.sans,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: Fonts.sans,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    fontFamily: Fonts.sans,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    fontFamily: Fonts.sans,
  },

  // Display Styles
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '700',
    letterSpacing: -0.25,
    fontFamily: Fonts.sans,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },

  // Heading Styles
  headingXL: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  headingLarge: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  headingMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  headingSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: 0.15,
    fontFamily: Fonts.sans,
  },

  // Title Styles
  titleLarge: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: 0.15,
    fontFamily: Fonts.sans,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.15,
    fontFamily: Fonts.sans,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.1,
    fontFamily: Fonts.sans,
  },

  // Body Styles
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.5,
    fontFamily: Fonts.sans,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
    fontFamily: Fonts.sans,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    fontFamily: Fonts.sans,
  },

  // Label Styles
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
    fontFamily: Fonts.sans,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: Fonts.sans,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: Fonts.sans,
  },
});
