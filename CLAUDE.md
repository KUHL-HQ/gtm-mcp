# Claude Code Instructions


<!-- BEGIN claude-template:linear -->
## Linear (issue tracking)

Use the `linear` CLI (`@schpet/linear-cli`) for all Linear work — creating issues, logging tasks,
updating status. Do not use the Linear MCP; it is not installed.

Install and authenticate:

```bash
npm install -g @schpet/linear-cli
linear auth login          # add --plaintext if no system keyring is available
```

Defaults for this workspace live in `.linear.toml` at the repo root (or `~/.config/linear/linear.toml`),
so `--team` / `--workspace` can usually be omitted.

Before creating or updating any issue, read `.claude/linear-conventions.md` — it has the member
usernames, workflow states, label taxonomy, the issue description template, and the exact
`linear issue create` invocation.

Never create, update, or close an issue unprompted. Propose it and wait for confirmation.
<!-- END claude-template:linear -->
