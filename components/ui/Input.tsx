import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      error,
      icon,
      rightIcon,
      onRightIconPress,
      variant = 'outlined',
      size = 'medium',
      disabled = false,
      containerStyle,
      editable = !disabled,
      ...rest
    },
    ref
  ) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [focused, setFocused] = useState(false);

    const getSizeStyles = (): {
      paddingVertical: number;
      paddingHorizontal: number;
      fontSize: number;
      minHeight: number;
    } => {
      switch (size) {
        case 'small':
          return {
            paddingVertical: Spacing.sm,
            paddingHorizontal: Spacing.md,
            fontSize: 12,
            minHeight: 36,
          };
        case 'large':
          return {
            paddingVertical: Spacing.lg,
            paddingHorizontal: Spacing.lg,
            fontSize: 16,
            minHeight: 56,
          };
        case 'medium':
        default:
          return {
            paddingVertical: Spacing.md,
            paddingHorizontal: Spacing.lg,
            fontSize: 14,
            minHeight: 48,
          };
      }
    };

    const sizeStyles = getSizeStyles();

    const inputContainerStyles: ViewStyle = {
      borderWidth: 0,
      borderColor: 'transparent',
      borderRadius: BorderRadius.lg,
      backgroundColor: focused 
        ? colors.primary + '08'
        : error 
        ? colors.error + '08'
        : colors.inputBackground,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      opacity: disabled ? 0.6 : 1,
      borderBottomWidth: 2,
      borderBottomColor: error
        ? colors.error
        : focused
        ? colors.primary
        : colors.inputBorder,
    };

    const textInputStyles: TextStyle = {
      flex: 1,
      paddingVertical: sizeStyles.paddingVertical,
      fontSize: sizeStyles.fontSize,
      color: disabled ? colors.buttonDisabled : colors.text,
      fontWeight: '500',
    };

    const labelStyles: TextStyle = {
      ...Typography.labelLarge,
      color: error ? colors.error : colors.text,
      marginBottom: Spacing.md,
      fontWeight: '700',
      fontSize: 13,
    };

    const errorStyles: TextStyle = {
      ...Typography.bodySmall,
      color: colors.error,
      marginTop: Spacing.xs,
    };

    return (
      <View style={containerStyle}>
        {label && <Text style={labelStyles}>{label}</Text>}

        <View style={inputContainerStyles}>
          {icon && <View style={{ marginRight: Spacing.sm }}>{icon}</View>}

          <TextInput
            ref={ref}
            style={textInputStyles}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={disabled}
              style={{ marginLeft: Spacing.sm, padding: Spacing.xs }}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={errorStyles}>{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
export type { InputProps };
