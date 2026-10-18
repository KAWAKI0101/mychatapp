

import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../../../src/navigation/types'
import { MOCK_MEMBERS } from '../mock/mockRoom'
import { colors } from '../../../theme/colors'
import { radius } from '../../../theme/radius'
import { spacing } from '../../../theme/spacing'
import { AppContainer } from '../../../../src/components/common/AppContainer'
import { AppText } from '../../../../src/components/common/AppText'
import { useNavigation } from '@react-navigation/native'
import { useRooms } from '../context/RoomContext'

type NavigationProps = NativeStackNavigationProp<MainStackParamList>

const mock_member = MOCK_MEMBERS
export const CreateRoomScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { createRoom } = useRooms();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (member: string) => {
    setSelectedMembers(previous =>
      previous.includes(member)
        ? previous.filter(item => item !== member)
        : [...previous, member],
    );
  };

  const handleCreateRoom = () => {
    if (!name.trim()) {
      Alert.alert('Room name required', 'Please enter a room name.');
      return;
    }

    const room = createRoom(name, description, selectedMembers);

    navigation.replace('Room', { roomId: room.id });
  };

  return (
    <AppContainer style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AppText variant="body">Cancel</AppText>
        </Pressable>

        <AppText variant="h2">Create Room</AppText>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <AppText variant="h1">Bring everyone together.</AppText>

        <AppText variant="body" style={styles.subtitle}>
          Create a room and start a conversation.
        </AppText>

        <AppText variant="bodyMedium">Room name *</AppText>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Weekend Plans"
          placeholderTextColor={colors.secondaryText}
          maxLength={50}
          style={styles.input}
        />

        <AppText variant="bodyMedium">Description</AppText>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="What's this room about?"
          placeholderTextColor={colors.secondaryText}
          maxLength={150}
          multiline
          style={[styles.input, styles.descriptionInput]}
        />

        <AppText variant="h3" style={styles.membersTitle}>
          Add members
        </AppText>

        <AppText variant="caption" color={colors.secondaryText}>
          {selectedMembers.length} selected
        </AppText>

        {MOCK_MEMBERS.map(member => {
          const selected = selectedMembers.includes(member);

          return (
            <Pressable
              key={member}
              onPress={() => toggleMember(member)}
              style={styles.memberRow}>

              <View style={styles.avatar}>
                <AppText variant="bodyMedium" color={colors.white}>
                  {member.charAt(0)}
                </AppText>
              </View>

              <AppText variant="bodyMedium" style={styles.memberName}>
                {member}
              </AppText>

              <View
                style={[
                  styles.checkbox,
                  selected && styles.checkboxSelected,
                ]}>
                {selected && (
                  <AppText variant="caption" color={colors.white}>
                    ✓
                  </AppText>
                )}
              </View>
            </Pressable>
          );
        })}

        <Pressable
          onPress={handleCreateRoom}
          style={({ pressed }) => [
            styles.createButton,
            pressed && styles.pressed,
          ]}>
          <AppText variant="bodyMedium" color={colors.white}>
            Create Room
          </AppText>
        </Pressable>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal:spacing.md
  },
  headerSpacer: {
    width: 45,
  },
  content: {
    paddingBottom: spacing.xxxl,
        paddingHorizontal:spacing.md
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.black,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    fontSize: 15,
  },
  descriptionInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  membersTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.round,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberName: {
    flex: 1,
    marginLeft: spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  createButton: {
    backgroundColor: colors.black,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  pressed: {
    opacity: 0.7,
  },
});