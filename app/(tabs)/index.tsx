import { Redirect } from 'expo-router';

export default function TabsIndex() {
  // Default tab route - redirect to home
  return <Redirect href="/(tabs)/home" />;
}

