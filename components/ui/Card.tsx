import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'filled' | 'outlined';
  padding?: number;
  borderRadius?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      variant = 'elevated',
      padding = Spacing.lg,
      borderRadius: customRadius = BorderRadius.lg,
      style,
      onPress,
    },
    ref
  ) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const getVariantStyles = (): ViewStyle => {
      switch (variant) {
        case 'elevated':
          return {
            backgroundColor: colors.card,
            ...Shadows.sm,
          };
        case 'filled':
          return {
            backgroundColor: colors.cardElevated,
          };
        case 'outlined':
          return {
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
          };
        default:
          return {
            backgroundColor: colors.card,
          };
      }
    };

    const cardStyles: ViewStyle = {
      borderRadius: customRadius,
      padding,
      ...getVariantStyles(),
    };

    if (onPress) {
      return (
        <TouchableOpacity
          ref={ref as any}
          onPress={onPress}
          style={[cardStyles, style]}
          activeOpacity={0.7}
        >
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <View ref={ref} style={[cardStyles, style]}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
