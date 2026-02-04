import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Button } from './Button';
import { ThemedText } from './Text';

export interface CarouselSlide {
  id: string;
  title: string;
  highlightedKeywords?: string[];
  subtitle?: string;
  content?: string;
  icon?: string;
}

// Helper function to render title with highlighted keywords
const renderHighlightedTitle = (title: string, keywords?: string[], highlightColor: string = '#5FD382') => {
  if (!keywords || keywords.length === 0) {
    return <Text style={{ fontWeight: '700', fontSize: 28, lineHeight: 36, color: '#000000', textAlign: 'center' }}>{title}</Text>;
  }

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  let match;

  while ((match = regex.exec(title)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <Text key={`text-${lastIndex}`} style={{ fontWeight: '700', fontSize: 28, lineHeight: 36, color: '#000000' }}>
          {title.substring(lastIndex, match.index)}
        </Text>
      );
    }
    parts.push(
      <Text key={`highlight-${match.index}`} style={{ fontWeight: '700', fontSize: 28, lineHeight: 36, color: highlightColor }}>
        {match[0]}
      </Text>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < title.length) {
    parts.push(
      <Text key={`text-${lastIndex}`} style={{ fontWeight: '700', fontSize: 28, lineHeight: 36, color: '#000000' }}>
        {title.substring(lastIndex)}
      </Text>
    );
  }

  return <Text style={{ textAlign: 'center' }}>{parts}</Text>;
};

interface CarouselProps {
  slides: CarouselSlide[];
  onNext: (currentIndex: number) => void;
  onSkip?: () => void;
  onBack?: (currentIndex: number) => void;
  showBackButton?: boolean;
  showSkipButton?: boolean;
  nextButtonLabel?: string;
  skipButtonLabel?: string;
  backButtonLabel?: string;
}

export const Carousel = React.forwardRef<View, CarouselProps>(
  (
    {
      slides,
      onNext,
      onSkip,
      onBack,
      showBackButton = false,
      showSkipButton = false,
      nextButtonLabel = 'Next',
      skipButtonLabel = 'Skip',
      backButtonLabel = 'Back',
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const handleNext = () => {
      if (currentIndex < slides.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        // Call onNext with the NEW index
        onNext(nextIndex);
      } else {
        // Already at last slide - pass a value > slides.length - 1 to indicate they want to proceed
        onNext(slides.length);
      }
    };

    const handleBack = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      if (onBack) {
        onBack(currentIndex);
      }
    };

    const handleSkip = () => {
      if (onSkip) {
        onSkip();
      }
    };

    const currentSlide = slides[currentIndex];
    const isLastSlide = currentIndex === slides.length - 1;

    const containerStyle: ViewStyle = {
      flex: 1,
      backgroundColor: '#FAF9F6',
      justifyContent: 'space-between',
      paddingTop: 0,
    };

    // Card container - no visible border, content flows naturally
    const cardStyle: ViewStyle = {
      flex: 1,
      marginHorizontal: Spacing.lg,
      marginVertical: 0,
      marginTop: 80,
      paddingVertical: 48,
      paddingHorizontal: 24,
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
      alignItems: 'center',
    };

    // Icon positioned at TOP of card
    const iconStyle: TextStyle = {
      fontSize: 140,
      textAlign: 'center',
      lineHeight: 140,
      marginBottom: 32,
    };

    // Title inside card
    const titleStyle: TextStyle = {
      color: '#000000',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 28,
      lineHeight: 36,
      marginBottom: 16,
    };

    // Subtitle inside card
    const subtitleStyle: TextStyle = {
      color: '#7F7F7F',
      textAlign: 'center',
      fontSize: 15,
      lineHeight: 23,
      fontWeight: '400',
    };

    const dotsContainerStyle: ViewStyle = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    };

    const dotStyle = (isActive: boolean): ViewStyle => ({
      width: isActive ? 24 : 8,
      height: 8,
      borderRadius: BorderRadius.full,
      backgroundColor: isActive ? colors.primary : colors.border,
      marginHorizontal: Spacing.xs,
    });

    const buttonsContainerStyle: ViewStyle = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: Spacing.md,
    };

    return (
      <View ref={ref} style={containerStyle}>
        {/* CARD CONTENT - Icon at top, title and subtitle below */}
        <View style={cardStyle}>
          {/* Icon - at TOP of card */}
          {currentSlide?.icon && (
            <ThemedText style={iconStyle}>
              {currentSlide.icon}
            </ThemedText>
          )}

          {/* Title - below icon with highlighted keywords */}
          {currentSlide?.title && (
            <View style={{ marginBottom: 16 }}>
              {renderHighlightedTitle(currentSlide.title, currentSlide.highlightedKeywords)}
            </View>
          )}

          {/* Subtitle - below title */}
          {currentSlide?.subtitle && (
            <ThemedText style={subtitleStyle}>
              {currentSlide.subtitle}
            </ThemedText>
          )}
        </View>

        {/* BOTTOM SECTION - Dots & Buttons */}
        <View style={{ paddingHorizontal: Spacing.lg, paddingBottom: 40, gap: 12, marginTop: -30 }}>
          {/* Dots Indicator */}
          <View style={dotsContainerStyle}>
            {slides.map((_, index) => (
              <View key={`dot-${index}`} style={dotStyle(index === currentIndex)} />
            ))}
          </View>

          {/* Navigation Buttons */}
          <View style={buttonsContainerStyle}>
            {showBackButton && currentIndex > 0 ? (
              <Button
                title={backButtonLabel}
                variant="secondary"
                size="medium"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
            ) : (
              showBackButton && <View style={{ flex: 1 }} />
            )}

            {showSkipButton && !isLastSlide && (
              <Button
                title={`${skipButtonLabel}`}
                variant="ghost"
                size="medium"
                onPress={handleSkip}
                style={{ flex: 1 }}
              />
            )}

            <Button
              title={`${nextButtonLabel} →`}
              variant="primary"
              size="medium"
              onPress={handleNext}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    );
  }
);

Carousel.displayName = 'Carousel';
