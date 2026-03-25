import paneerTikka from "@/assets/paneer-tikka.jpg";
import samosa from "@/assets/samosa.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import biryani from "@/assets/biryani.jpg";
import masalaDosa from "@/assets/masala-dosa.jpg";
import dalMakhani from "@/assets/dal-makhani.jpg";
import naan from "@/assets/naan.jpg";
import gulabJamun from "@/assets/gulab-jamun.jpg";
import rasmalai from "@/assets/rasmalai.jpg";
import mangoLassi from "@/assets/mango-lassi.jpg";
import masalaChai from "@/assets/masala-chai.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Starters" | "Main Course" | "Desserts" | "Beverages";
  rating: number;
  reviews: number;
  spiceLevel: 1 | 2 | 3;
  isVeg: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled in a clay oven with bell peppers and onions.",
    price: 12.99,
    image: paneerTikka,
    category: "Starters",
    rating: 4.8,
    reviews: 124,
    spiceLevel: 2,
    isVeg: true,
  },
  {
    id: "2",
    name: "Samosa",
    description: "Crispy golden pastries filled with spiced potatoes and peas, served with mint chutney.",
    price: 6.99,
    image: samosa,
    category: "Starters",
    rating: 4.6,
    reviews: 210,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "3",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-butter sauce with aromatic spices.",
    price: 16.99,
    image: butterChicken,
    category: "Main Course",
    rating: 4.9,
    reviews: 342,
    spiceLevel: 2,
    isVeg: false,
  },
  {
    id: "4",
    name: "Hyderabadi Biryani",
    description: "Fragrant basmati rice layered with tender meat, saffron, and whole spices.",
    price: 18.99,
    image: biryani,
    category: "Main Course",
    rating: 4.9,
    reviews: 289,
    spiceLevel: 2,
    isVeg: false,
  },
  {
    id: "5",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling, served with sambar and chutneys.",
    price: 13.99,
    image: masalaDosa,
    category: "Main Course",
    rating: 4.7,
    reviews: 178,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "6",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in a creamy butter and tomato gravy.",
    price: 14.99,
    image: dalMakhani,
    category: "Main Course",
    rating: 4.8,
    reviews: 156,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "7",
    name: "Garlic Naan",
    description: "Soft leavened bread topped with garlic and butter, baked in a tandoor.",
    price: 4.99,
    image: naan,
    category: "Starters",
    rating: 4.5,
    reviews: 320,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "8",
    name: "Gulab Jamun",
    description: "Golden fried milk dumplings soaked in cardamom-infused rose sugar syrup.",
    price: 7.99,
    image: gulabJamun,
    category: "Desserts",
    rating: 4.7,
    reviews: 198,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "9",
    name: "Rasmalai",
    description: "Soft paneer dumplings in chilled saffron milk, garnished with pistachios.",
    price: 8.99,
    image: rasmalai,
    category: "Desserts",
    rating: 4.8,
    reviews: 145,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "10",
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink blended with ripe Alphonso mangoes.",
    price: 5.99,
    image: mangoLassi,
    category: "Beverages",
    rating: 4.6,
    reviews: 267,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "11",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea brewed with cardamom, cinnamon, and ginger.",
    price: 3.99,
    image: masalaChai,
    category: "Beverages",
    rating: 4.5,
    reviews: 189,
    spiceLevel: 1,
    isVeg: true,
  },
];

export const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"] as const;
