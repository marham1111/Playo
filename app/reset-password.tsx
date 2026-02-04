import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { account } from '@/lib/appwrite';
import authService from '@/lib/auth';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { resendOTP } = useAuth();
  const params = useLocalSearchParams<{ userId: string; email: string }>();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1]?.focus();

      const full = newOtp.join('');
      if (full.length === 6) setTimeout(() => handleVerifyOTP(full), 100);
    } else {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key !== 'Backspace') return;
    const newOtp = [...otp];
    if (newOtp[index]) {
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }
    if (index > 0) {
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP with backend by creating a session
      await authService.verifyEmailToken(params.userId!, code);
      
      setOtpVerified(true);
      Alert.alert('Success', 'OTP verified! Now set your new password.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    let valid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword) {
      setPasswordError('Password is required');
      valid = false;
    } else if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    try {
      // Update password
      await account.updatePassword(newPassword);
      
      // Logout after password reset for security
      await authService.logout();
      
      Alert.alert(
        'Success! 🎉',
        'Your password has been reset successfully. You can now login with your new password.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    try {
      await resendOTP(params.email!);
      Alert.alert('Success', 'New OTP sent to your email!');
      setCountdown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setOtpVerified(false);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing['3xl'],
      paddingTop: Math.max(insets.top, Spacing.lg),
    },
    header: {
      alignItems: 'center',
      marginBottom: Spacing['3xl'],
      marginTop: Spacing.lg,
    },
    icon: {
      fontSize: 56,
      marginBottom: Spacing.lg,
    },
    title: {
      ...Typography.headingLarge,
      color: colors.text,
      marginBottom: Spacing.sm,
      textAlign: 'center',
      fontWeight: '800',
      fontSize: 28,
      letterSpacing: -0.5,
    },
    subtitle: {
      ...Typography.bodyLarge,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.md,
      fontWeight: '400',
      opacity: 0.75,
    },
    email: {
      ...Typography.titleMedium,
      color: colors.primary,
      textAlign: 'center',
      marginTop: Spacing.lg,
      fontWeight: '700',
      fontSize: 15,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: Spacing.md,
      marginVertical: Spacing['3xl'],
    },
    otpInput: {
      width: 48,
      height: 56,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: colors.inputBorder,
      borderRadius: 0,
      ...Typography.headingSmall,
      textAlign: 'center',
      color: colors.text,
      backgroundColor: 'transparent',
      fontWeight: '700',
      fontSize: 18,
    },
    otpInputFilled: {
      borderBottomColor: colors.primary,
      color: colors.primary,
    },
    passwordSection: {
      marginTop: Spacing.lg,
      gap: Spacing.lg,
    },
    resendContainer: {
      marginTop: Spacing['2xl'],
      alignItems: 'center',
      paddingVertical: Spacing.lg,
    },
    resendText: {
      ...Typography.bodyMedium,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    resendButtonText: {
      ...Typography.titleMedium,
      color: colors.primary,
      marginTop: Spacing.sm,
      fontWeight: '800',
      fontSize: 14,
    },
    resendButtonDisabled: {
      opacity: 0.5,
    },
    infoBox: {
      backgroundColor: colors.primary + '10',
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginTop: Spacing['2xl'],
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      ...Shadows.sm,
    },
    infoText: {
      ...Typography.bodySmall,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 20,
      fontWeight: '500',
    },
    backButton: {
      alignItems: 'center',
      marginTop: Spacing['2xl'],
      paddingVertical: Spacing.lg,
    },
    backButtonText: {
      ...Typography.titleMedium,
      color: colors.textSecondary,
      fontWeight: '700',
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.icon}>🔑</Text>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                {!otpVerified 
                  ? 'Enter the 6-digit code sent to:'
                  : 'Set your new password'}
              </Text>
              <Text style={styles.email}>{params.email}</Text>
            </View>

            {!otpVerified ? (
              <>
                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputRefs.current[index] = ref;
                      }}
                      style={[
                        styles.otpInput,
                        digit && styles.otpInputFilled,
                      ]}
                      value={digit}
                      onChangeText={(value) => handleOtpChange(index, value)}
                      onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                      keyboardType="number-pad"
                      maxLength={1}
                      autoFocus={index === 0}
                      selectTextOnFocus
                      textContentType="oneTimeCode"
                      autoComplete="one-time-code"
                      placeholderTextColor={colors.textLight}
                    />
                  ))}
                </View>

                {/* Verify OTP Button */}
                <Button
                  title={isLoading ? 'Verifying...' : 'Verify OTP'}
                  onPress={() => handleVerifyOTP()}
                  variant="primary"
                  size="large"
                  fullWidth
                  disabled={isLoading || otp.join('').length !== 6}
                  loading={isLoading}
                />

                {/* Resend OTP */}
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>
                    Didn&apos;t receive the code?
                  </Text>
                  <TouchableOpacity
                    onPress={handleResend}
                    disabled={!canResend || isLoading}
                  >
                    <Text
                      style={[
                        styles.resendButtonText,
                        !canResend && styles.resendButtonDisabled,
                      ]}
                    >
                      {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    💡 Check your spam folder if you don&apos;t see the email{'\n'}
                    OTP expires in 15 minutes
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.passwordSection}>
                {/* New Password Field */}
                <Input
                  label="New Password"
                  placeholder="Enter new password (min 8 characters)"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  error={passwordError}
                  secureTextEntry={!showNewPassword}
                  size="medium"
                  containerStyle={{ width: '100%' }}
                  rightIcon={
                    <Text style={{ fontSize: 18 }}>
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  }
                  onRightIconPress={() => setShowNewPassword(!showNewPassword)}
                />

                {/* Confirm Password Field */}
                <Input
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  error={confirmPasswordError}
                  secureTextEntry={!showConfirmPassword}
                  size="medium"
                  containerStyle={{ width: '100%' }}
                  rightIcon={
                    <Text style={{ fontSize: 18 }}>
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  }
                  onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />

                {/* Reset Password Button */}
                <Button
                  title={isLoading ? 'Resetting...' : 'Reset Password'}
                  onPress={handleResetPassword}
                  variant="primary"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  loading={isLoading}
                />

                {/* Info Box */}
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    🔒 Password must be at least 8 characters long
                  </Text>
                </View>
              </View>
            )}

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.replace('/login')}
            >
              <Text style={styles.backButtonText}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
