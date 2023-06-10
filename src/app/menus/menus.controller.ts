import { Body, Controller, Get, Post } from "@nestjs/common";
import { MenusService } from './menus.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Menu } from "../../schemas/menu.schema";

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post('')
  @ApiOperation({ summary: 'List Menu' })
  async getMenus(@Body() body: string[]): Promise<Menu[]> {
    console.log(body);
    return this.menusService.getMenus(body);
  }

}
