import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { WelcomeMessage } from './messages.class';

@ApiTags('Welcome')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ type: WelcomeMessage })
  @Get()
  getHello(): WelcomeMessage {
    return this.appService.getHello();
  }
}
