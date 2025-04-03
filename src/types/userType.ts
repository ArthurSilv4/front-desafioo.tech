export type UserResponse = {
  name: string;
  email: string;
  description: string;
  roles: string[];
};

export type UpdateUserNameRequest = {
  newName: string;
};

export type UpdateUserDescriptionRequest = {
  newDescription: string;
};

export type UpdatePasswordRequest = {
  code: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type CreateNewUserRequest = {
  name: string;
  email: string;
  password: string;
};

