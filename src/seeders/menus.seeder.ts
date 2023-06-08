import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder, DataFactory } from "nestjs-seeder";
import { Menu } from "../schemas/menu.schema";

@Injectable()
export class MenusSeeder implements Seeder {
  constructor(@InjectModel(Menu.name) private readonly menu: Model<Menu>) {}

  async seed(): Promise<any> {
    // Generate 10 menus.
    const users = DataFactory.createForClass(Menu).generate(10);

    // Insert into the database.
    return this.menu.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.menu.deleteMany({});
  }
}
