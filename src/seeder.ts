import { seeder } from "nestjs-seeder";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { Menu, MenuSchema } from "./schemas/menu.schema";
import { UsersSeeder } from "./seeders/users.seeder";
import { MenusSeeder } from "./seeders/menus.seeder";

seeder({
  imports: [
    MongooseModule.forRoot("mongodb+srv://nikitaliya56:6IaCKk5dESkWTOiX@cluster0.tgmo218.mongodb.net/pizza_db"),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])
  ]
}).run([UsersSeeder, MenusSeeder]);
