# Linear conventions (kuhldata workspace)

Task and issue tracking runs through the `linear` CLI (`@schpet/linear-cli`), not the Linear MCP.
Global defaults live in `~/.config/linear/linear.toml` (team `KUHL`, workspace `kuhldata`), so
`--team` and `--workspace` can be omitted unless targeting something else.

## Workspace reference

**Team:** `KUHL` (Kuhldata) — the only team.

**Members** (use the username for `--assignee`):

| Username | Name | Initials |
| --- | --- | --- |
| `taylor` | Taylor Harris | TH |
| `awais` | Awais Kibriya | AK |
| `aliash` | Ali Ashfaq | AA |
| `arslan` | Arslan Ahmed Mir | AM |
| `mklet` | Matt Klette | MK |

`--assignee self` resolves to `taylor`.

**Workflow states** (`--state`, by name):

| State | Type | Use for |
| --- | --- | --- |
| `Triage` | triage | Unsorted inbound |
| `Backlog` | backlog | Accepted, not scheduled |
| `Needs Clarification` | backlog | Blocked on an answer from a requester |
| `Ready to Estimate` | backlog | Scoped, awaiting points |
| `Todo` | unstarted | Scheduled, not started |
| `Blocked` | unstarted | Blocked on an external dependency |
| `In Progress` | started | Actively being worked |
| `In Review` | started | PR open / awaiting review |
| `Update Required` | started | Review returned changes |
| `Done` | completed | Shipped and verified |
| `Canceled` / `Duplicate` | — | Dropped |

**Priority** (`-p`, Linear's scale): `1` Urgent, `2` High, `3` Medium, `4` Low. Omit for none.

**Labels** (`-l`, repeatable) — pick one type label plus any domain labels that apply:

- *Type:* `Bug`, `Feature`, `Improvement`, `Planning`, `Validation`, `Add-Hoc Request`
- *Domain:* `Data Quality`, `Query Optimization`, `ML Model`, `New Data Source`, `Security`,
  `GTM`, `sGTM`, `GA4`, `Report`, `Excel Reporting`, `Power BI`, `Sheets`

Run `linear label list` for the live set before inventing a new one.

**Projects:** `linear project list` for the current set. Attach with `--project "<name>"`.
Active ones include Ad Data Pipelines, Site Events, Oded Reviews App, Privacy Deletion
Procedures, Clean out datasets in BigQuery, Monitoring & Alerts Notification Governance.

## Creating an issue

Always write the description to a markdown file and pass `--description-file` — inline `-d`
mangles multi-line markdown. Use the scratchpad directory for the temp file.

```bash
linear issue create \
  --no-interactive \
  -t "Backfill meta_ads_creative_daily for Jan–Mar 2026" \
  --description-file /tmp/.../issue.md \
  -a awais \
  -p 2 \
  -l "Bug" -l "Data Quality" \
  --project "Ad Data Pipelines" \
  -s "Todo" \
  --estimate 3
```

Title rules: imperative mood, no ticket prefix, no trailing period, specific enough to be
actionable out of context. "Backfill X for date range", not "fix the data".

## Description template

```markdown
## Context
Why this exists — the trigger, who asked, what broke or what's missing.

## Scope
- [ ] Concrete step
- [ ] Concrete step

## Acceptance criteria
- Observable, verifiable outcome. Someone else can confirm it's done.

## Technical notes
Datasets, tables, repos, file paths, queries, dashboards. Include the actual identifiers
(`project.dataset.table`, repo paths, URLs) so nobody has to re-derive them.

## Links
- Repo / PR:
- Dashboard / query:
- Related: KUHL-123
```

Drop sections that don't apply — an empty heading is worse than no heading. For a one-line
add-hoc request, Context + Acceptance criteria is enough.

## Working an issue

```bash
linear issue mine                  # your assigned issues
linear issue query --help          # structured filters
linear issue view KUHL-123         # full detail incl. comments
linear issue start KUHL-123        # set In Progress + create/checkout the git branch
linear issue id                    # infer issue from the current branch
linear issue update KUHL-123 -s "In Review"
linear issue comment create KUHL-123 -b "..."
linear issue pr                    # open a GitHub PR from the branch's issue
```

Move to `Done` only after the work is verified, not when the PR opens — `In Review` covers that.

## Agent rules

- Never create, update, or close an issue without being asked. Propose the issue (title,
  assignee, labels, description) and wait for confirmation.
- Never assign work to a teammate other than `taylor` unless explicitly told to.
- Reuse an existing issue when one covers the work — search with `linear issue query` first.
- For anything the subcommands don't cover, use `linear api '<graphql>'`; the schema is
  available via `linear schema`.
