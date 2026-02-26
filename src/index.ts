#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools/index.js";
import { getPackageVersion } from "./utils/getPackageVersion.js";
import { loadEnv } from "./utils/loadEnv.js";
import { log } from "./utils/log.js";

loadEnv();

const server = new McpServer({
  name: "gtm-mcp-server",
  version: getPackageVersion(),
});

tools.forEach((register) => {
  register(server);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log("GTM MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
