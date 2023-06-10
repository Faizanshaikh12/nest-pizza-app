import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Query } from 'mongoose';
import { Roles } from '../constants/constants';
import { Factory } from 'nestjs-seeder';
import { AuthHelpers } from '../helpers/auth.helper';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @Factory(faker => faker.name.fullName())
  @Prop({ required: true })
  name: string;

  @Factory(faker => faker.internet.email())
  @Prop({ required: true, unique: true })
  email: string;

  @Factory(faker => faker.helpers.arrayElement([AuthHelpers.hash('123456')]))
  @Prop({ required: true })
  password: string;

  @Factory(faker => faker.helpers.arrayElement([Roles.CUSTOMER, Roles.ADMIN]))
  @Prop({ default: Roles.CUSTOMER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next) {
  try {
    const hashedPassword = await AuthHelpers.hash(this.password);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }

  next();
});

UserSchema.pre<Query<User, User>>('find', async function(next) {
  this.select('-password');
  next();
});