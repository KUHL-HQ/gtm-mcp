# GTM MCP Server (Self-Hosted)

Self-hosted MCP server for Google Tag Manager. Forked from [Stape's GTM MCP](https://github.com/stape-io/google-tag-manager-mcp-server) and converted from Cloudflare Workers to a standard Node.js stdio server with GCP service account auth.

All GTM API calls go directly to Google — no third-party proxy.

## Setup

### 1. Create a GCP Service Account

1. Go to [GCP Console > IAM > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Create a service account (or use an existing one)
3. Grant it the **Tag Manager** roles you need (e.g., "Tag Manager Admin")
4. Create a JSON key and download it
5. Place the key at `secrets/service-account.json`

### 2. Enable the Tag Manager API

In GCP Console, enable the **Tag Manager API** for your project.

### 3. Grant GTM Access

In GTM, add the service account email as a user with appropriate permissions on your GTM account/container.

### 4. Build & Run

```sh
npm install
npm run build

# Direct run (for Claude Code MCP):
GOOGLE_APPLICATION_CREDENTIALS=./secrets/service-account.json node dist/index.js

# Or via Docker:
docker compose up --build
```

### 5. Claude Code Config

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "gtm-mcp-server": {
      "command": "node",
      "args": ["/path/to/gtm-mcp/dist/index.js"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/gtm-mcp/secrets/service-account.json"
      }
    }
  }
}
```

Then restart Claude Code or run `/mcp` to reload.

## Tools

18 MCP tools covering the full GTM API v2:

| Tool | Operations |
|------|------------|
| `gtm_account` | get, list, update |
| `gtm_container` | create, get, list, update, remove, combine, lookup, moveTagId, snippet |
| `gtm_workspace` | create, get, list, update, remove, sync, getStatus, createVersion, quickPreview |
| `gtm_tag` | create, get, list, update, remove, revert |
| `gtm_trigger` | create, get, list, update, remove, revert |
| `gtm_variable` | create, get, list, update, remove, revert |
| `gtm_built_in_variable` | create, list, remove, revert |
| `gtm_folder` | create, get, list, update, remove, moveEntitiesToFolder, revert |
| `gtm_template` | create, get, list, update, remove, revert |
| `gtm_client` | create, get, list, update, remove, revert |
| `gtm_transformation` | create, get, list, update, remove, revert |
| `gtm_environment` | create, get, list, update, remove, reauthorize |
| `gtm_version` | get, live, publish, remove, setLatest, undelete, update |
| `gtm_version_header` | list, latest |
| `gtm_zone` | create, get, list, update, remove, revert |
| `gtm_user_permission` | create, get, list, update, remove |
| `gtm_destination` | get, list, link |
| `gtm_gtag_config` | create, get, list, update, remove |

## License

Apache-2.0 (forked from [stape-io/google-tag-manager-mcp-server](https://github.com/stape-io/google-tag-manager-mcp-server))
