import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockFriends, mockPlayers } from '@/lib/data/mockPlayers';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
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

export default function FindPlayersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(`${location.coords.latitude.toFixed(2)}, ${location.coords.longitude.toFixed(2)}`);
      }
    } catch (error) {
      console.log('Location error:', error);
    } finally {
      setLoading(false);
    }
  };

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
      fontSize: 28,
    },
    locationInfo: {
      backgroundColor: colors.primary + '15',
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primary + '30',
    },
    locationIcon: {
      fontSize: 20,
      marginRight: Spacing.sm,
    },
    locationText: {
      ...Typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
    },
    sectionTitle: {
      ...Typography.titleLarge,
      color: colors.text,
      fontWeight: '800',
      marginTop: Spacing['2xl'],
      marginBottom: Spacing.lg,
      fontSize: 20,
    },
    playerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      ...Shadows.sm,
    },
    playerAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.lg,
    },
    playerAvatarText: {
      fontSize: 24,
    },
    playerContent: {
      flex: 1,
    },
    playerName: {
      ...Typography.titleMedium,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.xs,
    },
    playerSport: {
      ...Typography.bodySmall,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: Spacing.xs,
    },
    playerInfo: {
      flexDirection: 'row',
      gap: Spacing.md,
      alignItems: 'center',
    },
    playerSkill: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
    },
    playerDistance: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
    },
    playerStatus: {
      ...Typography.labelSmall,
      color: colors.primary,
      fontWeight: '700',
    },
    addButton: {
      backgroundColor: colors.primary + '20',
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg,
    },
    addButtonText: {
      ...Typography.labelLarge,
      color: colors.primary,
      fontWeight: '700',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[Typography.bodyLarge, { color: colors.text, marginTop: Spacing.lg }]}>
            Loading your location...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📍 Find Players</Text>
        {currentLocation && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Your Location: {currentLocation}</Text>
          </View>
        )}
      </View>

      {/* Players List */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Nearby Players */}
        <Text style={styles.sectionTitle}>Players Near You ({mockPlayers.length})</Text>
        {mockPlayers.map(player => (
          <View key={player.id} style={styles.playerCard}>
            <View style={styles.playerAvatar}>
              <Text style={styles.playerAvatarText}>{player.sport.charAt(0)}</Text>
            </View>

            <View style={styles.playerContent}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerSport}>{player.sport}</Text>
              <View style={styles.playerInfo}>
                <Text style={styles.playerSkill}>{player.skillLevel}</Text>
                <Text style={styles.playerDistance}>{player.distance}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => Alert.alert('Add Friend', `Friend request sent to ${player.name}`)}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Friends Section */}
        <Text style={styles.sectionTitle}>Your Friends ({mockFriends.length})</Text>
        {mockFriends.map(friend => (
          <View key={friend.id} style={styles.playerCard}>
            <View style={styles.playerAvatar}>
              <Text style={styles.playerAvatarText}>👤</Text>
            </View>

            <View style={styles.playerContent}>
              <Text style={styles.playerName}>{friend.name}</Text>
            </View>

            <TouchableOpacity
              style={[styles.addButton, { borderColor: colors.primary, backgroundColor: colors.primary + '20' }]}
              onPress={() => Alert.alert('Message', `Chat with ${friend.name}`)}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>💬</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
