import format from 'date-fns/format';
import { IUser, UserModel } from '../db/models';
import {
  UserCreationRequest,
  UserSearchFilter,
  UserUpdateRequest
} from '../dto/users';
import logger from '../utils/logging';
import _ from 'lodash';

const dateOfBirthFormat = 'yyyy-MM-dd';

const createUser = async (request: UserCreationRequest) => {
  logger.info(`Creating a new user from '${JSON.stringify(request)}'`);
  let userId = null;
  await UserModel.create(request)
    .then((response) => {
      logger.info(`Database record successfully created ${response}`);
      userId = response._id.toString();
    })
    .catch((err) => {
      logger.error('Failed to create database', err);
      throw err;
    });
  return userId;
};

const searchUsers = async (filter: UserSearchFilter) => {
  logger.info(`Searching for users by '${JSON.stringify(filter)}'`);
  const users = await UserModel.find(filter);
  return users.map((user) => mapUser(user));
};

const getUsers = async () => {
  logger.info('Fetching all users');
  const users = await UserModel.find({});
  return users.map((user) => mapUser(user));
};

const mapUser = (user: IUser) => {
  if (user) {
    const formattedDob = user.dateOfBirth
      ? format(user.dateOfBirth, dateOfBirthFormat)
      : null;
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: formattedDob,
      address: user.address,
      gender: user.gender,
      phone: user.phone
    };
  }
};

const updateUsers = async (request: UserUpdateRequest) => {
  if (request && !_.isEmpty(request)) {
    logger.info(
      `Finding and updating user(s) by '${JSON.stringify(request.filter)}'`
    );
    return await UserModel.updateMany(request.filter, request.update);
  }
};

const deleteUsers = async (filter: UserSearchFilter) => {
  logger.info(`Finding and deleting user(s) by '${JSON.stringify(filter)}'`);
  return await UserModel.deleteMany(filter);
};

export { createUser, deleteUsers, searchUsers, getUsers, updateUsers };
