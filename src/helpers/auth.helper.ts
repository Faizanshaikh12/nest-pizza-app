import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { commonConstants } from '../constants/constants';


const hash = (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds to generate

    return bcrypt.hashSync(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

const verify = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);

};

export const AuthHelpers = {
  hash, verify,
};