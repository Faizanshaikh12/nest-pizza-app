import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { Menu, MenuSchema } from "./schemas/menu.schema";
import { UsersSeeder } from "./seeders/users.seeder";
import { MenusSeeder } from "./seeders/menus.seeder";
import { ConfigModule } from "@nestjs/config";

seeder({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])
  ]
}).run([UsersSeeder, MenusSeeder]);
