
import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  ArrowLeft,
  Bell,
  Bookmark,
  ChevronRight,
  Image as ImageIcon,
  LockKeyhole,
  LogOut,
  Pencil,
  Settings,
  ShieldCheck,
} from 'lucide-react-native';

import { AppText } from '../../../components/common/AppText';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';
import { shadows } from '../../../theme/shadows';

const C = {
  background: '#ECEDEF',
  card: 'rgba(255,255,255,0.72)',
  white: colors.white,
  black: colors.black,
  secondary: colors.secondaryText,
  border: 'rgba(255,255,255,0.9)',
  line: 'rgba(0,0,0,0.08)',
};

const SettingRow = ({
  icon,
  title,
  onPress,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  last?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    style={[styles.settingRow, !last && styles.settingBorder]}
  >
    <View style={styles.settingIcon}>{icon}</View>

    <AppText variant="body">{title}</AppText>

    <View style={styles.chevron}>
      <ChevronRight size={19} color={C.secondary} />
    </View>
  </Pressable>
);

export const ProfileScreen = () => {
  const showComingSoon = (feature: string) => {
    Alert.alert(feature, 'We will implement this feature in the next step.');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Logout functionality will be connected to your authentication flow in a later step.',
      [{ text: 'OK' }],
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Soft background decoration */}
        <View pointerEvents="none" style={styles.glowTop} />
        <View pointerEvents="none" style={styles.glowBottom} />

      
<View style={styles.topBar}>
  <Pressable
    onPress={() => showComingSoon('Navigation')}
    style={styles.roundButton}
    accessibilityRole="button"
    accessibilityLabel="Back"
    hitSlop={8}
  >
    <ArrowLeft size={21} color={C.black} />
  </Pressable>

  <AppText variant="h2" style={styles.headerTitle}>
    My Profile
  </AppText>

  <Pressable
    onPress={() => showComingSoon('Settings')}
    style={styles.roundButton}
    accessibilityRole="button"
    accessibilityLabel="Settings"
    hitSlop={8}
  >
    <Settings size={21} color={C.black} />
  </Pressable>
</View>

        {/* Profile information */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <AppText variant="h1" style={styles.avatarText}>
                H
              </AppText>
            </View>

            <Pressable
              style={styles.editAvatar}
              onPress={() => showComingSoon('Edit Profile')}
              accessibilityLabel="Edit profile"
            >
              <Pencil size={15} color={C.black} />
            </Pressable>
          </View>

          <AppText variant="h1" style={styles.name}>
            Your Name
          </AppText>

          <AppText variant="body" style={styles.phone}>
            Your phone number
          </AppText>

          <AppText variant="body" style={styles.bio}>
            Good vibes. Better conversations. 🌿
          </AppText>
        </View>

        {/* Statistics */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <ImageIcon size={22} color={C.black} />
            <AppText variant="caption" style={styles.statLabel}>
              Messages
            </AppText>
            <AppText variant="h2">0</AppText>
          </View>

          <View style={styles.statCard}>
            <Settings size={22} color={C.black} />
            <AppText variant="caption" style={styles.statLabel}>
              Groups
            </AppText>
            <AppText variant="h2">0</AppText>
          </View>

          <View style={styles.statCard}>
            <ShieldCheck size={22} color={C.black} />
            <AppText variant="caption" style={styles.statLabel}>
              Spaces
            </AppText>
            <AppText variant="h2">0</AppText>
          </View>
        </View>

        {/* Media preview */}
        <View style={styles.glassCard}>
          <Pressable
            onPress={() => showComingSoon('Media and Photos')}
            style={styles.sectionHeading}
          >
            <View style={styles.headingLeft}>
              <ImageIcon size={22} color={C.black} />
              <AppText variant="bodyMedium">Media and photos</AppText>
            </View>
            <ChevronRight size={20} color={C.secondary} />
          </Pressable>

          <View style={styles.mediaRow}>
            <View style={[styles.mediaTile, styles.mediaOne]}>
              <AppText variant="h2" style={styles.mediaEmoji}>🌅</AppText>
            </View>

            <View style={[styles.mediaTile, styles.mediaTwo]}>
              <AppText variant="h2" style={styles.mediaEmoji}>📚</AppText>
            </View>

            <View style={[styles.mediaTile, styles.mediaThree]}>
              <AppText variant="h2" style={styles.mediaEmoji}>🌿</AppText>
            </View>

            <Pressable
              onPress={() => showComingSoon('All Media')}
              style={[styles.mediaTile, styles.mediaFour]}
            >
              <AppText variant="h2" color={C.white}>+42</AppText>
            </Pressable>
          </View>
        </View>

        {/* Account options */}
        <View style={styles.glassCard}>
          <SettingRow
            icon={<Bell size={21} color={C.black} />}
            title="Notifications"
            onPress={() => showComingSoon('Notifications')}
          />

          <SettingRow
            icon={<ImageIcon size={21} color={C.black} />}
            title="Media visibility"
            onPress={() => showComingSoon('Media visibility')}
          />

          <SettingRow
            icon={<Bookmark size={21} color={C.black} />}
            title="Bookmarked"
            onPress={() => showComingSoon('Bookmarked')}
          />

          <SettingRow
            icon={<LockKeyhole size={21} color={C.black} />}
            title="Privacy"
            onPress={() => showComingSoon('Privacy')}
            last
          />
        </View>

        {/* Logout */}
        <View style={styles.glassCard}>
          <SettingRow
            icon={<LogOut size={21} color="#B42318" />}
            title="Log out"
            onPress={handleLogout}
            last
          />
        </View>

        <AppText variant="caption" style={styles.footer}>
          Chat App · Made for better conversations
        </AppText>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: 20,
    right: -80,
    width: 240,
    height: 300,
    borderRadius: radius.round,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 150,
    left: -100,
    width: 240,
    height: 300,
    borderRadius: radius.round,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
 
topBar: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: spacing.sm,
  marginBottom: spacing.xxl,
  minHeight: 52,
},

roundButton: {
  width: 44,
  height: 44,
  borderRadius: radius.round,
  backgroundColor: 'rgba(255,255,255,0.78)',
  borderWidth: 1,
  borderColor: C.border,
  alignItems: 'center',
  justifyContent: 'center',
},

headerTitle: {
  flex: 1,
  textAlign: 'center',
  marginHorizontal: spacing.md,
},
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatarWrapper: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: radius.round,
    backgroundColor: '#D2D3D6',
    borderWidth: 3,
    borderColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#3A3A3A',
  },
  editAvatar: {
    position: 'absolute',
    right: -2,
    bottom: 1,
    width: 34,
    height: 34,
    borderRadius: radius.round,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: C.black,
    textAlign: 'center',
  },
  phone: {
    color: C.secondary,
    marginTop: spacing.xs,
  },
  bio: {
    color: '#424449',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    minHeight: 118,
    padding: spacing.md,
    borderRadius: radius.xl,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    justifyContent: 'space-between',
    ...shadows.card,
  },
  statLabel: {
    color: C.secondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  glassCard: {
    backgroundColor: C.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  headingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  mediaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  mediaTile: {
    flex: 1,
    height: 94,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mediaOne: {
    backgroundColor: '#C9C4B9',
  },
  mediaTwo: {
    backgroundColor: '#B8B0A5',
  },
  mediaThree: {
    backgroundColor: '#C2C9BE',
  },
  mediaFour: {
    backgroundColor: '#777A7D',
  },
  mediaEmoji: {
    fontSize: 28,
  },
  settingRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.line,
  },
  settingIcon: {
    width: 36,
    justifyContent: 'center',
  },
  chevron: {
    marginLeft: 'auto',
  },
  footer: {
    color: C.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
