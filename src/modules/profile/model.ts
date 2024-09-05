export interface IProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  email: string;
}
