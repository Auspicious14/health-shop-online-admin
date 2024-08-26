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
  _id: string;
  messages: IChat[];
  user: {
    firstName: string;
    lastName: string;
  };
}
