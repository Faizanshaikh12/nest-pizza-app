import { Controller } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}
}
