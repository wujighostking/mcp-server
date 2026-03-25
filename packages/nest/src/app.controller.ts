import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  summary(@Req() req: any, @Res() res: any) {
    return this.appService.summarize(req, res);
  }
}
