import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import crypto from 'node:crypto';

@Controller()
export class AppController {
  private readonly server = new McpServer({ name: 'stream', version: '1.0.0' });
  private transport: StreamableHTTPServerTransport =
    new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });

  constructor(private readonly appService: AppService) {
    this.server.registerTool(
      'sum',
      {
        title: 'Sum',
        description: '计算两数之和',
        inputSchema: {
          a: z.number().describe('第一个数字'),
          b: z.number().describe('第二个数字'),
        },
      },
      async ({ a, b }) => {
        const sum = a + b;

        return {
          content: [
            {
              type: 'text',
              text: sum.toString(),
            },
          ],
        };
      },
    );

    this.server.connect(this.transport);
  }

  @Post()
  summary(@Req() req: any, @Res() res: any) {
    return this.transport.handleRequest(req, res, req.body); // res.send('hello world1') //this.appService.summarize(req, res);
  }
}
