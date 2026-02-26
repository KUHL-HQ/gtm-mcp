# GTM MCP Server (Self-Hosted)

Self-hosted MCP server for Google Tag Manager. Forked from [Stape's GTM MCP](https://github.com/stape-io/google-tag-manager-mcp-server) and converted from Cloudflare Workers to a standard Node.js stdio server with GCP service account auth.

All GTM API calls go directly to Google — no third-party proxy.

## Team Setup (on our server)

The production build lives at `/home/tay/projects/gtm-mcp/` and auto-deploys when `main` is pushed via the GitHub webhook sync.

### For team members

Run the shared MCP setup script to add the GTM MCP to your Claude Code config:

```sh
bash /srv/projects/mcps/setup.sh gtm-mcp-server
```

Or manually add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "gtm-mcp-server": {
      "command": "node",
      "args": ["/home/tay/projects/gtm-mcp/dist/index.js"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/home/tay/projects/gtm-mcp/secrets/service-account.json"
      }
    }
  }
}
```

Then restart Claude Code or run `/mcp` to reload.

### How it works

MCP stdio servers are spawned by Claude Code on demand — each session gets its own process. There's no persistent server to keep running. The shared build at `/home/tay/projects/gtm-mcp/dist/` is what every session launches from, and the shared service account key provides auth.

### Auto-deploy

Pushes to `main` on `KUHL-HQ/gtm-mcp` trigger the GitHub webhook which:
1. Pulls the latest code to `/home/tay/projects/gtm-mcp/`
2. Runs `npm install && npm run build`

New Claude Code sessions will use the updated build automatically.

## Development

### Working on changes

1. Work in your dev clone at `/home/tay/dev/gtm-mcp/`
2. Create a feature branch
3. Open a PR — CI must pass (`npx tsc --noEmit`) and 1 approval required
4. Merge to `main` — auto-deploys to production

### Local dev

```sh
cd /home/tay/dev/gtm-mcp
npm install
npm run build

# Test locally:
GOOGLE_APPLICATION_CREDENTIALS=./secrets/service-account.json node dist/index.js
```

## GCP Service Account Setup

1. Go to [GCP Console > IAM > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Create a service account — no special GCP IAM roles needed
3. Enable the **Tag Manager API** on the project
4. Create a JSON key and download it to `secrets/service-account.json`
5. In GTM, add the service account email as a user with **Publish** permission (account level)

## Docker (alternative)

```sh
npm run build
docker compose up --build
```

Mount the service account key via `docker-compose.yml`.

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
