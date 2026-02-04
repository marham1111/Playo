import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SPORTS } from '@/types/profile';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const { login, signup, sendOTP } = useAuth();
  
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [otpEmailError, setOtpEmailError] = useState('');
  const [selectedSports, setSelectedSports] = useState<Set<string>>(new Set());

  // 🎯 Handle Sign Up
  const handleSignup = async () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setNameError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!name) {
      setNameError('Name is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
    if (password && password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    try {
      const result = await signup(email, password, name);
      router.push({
        pathname: '/verify-otp',
        params: {
          userId: result.userId,
          email: result.email,
          type: 'signup',
        },
      });
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        Alert.alert(
          'Account Exists',
          'An account with this email already exists. Would you like to login instead?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Login',
              onPress: () => {
                setAuthMode('login');
                setPassword('');
                setConfirmPassword('');
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', error.message || 'Failed to sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Handle Login
  const handleLogin = async () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    try {
      await login(email, password);
      // Route to root so the entry gate decides between setup vs tabs
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Handle OTP Login
  const handleOTPRequest = async () => {
    let valid = true;
    setOtpEmailError('');

    if (!otpEmail) {
      setOtpEmailError('Email is required');
      valid = false;
    }

    if (!valid) return;

    setIsLoading(true);
    try {
      const result = await sendOTP(otpEmail);
      router.push({
        pathname: '/verify-otp',
        params: {
          userId: result.userId,
          email: result.email,
          type: 'login',
        },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Top sports to display - fit 3 per row
  const topSports = SPORTS.slice(0, 4);

  // ✨ Landing Screen
  if (!showAuth) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: Math.max(insets.top, Spacing.md) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            {/* Welcome Section - Enhanced Typography */}
            <View style={styles.welcomeSection}>
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>
                Welcome to Playo
              </Text>
              <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
                Find your perfect sports match and connect with players nearby
              </Text>
            </View>

            {/* Sports Grid Section - Premium Layout */}
            <View style={styles.sportsGridSection}>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>
                Popular Sports
              </Text>
              <View style={styles.sportsGrid}>
                {topSports.map((sport) => (
                  <SportCard
                    key={sport.id}
                    sport={sport}
                    colors={colors}
                    isSelected={selectedSports.has(sport.id)}
                    onPress={() => {
                      const newSelected = new Set(selectedSports);
                      if (newSelected.has(sport.id)) {
                        newSelected.delete(sport.id);
                      } else {
                        newSelected.add(sport.id);
                      }
                      setSelectedSports(newSelected);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* Features Section - Icon Backgrounds & Shadows */}
            <View style={styles.featuresSection}>
              <FeatureCard
                icon="⚡"
                title="Quick Games"
                description="Find matches in seconds"
                colors={colors}
                iconBgColor="#E8F5E9"
              />
              <FeatureCard
                icon="👥"
                title="Community"
                description="Connect with local players"
                colors={colors}
                iconBgColor="#E3F2FD"
              />
              <FeatureCard
                icon="🏆"
                title="Track Stats"
                description="Monitor your performance"
                colors={colors}
                iconBgColor="#FFF3E0"
              />
            </View>

            {/* CTA Buttons - Premium Styling */}
            <View style={styles.ctaSection}>
              <Button
                title="Sign Up"
                onPress={() => {
                  setShowAuth(true);
                  setAuthMode('signup');
                }}
                variant="primary"
                size="large"
                fullWidth
              />

              <Button
                title="Log In"
                onPress={() => {
                  setShowAuth(true);
                  setAuthMode('login');
                }}
                variant="secondary"
                size="large"
                fullWidth
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // ✨ Auth Screen
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: Math.max(insets.top, Spacing.md) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Back Button */}
          <View style={styles.authHeader}>
            <TouchableOpacity
              onPress={() => setShowAuth(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.backButtonText, { color: colors.text }]}>← Back</Text>
            </TouchableOpacity>
          </View>

          {/* Auth Title - Premium Scale */}
          <Text style={[styles.authTitle, { color: colors.text }]}>
            {authMode === 'login'
              ? 'Log In'
              : authMode === 'signup'
              ? 'Create Account'
              : 'Login with OTP'}
          </Text>

          <Text style={[styles.authSubtitle, { color: colors.textSecondary }]}>
            {authMode === 'login'
              ? 'Welcome back'
              : authMode === 'signup'
              ? 'Join our sports community'
              : 'Enter your email to receive OTP'}
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* OTP Mode */}
            {authMode === 'otp' && (
              <Input
                label="Email"
                placeholder="your@email.com"
                value={otpEmail}
                onChangeText={setOtpEmail}
                error={otpEmailError}
                size="medium"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputWrapper}
              />
            )}

            {/* Name Field (Signup Only) */}
            {authMode === 'signup' && (
              <Input
                label="Full Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                error={nameError}
                size="medium"
                containerStyle={styles.inputWrapper}
              />
            )}

            {/* Email Field (Login & Signup) */}
            {(authMode === 'login' || authMode === 'signup') && (
              <Input
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                size="medium"
                keyboardType="email-address"
                autoCapitalize="none"
                containerStyle={styles.inputWrapper}
              />
            )}

            {/* Password Field (Login & Signup) */}
            {(authMode === 'login' || authMode === 'signup') && (
              <>
                <Input
                  label="Password"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  error={passwordError}
                  size="medium"
                  secureTextEntry={!showPassword}
                  containerStyle={styles.inputWrapper}
                  rightIcon={
                    <Text style={{ fontSize: 18 }}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  }
                  onRightIconPress={() => setShowPassword(!showPassword)}
                />

                {/* Confirm Password (Signup Only) */}
                {authMode === 'signup' && (
                  <Input
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    size="medium"
                    secureTextEntry={!showConfirmPassword}
                    containerStyle={styles.inputWrapper}
                    rightIcon={
                      <Text style={{ fontSize: 18 }}>
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    }
                    onRightIconPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />
                )}

                {/* Forgot Password (Login Only) */}
                {authMode === 'login' && (
                  <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={async () => {
                      if (!email) {
                        Alert.alert('Forgot Password', 'Please enter your email first.');
                        return;
                      }
                      setIsLoading(true);
                      try {
                        const result = await sendOTP(email);
                        router.push({
                          pathname: '/reset-password',
                          params: { userId: result.userId, email: result.email },
                        });
                      } catch (error: any) {
                        Alert.alert('Error', error.message || 'Failed to start password reset');
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.forgotPasswordText,
                        { color: colors.primary },
                      ]}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

          {/* CTA Button */}
          <Button
            title={
              isLoading
                ? 'Loading...'
                : authMode === 'login'
                ? 'Log In'
                : authMode === 'signup'
                ? 'Create Account'
                : 'Send OTP'
            }
            onPress={
              authMode === 'login'
                ? handleLogin
                : authMode === 'signup'
                ? handleSignup
                : handleOTPRequest
            }
            variant="primary"
            size="large"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
              OR
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          {/* OTP Option (For Login & Signup) */}
          {(authMode === 'login' || authMode === 'signup') && (
            <Button
              title="Login with OTP instead"
              onPress={() => {
                setAuthMode('otp');
                setEmail('');
                setPassword('');
                setName('');
                setConfirmPassword('');
                setEmailError('');
                setPasswordError('');
                setNameError('');
              }}
              variant="tertiary"
              size="medium"
              fullWidth
            />
          )}

          {/* Switch Mode */}
          {authMode !== 'otp' && (
            <View style={styles.switchContainer}>
              <Text style={[styles.switchText, { color: colors.text }]}>
                {authMode === 'login'
                  ? "Don't have an account? "
                  : 'Already have an account? '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  setPassword('');
                  setConfirmPassword('');
                  setEmailError('');
                  setPasswordError('');
                  setNameError('');
                }}
              >
                <Text style={[styles.switchButtonText, { color: colors.primary }]}>
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

  // Sport Card Component - Premium with Active State & Shadow Depth
function SportCard({
  sport,
  colors,
  isSelected,
  onPress,
}: {
  sport: any;
  colors: typeof Colors.light;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.sportItem,
        {
          backgroundColor: colors.card,
          borderColor: isSelected ? colors.primary : 'transparent',
          borderWidth: isSelected ? 2.5 : 0,
        },
        isSelected ? styles.sportItemActive : styles.sportItemInactive,
      ]}
      activeOpacity={0.7}
    >
      {/* Icon with larger size */}
      <Text style={styles.sportEmoji}>{sport.emoji || '🎾'}</Text>
      
      <Text
        style={[styles.sportName, { 
          color: isSelected ? colors.primary : colors.text,
          fontWeight: isSelected ? '800' : '700'
        }]}
        numberOfLines={1}
      >
        {sport.name}
      </Text>
    </TouchableOpacity>
  );
}

// Feature Card Component - Enhanced with Icon Background
function FeatureCard({
  icon,
  title,
  description,
  colors,
  iconBgColor,
}: {
  icon: string;
  title: string;
  description: string;
  colors: typeof Colors.light;
  iconBgColor: string;
}) {
  return (
    <View
      style={[
        styles.featureCard,
        { backgroundColor: colors.card },
        Shadows.md,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // Welcome Section - Enhanced Typography with Hierarchy
  welcomeSection: {
    alignItems: 'center',
    marginBottom: Spacing['3xl'],
    marginTop: Spacing['3xl'],
    paddingHorizontal: Spacing.md,
  },
  welcomeTitle: {
    ...Typography.displaySmall,
    fontSize: 34,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  welcomeSubtitle: {
    ...Typography.bodyLarge,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '95%',
    fontWeight: '500',
    opacity: 0.8,
    fontSize: 16,
  },

  // Sports Grid - Premium Layout with Shadow Hierarchy
  sportsGridSection: {
    marginBottom: Spacing['2xl'],
  },
  sectionLabel: {
    ...Typography.titleLarge,
    marginBottom: Spacing.xl,
    fontWeight: '800',
    fontSize: 18,
    letterSpacing: -0.4,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  sportItem: {
    width: '47%',
    aspectRatio: 1.1,
    borderRadius: BorderRadius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  sportItemInactive: {
    ...Shadows.md,
  },
  sportItemActive: {
    ...Shadows.xl,
    transform: [{ scale: 1.02 }],
  },
  sportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sportEmoji: {
    fontSize: 52,
    marginBottom: Spacing.sm,
  },
  sportName: {
    ...Typography.labelMedium,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: -0.2,
  },
  checkmark: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  // Features Section - Premium with Enhanced Shadows & Spacing
  featuresSection: {
    marginBottom: Spacing['2xl'],
    gap: Spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius['2xl'],
    padding: Spacing.xl,
    paddingVertical: Spacing['2xl'],
    alignItems: 'center',
    gap: Spacing.lg,
    borderWidth: 0,
    ...Shadows.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.titleMedium,
    marginBottom: Spacing.xs,
    fontWeight: '800',
    fontSize: 17,
    letterSpacing: -0.3,
  },
  featureDesc: {
    ...Typography.bodyMedium,
    lineHeight: 20,
    fontWeight: '500',
    opacity: 0.8,
    fontSize: 14,
  },

  // CTA Section - Enhanced Button Spacing
  ctaSection: {
    gap: Spacing.lg,
    marginTop: Spacing['2xl'],
    paddingTop: Spacing.lg,
  },

  // Auth Screens - Premium Typography Hierarchy
  authHeader: {
    marginBottom: Spacing.xl,
  },
  backButtonText: {
    ...Typography.titleMedium,
    fontWeight: '700',
    fontSize: 15,
  },
  authTitle: {
    ...Typography.headingLarge,
    fontSize: 28,
    marginBottom: Spacing.sm,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  authSubtitle: {
    ...Typography.bodyLarge,
    marginBottom: Spacing['2xl'],
    lineHeight: 24,
    fontWeight: '400',
    opacity: 0.75,
  },

  // Form
  formContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing['2xl'],
  },
  inputWrapper: {
    width: '100%',
  },

  // Buttons & Links - Enhanced with Brand Color
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: Spacing.sm,
  },
  forgotPasswordText: {
    ...Typography.labelLarge,
    fontWeight: '700',
    fontSize: 13,
  },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing['2xl'],
  },
  switchText: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  switchButtonText: {
    ...Typography.titleSmall,
    fontWeight: '800',
    fontSize: 14,
  },

  // Divider - Refined Spacing
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing['2xl'],
    marginTop: Spacing['2xl'],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.3,
  },
  dividerText: {
    marginHorizontal: Spacing.lg,
    ...Typography.labelMedium,
    fontWeight: '700',
    fontSize: 12,
  },
});
