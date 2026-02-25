export const CATEGORIES = [
  { value: "haus_garten", label: "Haus & Garten", icon: "🏡" },
  { value: "spielzeug", label: "Spielzeug", icon: "🧸" },
  { value: "lifestyle", label: "Lifestyle", icon: "✨" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];
