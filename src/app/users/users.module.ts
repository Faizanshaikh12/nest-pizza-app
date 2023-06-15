import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { commonConstants } from "../../constants/constants";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: commonConstants.JWT_SECRET,
      signOptions: { expiresIn: commonConstants.JWT_TOKEN_EXP }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {
}
