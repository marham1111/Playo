import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockUpcomingGames, mockUserStats } from '@/lib/data/mockGames';
import { formatSportName, parseCityFromPreferences } from '@/lib/utils/validation';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning 🌅';
  if (hour < 18) return 'Good Afternoon ☀️';
  return 'Good Evening 🌙';
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, profileData } = useAuth();
  
  // Parse city from preferences
  const userCity = parseCityFromPreferences(profileData?.preferences);
  const userSports = profileData?.sports?.map(formatSportName).join(', ') || 'No sports selected';

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flexGrow: 1,
      paddingBottom: Spacing['3xl'],
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.sm,
      paddingBottom: Spacing.lg,
    },
    welcomeSection: {
      marginBottom: Spacing['2xl'],
    },
    welcomeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    welcomeText: {
      ...Typography.headingMedium,
      color: colors.text,
      fontWeight: '800',
      fontSize: 24,
    },
    editButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editButtonIcon: {
      fontSize: 18,
    },
    userName: {
      ...Typography.bodyLarge,
      color: colors.primary,
      fontWeight: '700',
      fontSize: 16,
    },
    statsSection: {
      marginBottom: Spacing['2xl'],
    },
    statsContainer: {
      flexDirection: 'row',
      gap: Spacing.lg,
      alignItems: 'flex-start',
    },
    avatarSection: {
      alignItems: 'center',
    },
    largeAvatar: {
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
    nameText: {
      ...Typography.bodySmall,
      color: colors.text,
      fontWeight: '700',
      textAlign: 'center',
    },
    statsGrid: {
      flex: 1,
      gap: Spacing.md,
    },
    statsRow: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    statBox: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
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
      fontSize: 18,
    },
    statLabel: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
      fontWeight: '700',
      textTransform: 'uppercase',
      fontSize: 9,
      letterSpacing: 0.5,
    },
    actionSection: {
      marginBottom: Spacing['2xl'],
    },
    sectionTitle: {
      ...Typography.titleLarge,
      color: colors.text,
      fontWeight: '800',
      marginBottom: Spacing.lg,
      fontSize: 18,
    },
    actionGrid: {
      flexDirection: 'row',
      gap: Spacing.md,
    },
    actionButton: {
      flex: 1,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.xl,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.md,
    },
    actionButtonPrimary: {
      backgroundColor: colors.primary,
    },
    actionButtonIcon: {
      fontSize: 28,
      marginBottom: Spacing.sm,
    },
    actionButtonText: {
      ...Typography.labelSmall,
      color: '#FFFFFF',
      fontWeight: '700',
      textAlign: 'center',
    },
    gamesSection: {
      marginBottom: Spacing['2xl'],
    },
    gameCard: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      marginBottom: Spacing.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      ...Shadows.sm,
    },
    gameImageSection: {
      backgroundColor: colors.primary + '20',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    gameImageIcon: {
      fontSize: 48,
    },
    gameStatusTag: {
      position: 'absolute',
      top: Spacing.md,
      right: Spacing.md,
      backgroundColor: '#4CAF50',
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
    },
    gameStatusTagFull: {
      backgroundColor: '#F44336',
    },
    gameStatusText: {
      ...Typography.labelSmall,
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 11,
    },
    gameContent: {
      padding: Spacing.lg,
    },
    gameTime: {
      ...Typography.headingSmall,
      color: colors.text,
      fontWeight: '800',
      marginBottom: Spacing.xs,
      fontSize: 18,
    },
    gameTitle: {
      ...Typography.bodyMedium,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.md,
    },
    gameInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
      marginBottom: Spacing.lg,
      paddingBottom: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    gameInfoIcon: {
      fontSize: 16,
    },
    gameInfoText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      flex: 1,
    },
    gameFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameSlots: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    slotsIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    slotsText: {
      ...Typography.labelSmall,
      color: colors.text,
      fontWeight: '700',
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    joinButtonText: {
      ...Typography.labelSmall,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: Spacing['2xl'],
    },
    emptyIcon: {
      fontSize: 56,
      marginBottom: Spacing.lg,
    },
    emptyTitle: {
      ...Typography.titleMedium,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.sm,
    },
    emptyText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    profileSummary: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing['2xl'],
      borderWidth: 1,
      borderColor: colors.border,
      ...Shadows.sm,
    },
    profileInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },
    profileInfoLabel: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    profileInfoValue: {
      ...Typography.bodySmall,
      color: colors.text,
      fontWeight: '700',
      flex: 1,
      textAlign: 'right',
    },
  });

  // Using mockUpcomingGames from centralized data

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={styles.safeArea}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.welcomeText}>{getGreeting()}</Text>
                <Text style={styles.userName}>{user?.name || 'Player'}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push('/(tabs)/profile')}
                activeOpacity={0.7}
              >
                <Text style={styles.editButtonIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statsContainer}>
              {/* Avatar */}
              <View style={styles.avatarSection}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.avatarText}>{profileData?.profileImageUrl || '👤'}</Text>
                </View>
                <Text style={styles.nameText}>
                  {user?.name?.split(' ')[0] || 'Player'}
                </Text>
              </View>

              {/* Stats Grid 2x2 */}
              <View style={styles.statsGrid}>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{mockUserStats.gamesPlayed}</Text>
                    <Text style={styles.statLabel}>Games</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{mockUserStats.wins}</Text>
                    <Text style={styles.statLabel}>Wins</Text>
                  </View>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{mockUserStats.rating}</Text>
                    <Text style={styles.statLabel}>Rank</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{mockUserStats.reliability}%</Text>
                    <Text style={styles.statLabel}>Reliable</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Profile Info Summary */}
          {profileData && (
            <View style={styles.profileSummary}>
              <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoLabel}>🏅 Skill:</Text>
                <Text style={styles.profileInfoValue}>
                  {profileData.skill?.charAt(0).toUpperCase() + profileData.skill?.slice(1) || 'Not set'}
                </Text>
              </View>
              <View style={styles.profileInfoRow}>
                <Text style={styles.profileInfoLabel}>🎯 Sports:</Text>
                <Text style={styles.profileInfoValue} numberOfLines={1}>
                  {userSports}
                </Text>
              </View>
              {userCity && (
                <View style={styles.profileInfoRow}>
                  <Text style={styles.profileInfoLabel}>📍 Location:</Text>
                  <Text style={styles.profileInfoValue}>{userCity}</Text>
                </View>
              )}
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.actionSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonPrimary]}
                onPress={() => console.log('Quick Play')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonIcon}>⚡</Text>
                <Text style={styles.actionButtonText}>Quick Play</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.actionButtonPrimary]}
                onPress={() => router.push('/(tabs)/explore')}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonIcon}>➕</Text>
                <Text style={styles.actionButtonText}>Organize</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upcoming Games */}
          <View style={styles.gamesSection}>
            <Text style={styles.sectionTitle}>Upcoming Games</Text>

            {mockUpcomingGames.length > 0 ? (
              mockUpcomingGames.map(game => (
                <View key={game.id} style={styles.gameCard}>
                  {/* Image Section */}
                  <View style={styles.gameImageSection}>
                    <Text style={styles.gameImageIcon}>⚽</Text>
                    <View
                      style={[
                        styles.gameStatusTag,
                        game.players >= game.maxPlayers && styles.gameStatusTagFull,
                      ]}
                    >
                      <Text style={styles.gameStatusText}>
                        {game.players >= game.maxPlayers ? '🔴 Full' : '🟢 Open'}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View style={styles.gameContent}>
                    <Text style={styles.gameTime}>{game.time}</Text>
                    <Text style={styles.gameTitle}>{game.sport}</Text>

                    <View style={styles.gameInfo}>
                      <Text style={styles.gameInfoIcon}>📍</Text>
                      <Text style={styles.gameInfoText}>{game.location}</Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.gameFooter}>
                      <View style={styles.gameSlots}>
                        <View style={styles.slotsIndicator} />
                        <Text style={styles.slotsText}>
                          {game.players} of {game.maxPlayers} slots
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.joinButton}
                        onPress={() => Alert.alert('Joined!', `You joined ${game.sport}`)}
                        activeOpacity={0.8}
                        disabled={game.players >= game.maxPlayers}
                      >
                        <Text style={styles.joinButtonText}>
                          {game.players >= game.maxPlayers ? 'Full' : 'Join'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🎮</Text>
                <Text style={styles.emptyTitle}>No Upcoming Games</Text>
                <Text style={styles.emptyText}>
                  Explore games or organize your own
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
