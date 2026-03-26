import type { Point } from "@/lib/pathfinding";
import type { MenuItem } from "@/data/menuData";
import { menuItems } from "@/data/menuData";

export type Restaurant = {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance: string;
  image: string;
  location: Point;
  menuItemIds: string[];
};

// User's fixed home location (bottom-right area of grid)
export const USER_HOME: Point = { r: 17, c: 26 };

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Spice Heaven",
    tagline: "Authentic North Indian Flavors",
    cuisine: "North Indian",
    rating: 4.8,
    reviews: 1240,
    deliveryTime: "25-35 min",
    distance: "2.1 km",
    image: "", // will use first menu item image
    location: { r: 2, c: 3 },
    menuItemIds: ["1", "2", "3", "6", "7", "8", "10", "11", "12", "14", "15"],
  },
  {
    id: "r2",
    name: "Dosa Express",
    tagline: "South Indian Delights",
    cuisine: "South Indian",
    rating: 4.6,
    reviews: 870,
    deliveryTime: "20-30 min",
    distance: "1.5 km",
    image: "",
    location: { r: 5, c: 15 },
    menuItemIds: ["2", "5", "9", "10", "11", "16", "17"],
  },
  {
    id: "r3",
    name: "Biryani House",
    tagline: "Royal Dum Biryani & Kebabs",
    cuisine: "Hyderabadi",
    rating: 4.9,
    reviews: 2100,
    deliveryTime: "30-40 min",
    distance: "3.2 km",
    image: "",
    location: { r: 3, c: 25 },
    menuItemIds: ["4", "12", "15", "19", "3", "8", "9", "10"],
  },
  {
    id: "r4",
    name: "Punjabi Dhaba",
    tagline: "Highway-Style Comfort Food",
    cuisine: "Punjabi",
    rating: 4.5,
    reviews: 650,
    deliveryTime: "15-25 min",
    distance: "0.8 km",
    image: "",
    location: { r: 14, c: 20 },
    menuItemIds: ["1", "3", "6", "7", "13", "14", "16", "17", "18"],
  },
  {
    id: "r5",
    name: "Coastal Kitchen",
    tagline: "Fresh Seafood & Coastal Curries",
    cuisine: "Coastal Indian",
    rating: 4.7,
    reviews: 430,
    deliveryTime: "25-35 min",
    distance: "2.5 km",
    image: "",
    location: { r: 10, c: 8 },
    menuItemIds: ["5", "19", "2", "9", "10", "11", "17"],
  },
];

export const getRestaurantMenu = (restaurant: Restaurant): MenuItem[] =>
  restaurant.menuItemIds
    .map((id) => menuItems.find((m) => m.id === id))
    .filter((m): m is MenuItem => !!m);

export const getRestaurantImage = (restaurant: Restaurant): string => {
  const firstItem = menuItems.find((m) => m.id === restaurant.menuItemIds[0]);
  return firstItem?.image ?? "";
};
