import { z } from "zod/v4";

export const listingSchema = z.object({
  title: z
    .string()
    .min(3, "Titel muss mindestens 3 Zeichen lang sein")
    .max(100, "Titel darf maximal 100 Zeichen lang sein"),
  description: z
    .string()
    .min(10, "Beschreibung muss mindestens 10 Zeichen lang sein")
    .max(2000, "Beschreibung darf maximal 2000 Zeichen lang sein"),
  type: z.enum(["verleihen", "verschenken", "suchen"], {
    message: "Bitte wähle einen Typ",
  }),
  category: z.enum(["haus_garten", "spielzeug", "lifestyle"], {
    message: "Bitte wähle eine Kategorie",
  }),
  district: z.string().min(1, "Bitte wähle einen Stadtteil"),
});

export type ListingInput = z.infer<typeof listingSchema>;
