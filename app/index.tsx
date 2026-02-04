import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';

/**
 * 🚀 Entry Point - Routing with Profile Completion Gate
 * 
 * - Loading → Show spinner
 * - Not logged in → Go to /onboarding (shows before login, every time)
 * - Logged in but no profile → Go to /setup (onboarding)
 * - Logged in with profile → Go to /(tabs)/home
 */
export default function Index() {
  const { isAuthenticated, isLoading, profileCompleted } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={{ marginTop: 16, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  // Not logged in → Show onboarding (displays every time before login)
  if (!isAuthenticated) {
    return <Redirect href="/onboarding" />;
  }

  // Logged in but profile not completed → Setup/Onboarding screen
  if (!profileCompleted) {
    return <Redirect href="/setup" />;
  }

  // Logged in with completed profile → Home screen
  return <Redirect href="/(tabs)/home" />;
}

