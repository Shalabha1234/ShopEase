import iphone from "../assets/images/products/iphone.jpg";
import macbook from "../assets/images/products/macbook.jpg";
import headphones from "../assets/images/products/headphones.jpg";
import smartwatch from "../assets/images/products/smartwatch.jpg";

export const products = [
  {
    id: 1,
    image: iphone,
    name: "iPhone 16 Pro",
    category: "Electronics",
    brand: "Apple",
    price: 79999,
    oldPrice: 89999,
    rating: 4.8,
    reviews: 128,
    stock: 15,
    description:
      "Experience the power of the A18 Pro chip, an advanced triple-camera system, and a stunning Super Retina XDR display. Perfect for photography, gaming, and everyday performance.",
  },
  {
    id: 2,
    image: macbook,
    name: "MacBook Air M4",
    category: "Electronics",
    brand: "Apple",
    price: 109999,
    oldPrice: 119999,
    rating: 4.9,
    reviews: 87,
    stock: 10,
    description:
      "Ultra-lightweight laptop powered by Apple's M4 chip. Delivers exceptional speed, long battery life, and a brilliant Liquid Retina display for work and creativity.",
  },
  {
    id: 3,
    image: headphones,
    name: "Sony WH-1000XM5",
    category: "Electronics",
    brand: "Sony",
    price: 29999,
    oldPrice: 34999,
    rating: 4.7,
    reviews: 243,
    stock: 20,
    description:
      "Industry-leading noise-cancelling wireless headphones with crystal-clear sound quality, comfortable design, and up to 30 hours of battery life.",
  },
  {
    id: 4,
    image: smartwatch,
    name: "Galaxy Watch 7",
    category: "Wearables",
    brand: "Samsung",
    price: 44999,
    oldPrice: 49999,
    rating: 4.8,
    reviews: 96,
    stock: 18,
    description:
      "A stylish smartwatch with advanced fitness tracking, heart-rate monitoring, sleep analysis, and seamless smartphone connectivity.",
  },
];