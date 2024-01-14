export interface IStore {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  whatsAppNumber: string;
  storePhoneNumber: string;
  description: string;
  storeName: string;
  accepted: boolean;
  images: {
    uri: string;
    name: string;
    type: string;
  }[];
}

export interface IStoreFile {
  base64Str: string;
  filename: string;
  filetype: string;
}
