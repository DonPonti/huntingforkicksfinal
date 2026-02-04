// lib/sizeData.ts

export interface SizeEntry {
  usMen: number;
  uk: number;
  eu: number;
  cm: number;
}

export type Brand = 'nike' | 'adidas' | 'newbalance' | 'puma';

export const sizeData: Record<Brand, SizeEntry[]> = {
  nike: [
    { usMen: 6,    uk: 5.5, eu: 38.5, cm: 24   },
    { usMen: 6.5,  uk: 6,   eu: 39,   cm: 24.5 },
    { usMen: 7,    uk: 6,   eu: 40,   cm: 25   },
    { usMen: 7.5,  uk: 6.5, eu: 40.5, cm: 25.5 },
    { usMen: 8,    uk: 7,   eu: 41,   cm: 26   },
    { usMen: 8.5,  uk: 7.5, eu: 42,   cm: 26.5 },
    { usMen: 9,    uk: 8,   eu: 42.5, cm: 27   },
    { usMen: 9.5,  uk: 8.5, eu: 43,   cm: 27.5 },
    { usMen: 10,   uk: 9,   eu: 44,   cm: 28   },
    { usMen: 10.5, uk: 9.5, eu: 44.5, cm: 28.5 },
    { usMen: 11,   uk: 10,  eu: 45,   cm: 29   },
    { usMen: 11.5, uk: 10.5,eu: 45.5, cm: 29.5 },
    { usMen: 12,   uk: 11,  eu: 46,   cm: 30   },
    { usMen: 12.5, uk: 11.5,eu: 47,   cm: 30.5 },
    { usMen: 13,   uk: 12,  eu: 47.5, cm: 31   },
    // Add more if needed (up to 18+)
  ],
  adidas: [
    { usMen: 6,    uk: 5.5, eu: 38.7, cm: 24   },
    { usMen: 6.5,  uk: 6,   eu: 39.3, cm: 24.5 },
    { usMen: 7,    uk: 6.5, eu: 40,   cm: 25   },
    { usMen: 7.5,  uk: 7,   eu: 40.7, cm: 25.5 },
    { usMen: 8,    uk: 7.5, eu: 41.3, cm: 26   },
    { usMen: 8.5,  uk: 8,   eu: 42,   cm: 26.5 },
    { usMen: 9,    uk: 8.5, eu: 42.7, cm: 27   },
    { usMen: 9.5,  uk: 9,   eu: 43.3, cm: 27.5 },
    { usMen: 10,   uk: 9.5, eu: 44,   cm: 28   },
    { usMen: 10.5, uk: 10,  eu: 44.7, cm: 28.5 },
    { usMen: 11,   uk: 10.5, eu: 45.3, cm: 29  },
    { usMen: 11.5, uk: 11,  eu: 46,   cm: 29.5 },
    { usMen: 12,   uk: 11.5, eu: 46.7, cm: 30  },
    // Adidas often feels ~0.5 larger than Nike in practice
  ],
  newbalance: [
    { usMen: 6,    uk: 5.5, eu: 38.5, cm: 24   },
    { usMen: 6.5,  uk: 6,   eu: 39.5, cm: 24.5 },
    { usMen: 7,    uk: 6.5, eu: 40,   cm: 25   },
    { usMen: 7.5,  uk: 7,   eu: 40.5, cm: 25.5 },
    { usMen: 8,    uk: 7.5, eu: 41.5, cm: 26   },
    { usMen: 8.5,  uk: 8,   eu: 42,   cm: 26.5 },
    { usMen: 9,    uk: 8.5, eu: 42.5, cm: 27   },
    { usMen: 9.5,  uk: 9,   eu: 43,   cm: 27.5 },
    { usMen: 10,   uk: 9.5, eu: 44,   cm: 28   },
    { usMen: 10.5, uk: 10,  eu: 44.5, cm: 28.5 },
    { usMen: 11,   uk: 10.5, eu: 45,   cm: 29  },
    { usMen: 11.5, uk: 11,  eu: 45.5, cm: 29.5 },
    { usMen: 12,   uk: 11.5, eu: 46.5, cm: 30  },
    // New Balance tends to be true-to-size or slightly wider
  ],
  puma: [
    // Placeholder — Puma often similar to Adidas
    { usMen: 7,    uk: 6.5, eu: 40,   cm: 25   },
    { usMen: 8,    uk: 7.5, eu: 41.3, cm: 26   },
    { usMen: 9,    uk: 8.5, eu: 42.7, cm: 27   },
    { usMen: 10,   uk: 9.5, eu: 44,   cm: 28   },
    // Extend as needed
  ],
};

export const brandFitTips: Record<Brand, string> = {
  nike: "Nike often fits snug — consider going up ½ size if between sizes. Great for narrow/medium feet.",
  adidas: "Adidas can feel slightly wider and longer than Nike — many go half-size down from their Nike size.",
  newbalance: "New Balance runs true-to-size with good width options — perfect for wider feet.",
  puma: "Puma sizing is close to Adidas — tends to run a bit narrow in some models.",
};