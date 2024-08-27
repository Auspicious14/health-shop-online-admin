export interface IChat {
  _id?: string;
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
  align?: "left" | "right";
  createdAt?: string;
  updatedAt?: string;
}

export interface IChatPayload {
  message: string;
  storeId: string;
  userId: string;
  senderId: string;
}

export interface IConversation {
  storeId: string;
  userId: string;
  lastMessage: string;
  lastMessageAt: string;
}

export interface IUserMessageStore {
  _id?: string;
  messages?: IChat[];
  read?: boolean;
  unreadMessagesCount: number;
  lastMessage: {
    message: string;
    createdAt: string;
  };
  unreadMessagesFromStore: number;
  unreadMessagesFromUser: number;
  user?: {
    firstName: string;
    lastName: string;
  };
}
