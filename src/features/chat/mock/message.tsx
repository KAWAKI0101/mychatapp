
export type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  initial: string;
  unreadCount: number;
  online: boolean;
};

type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
};

export const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hey! 👋',
    time: '10:30',
    isMine: false,
  },
  {
    id: '2',
    text: 'Hey! How are you?',
    time: '10:31',
    isMine: true,
  },
  {
    id: '3',
    text: "I'm doing great. What about you?",
    time: '10:32',
    isMine: false,
  },
  {
    id: '4',
    text: 'Im good too!',
    time: '10:33',
    isMine: true,
  },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Alex',
    message: 'Hey, are you free today?',
    time: '10:42',
    initial: 'A',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Sarah',
    message: "Let's discuss the project.",
    time: '09:18',
    initial: 'S',
    unreadCount: 0,
    online: true,
  },
  {
    id: '3',
    name: 'John',
    message: 'See you tomorrow!',
    time: 'Yesterday',
    initial: 'J',
    unreadCount: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Emma',
    message: 'That sounds great 👍',
    time: 'Yesterday',
    initial: 'E',
    unreadCount: 4,
    online: false,
  },
  {
    id: '5',
    name: 'David',
    message: 'Can you send me the file?',
    time: 'Monday',
    initial: 'D',
    unreadCount: 0,
    online: false,
  },
];
