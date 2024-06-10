import type { LiquorstoreCategoriesResponse } from "@/lib/pb/database";

export type DrinkCategory = LiquorstoreCategoriesResponse["name"];
export type DrinkCategoryHref = `/products?category=${DrinkCategory}`;
export const drink_categories: {
  title: DrinkCategory;
  href: DrinkCategoryHref;
  description: string;
}[] = [
  {
    title: "Whiskey",
    href: "/products?category=whiskey",
    description:
      "Explore iconic brands like Johnnie Walker, Jack Daniel's, Glenfiddich",
  },
  {
    title: "Brandy",
    href: "/products?category=Brandy",
    description: "Renowned choices: Hennessy, Courvoisier, Remy Martin",
  },
  {
    title: "Beers",
    href: "/products?category=Beers",
    description: "Discover variety: Heineken, Budweiser, Guinness",
  },
  {
    title: "Champagne",
    href: "/products?category=Champagne",
    description:
      "Celebrate in style: Moët & Chandon, Veuve Clicquot, Dom Pérignon",
  },
  {
    title: "Cognac",
    href: "/products?category=Cognac",
    description: "Esteemed houses: Hennessy, Martell, Rémy Martin",
  },
  {
    title: "Gin",
    href: "/products?category=Gin",
    description: "Popular choices: Beefeater, Bombay Sapphire, Tanqueray",
  },
  {
    title: "Liqueur",
    href: "/products?category=Liqueur",
    description: "Discover flavors: Baileys, Kahlúa, Cointreau",
  },
  {
    title: "Rum",
    href: "/products?category=Rum",
    description: "Classic brands: Bacardi, Captain Morgan, Havana Club",
  },
  {
    title: "Tequila",
    href: "/products?category=Tequila",
    description: "Renowned producers: Patron, Don Julio, Sauza",
  },
  {
    title: "Vodka",
    href: "/products?category=Vodka",
    description: "Popular choices: Grey Goose, Smirnoff, Belvedere",
  },
  {
    title: "Wine",
    href: "/products?category=Wine",
    description: "Explore regions: Napa Valley, Bordeaux, Rioja",
  },
];

export const other_routes: { title: string; href: string }[] = [
  { title: "Profile", href: "/profile" },
  { title: "Admin", href: "/admin" },
];
