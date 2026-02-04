import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { formatSkillLevel, formatSportName, parseCityFromPreferences } from '@/lib/utils/validation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout, profileData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Parse city from preferences string
  const userCity = parseCityFromPreferences(profileData?.preferences);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            router.replace('/login');
          } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to logout');
          }
        },
      },
    ]);
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flexGrow: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: Spacing['3xl'],
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.lg,
      marginBottom: Spacing.md,
    },
    avatarText: {
      fontSize: 40,
      color: '#FFFFFF',
    },
    userName: {
      ...Typography.headingSmall,
      color: colors.text,
      fontWeight: '800',
      marginBottom: Spacing.sm,
      fontSize: 20,
    },
    userEmail: {
      ...Typography.bodyLarge,
      color: colors.textSecondary,
    },
    statsGrid: {
      flexDirection: 'row',
      gap: Spacing.md,
      marginBottom: Spacing['3xl'],
    },
    statBox: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      ...Shadows.sm,
    },
    statNumber: {
      ...Typography.headingSmall,
      color: colors.primary,
      fontWeight: '800',
      marginBottom: Spacing.xs,
    },
    statLabel: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    infoBox: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    infoLabel: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    infoValue: {
      ...Typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
    },
    sectionTitle: {
      ...Typography.titleLarge,
      color: colors.text,
      fontWeight: '800',
      marginBottom: Spacing.lg,
      marginTop: Spacing['2xl'],
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingLabel: {
      ...Typography.bodyLarge,
      color: colors.text,
      fontWeight: '600',
    },
    settingIcon: {
      fontSize: 20,
    },
    editButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      alignItems: 'center',
      marginBottom: Spacing.lg,
      ...Shadows.lg,
    },
    editButtonText: {
      ...Typography.titleLarge,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    logoutButton: {
      backgroundColor: colors.primary + '20',
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
    },
    logoutButtonText: {
      ...Typography.titleLarge,
      color: colors.primary,
      fontWeight: '700',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profileData?.profileImageUrl || '👤'}</Text>
          </View>
          <Text style={styles.userName}>{profileData?.fullName || user?.name || 'Player'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData?.sports?.length || 0}</Text>
            <Text style={styles.statLabel}>Sports</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{profileData?.skill?.charAt(0).toUpperCase() || '-'}</Text>
            <Text style={styles.statLabel}>Skill Level</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userCity?.substring(0, 3).toUpperCase() || '-'}</Text>
            <Text style={styles.statLabel}>City</Text>
          </View>
        </View>

        {/* Profile Info */}
        {profileData && (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Sports Playing</Text>
              <Text style={styles.infoValue}>
                {profileData.sports?.map(formatSportName).join(', ') || 'None selected'}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Skill Level</Text>
              <Text style={styles.infoValue}>
                {formatSkillLevel(profileData.skill)}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{userCity || 'Not specified'}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Bio</Text>
              <Text style={styles.infoValue}>{profileData.bio || 'No bio added'}</Text>
            </View>
          </>
        )}

        {/* Edit Profile */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            router.push('/edit-profile');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
        </TouchableOpacity>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => Alert.alert('Preferences', 'Preferences coming soon!')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Preferences</Text>
          <Text style={styles.settingIcon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => Alert.alert('Privacy', 'Privacy settings coming soon!')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Privacy & Safety</Text>
          <Text style={styles.settingIcon}>🔒</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => Alert.alert('Help', 'Help center coming soon!')}
          activeOpacity={0.7}
        >
          <Text style={styles.settingLabel}>Help & Support</Text>
          <Text style={styles.settingIcon}>❓</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
