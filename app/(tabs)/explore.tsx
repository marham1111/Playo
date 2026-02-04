import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockGames } from '@/lib/data/mockGames';
import React, { useState } from 'react';
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

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      ...Typography.headingMedium,
      color: colors.text,
      fontWeight: '800',
      marginBottom: Spacing.md,
      fontSize: 24,
    },
    headerSubtitle: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      marginBottom: Spacing.sm,
    },
    sportFilters: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      gap: Spacing.md,
    },
    sportFilter: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderWidth: 2,
      borderColor: colors.border,
    },
    sportFilterActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary + '15',
    },
    sportFilterText: {
      ...Typography.labelMedium,
      color: colors.text,
      fontWeight: '700',
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    gameCard: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...Shadows.sm,
    },
    gameHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: Spacing.md,
    },
    gameSport: {
      ...Typography.titleLarge,
      color: colors.text,
      fontWeight: '800',
      fontSize: 18,
    },
    gameStatus: {
      backgroundColor: colors.primary + '20',
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    gameStatusText: {
      ...Typography.labelSmall,
      color: colors.primary,
      fontWeight: '700',
    },
    gameTitle: {
      ...Typography.titleMedium,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.sm,
    },
    gameHost: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
      marginBottom: Spacing.md,
    },
    gameDetails: {
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    gameDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    gameDetailIcon: {
      fontSize: 16,
      width: 20,
    },
    gameDetailText: {
      ...Typography.bodySmall,
      color: colors.text,
      flex: 1,
    },
    gameFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    slotsInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    slotsBar: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
      overflow: 'hidden',
      width: 60,
    },
    slotsBarFill: {
      height: '100%',
      backgroundColor: colors.primary,
    },
    slotsText: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    joinButton: {
      backgroundColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
    },
    joinButtonText: {
      ...Typography.labelLarge,
      color: '#FFFFFF',
      fontWeight: '700',
    },
    joinButtonDisabled: {
      backgroundColor: colors.textSecondary,
    },
  });

  const filteredGames = selectedSport
    ? mockGames.filter(game => game.sport.includes(selectedSport))
    : mockGames;

  const uniqueSports = ['🎾', '⚽', '🏏', '🏸'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Explore Games</Text>
        <Text style={styles.headerSubtitle}>
          Find and join games near you
        </Text>
      </View>

      {/* Sport Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sportFilters}
      >
        <TouchableOpacity
          style={[styles.sportFilter, !selectedSport && styles.sportFilterActive]}
          onPress={() => setSelectedSport(null)}
          activeOpacity={0.7}
        >
          <Text style={styles.sportFilterText}>All Sports</Text>
        </TouchableOpacity>
        {uniqueSports.map(sport => (
          <TouchableOpacity
            key={sport}
            style={[styles.sportFilter, selectedSport === sport && styles.sportFilterActive]}
            onPress={() => setSelectedSport(sport)}
            activeOpacity={0.7}
          >
            <Text style={styles.sportFilterText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Games List */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filteredGames.map(game => {
          const availableSlots = game.slots.total - game.slots.filled;
          return (
          <View key={game.id} style={styles.gameCard}>
            {/* Header */}
            <View style={styles.gameHeader}>
              <Text style={styles.gameSport}>{game.sport}</Text>
              <View style={styles.gameStatus}>
                <Text style={styles.gameStatusText}>
                  {availableSlots === 0 ? '🔴 Full' : '🟢 Filling'}
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameHost}>Hosted by {game.host}</Text>

            {/* Details */}
            <View style={styles.gameDetails}>
              <View style={styles.gameDetail}>
                <Text style={styles.gameDetailIcon}>📅</Text>
                <Text style={styles.gameDetailText}>{game.date}</Text>
              </View>
              <View style={styles.gameDetail}>
                <Text style={styles.gameDetailIcon}>📍</Text>
                <Text style={styles.gameDetailText}>{game.location}</Text>
              </View>
              <View style={styles.gameDetail}>
                <Text style={styles.gameDetailIcon}>⭐</Text>
                <Text style={styles.gameDetailText}>{game.skillLevel} Level</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.gameFooter}>
              <View style={styles.slotsInfo}>
                <View style={styles.slotsBar}>
                  <View
                    style={[
                      styles.slotsBarFill,
                      {
                        width: `${(game.slots.filled / game.slots.total) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.slotsText}>
                  {availableSlots} of {game.slots.total} slots
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.joinButton, availableSlots === 0 && styles.joinButtonDisabled]}
                onPress={() => {
                  if (availableSlots > 0) {
                    Alert.alert('Join Game', `Joined ${game.title}!`);
                  } else {
                    Alert.alert('Game Full', 'This game is currently full');
                  }
                }}
                disabled={availableSlots === 0}
                activeOpacity={0.8}
              >
                <Text style={styles.joinButtonText}>
                  {availableSlots > 0 ? 'Join' : 'Full'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
