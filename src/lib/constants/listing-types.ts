export const LISTING_TYPES = [
  {
    value: "verleihen",
    label: "Verleihen",
    color: "bg-verleihen-light text-amber-800",
    dotColor: "bg-verleihen",
  },
  {
    value: "verschenken",
    label: "Verschenken",
    color: "bg-verschenken-light text-green-800",
    dotColor: "bg-verschenken",
  },
  {
    value: "suchen",
    label: "Suchen",
    color: "bg-suchen-light text-violet-800",
    dotColor: "bg-suchen",
  },
] as const;

export type ListingType = (typeof LISTING_TYPES)[number]["value"];
