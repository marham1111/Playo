import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { mockConversations } from '@/lib/data/mockMessages';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchText, setSearchText] = useState('');

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
      marginBottom: Spacing.lg,
      fontSize: 28,
    },
    searchBox: {
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      fontSize: 18,
      marginRight: Spacing.sm,
    },
    searchInput: {
      flex: 1,
      ...Typography.bodyLarge,
      color: colors.text,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
    },
    conversationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },
    avatarText: {
      fontSize: 24,
    },
    conversationContent: {
      flex: 1,
    },
    conversationName: {
      ...Typography.titleMedium,
      color: colors.text,
      fontWeight: '700',
      marginBottom: Spacing.xs,
    },
    conversationMessage: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
    },
    conversationMeta: {
      alignItems: 'flex-end',
    },
    conversationTime: {
      ...Typography.labelSmall,
      color: colors.textSecondary,
      marginBottom: Spacing.xs,
    },
    badge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      ...Typography.labelSmall,
      color: '#FFFFFF',
      fontWeight: '700',
      fontSize: 10,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyIcon: {
      fontSize: 64,
      marginBottom: Spacing.lg,
    },
    emptyText: {
      ...Typography.bodyLarge,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 Messages</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {filteredConversations.map(conversation => (
            <TouchableOpacity
              key={conversation.id}
              style={styles.conversationItem}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <View style={styles.avatar}>
                 <Text style={styles.avatarText}>{conversation.avatar || conversation.name.charAt(0)}</Text>
              </View>

              <View style={styles.conversationContent}>
                <Text style={styles.conversationName}>{conversation.name}</Text>
                <Text
                  style={styles.conversationMessage}
                  numberOfLines={1}
                >
                  {conversation.lastMessage}
                </Text>
              </View>

              <View style={styles.conversationMeta}>
                <Text style={styles.conversationTime}>{conversation.timestamp}</Text>
                 {conversation.unread && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>•</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No conversations found</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
