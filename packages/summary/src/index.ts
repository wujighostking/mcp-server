// import https from 'node:https'
import process from 'node:process'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const server = new McpServer({
  name: 'summary',
  version: '1.0.0',
})

server.registerTool(
  'summarize',
  {
    title: 'summary',
    description: '对 url 发起请求，根据返回的请求结果，对结果进行总结',
    inputSchema: {
      url: z.url().describe('一个有效的 url 链接'),
    },
  },
  async (/* { url } */) => {
    //   js_darkmode__0   https://mp.weixin.qq.com/s/_Ov8r2aHTPHieTkZMY7Q0A
    // https.get(url, (res) => {
    //   console.log(res, '--------')
    // })
    return {
      content: [
        {
          type: 'text',
          text: 'OpenClaw 和 OpenAI 已经打到家门口了，Anthropic 再不出手就不礼貌了。\n'
            + '\n'
            + '北京时间昨天夜里，Anthropic 宣布对旗下 Claude Code 与 Claude Cowork 进行关键更新：\n'
            + '\n'
            + 'AI 不再只是调用工具，而是可以直接“操控你的电脑”。\n'
            + '\n'
            + '这被业内认为是 Claude 体系迄今为止最激进的一次能力跃迁。\n'
            + '\n'
            + '更新后的 Claude 不再局限于 API 或预接入工具，而是可以：打开本地文件、使用浏览器、操作开发工具（IDE 等）、控制鼠标、键盘与屏幕进行交互，当系统没有现成的工具接口时，Claude 会像人类用户一样，无需任何复杂设置，就直接在屏幕上执行操作——点击、滚动、导航页面，甚至完成完整任务流程。',
        },
      ],
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Summary MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
