import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "src/navigation/types";
import { RoomMessage, useRooms } from "../context/RoomContext";
import { useRef } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/spacing";
import { colors } from "../../../theme/colors";
import { radius } from "../../../theme/radius";
import { AppContainer, AppText } from "../../../components/common";
import { MessageInput } from "../../../../src/features/chat/components/MessageInput";


type RoomChatNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Room'>

type RoomChatRouteProp = RouteProp<MainStackParamList, 'Room'>;

export const RoomChatScreen = () => {
    const navigation = useNavigation<RoomChatNavigationProp>();
    const route = useRoute<RoomChatRouteProp>()

    const { roomId } = route.params;

    const { rooms, sendMessage } = useRooms()

    const room = rooms.find(item => item.id === roomId)

    const messagesListRef = useRef<FlatList<RoomMessage>>(null)

    const handleSend = (text: string) => {
        if (!text.trim()) {
            return
        }

        sendMessage(roomId, text)
    };

    const renderMessage = ({ item }: { item: RoomMessage }) => {
        return (
            <View style={[
                styles.messageRow,
                item.isMine ? styles.myMessageRow : styles.otherMessageRow
            ]}>

                <View
                    style={[
                        styles.messageBubble,
                        item.isMine
                            ? styles.myMessageBubble
                            : styles.otherMessageBubble,
                    ]}>
                    <AppText variant="body" color={item.isMine ? colors.white : colors.black}>
                        {item.text}
                    </AppText>

                    <AppText
                        variant="caption"
                        color={item.isMine ? colors.white : colors.secondaryText}
                        style={styles.messageTime}>
                        {item.time}
                    </AppText>
                </View>

            </View>
        );
    };

    if (!room) {
        return (
            <AppContainer style={styles.container}>
                <View style={styles.errorContainer}>

                    <AppText variant="h2" >Room not found</AppText>
                    <AppText variant="body"
                        color={colors.secondaryText}
                        style={styles.errorText}
                    >
                        This room may no longer be available.
                    </AppText>

                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <AppText variant="bodyMedium" color={colors.white}>
                            Go Back
                        </AppText>
                    </Pressable>
                </View>

            </AppContainer>
        )
    }

    return (
        <AppContainer style={styles.container}>
            <View style={styles.keyboardView}>

                <View style={styles.header}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        onPress={() => navigation.goBack()}
                        style={styles.backIcon}>
                        <AppText variant="h2">‹</AppText>
                    </Pressable>

                    <View style={styles.roomAvatar}>
                        <AppText variant="h3" color={colors.white}>
                            {room.name.charAt(0).toUpperCase()}
                        </AppText>
                    </View>

                    <View style={styles.headerContent}>
                        <AppText variant="bodyMedium" numberOfLines={1}>
                            {room.name}
                        </AppText>

                        <AppText
                            variant="caption"
                            color={colors.secondaryText}>
                            {room.members.length + 1} members
                        </AppText>
                    </View>
                </View>

                <FlatList 
                    ref={messagesListRef}
                    data={room.messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    onContentSizeChange={() => 
                        messagesListRef.current?.scrollToEnd({animated: true})
                    }
                   ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <AppText variant="h3">Start the conversation</AppText>

              <AppText
                variant="body"
                color={colors.secondaryText}
                style={styles.emptyText}>
                Send the first message in {room.name}.
              </AppText>
            </View>
          }
        />
                <MessageInput onSend={handleSend} />
            </View>
        </AppContainer>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    backIcon: {
        width: 32,
        marginRight: spacing.sm,
        justifyContent: 'center',
    },
    roomAvatar: {
        width: 44,
        height: 44,
        borderRadius: radius.round,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContent: {
        flex: 1,
        marginLeft: spacing.md,
    },
    messagesContainer: {
        flexGrow: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
    },
    messageRow: {
        width: '100%',
        marginBottom: spacing.sm,
    },
    myMessageRow: {
        alignItems: 'flex-end',
    },
    otherMessageRow: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: '82%',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.lg,
    },
    myMessageBubble: {
        backgroundColor: colors.black,
        borderBottomRightRadius: radius.sm,
    },
    otherMessageBubble: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderBottomLeftRadius: radius.sm,
    },
    messageTime: {
        alignSelf: 'flex-end',
        marginTop: spacing.xs,
    },
    emptyContainer: {
        flex: 1,
        minHeight: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    errorText: {
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    backButton: {
        backgroundColor: colors.black,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        marginTop: spacing.lg,
    },
});