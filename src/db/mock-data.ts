import { faker } from '@faker-js/faker/locale/en';
import format from 'date-fns/format';
import _ from 'lodash';
import { User } from '../dto/users';
import logger from '../utils/logging';
import { UserModel } from './models';

const mockUsers: User[] = [];

const numberOfUsers = faker.number.int({ min: 5, max: 10 }); // 57

const generateData = () => {
  _.range(1, numberOfUsers).forEach(() => {
    const sex = faker.person.sexType();
    const dob = faker.date.between({
      from: '1980-01-01T00:00:00.000Z',
      to: '2020-01-01T00:00:00.000Z'
    });
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    mockUsers.push({
      email: `${firstName}.${lastName}@${faker.internet.domainName()}`,
      firstName,
      lastName,
      dateOfBirth: format(dob, 'yyyy-MM-dd'),
      address: faker.location.streetAddress(true),
      gender: sex,
      phone: faker.phone.number()
    });
  });
};

export const initMockData = () => {
  logger.info('Initializing some mock data');
  generateData();
  UserModel.insertMany(mockUsers);
  logger.info('Done!');
};
