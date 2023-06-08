import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from "nestjs-seeder";

export type MenuDocument = HydratedDocument<Menu>;

@Schema()
export class Menu {
  @Factory(faker => faker.lorem.word())
  @Prop({ required: true })
  name: string;

  @Factory(faker => faker.image.food())
  @Prop({ required: true })
  image: string;

  @Factory(faker => faker.datatype.number({ min: 100, max: 500 }))
  @Prop({ required: true })
  price: number;

  @Factory(faker => faker.helpers.arrayElement(['small', 'medium', 'large']))
  @Prop({ required: true })
  size: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
