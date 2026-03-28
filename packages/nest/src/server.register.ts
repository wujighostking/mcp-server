import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export class ServerRegister {
  constructor(private server: McpServer) {
    this.server = server
  }

  register() {
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
      }
    )
  }
}
