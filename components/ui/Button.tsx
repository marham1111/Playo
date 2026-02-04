import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
    ActivityIndicator,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      onPress,
      title,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      fullWidth = false,
      icon,
      children,
      style,
    },
    ref
  ) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const getVariantStyles = (): { bg: string; text: string; border?: string } => {
      switch (variant) {
        case 'primary':
          return {
            bg: colors.primary,
            text: '#FFFFFF',
          };
        case 'secondary':
          return {
            bg: colors.primary + '08',
            text: colors.primary,
            border: colors.primary + '30',
          };
        case 'tertiary':
          return {
            bg: 'transparent',
            text: colors.primary,
          };
        case 'danger':
          return {
            bg: colors.error,
            text: '#FFFFFF',
          };
        case 'ghost':
          return {
            bg: 'transparent',
            text: colors.textSecondary,
          };
        default:
          return {
            bg: colors.primary,
            text: '#FFFFFF',
          };
      }
    };

    const getSizeStyles = (): {
      paddingVertical: number;
      paddingHorizontal: number;
      minHeight: number;
      fontSize: number;
    } => {
      switch (size) {
        case 'small':
          return {
            paddingVertical: Spacing.xs,
            paddingHorizontal: Spacing.md,
            minHeight: 32,
            fontSize: 12,
          };
        case 'large':
          return {
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.xl,
            minHeight: 44,
            fontSize: 16,
          };
        case 'medium':
        default:
          return {
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            minHeight: 48,
            fontSize: 14,
          };
      }
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();

    const buttonStyles: ViewStyle = {
      backgroundColor: disabled ? colors.buttonDisabledBg : variantStyles.bg,
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: variantStyles.border || 'transparent',
      borderRadius: BorderRadius.lg,
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      minHeight: sizeStyles.minHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled && !loading ? 0.6 : 1,
      ...(variant === 'primary' && !disabled && Shadows.md),
      ...(variant === 'secondary' && !disabled && Shadows.none),
    };

    const textStyles: TextStyle = {
      color: disabled ? colors.buttonDisabled : variantStyles.text,
      fontSize: sizeStyles.fontSize,
      fontWeight: variant === 'secondary' ? '700' : '600',
      marginLeft: icon ? Spacing.sm : 0,
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          buttonStyles,
          fullWidth && { width: '100%' },
          style,
        ]}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator size="small" color={variantStyles.text} />
        ) : (
          <>
            {icon && <View>{icon}</View>}
            {(title || children) && (
              <Text style={textStyles}>
                {title || children}
              </Text>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
