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
import tandooriChicken from "@/assets/tandoori-chicken.jpg";
import palakPaneer from "@/assets/palak-paneer.jpg";
import choleBhature from "@/assets/chole-bhature.jpg";
import chickenTikkaMasala from "@/assets/chicken-tikka-masala.jpg";
import jalebi from "@/assets/jalebi.jpg";
import alooGobi from "@/assets/aloo-gobi.jpg";
import sweetLassi from "@/assets/sweet-lassi.jpg";
import fishCurry from "@/assets/fish-curry.jpg";

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
  // ── Starters ──
  {
    id: "1",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled in a clay oven with bell peppers and onions.",
    price: 299,
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
    price: 149,
    image: samosa,
    category: "Starters",
    rating: 4.6,
    reviews: 210,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "7",
    name: "Garlic Naan",
    description: "Soft leavened bread topped with garlic and butter, baked in a tandoor.",
    price: 99,
    image: naan,
    category: "Starters",
    rating: 4.5,
    reviews: 320,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "12",
    name: "Tandoori Chicken",
    description: "Whole chicken marinated in yogurt and spices, charred to perfection in a clay oven.",
    price: 349,
    image: tandooriChicken,
    category: "Starters",
    rating: 4.8,
    reviews: 198,
    spiceLevel: 3,
    isVeg: false,
  },

  // ── Main Course ──
  {
    id: "3",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-butter sauce with aromatic spices.",
    price: 399,
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
    price: 449,
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
    price: 249,
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
    price: 329,
    image: dalMakhani,
    category: "Main Course",
    rating: 4.8,
    reviews: 156,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "13",
    name: "Palak Paneer",
    description: "Fresh spinach puree with soft paneer cubes, tempered with garlic and cumin.",
    price: 319,
    image: palakPaneer,
    category: "Main Course",
    rating: 4.7,
    reviews: 134,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "14",
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with fluffy deep-fried bread — a North Indian classic.",
    price: 279,
    image: choleBhature,
    category: "Main Course",
    rating: 4.6,
    reviews: 223,
    spiceLevel: 2,
    isVeg: true,
  },
  {
    id: "15",
    name: "Chicken Tikka Masala",
    description: "Grilled chicken tikka pieces simmered in a creamy, spiced tomato gravy.",
    price: 429,
    image: chickenTikkaMasala,
    category: "Main Course",
    rating: 4.8,
    reviews: 267,
    spiceLevel: 2,
    isVeg: false,
  },
  {
    id: "16",
    name: "Aloo Gobi",
    description: "Potato and cauliflower stir-fried with turmeric, cumin, and fresh coriander.",
    price: 249,
    image: alooGobi,
    category: "Main Course",
    rating: 4.5,
    reviews: 112,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "19",
    name: "Fish Curry",
    description: "Fresh fish pieces simmered in a tangy, spiced coconut and tomato gravy.",
    price: 479,
    image: fishCurry,
    category: "Main Course",
    rating: 4.7,
    reviews: 98,
    spiceLevel: 3,
    isVeg: false,
  },

  // ── Desserts ──
  {
    id: "8",
    name: "Gulab Jamun",
    description: "Golden fried milk dumplings soaked in cardamom-infused rose sugar syrup.",
    price: 179,
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
    price: 199,
    image: rasmalai,
    category: "Desserts",
    rating: 4.8,
    reviews: 145,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "17",
    name: "Jalebi",
    description: "Crispy, spiral-shaped sweets soaked in warm saffron sugar syrup.",
    price: 129,
    image: jalebi,
    category: "Desserts",
    rating: 4.6,
    reviews: 176,
    spiceLevel: 1,
    isVeg: true,
  },

  // ── Beverages ──
  {
    id: "10",
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink blended with ripe Alphonso mangoes.",
    price: 149,
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
    price: 99,
    image: masalaChai,
    category: "Beverages",
    rating: 4.5,
    reviews: 189,
    spiceLevel: 1,
    isVeg: true,
  },
  {
    id: "18",
    name: "Sweet Lassi",
    description: "Creamy yogurt drink sweetened with sugar and topped with crushed pistachios.",
    price: 129,
    image: sweetLassi,
    category: "Beverages",
    rating: 4.5,
    reviews: 143,
    spiceLevel: 1,
    isVeg: true,
  },
];

export const categories = ["All", "Starters", "Main Course", "Desserts", "Beverages"] as const;
