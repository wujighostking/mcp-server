import { Controller, Post, Req, Res, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import crypto from 'node:crypto';
import { ServerRegister } from './server.register'

@Controller()
export class AppController {
  private readonly server = new McpServer({ name: 'stream', version: '1.0.0' });
  private transport: StreamableHTTPServerTransport =
    new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });
  private register: ServerRegister;

  constructor(private readonly appService: AppService) {
    this.register = new ServerRegister(this.server)
    this.initServer();
  }

  @Post()
  summary(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    return this.appService.summarize(req, res, this.transport) // res.send('hello world1') //this.appService.summarize(req, res);
  }

  private initServer() {
    this.register.register()

    this.server.connect(this.transport);
  }
}
