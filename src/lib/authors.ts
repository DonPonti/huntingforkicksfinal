export type Author = {
  name: string;
  picture: string;
  role: string;
  bio: string; // <-- Added this field
};

export const AUTHORS: Record<string, Author> = {
  "Sage": {
    name: "Sage",
    picture: "/assets/authors/sage.jpg",
    role: "Editor-in-Chief",
    // Write your actual bio here 👇
    bio: "Obsessed with digital minimalism and sneaker culture. Building tools that strip away the noise and focus on utility. Based in India."
  }
};