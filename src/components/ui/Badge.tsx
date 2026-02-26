import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "verleihen" | "verschenken" | "suchen" | "default";
  className?: string;
}

const variants = {
  verleihen: "bg-verleihen-light text-amber-800",
  verschenken: "bg-verschenken-light text-green-800",
  suchen: "bg-suchen-light text-violet-800",
  default: "bg-background text-text-light",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
