import { Product, Order } from "../types";

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Milk",
    description:
      "Straight from our farm to your table. Pure and fresh cow milk with no additives.",
    price: 30,
    category: "milk",
    ingredients: ["Whole Milk"],
    expiryDate: "2023-06-15",
    images: [
      "/src/assets/images/Milk.jpg",
      "/src/assets/images/Milk-2.jpg",
      "/src/assets/images/Milk-3.jpg",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Organic Cow Milk",
    description:
      "Farm-fresh organic cow milk with rich nutrients and natural goodness.",
    price: 35,
    category: "milk",
    ingredients: ["Organic Whole Milk"],
    expiryDate: "2023-06-14",
    images: [
      "/src/assets/images/Cow-Milk.jpg",
      "/src/assets/images/Cow-Milk-1.jpg",
    ],
    inStock: true,
  },
  {
    id: "3",
    name: "Amrakhand",
    description:
      "Sweet and tangy yogurt dessert with fresh mango pulp and saffron.",
    price: 70,
    category: "shrikhand",
    ingredients: [
      "Strained Yogurt",
      "Mango Pulp",
      "Sugar",
      "Saffron",
      "Cardamom",
    ],
    expiryDate: "2023-06-10",
    images: [
      "/src/assets/images/amrakhand.jpg",
      "/src/assets/images/amrakhand-1.jpg",
      "/src/assets/images/amrakhand-2.jpg",
      "/src/assets/images/amrakhand-3.jpg",
    ],
    inStock: true,
  },
  {
    id: "4",
    name: "Classic Shrikhand",
    description:
      "Traditional sweet yogurt dessert infused with saffron and cardamom.",
    price: 60,
    category: "shrikhand",
    ingredients: ["Strained Yogurt", "Sugar", "Saffron", "Cardamom"],
    expiryDate: "2023-06-09",
    images: [
      "/src/assets/images/Shrikhand.jpg",
      "/src/assets/images/Shrikhand-2.jpg",
      "/src/assets/images/Shrikhand-3.png",
    ],
    inStock: true,
  },
  {
    id: "5",
    name: "Pineapple Shrikhand",
    description:
      "Sweet yogurt dessert with chunks of pineapple for a tropical twist.",
    price: 65,
    category: "shrikhand",
    ingredients: ["Strained Yogurt", "Pineapple", "Sugar", "Cardamom"],
    expiryDate: "2023-06-11",
    images: [
      "/src/assets/images/Pineapple-Shrikhand.jpg",
      "/src/assets/images/Pineapple-Shrikhand-2.jpg",
      "/src/assets/images/Pineapple-Shrikhand-3.jpg",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Butterscotch Shrikhand",
    description: "Creamy shrikhand with a rich butterscotch flavor.",
    price: 65,
    category: "shrikhand",
    ingredients: ["Strained Yogurt", "Butterscotch", "Sugar", "Vanilla"],
    expiryDate: "2023-06-10",
    images: ["/src/assets/images/Butterscotch-Shrikhand.JPG"],
    inStock: true,
  },
  {
    id: "7",
    name: "Gulkand Lassi",
    description: "Sweet and aromatic yogurt drink with rose petal preserve.",
    price: 45,
    category: "drinks",
    ingredients: ["Yogurt", "Gulkand (Rose Preserve)", "Sugar", "Cardamom"],
    expiryDate: "2023-06-08",
    images: [
      "/src/assets/images/Gulkand-Lassi.jpg",
      "/src/assets/images/Gulkand-Lassi-2.jpg",
      "/src/assets/images/Gulkand-Lassi-3.jpg",
      "/src/assets/images/Gulkand-Lassi-4.jpg",
      "/src/assets/images/Gulkand-Lassi-5.jpg",
    ],
    inStock: true,
  },
  {
    id: "8",
    name: "Traditional Lassi",
    description: "Classic sweet yogurt drink, refreshing and nutritious.",
    price: 40,
    category: "drinks",
    ingredients: ["Yogurt", "Sugar", "Cardamom"],
    expiryDate: "2023-06-08",
    images: ["/src/assets/images/Lassi.jpg", "/src/assets/images/Lassi-2.jpg"],
    inStock: true,
  },
  {
    id: "9",
    name: "Paneer",
    description:
      "Fresh cottage cheese made from our farm milk. Soft and rich in texture.",
    price: 80,
    category: "others",
    ingredients: ["Milk", "Lemon Juice"],
    expiryDate: "2023-06-12",
    images: [
      "/src/assets/images/Paneer.jpg",
      "/src/assets/images/Paneer-2.jpg",
      "/src/assets/images/Paneer-3.jpg",
      "/src/assets/images/Paneer-4.jpg",
    ],
    inStock: true,
  },
  {
    id: "10",
    name: "Taak (Buttermilk)",
    description: "Refreshing spiced buttermilk, perfect for hot summer days.",
    price: 25,
    category: "drinks",
    ingredients: ["Buttermilk", "Cumin", "Coriander", "Salt", "Mint"],
    expiryDate: "2023-06-07",
    images: ["/src/assets/images/Taak-2.jpg", "/src/assets/images/Taak.jpg"],
    inStock: true,
  },
  {
    id: "11",
    name: "Homemade Curd",
    description: "Creamy, thick curd made from fresh farm milk.",
    price: 40,
    category: "others",
    ingredients: ["Milk", "Curd Culture"],
    expiryDate: "2023-06-08",
    images: [
      "/src/assets/images/Curd.jpg",
      "/src/assets/images/Curd-2.jpg",
      "/src/assets/images/Curd-3.jpg",
      "/src/assets/images/Curd-4.jpg",
      "/src/assets/images/Curd-5.jpg",
    ],
    inStock: true,
  },
  {
    id: "12",
    name: "Tup (Homemade Butter)",
    description: "Traditional churned butter with rich, creamy flavor.",
    price: 90,
    category: "others",
    ingredients: ["Cream from Cow's Milk"],
    expiryDate: "2023-07-15",
    images: [
      "/src/assets/images/Tup.jpg",
      "/src/assets/images/Tup-1.jpg",
      "/src/assets/images/Tup-2.jpg",
      "/src/assets/images/Tup-3.jpg",
      "/src/assets/images/Tup-4.jpg",
    ],
    inStock: true,
  },
  {
    id: "13",
    name: "Basundi",
    description:
      "Rich, creamy dessert made by reducing milk and flavored with nuts and saffron.",
    price: 75,
    category: "basundi",
    ingredients: ["Milk", "Sugar", "Nuts", "Saffron", "Cardamom"],
    expiryDate: "2023-06-09",
    images: [
      "/src/assets/images/Basundi.jpg",
      "/src/assets/images/Basundi-2.jpg",
      "/src/assets/images/Basundi-3.jpg",
      "/src/assets/images/basundi-4.jpg",
    ],
    inStock: true,
  },
  {
    id: "14",
    name: "Gulkand Basundi",
    description:
      "Basundi flavored with rose petal preserve for a floral touch.",
    price: 80,
    category: "basundi",
    ingredients: [
      "Milk",
      "Sugar",
      "Gulkand (Rose Preserve)",
      "Nuts",
      "Cardamom",
    ],
    expiryDate: "2023-06-09",
    images: ["/src/assets/images/Gulkand-Basundi.jpg"],
    inStock: true,
  },
];

