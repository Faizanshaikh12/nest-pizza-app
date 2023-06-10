import { Controller, Get } from "@nestjs/common";
import { MenusService } from './menus.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Menu } from "../../schemas/menu.schema";

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get('')
  @ApiOperation({ summary: 'List Menu' })
  async getMenus(): Promise<Menu[]> {
    return this.menusService.getMenus();
  }

}
