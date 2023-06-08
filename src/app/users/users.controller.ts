import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiTags } from "@nestjs/swagger";
import { User } from "../../schemas/user.schema";
import { LoginDto } from "./users.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<User>{
    return this.usersService.login(body);
  }
}
