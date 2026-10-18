import { Children, createContext, ReactNode, useCallback, useContext, useState } from "react";

export type RoomMessage = {
    id: string;
    text: string;
    time: string;
    isMine: boolean;
}

export type Room = {
    id: string;
    name: string;
    description: string;
    members: string[];
    createdAt: string;
    messages: RoomMessage[]
}

type RoomContextType = {
    rooms: Room[],
    createRoom: (name: string, description: string, members: string[]) => Room;
    sendMessage: (roomId: string, text: string) => void
};

const RoomContext = createContext<RoomContextType | undefined>(undefined)

export const RoomProvider = ({ children }: { children: ReactNode }) => {
    const [rooms, setRooms] = useState<Room[]>([]);


    const createRoom = useCallback(
        (name: string, description: string, members: string[]) => {
            const room: Room = {
                id: `room-${Date.now()}`,
                name: name.trim(),
                description: description.trim(),
                members,
                createdAt: new Date().toISOString(),
                messages: []
            }

            setRooms(previous => [room, ...previous])
            return room
        },
        []
    )

    const sendMessage = useCallback((roomId: string, text: string) => {
        const trimmedText = text.trim()
        if (!trimmedText) {
            return
        }

        const message: RoomMessage = {
            id: `message-${Date.now()}-${Math.random()}`,
            text: trimmedText,
            time: new Date().toLocaleDateString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            isMine: true
        }
        setRooms(previous => previous.map(room =>
            room.id === roomId ? { ...room, message: [...room.messages, message] }
                : room
        ))
    },
        []
    )

    return (
        <RoomContext.Provider value={{ rooms, createRoom, sendMessage }}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRooms = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw new Error('useRooms must be used inside RoomProvider');
    }

    return context;
};