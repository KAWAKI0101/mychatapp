export type MessageStatus = 'sent' | 'delivered' | 'read';

export type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  status?: MessageStatus;
};

export type Chat = {
  id: string;
  name: string;
  message: string;
  time: string;
  initial: string;
  unreadCount: number;
  online: boolean;
};


