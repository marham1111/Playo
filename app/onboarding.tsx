import { Carousel, CarouselSlide } from '@/components/ui/Carousel';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

// Onboarding slides data with improved copy and design
const ONBOARDING_SLIDES: CarouselSlide[] = [
  {
    id: 'welcome',
    title: "Pakistan's Local\nSports Community",
    highlightedKeywords: ['Sports Community'],
    subtitle: 'Connect with thousands of players and find games happening near you',
    icon: '👥',
  },
  {
    id: 'connect',
    title: 'Build Your\nNetwork',
    highlightedKeywords: ['Network'],
    subtitle: 'Play games, make friends, and grow your sports circle one match at a time',
    icon: '🤝',
  },
  {
    id: 'play',
    title: 'Play Sports\nNearby',
    highlightedKeywords: ['Sports', 'Nearby'],
    subtitle: 'Discover matches in your area within minutes and join instantly',
    icon: '🏸',
  },
  {
    id: 'progress',
    title: 'Track Your\nProgress',
    highlightedKeywords: ['Progress'],
    subtitle: 'Monitor your performance, improve your skills, and climb the rankings',
    icon: '⚡',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleNext = async (newIndex: number) => {
    // Only navigate to login if user tries to go PAST the last slide
    // (i.e., they clicked next while already on the last slide)
    const triedToGoFurther = newIndex > ONBOARDING_SLIDES.length - 1;

    if (triedToGoFurther) {
      // After viewing all slides, navigate to login
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    // Navigate directly to login when skip is pressed
    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Carousel
        slides={ONBOARDING_SLIDES}
        onNext={handleNext}
        onSkip={handleSkip}
        showSkipButton={true}
        nextButtonLabel="Next"
      />
    </View>
  );
}
