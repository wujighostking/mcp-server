import { Injectable } from '@nestjs/common';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import crypto from 'node:crypto';

@Injectable()
export class AppService {
  private readonly server = new McpServer({ name: 'stream', version: '1.0.0' });
  private transport: StreamableHTTPServerTransport =
    new StreamableHTTPServerTransport({
      sessionIdGenerator: () => crypto.randomUUID(),
    });

  constructor() {
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
  }

  async summarize(req: any, res: any) {
    await this.server.connect(this.transport);

    await this.transport.handleRequest(req, res, req.body);

    this.transport.close();

    return;
  }
}
