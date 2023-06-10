import { Injectable } from "@nestjs/common";
import { Menu } from "../../schemas/menu.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MenusService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<Menu>) {
  }

  async getMenus(menusIds): Promise<Menu[]> {
    let query = {};
    query = menusIds.length !== 0 ? { _id: { $in: menusIds } } : query;
    return this.menuModel.find(query);
  }
}
