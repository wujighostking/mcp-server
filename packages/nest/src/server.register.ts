import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export class ServerRegister {
  constructor(private server: McpServer) {
    this.server = server
  }

  register() {
    this.sumRegister()
    this.multiplyRegister()
    this.helloRegister()
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

    private helloRegister() {
      this.server.registerTool(
        'hello',
        {
          title: 'Hello',
          description: '问候用户',
          inputSchema: {
            text: z.string().describe('用户输入你好')
          },
        },
        async () => {
          return {
            content: [
              {
                type: 'text',
                text: '你也好，欢迎使用MCP服务器！',
              },
            ],
          };
        }
      )
  }
}
