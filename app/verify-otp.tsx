import { Button } from '@/components/ui/Button';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VerifyOTPScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { verifyOTP, resendOTP } = useAuth();
  const params = useLocalSearchParams<{ userId: string; email: string; type: string }>();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
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
    const value = rawValue.replace(/\D/g, '').slice(-1); // keep last digit only
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1]?.focus();

      // Auto-verify when all digits present
      const full = newOtp.join('');
      if (full.length === 6) setTimeout(() => handleVerify(full), 100);
    } else {
      // Deleting current digit
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key !== 'Backspace') return;
    const newOtp = [...otp];

    if (newOtp[index]) {
      // Clear current if it has a value
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }
    if (index > 0) {
      // Move back and clear previous
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(params.userId!, code);

      // Navigate post verification
      setTimeout(() => {
        if (params.type === 'signup') {
          // New signup: go to setup/onboarding (profile will be created there)
          Alert.alert('Success', 'Account verified! 🎉', [
            { text: 'OK', onPress: () => router.replace('/setup') }
          ]);
        } else {
          // Login with OTP: go to index (will route based on profile status)
          router.replace('/');
        }
      }, 100);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid OTP');
      setOtp(['', '', '', '', '', '']); // Clear OTP inputs
      inputRefs.current[0]?.focus();
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
    otpInputFocused: {
      borderBottomColor: colors.primary,
      backgroundColor: 'transparent',
    },
    otpInputFilled: {
      borderBottomColor: colors.primary,
      color: colors.primary,
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
              <Text style={styles.icon}>✉️</Text>
              <Text style={styles.title}>Verify Your Email</Text>
              <Text style={styles.subtitle}>
                We sent a 6-digit code to:
              </Text>
              <Text style={styles.email}>{params.email}</Text>
            </View>

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

            {/* Verify Button */}
            <Button
              title={isLoading ? 'Verifying...' : 'Verify & Continue'}
              onPress={() => handleVerify()}
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
