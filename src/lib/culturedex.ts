// THE INVENTORY (Moves/Items)
export const assets: Record<string, { name: string; brand: string; image: string; link: string }> = {
  "jordan-1-mocha": {
    name: "Jordan 1 High 'Mocha'",
    brand: "Jordan",
    image: "/images/shoes/jordan-1-mocha.jpg",
    link: "https://stockx.com/search?s=jordan+1+mocha"
  },
  "ap-royal-oak": {
    name: "AP Royal Oak Custom",
    brand: "Audemars Piguet",
    image: "/images/shoes/ap-watch.jpg",
    link: "https://stockx.com/"
  },
  "yeezy-700-wave": {
    name: "Yeezy Boost 700 'Wave Runner'",
    brand: "Adidas",
    image: "/images/shoes/wave-runner.jpg",
    link: "https://stockx.com/search?s=yeezy+700+wave+runner"
  },
  "nike-lebron-20": {
    name: "LeBron 20 'Time Machine'",
    brand: "Nike",
    image: "/images/shoes/lebron-20.jpg",
    link: "https://stockx.com/search?s=lebron+20+time+machine"
  },
  "prada-america-cup": {
    name: "Prada America's Cup",
    brand: "Prada",
    image: "/images/shoes/prada-cup.jpg",
    link: "https://stockx.com/prada-americas-cup"
  }
};

// THE CULTUREDEX (The Pokémon)
export const cultureDex: Record<string, any> = {
  "travis-scott": {
    id: "0001",
    name: "Travis Scott",
    description: "Travis Scott didn't just collaborate with Nike; he rewired the entire sneaker economy. By aggressively utilizing earth tones and backward Swooshes, he turned the Houston rodeo aesthetic into global luxury.",
    image: "/images/icons/travis.jpg",
    attributes: {
      "Affiliation": "Nike / Jordan",
      "Category": "Architect",
      "Net Worth": "$80M+",
      "Abilities": "Market Crash ⓘ",
      "First Collab": "2017"
    },
    types: ["Hip-Hop", "Designer"],
    weaknesses: ["Adidas", "Formal Wear", "Vibrant Colors"],
    stats: { Hype: 98, Influence: 95, Archive: 85, Resale: 99, Speed: 88 },
    equipped: ["jordan-1-mocha", "ap-royal-oak"]
  },
  
  "kanye-west": {
    id: "0002",
    name: "Ye (Kanye West)",
    description: "The most disruptive force in modern footwear. From the Nike Air Yeezy to creating a billion-dollar empire with Adidas, Ye proved that a non-athlete could dominate the global sneaker market. His shift toward brutalist, foam-based slip-ons changed the trajectory of industrial footwear design.",
    image: "/images/icons/kanye.jpg",
    attributes: {
      "Affiliation": "Independent",
      "Category": "Visionary",
      "Net Worth": "$400M+",
      "Abilities": "Paradigm Shift ⓘ",
      "First Collab": "2007 (Bape)"
    },
    types: ["Designer", "Musician"],
    weaknesses: ["Corporate Boards", "Consistency", "Nike"],
    stats: { Hype: 99, Influence: 99, Archive: 95, Resale: 85, Speed: 70 },
    equipped: ["yeezy-700-wave"]
  },

  "lebron-james": {
    id: "0003",
    name: "LeBron James",
    description: "The King of the Tunnel Walk. LeBron's lifetime Nike contract and two-decade-long signature line make him the reigning monarch of performance basketball. His ability to blend rare player-exclusive (PE) models with high-end tailored suits redefined how athletes dress off the court.",
    image: "/images/icons/lebron.jpg",
    attributes: {
      "Affiliation": "Nike (Lifetime)",
      "Category": "Athlete",
      "Net Worth": "$1B+",
      "Abilities": "Tunnel Vision ⓘ",
      "First Collab": "2003"
    },
    types: ["Athlete", "Mogul"],
    weaknesses: ["Underdog Brands", "Chunky Skateshoes"],
    stats: { Hype: 85, Influence: 95, Archive: 99, Resale: 75, Speed: 95 },
    equipped: ["nike-lebron-20", "ap-royal-oak"]
  },

  "asap-rocky": {
    id: "0004",
    name: "A$AP Rocky",
    description: "Lord Flacko does not follow trends; he dictates them. Whether pulling obscure skate shoes from the archive or blending high-end Prada with distressed denim, Rocky's rotation is entirely unpredictable. His role as PUMA's F1 Creative Director marks his transition from pure aesthetic curation to industrial design.",
    image: "/images/icons/rocky.jpg",
    attributes: {
      "Affiliation": "PUMA",
      "Category": "Tastemaker",
      "Net Worth": "$20M+",
      "Abilities": "Trend Setter ⓘ",
      "First Collab": "2018 (Under Armour)"
    },
    types: ["Hip-Hop", "Fashion"],
    weaknesses: ["Basic Silhouettes", "General Releases"],
    stats: { Hype: 90, Influence: 96, Archive: 92, Resale: 80, Speed: 90 },
    equipped: ["prada-america-cup"]
  }
};