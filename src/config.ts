import type { ConfigData } from "@shaferllc/keel/core";

export interface AppInfo {
  name: string;
  tagline: string;
  description: string;
  version: string;
  url: string;
  price: string;
  trialDays: number;
  requires: string;
}

/** Inline config (no filesystem on the edge). Reachable as config('app.*'). */
export const config: ConfigData = {
  app: {
    name: "Bilge",
    tagline: "Where did all your disk space go?",
    description:
      "A native Mac cleaner that finds the junk, big files, duplicates and app leftovers filling your disk, and moves them to the Trash so any mistake can be put back.",
    version: "0.1.0",
    url: "https://bilge.shafer.llc",
    price: "$9.99",
    trialDays: 14,
    requires: "macOS 14 Sonoma or later · Apple silicon and Intel",
  },
};
