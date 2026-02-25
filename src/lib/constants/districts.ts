export const MAINZ_DISTRICTS = [
  { value: "altstadt", label: "Altstadt" },
  { value: "bretzenheim", label: "Bretzenheim" },
  { value: "drais", label: "Drais" },
  { value: "ebersheim", label: "Ebersheim" },
  { value: "finthen", label: "Finthen" },
  { value: "gonsenheim", label: "Gonsenheim" },
  { value: "hartenberg_muenchfeld", label: "Hartenberg-Münchfeld" },
  { value: "hechtsheim", label: "Hechtsheim" },
  { value: "laubenheim", label: "Laubenheim" },
  { value: "lerchenberg", label: "Lerchenberg" },
  { value: "marienborn", label: "Marienborn" },
  { value: "mombach", label: "Mombach" },
  { value: "neustadt", label: "Neustadt" },
  { value: "oberstadt", label: "Oberstadt" },
  { value: "weisenau", label: "Weisenau" },
] as const;

export type District = (typeof MAINZ_DISTRICTS)[number]["value"];
