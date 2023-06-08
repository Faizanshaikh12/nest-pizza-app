import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../../schemas/user.schema";
import { LoginDto, RegisterDto } from "./users.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  async login(@Body() body: LoginDto): Promise<User>{
    return this.usersService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'User Register' })
  async register(@Body() body: RegisterDto): Promise<User>{
    return this.usersService.register(body);
  }
}
