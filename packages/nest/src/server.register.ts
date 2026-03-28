import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export class ServerRegister {
  constructor(private server: McpServer) {
    this.server = server
  }

  register() {
    this.sumRegister()
    this.multiplyRegister()
  }

  private sumRegister() {
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

  private multiplyRegister() {
    this.server.registerTool(
      'multiply',
      {
        title: 'Multiply',
        description: '计算两数之积',
        inputSchema: {
          a: z.number().describe('第一个数字'),
          b: z.number().describe('第二个数字'),
        },
      },
      async ({ a, b }) => {
        const product = a * b;

        return {
          content: [
            {
              type: 'text',
              text: product.toString(),
            },
          ],
        };
      }
    )
  }
}
