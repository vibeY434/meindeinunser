import { Badge } from "@/components/ui/Badge";
import type { ListingType } from "@/types";

const labels: Record<ListingType, string> = {
  verleihen: "Verleihen",
  verschenken: "Verschenken",
  suchen: "Suchen",
};

export function ListingTypeBadge({ type }: { type: ListingType }) {
  return <Badge variant={type}>{labels[type]}</Badge>;
}
