import type { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor() {}

  async summarize(req: any, res: any, transport: StreamableHTTPServerTransport) {
    return transport.handleRequest(req, res, req.body);
  }
}