// Mock orders data
export const orders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      { product: products[0], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
    totalAmount: 14.97,
    status: "delivered",
    createdAt: "2023-05-20T10:30:00Z",
  },
  {
    id: "order2",
    userId: "user2",
    items: [
      { product: products[4], quantity: 3 },
      { product: products[6], quantity: 1 },
    ],
    totalAmount: 22.96,
    status: "out-for-delivery",
    createdAt: "2023-05-25T14:20:00Z",
  },
  {
    id: "order3",
    userId: "user3",
    items: [
      { product: products[1], quantity: 1 },
      { product: products[3], quantity: 2 },
      { product: products[5], quantity: 1 },
    ],
    totalAmount: 23.46,
    status: "processing",
    createdAt: "2023-05-28T09:15:00Z",
  },
];

// Testimonials data
export const testimonials = [
  {
    id: "1",
    name: "Abhishek Shitole",
    role: "Regular Customer",
    content:
      "मी गेली तीन वर्षे या डेअरीतून दूध खरेदी करत आहे. दूधाची गुणवत्ता नेहमीच उत्कृष्ट असते आणि माझ्या कुटुंबाला ते खूप आवडते!",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  },
  {
    id: "2",
    name: "Akash Kore",
    role: "Chef",
    content:
      "एक व्यावसायिक शेफ म्हणून, मी माझ्या साहित्याबाबत फारच काटेकोर आहे. या डेअरीचे दुग्धजन्य पदार्थ अत्युत्तम आहेत आणि माझ्या सर्व पदार्थांना अधिक चवदार बनवतात.",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  },
  {
    id: "3",
    name: "Bhagyashree Patil",
    role: "Health Enthusiast",
    content:
      "मला आवडते की ही डेअरी त्यांच्या उत्पादनांमध्ये नैसर्गिक चव आणि पौष्टिकता जपते. त्यांच्या कमी फॅटच्या दुधाचा मी माझ्या स्मूदीसाठी नेहमी वापर करतो.",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  },
];

// Carousel items for homepage
export const carouselItems = [
  {
    id: "1",
    title: "Farm Fresh Milk",
    description: "Straight from our farm to your table",
    image:
      "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/slide-1.jpg",
  },
  {
    id: "2",
    title: "Artisanal Dairy Products",
    description: "Crafted with care using traditional methods",
    image:
      "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/slide-2.jpg",
  },
  {
    id: "3",
    title: "Organic Shrikhand",
    description: "A sweet treat for your special moments",
    image:
      "https://raw.githubusercontent.com/shubhamkasbekar/meadow-bloom-dairy/refs/heads/main/src/assets/images/slide-3.jpg",
  },
];

// Why Choose Us data
export const whyChooseUs = [
  {
    id: "1",
    title: "Farm-to-Table Freshness",
    description:
      "Our products go from our farm to your table within hours, ensuring maximum freshness.",
    icon: "Leaf",
  },
  {
    id: "2",
    title: "Ethical Farming",
    description:
      "Our cows are treated with care and respect, living in free-range environments.",
    icon: "Heart",
  },
  {
    id: "3",
    title: "Traditional Methods",
    description:
      "We use time-tested traditional methods to create authentic dairy products.",
    icon: "History",
  },
  {
    id: "4",
    title: "No Preservatives",
    description:
      "All our products are free from artificial preservatives and additives.",
    icon: "Check",
  },
];
