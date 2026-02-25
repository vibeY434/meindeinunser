export const CATEGORIES = [
  { value: "haus_garten", label: "Haus, Garten & Werkzeug", icon: "🏡" },
  { value: "spielzeug", label: "Kind & Spielzeug", icon: "🧸" },
  { value: "lifestyle", label: "Freizeit & Sonstiges", icon: "✨" },
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];
