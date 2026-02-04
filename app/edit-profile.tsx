import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { ProfilesService } from '@/lib/api/profiles';
import { parseCityFromPreferences } from '@/lib/utils/validation';
import { AVATARS, PAKISTAN_CITIES, SKILL_LEVELS, SPORTS } from '@/types/profile';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#90EE90',
  darkText: '#1F1F1F',
  lightGray: '#F5F5F5',
  borderGray: '#E0E0E0',
  errorRed: '#FF6B6B',
};

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, profileData, fetchUserProfile } = useAuth();

  // Step state management
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form answers - initialized from profile data
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>('beginner');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('👤');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [bio, setBio] = useState<string>('');

  // Track if changes were made
  const [hasChanges, setHasChanges] = useState(false);

  // Validation errors
  const [sportsError, setSportsError] = useState<string>('');
  const [cityError, setCityError] = useState<string>('');

  // Initialize form with existing profile data
  useEffect(() => {
    if (profileData) {
      setSelectedSports(profileData.sports || []);
      setSelectedSkill(profileData.skill || 'beginner');
      setSelectedAvatar(profileData.profileImageUrl || '👤');
      setSelectedCity(parseCityFromPreferences(profileData.preferences) || '');
      setBio(profileData.bio || '');
    }
  }, [profileData]);

  if (!user || !profileData) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Text style={{ color: COLORS.darkText }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const toggleSport = (sportId: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportId) ? prev.filter((s) => s !== sportId) : [...prev, sportId]
    );
    setSportsError('');
    setHasChanges(true);
  };

  const handleSkillChange = (skillId: string) => {
    setSelectedSkill(skillId);
    setHasChanges(true);
  };

  const handleAvatarChange = (emoji: string) => {
    setSelectedAvatar(emoji);
    setHasChanges(true);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setCityError('');
    setHasChanges(true);
  };

  const handleBioChange = (text: string) => {
    setBio(text);
    setHasChanges(true);
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate sports selection (min 1 required)
      if (selectedSports.length === 0) {
        setSportsError('Select at least 1 sport');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate city selection
      if (!selectedCity) {
        setCityError('City is required');
        return;
      }
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSportsError('');
      setCityError('');
    } else {
      // If on step 1 and user presses back, ask if they want to discard changes
      if (hasChanges) {
        Alert.alert('Discard Changes?', 'You have unsaved changes. Do you want to discard them?', [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => router.back(),
          },
        ]);
      } else {
        router.back();
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Edit Profile - User ID:', user.$id);

      // Update profile with all form data
      const updatedProfile = await ProfilesService.updateProfile(
        user.$id,
        {
          fullName: user.name || 'User',
          sports: selectedSports,
          skill: selectedSkill,
          profileImageUrl: selectedAvatar,
          preferences: selectedCity ? `city:${selectedCity}` : undefined,
          bio: bio,
        }
      );

      console.log('Edit Profile - Profile updated:', updatedProfile);

      // Refresh profile in context
      await fetchUserProfile(user.$id);

      // Show success message and go back
      Alert.alert('Success', 'Your profile has been updated!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      console.error('Edit Profile error:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          {/* Header with Back Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
            <TouchableOpacity onPress={handleBack} style={{ marginRight: 12 }}>
              <Text style={{ fontSize: 24, color: COLORS.primary }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.darkText, flex: 1 }}>
              Edit Profile
            </Text>
          </View>

          {/* Progress Indicator */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{ fontSize: 14, color: COLORS.darkText, marginBottom: 8 }}>
              Step {currentStep} of 2
            </Text>
            <View style={{ height: 4, backgroundColor: COLORS.lightGray, borderRadius: 2 }}>
              <View
                style={{
                  height: 4,
                  backgroundColor: COLORS.primary,
                  borderRadius: 2,
                  width: `${(currentStep / 2) * 100}%`,
                }}
              />
            </View>
          </View>

          {/* STEP 1: Sports, Skill, Avatar */}
          {currentStep === 1 && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: COLORS.darkText, marginBottom: 8 }}>
                Update your sports & skills
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                Change what sports you play and your skill level
              </Text>

              {/* SPORTS SELECTION */}
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginBottom: 12 }}>
                What sports do you play? *
              </Text>
              <Text style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>
                Select at least 1 (required)
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                {SPORTS.map((sport) => (
                  <Chip
                    key={sport.id}
                    label={`${sport.emoji} ${sport.name}`}
                    selected={selectedSports.includes(sport.id)}
                    onPress={() => toggleSport(sport.id)}
                    style={{ marginBottom: 8 }}
                  />
                ))}
              </View>
              {sportsError && <Text style={{ color: COLORS.errorRed, fontSize: 12, marginBottom: 16 }}>{sportsError}</Text>}

              {/* SKILL LEVEL SELECTION */}
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginBottom: 12 }}>
                What&apos;s your skill level? *
              </Text>
              <View style={{ gap: 8, marginBottom: 24 }}>
                {SKILL_LEVELS.map((level) => (
                  <Button
                    key={level.id}
                    title={level.label}
                    onPress={() => handleSkillChange(level.id)}
                    variant={selectedSkill === level.id ? 'primary' : 'secondary'}
                    size="medium"
                  />
                ))}
              </View>

              {/* AVATAR SELECTION */}
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginBottom: 12 }}>
                Choose your avatar emoji *
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
                {AVATARS.map((avatar) => (
                  <TouchableOpacity
                    key={avatar.id}
                    onPress={() => handleAvatarChange(avatar.emoji)}
                    style={{
                      width: '18%',
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 12,
                      backgroundColor:
                        selectedAvatar === avatar.emoji
                          ? COLORS.primary
                          : COLORS.lightGray,
                      borderWidth: selectedAvatar === avatar.emoji ? 2 : 0,
                      borderColor: COLORS.primary,
                    }}
                  >
                    <Text style={{ fontSize: 32 }}>{avatar.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* STEP 2: City and Bio */}
          {currentStep === 2 && (
            <View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: COLORS.darkText, marginBottom: 8 }}>
                Update your location & bio
              </Text>
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
                Tell us where you&apos;re located and update your bio
              </Text>

              {/* CITY SELECTION */}
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginBottom: 12 }}>
                City *
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: cityError ? COLORS.errorRed : COLORS.borderGray,
                  borderRadius: 12,
                  marginBottom: 16,
                  backgroundColor: COLORS.lightGray,
                }}
              >
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ paddingHorizontal: 12, paddingVertical: 8 }}
                >
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {PAKISTAN_CITIES.map((city) => (
                      <TouchableOpacity
                        key={city}
                        onPress={() => handleCityChange(city)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 10,
                          borderRadius: 20,
                          backgroundColor:
                            selectedCity === city
                              ? COLORS.primary
                              : '#FFF',
                          borderWidth: 1,
                          borderColor:
                            selectedCity === city
                              ? COLORS.primary
                              : COLORS.borderGray,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color:
                              selectedCity === city
                                ? COLORS.darkText
                                : '#666',
                            fontWeight: '500',
                          }}
                        >
                          {city}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              {cityError && <Text style={{ color: COLORS.errorRed, fontSize: 12, marginBottom: 16 }}>{cityError}</Text>}

              {/* BIO INPUT (OPTIONAL) */}
              <Text style={{ fontSize: 16, fontWeight: '600', color: COLORS.darkText, marginBottom: 8 }}>
                Bio (optional)
              </Text>
              <Input
                placeholder="Tell us about yourself..."
                value={bio}
                onChangeText={handleBioChange}
                multiline
                numberOfLines={4}
                maxLength={150}
                style={{ marginBottom: 32 }}
              />
            </View>
          )}

          {/* Navigation Buttons */}
          <View style={{ flexDirection: 'row', gap: 12, paddingBottom: 40 }}>
            {currentStep > 1 ? (
              <Button
                title="Back"
                variant="secondary"
                size="large"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
            ) : (
              <Button
                title="Cancel"
                variant="secondary"
                size="large"
                onPress={handleBack}
                style={{ flex: 1 }}
              />
            )}
            <Button
              title={currentStep === 2 ? 'Save Changes' : 'Next'}
              variant="primary"
              size="large"
              onPress={handleNext}
              loading={isLoading}
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
