import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from "../constants/constants";
import { Factory } from "nestjs-seeder";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Factory(faker => faker.name.fullName())
  @Prop({ required: true })
  name: string;

  @Factory(faker => faker.internet.email())
  @Prop({ required: true })
  email: string;

  @Factory(faker => faker.internet.password())
  @Prop({ required: true })
  password: string;

  @Factory(faker => faker.helpers.arrayElement([Roles.CUSTOMER, Roles.ADMIN]))
  @Prop({ default: Roles.CUSTOMER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
