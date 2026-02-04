import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

/**
 * Marks onboarding as completed in device storage
 */
export async function markOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
  } catch (error) {
    console.error('Error marking onboarding complete:', error);
  }
}

/**
 * Checks if user has seen onboarding before
 */
export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    const result = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return result === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

/**
 * Resets onboarding status (for testing/debugging)
 */
export async function resetOnboarding(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
}
