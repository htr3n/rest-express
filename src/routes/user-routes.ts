import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createUser,
  getUsers,
  updateUsers,
  deleteUsers,
  searchUsers
} from '../services/user-service';
import _ from 'lodash';
import {
  UserCreationRequest,
  UserCreationResponse,
  UserDeleteResponse,
  UserSearchFilter,
  UserUpdateRequest,
  UserUpdateResponse
} from '../dto/users';
import logger from '../utils/logging';
import { handleError, handleGenericError } from './route-utils';

const userRoutes = Router();

// Retrieve all users
userRoutes.get('/users', (req: Request, res: Response) => {
  logger.info('Receive a request to get all users');
  getUsers()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => handleGenericError(err, res));
});

userRoutes.post('/users/search', (req: Request, res: Response) => {
  const body = req.body;
  logger.info(
    `Receive a request to search for users by '${JSON.stringify(body)}'`
  );
  searchUsers(body as UserSearchFilter)
    .then((users) => {
      res.status(StatusCodes.OK).json(users);
    })
    .catch((err) => handleGenericError(err, res));
});

// Create a new user
userRoutes.post('/users', (req: Request, res: Response) => {
  if (!_.isEmpty(req.body)) {
    logger.info(
      `Receive a request to create a new user with content '${JSON.stringify(
        req.body
      )}'`
    );
    createUser(req.body as UserCreationRequest)
      .then((user) => {
        res.status(StatusCodes.CREATED).json({
          message: `User successfully created ${JSON.stringify(user)}`
        } as UserCreationResponse);
      })
      .catch((err) => handleGenericError(err, res));
  } else {
    handleError(
      StatusCodes.BAD_REQUEST,
      'The request body is empty, cannot create a new user',
      res
    );
  }
});

// Update an existing user
userRoutes.put('/users', (req: Request, res: Response) => {
  const id = req.params.id as string;
  logger.info(
    `Receive a request to update user '${id}' with the content '${JSON.stringify(
      req.body
    )}'`
  );
  if (!_.isEmpty(req.body)) {
    updateUsers(req.body as UserUpdateRequest)
      .then((userId) => {
        res.status(StatusCodes.OK).json({
          message: `User '${userId}' was successfully updated`
        } as UserUpdateResponse);
      })
      .catch((err) => handleGenericError(err, res));
  } else {
    handleError(
      StatusCodes.BAD_REQUEST,
      'The request body is empty, cannot create a new user',
      res
    );
  }
});

// Delete an existing user
userRoutes.delete('/users', (req: Request, res: Response) => {
  const filter = req.body;
  logger.info(
    `Receive a request to delete user(s) by ${JSON.stringify(filter)}`
  );
  deleteUsers(filter as UserSearchFilter)
    .then((result) => {
      res.status(StatusCodes.OK).json({
        deletedCount: result.deletedCount,
        message: `There are '${result.deletedCount}' user(s) deleted`
      } as UserDeleteResponse);
    })
    .catch((err) => handleGenericError(err, res));
});

export default userRoutes;
