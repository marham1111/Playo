import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-url-polyfill/auto';

import { AuthProvider } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * 📁 SIMPLIFIED APP STRUCTURE:
 * 
 * app/
 *   _layout.tsx    - Root layout (this file)
 *   index.tsx      - Entry point - redirects based on auth
 *   onboarding.tsx - Pre-login onboarding carousel (first launch only)
 *   login.tsx      - Login/Signup screen
 *   verify-otp.tsx - OTP verification
 *   reset-password.tsx - Password reset
 *   (tabs)/        - Main app tabs after login
 */

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="login" />
          <Stack.Screen name="verify-otp" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen name="setup" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
