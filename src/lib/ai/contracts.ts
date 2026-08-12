/**
 * Runtime contracts for the future BOOST Executive Orchestrator.
 *
 * These are INTERFACES ONLY. No implementation, no mock responses.
 * Anything that calls a stub gets an explicit "not implemented" error so the
 * application can never fabricate AI output.
 */

export interface AgentRunRequest {
  workspaceId: string;
  conversationId: string | null;
  agentId?: string | null;
  input: string;
}

export interface AgentRunHandle {
  runId: string;
  status: "queued" | "running" | "awaiting_approval" | "succeeded" | "failed";
}

export interface ToolInvocationRequest {
  workspaceId: string;
  runId: string;
  toolId: string;
  args: Record<string, unknown>;
}

export interface ApprovalDecision {
  approvalId: string;
  decision: "approved" | "rejected";
  note?: string;
}

export class NotImplementedError extends Error {
  constructor(what: string) {
    super(`${what} is not implemented yet. The BOOST orchestrator is not connected.`);
    this.name = "NotImplementedError";
  }
}

export interface AgentRunner {
  start(request: AgentRunRequest): Promise<AgentRunHandle>;
}

export interface ToolInvoker {
  invoke(request: ToolInvocationRequest): Promise<unknown>;
}

export interface ApprovalGate {
  decide(decision: ApprovalDecision): Promise<void>;
}

export const agentRunner: AgentRunner = {
  async start() {
    throw new NotImplementedError("AgentRunner.start");
  },
};

export const toolInvoker: ToolInvoker = {
  async invoke() {
    throw new NotImplementedError("ToolInvoker.invoke");
  },
};

export const approvalGate: ApprovalGate = {
  async decide() {
    throw new NotImplementedError("ApprovalGate.decide");
  },
};
