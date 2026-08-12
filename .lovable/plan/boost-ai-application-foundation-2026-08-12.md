# BOOST AI — Application Foundation

Foundation only: real app shell, real authentication against the existing Supabase project `qkejynibmcsgjvburgig`, workspace resolution, and all 13 navigation routes with honest empty states. No AI brain, no fake data, no database changes.

## What gets built

### 1. Supabase connection (existing project, read/write via RLS)
- A hand-written browser client pointed at `https://qkejynibmcsgjvburgig.supabase.co` using your publishable/anon key.
- Nothing is provisioned, migrated, or dropped. The existing schema stays the source of truth.
- Database types are hand-declared as narrow interfaces for only the tables we touch now (`profiles`, `workspaces`, `workspace_members`), so no generated-type step is needed and no assumptions are made about tables we don't read yet.

### 2. Authentication
- `/auth` route: email + password sign in and sign up, with real error surfacing (invalid credentials, unconfirmed email, network failure).
- Session persisted by Supabase; a single auth-state listener wired at the root.
- Sign out clears session and query cache.
- `/auth` is public; everything else lives behind a client-side auth gate that redirects unauthenticated users to `/auth`.

### 3. Workspace awareness
- On load, resolve memberships: `workspace_members` where `user_id = auth.uid()` and `status = 'active'`, joined to `workspaces` filtered to `status = 'active'`.
- Zero active workspaces: dedicated "no workspace access" screen, not a crash.
- One workspace: selected automatically.
- Multiple: explicit workspace selector in the top bar; selection persisted in localStorage and validated against current memberships on every load (never "first row wins").
- A `WorkspaceProvider` exposes the active `workspace_id`; every future workspace-scoped query reads from it. RLS remains the enforcement layer.

### 4. Application shell
- Dark, executive command-center aesthetic: near-black layered surfaces, a single restrained accent, tight typographic scale, generous whitespace, no gradients-on-white AI look.
- Persistent left sidebar (collapsible, drawer on mobile), top bar with workspace selector + user menu.
- Design tokens defined in `src/styles.css`; no hardcoded colors in components.

### 5. Routes (all real, none faked)
`/` Dashboard, `/boost`, `/clients`, `/businesses`, `/leads`, `/gbp`, `/tasks`, `/workflows`, `/reports`, `/knowledge`, `/agents`, `/integrations`, `/settings`.

Pages without implemented logic render a shared `NotImplemented` panel stating what the page will do and which backend objects it will use — no placeholder metrics, no sample rows.

### 6. BOOST page structure
Real layout, no fabricated intelligence:
- Conversation history list (reads `conversations` for the active workspace once the column shape is confirmed; empty state otherwise).
- Message thread area and composer.
- Voice button rendered disabled with a "not yet enabled" tooltip.
- Right-hand rail with sections for tool activity, agent activity, approvals, and execution status — each reading its real table or showing an empty state.
- Sending a message is disabled at this stage with an explicit "orchestrator not yet connected" notice, so nothing fabricates a response.

### 7. Error handling
- Route-level error and not-found components.
- A typed result wrapper around Supabase calls so failures surface as readable messages plus retry, never blank screens.
- `sonner` toasts mounted once at the root.

## Technical notes

- Stack is fixed: TanStack Start v1 + TanStack Router file routes + TanStack Query. Pages live in `src/routes/`.
- Structure: `src/lib/supabase/` (client), `src/services/` (per-domain data access), `src/types/`, `src/hooks/`, `src/components/{layout,boost,common,ui}`, `src/lib/ai/` (interface-only contracts for the future orchestrator: `AgentRunner`, `ToolInvoker`, `ApprovalGate` — types and stubs that throw "not implemented", never mock responses).
- Auth gate uses a `_authenticated` pathless layout with `ssr: false`, since the session lives in browser storage.
- Environment variables required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`. I will request the publishable/anon key through the secure secret form before wiring the client. No service-role key is used in this phase.

## Verification before reporting

- Sign up / sign in / sign out flow driven in a real browser session against your Supabase project.
- Redirect behaviour for unauthenticated access to a protected route.
- Workspace resolution against your live `workspace_members` data, including the multi-workspace selector path.
- Every one of the 13 routes loads without console errors, desktop and mobile widths.

Then I stop and report: files created, files modified, Supabase objects used, env vars required, tests performed, results, known issues.

## Explicitly not in this phase
Orchestrator logic, agent execution, tool calls, voice, AI responses, analytics, seeded records, schema changes.
