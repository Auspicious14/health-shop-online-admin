export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IResetPassword {
  email: string;
  newPassword: string;
}
