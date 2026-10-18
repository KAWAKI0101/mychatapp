import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Otp: {
        phone: string
    };
};

export type MainTabParamList = {
    Home: undefined;
    Chats: undefined;
    Rooms: undefined;
    Profile: undefined
}
export type MainStackParamList = {
    Tabs: undefined,
    Chat: {
        chatId: string;
        name: string;
    };

    Room: {
        roomId: string
    };

    CreateRoom: undefined;
    Settings: undefined
}


export type ChatScreenProps = NativeStackScreenProps<
    MainStackParamList,
    'Chat'
>;