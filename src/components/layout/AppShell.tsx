import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronsUpDown, LogOut, Menu, X } from "lucide-react";

import { NAV_ITEMS } from "./nav-items";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function WorkspaceSwitcher() {
  const { memberships, workspace, setWorkspaceId } = useWorkspace();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-between gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent">
        <span className="min-w-0">
          <span className="block truncate font-medium">
            {workspace?.name ?? "Select workspace"}
          </span>
          <span className="block text-[11px] text-muted-foreground">
            {memberships.length} active workspace{memberships.length === 1 ? "" : "s"}
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          Workspaces
        </DropdownMenuLabel>
        {memberships.map((m) => (
          <DropdownMenuItem
            key={m.workspace.id}
            onSelect={() => setWorkspaceId(m.workspace.id)}
            className="flex items-center justify-between gap-2"
          >
            <span className="min-w-0 truncate">{m.workspace.name ?? m.workspace.id}</span>
            <span className="flex items-center gap-2">
              {m.role ? (
                <span className="text-[10px] uppercase text-muted-foreground">{m.role}</span>
              ) : null}
              {workspace?.id === m.workspace.id ? <Check className="size-3.5" /> : null}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-4 p-3">
      <div className="px-2 pt-2">
        <p className="text-sm font-semibold tracking-[0.18em] text-foreground">BOOST AI</p>
        <p className="text-[11px] text-muted-foreground">BrandBoost Marketing</p>
      </div>
      <WorkspaceSwitcher />
      <nav className="flex-1 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeProps={{ className: "bg-accent text-foreground" }}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-accent">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {(user?.email ?? "?").slice(0, 1).toUpperCase()}
        </span>
        <span className="hidden max-w-[160px] truncate sm:inline">{user?.email}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate text-xs font-normal text-muted-foreground">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            await signOut();
            navigate({ to: "/auth" });
          }}
        >
          <LogOut className="mr-2 size-4" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { workspace } = useWorkspace();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-border bg-sidebar">
            <button
              className="absolute right-2 top-2 rounded-md p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-4" />
            </button>
            <span className="truncate text-xs text-muted-foreground">
              {workspace?.name ?? "No workspace selected"}
            </span>
          </div>
          <UserMenu />
        </header>
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
