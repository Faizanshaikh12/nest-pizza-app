import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthHelpers } from '../../helpers/auth.helper';
import { IAuthUser } from './users.interface';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
              private jwtService: JwtService,
  ) {
  }

  async login(body): Promise<IAuthUser> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const isCheckPassword = await AuthHelpers.verify(password, user.password);
      if (!isCheckPassword) {
        throw new UnauthorizedException('Wrong email and password');
      }
      return this.generateAuthToken(user);
    }
  }

  async register(body): Promise<User> {
    const { email } = body;
    const userOne = await this.userModel.findOne({ email });
    if (userOne) throw new BadRequestException('User Email Address Already Exist');
    const user = <User>await this.userModel.create(body);
    return this.generateAuthToken(user);
  }

  async generateAuthToken(user): Promise<IAuthUser> {
    let newUser = <IAuthUser>_.omit(_.get({ ...user }, '_doc'), 'password');
    const token = <string>await this.jwtService.signAsync(newUser).catch(err => console.log(err));
    newUser.token = token;
    return newUser;
  }

}
