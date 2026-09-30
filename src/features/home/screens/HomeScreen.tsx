
import React, {useCallback} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  AppContainer,
  AppText,
} from '../../../components/common';

import {colors} from '../../../theme/colors';
import {spacing} from '../../../theme/spacing';
import {radius} from '../../../theme/radius';

const RECENT_CONVERSATIONS = [
  {
    id: '1',
    name: 'Alex',
    message: 'Hey, are you free today?',
    time: '10:42',
    initial: 'A',
    unread: true,
  },
  {
    id: '2',
    name: 'Sarah',
    message: 'Let’s discuss the project.',
    time: '09:18',
    initial: 'S',
    unread: false,
  },
];

const COMMUNITIES = [
  {
    id: '1',
    name: 'Design',
    members: '12 online',
    icon: '🎨',
  },
  {
    id: '2',
    name: 'React',
    members: '24 online',
    icon: '⚛️',
  },
];

const QUICK_ACTIONS = [
  {
    id: '1',
    title: 'New chat',
    subtitle: 'Start a conversation',
    icon: '✎',
  },
  {
    id: '2',
    title: 'Create group',
    subtitle: 'Connect with people',
    icon: '＋',
  },
];

export const HomeScreen = () => {
  const handleSearchPress = useCallback(() => {
    
  }, []);

  const handleProfilePress = useCallback(() => {
    
  }, []);

  const handleRecentPress = useCallback((id: string) => {
    // Navigate to conversation
  }, []);

  const handleCommunityPress = useCallback((id: string) => {
    // Navigate to community
  }, []);

  return (
    <AppContainer style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">

     
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <AppText
              variant="caption"
              color={colors.secondaryText}>
              Good morning
            </AppText>

            <AppText
              variant="h1"
              style={styles.title}>
              Harsh 👋
            </AppText>
          </View>

          <Pressable
            onPress={handleProfilePress}
            style={({pressed}) => [
              styles.profileButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Open profile">
            <AppText
              variant="bodyMedium"
              color={colors.white}>
              H
            </AppText>
          </Pressable>
        </View>

        {/* Search */}
        <Pressable
          onPress={handleSearchPress}
          style={({pressed}) => [
            styles.searchContainer,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Search conversations">

          <View style={styles.searchIcon}>
            <AppText
              variant="bodyMedium"
              color={colors.secondaryText}>
              ⌕
            </AppText>
          </View>

          <AppText
            variant="body"
            color={colors.mutedText}
            style={styles.searchText}>
            Search conversations
          </AppText>
        </Pressable>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h3">
              Quick actions
            </AppText>
          </View>

          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map(action => (
              <Pressable
                key={action.id}
                style={({pressed}) => [
                  styles.quickActionCard,
                  pressed && styles.pressed,
                ]}>

                <View style={styles.quickActionIcon}>
                  <AppText
                    variant="h3"
                    color={colors.primary}>
                    {action.icon}
                  </AppText>
                </View>

                <View style={styles.quickActionContent}>
                  <AppText variant="bodyMedium">
                    {action.title}
                  </AppText>

                  <AppText
                    variant="caption"
                    color={colors.secondaryText}
                    style={styles.quickActionSubtitle}>
                    {action.subtitle}
                  </AppText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Recent Conversations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h3">
              Recent
            </AppText>

            <Pressable>
              <AppText
                variant="caption"
                color={colors.primary}>
                See all
              </AppText>
            </Pressable>
          </View>

          <View style={styles.listContainer}>
            {RECENT_CONVERSATIONS.map(conversation => (
              <Pressable
                key={conversation.id}
                onPress={() => handleRecentPress(conversation.id)}
                style={({pressed}) => [
                  styles.recentCard,
                  pressed && styles.pressed,
                ]}>

                <View style={styles.avatar}>
                  <AppText
                    variant="bodyMedium"
                    color={colors.white}>
                    {conversation.initial}
                  </AppText>
                </View>

                <View style={styles.recentContent}>
                  <View style={styles.nameRow}>
                    <AppText variant="bodyMedium">
                      {conversation.name}
                    </AppText>

                    {conversation.unread && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>

                  <AppText
                    variant="caption"
                    color={colors.secondaryText}
                    numberOfLines={1}>
                    {conversation.message}
                  </AppText>
                </View>

                <View style={styles.timeContainer}>
                  <AppText
                    variant="caption"
                    color={colors.mutedText}>
                    {conversation.time}
                  </AppText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>


        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h3">
              Communities
            </AppText>

            <Pressable>
              <AppText
                variant="caption"
                color={colors.primary}>
                Explore
              </AppText>
            </Pressable>
          </View>

          <View style={styles.communityRow}>
            {COMMUNITIES.map(community => (
              <Pressable
                key={community.id}
                onPress={() => handleCommunityPress(community.id)}
                style={({pressed}) => [
                  styles.communityCard,
                  pressed && styles.pressed,
                ]}>

                <View style={styles.communityIcon}>
                  <AppText variant="h3">
                    {community.icon}
                  </AppText>
                </View>

                <AppText
                  variant="bodyMedium"
                  numberOfLines={1}>
                  {community.name}
                </AppText>

                <AppText
                  variant="caption"
                  color={colors.secondaryText}
                  style={styles.communityMembers}>
                  {community.members}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>

      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },

  headerContent: {
    flex: 1,
  },

  title: {
    marginTop: spacing.xs,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xxxl,
  },

  searchIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  searchText: {
    marginLeft: spacing.sm,
  },

  section: {
    marginBottom: spacing.xxxl,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },

  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  quickActionCard: {
    flex: 1,
    minHeight: 96,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  quickActionIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  quickActionContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },

  quickActionSubtitle: {
    marginTop: spacing.xs,
  },

  listContainer: {
    gap: spacing.sm,
  },

  recentCard: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  recentContent: {
    flex: 1,
    marginLeft: spacing.md,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },

  timeContainer: {
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
  },

  communityRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  communityCard: {
    flex: 1,
    minHeight: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },

  communityIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  communityMembers: {
    marginTop: spacing.xs,
  },

  pressed: {
    opacity: 0.7,
  },
});

