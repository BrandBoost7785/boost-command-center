import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { useAuth } from "@/hooks/useAuth";
import { WorkspaceProvider, useWorkspace } from "@/hooks/useWorkspace";
import { ErrorState } from "@/components/common/States";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth", replace: true });
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-xs text-muted-foreground">Loading session…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <WorkspaceProvider>
      <WorkspaceGate />
    </WorkspaceProvider>
  );
}

function WorkspaceGate() {
  const { loading, error, memberships, workspaceId, refetch, setWorkspaceId } =
    useWorkspace();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-xs text-muted-foreground">Resolving workspace access…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md">
          <ErrorState message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (memberships.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-xl border border-border bg-card p-6 text-center">
          <h1 className="text-base font-semibold text-foreground">No workspace access</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account has no active workspace membership. Ask an agency
            administrator to add you to a workspace, then reload.
          </p>
          <button
            onClick={refetch}
            className="mt-4 rounded-md border border-border px-3 py-1.5 text-xs text-foreground hover:bg-accent"
          >
            Check again
          </button>
        </div>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
          <h1 className="text-base font-semibold text-foreground">Select a workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have access to multiple active workspaces. Choose one to continue.
          </p>
          <div className="mt-4 space-y-2">
            {memberships.map((m) => (
              <button
                key={m.workspace.id}
                onClick={() => setWorkspaceId(m.workspace.id)}
                className="flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-left text-sm text-foreground hover:bg-accent"
              >
                <span className="truncate">{m.workspace.name ?? m.workspace.id}</span>
                {m.role ? (
                  <span className="text-[10px] uppercase text-muted-foreground">
                    {m.role}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
