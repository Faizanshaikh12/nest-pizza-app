import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../../schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles } from "../../constants/constants";

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
      const checkPassword = user.password === password;
      if (!checkPassword) throw new BadRequestException("Wrong email and password");
      return user;
    }
  }

  async register(body): Promise<any> {
    const { email } = body;
    const user = await this.userModel.findOne({ email });
    if (user) throw new BadRequestException('User Email Address Already Exist')
    return this.userModel.create(body);
  }

}
