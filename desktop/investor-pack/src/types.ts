export interface InvestorPackAPI {
  login: (
    email: string,
    password: string
  ) => Promise<{
    ok: boolean;
    token?: string;
    email?: string;
    fullName?: string;
    error?: string;
  }>;
  logout: (token: string) => Promise<{ ok: boolean }>;
  validateSession: (
    token: string
  ) => Promise<{ ok: boolean; email?: string; fullName?: string }>;
  getManifest: (token: string) => Promise<{
    ok: boolean;
    manifest?: DocManifest;
    error?: string;
  }>;
  readDocument: (
    token: string,
    docPath: string
  ) => Promise<{ ok: boolean; content?: string; path?: string; error?: string }>;
  getPitchDeckPath: (
    token: string
  ) => Promise<{ ok: boolean; path?: string; error?: string }>;
  getConceptPath: (
    token: string
  ) => Promise<{ ok: boolean; path?: string; error?: string }>;
  getLogoPath: () => Promise<{ ok: boolean; path?: string }>;
  getConfidentiality: () => Promise<{
    ok: boolean;
    content?: string;
    error?: string;
  }>;
  getPackProfile: () => Promise<{
    ok: boolean;
    profile?: string;
    packLabel?: string;
  }>;
}

export interface DocTreeNode {
  id: string;
  label: string;
  path?: string;
  source?: string;
  children?: DocTreeNode[];
}

export interface DocManifest {
  profile?: string;
  defaultDoc: string;
  tree: DocTreeNode[];
}

declare global {
  interface Window {
    investorPack: InvestorPackAPI;
  }
}

export {};
