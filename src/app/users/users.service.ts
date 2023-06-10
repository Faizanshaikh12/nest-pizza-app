import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from "../../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthHelpers } from '../../helpers/auth.helper';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async login(body): Promise<User> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    } else {
      const isCheckPassword = await AuthHelpers.verify(password, user.password)
      if (!isCheckPassword) {
        throw new UnauthorizedException("Wrong email and password");
      }
      user.password = ''
      return user;
    }
  }

  async register(body): Promise<User> {
    const { email } = body;
    const user = await this.userModel.findOne({ email });
    if (user) throw new BadRequestException('User Email Address Already Exist')
    const newUser = <User>await this.userModel.create(body);
    newUser.password = ''
    return newUser;
  }

}
