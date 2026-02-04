import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

type ChipVariant = 'filled' | 'outlined' | 'elevated';

interface ChipProps {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  variant?: ChipVariant;
  icon?: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      label,
      onPress,
      selected = false,
      variant = 'outlined',
      icon,
      style,
      disabled = false,
    },
    ref
  ) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const getVariantStyles = (): {
      bg: string;
      text: string;
      border?: string;
    } => {
      if (selected) {
        return {
          bg: colors.primary,
          text: '#FFFFFF',
        };
      }

      switch (variant) {
        case 'filled':
          return {
            bg: colors.cardElevated,
            text: colors.text,
          };
        case 'elevated':
          return {
            bg: colors.card,
            text: colors.text,
          };
        case 'outlined':
        default:
          return {
            bg: colors.background,
            text: colors.text,
            border: colors.border,
          };
      }
    };

    const variantStyles = getVariantStyles();

    const chipStyles: ViewStyle = {
      backgroundColor: variantStyles.bg,
      borderWidth: variantStyles.border ? 1 : 0,
      borderColor: variantStyles.border || 'transparent',
      borderRadius: BorderRadius.full,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
      ...(variant === 'elevated' && !disabled && Shadows.sm),
    };

    const labelStyles: TextStyle = {
      ...Typography.labelLarge,
      color: variantStyles.text,
      fontWeight: '600',
      marginLeft: icon ? Spacing.xs : 0,
    };

    if (onPress) {
      return (
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          disabled={disabled}
          style={[chipStyles, style]}
          activeOpacity={0.7}
        >
          {icon && <View>{icon}</View>}
          <Text style={labelStyles}>{label}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={[chipStyles, style]}>
        {icon && <View>{icon}</View>}
        <Text style={labelStyles}>{label}</Text>
      </View>
    );
  }
);

Chip.displayName = 'Chip';
