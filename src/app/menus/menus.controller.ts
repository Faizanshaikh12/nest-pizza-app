import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Menu } from "../../schemas/menu.schema";
import { AuthGuard } from '../../guards/auth.guard';

@ApiBearerAuth()
@ApiTags('menus')
@UseGuards(AuthGuard)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post('')
  @ApiOperation({ summary: 'List Menu' })
  async getMenus(@Body() body: string[]): Promise<Menu[]> {
    return this.menusService.getMenus(body);
  }

}
