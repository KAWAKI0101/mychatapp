export type Message = {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
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