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
  policy: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  storeType: string;
  businessNumber: string;
  storeAddress: string;
  socialMedia: IStoreSocialMedia[];
  images: IStoreFile[];
  identificationImage: IStoreFile[];
}

export interface IStoreFile {
  uri: string;
  name: string;
  type: string;
}

export interface IStoreSocialMedia {
  platform: string;
  profileName: string;
  profileLink: string;
}
