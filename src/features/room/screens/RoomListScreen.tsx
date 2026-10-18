
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppContainer, AppText } from '../../../components/common';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radius } from '../../../theme/radius';
import type { MainStackParamList } from '../../../navigation/types';
import { Room, useRooms } from '../context/RoomContext';


type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const RoomListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { rooms } = useRooms();
  const [search, setSearch] = useState('');

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderRoom = ({ item }: { item: Room }) => {
    const lastMessage = item.messages[item.messages.length - 1];

    return (
      <Pressable
        onPress={() => navigation.navigate('Room', { roomId: item.id })}
        style={({ pressed }) => [
          styles.roomRow,
          pressed && styles.pressed,
        ]}>
        <View style={styles.avatar}>
          <AppText variant="bodyMedium" color={colors.white}>
            {item.name.charAt(0).toUpperCase()}
          </AppText>
        </View>

        <View style={styles.roomContent}>
          <AppText variant="bodyMedium">{item.name}</AppText>

          <AppText
            variant="caption"
            color={colors.secondaryText}
            numberOfLines={1}>
            {lastMessage?.text ||
              item.description ||
              `${item.members.length} members`}
          </AppText>
        </View>

        <AppText variant="caption" color={colors.mutedText}>
          {item.members.length + 1}
        </AppText>
      </Pressable>
    );
  };

  return (
    <AppContainer style={styles.container}>
      <View style={styles.header}>
        <AppText variant="h1">Rooms</AppText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create room"
          onPress={() => navigation.navigate('CreateRoom')}
          style={styles.addButton}>
          <AppText variant="h2" color={colors.white}>+</AppText>
        </Pressable>
      </View>

      <View style={styles.content}>


        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search rooms"
          placeholderTextColor={colors.secondaryText}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filteredRooms}
        keyExtractor={item => item.id}
        renderItem={renderRoom}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText variant="h3">
              {search ? 'No rooms found' : 'No rooms yet'}
            </AppText>

            <AppText
              variant="body"
              color={colors.secondaryText}
              style={styles.emptyText}>
              {search
                ? 'Try another room name.'
                : 'Create a room to start chatting with a group.'}
            </AppText>

            {!search && (
              <Pressable
                onPress={() => navigation.navigate('CreateRoom')}
                style={styles.emptyButton}>
                <AppText variant="bodyMedium" color={colors.white}>
                  Create your first room
                </AppText>
              </Pressable>
            )}
          </View>
        }
      />
     

    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.black,
    marginBottom: spacing.md,

  },
  listContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomContent: {
    flex: 1,
    marginLeft: spacing.md,
    gap: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  emptyButton: {
    backgroundColor: colors.black,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    marginTop: spacing.lg,
  },
  pressed: {
    opacity: 0.6,
  },
});