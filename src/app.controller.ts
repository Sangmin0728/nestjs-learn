import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Request -> Fetch API Interface
  @Get('/hello')
  getHello(@Req() req: Request): string {
    console.log("api request::", req)
    return this.appService.getHello();
  }
}
