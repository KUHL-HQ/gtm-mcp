import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { log } from "./log.js";

export function createErrorResponse(
  message: string,
  error?: any,
): CallToolResult {
  let detailedMessage = "";

  if (error?.code) {
    const messages = (error?.errors || []).map(
      (item: { message?: string }) => item?.message,
    );
    detailedMessage = `${message}: Google API Error ${error.code} - ${messages.join(". ")}`;
  } else if (error instanceof Error) {
    detailedMessage = `${message}: ${error.message}`;
  } else {
    detailedMessage = `${message}: ${String(error)}`;
  }

  log("MCP Tool Error:", detailedMessage);

  return {
    isError: true,
    content: [{ type: "text", text: detailedMessage }],
  };
}
