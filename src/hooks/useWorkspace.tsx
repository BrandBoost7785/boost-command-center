import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/hooks/useAuth";
import { fetchActiveMemberships } from "@/services/workspaces.service";
import type { Membership, Workspace } from "@/types/db";

const STORAGE_KEY = "boost-ai:active-workspace";

interface WorkspaceContextValue {
  memberships: Membership[];
  workspace: Workspace | null;
  workspaceId: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  setWorkspaceId: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["memberships", user?.id],
    queryFn: () => fetchActiveMemberships(user!.id),
    enabled: Boolean(user?.id),
    retry: 1,
  });

  const memberships = useMemo(() => query.data ?? [], [query.data]);

  // Validate the persisted selection against current memberships on every load.
  useEffect(() => {
    if (memberships.length === 0) {
      setSelectedId(null);
      return;
    }
    const stored =
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const validStored = memberships.find((m) => m.workspace.id === stored);
    const validSelected = memberships.find((m) => m.workspace.id === selectedId);

    if (validSelected) return;
    if (validStored) {
      setSelectedId(validStored.workspace.id);
      return;
    }
    // Never auto-pick when the user must choose explicitly.
    if (memberships.length === 1) setSelectedId(memberships[0]!.workspace.id);
    else setSelectedId(null);
  }, [memberships, selectedId]);

  const setWorkspaceId = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const active = memberships.find((m) => m.workspace.id === selectedId) ?? null;

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      memberships,
      workspace: active?.workspace ?? null,
      workspaceId: active?.workspace.id ?? null,
      role: active?.role ?? null,
      loading: query.isLoading,
      error: query.error ? (query.error as Error).message : null,
      refetch: () => void query.refetch(),
      setWorkspaceId,
    }),
    [memberships, active, query, setWorkspaceId],
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
