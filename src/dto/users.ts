import { IUser } from '../db/models';

export type User = {
  id?: string;
  email?: IUser['email'];
  firstName?: IUser['firstName'];
  lastName?: IUser['lastName'];
  dateOfBirth?: string | null | undefined;
  address?: IUser['address'];
  gender?: IUser['gender'];
  phone?: IUser['phone'];
};

type BaseResponse = {
  message?: string;
};

export type UserCreationRequest = Omit<User, 'id'>;

export type UserCreationResponse = BaseResponse & {
  id?: string;
};

export type UserUpdateRequest = {
  filter: UserSearchFilter;
  update: Omit<User, 'id'>;
};

export type UserUpdateResponse = BaseResponse;

export type UserSearchFilter = User;

export type UserDeleteResponse = BaseResponse & {
  deletedCount?: number;
};
