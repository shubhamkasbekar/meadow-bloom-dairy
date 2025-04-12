
import { Product, Order } from "../types";

// Mock products data
export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Farm Milk",
    description: "Straight from our farm to your table. Pure and fresh cow milk with no additives.",
    price: 3.99,
    category: "milk",
    ingredients: ["Whole Milk"],
    expiryDate: "2023-06-15",
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "2",
    name: "Organic Low-Fat Milk",
    description: "Lower in fat but not in taste. Perfect for those watching their fat intake.",
    price: 4.49,
    category: "milk",
    ingredients: ["Low-fat Milk"],
    expiryDate: "2023-06-14",
    images: [
      "https://images.unsplash.com/photo-1576186726115-4d51596775d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWlsa3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "3",
    name: "Mango Shrikhand",
    description: "Sweet and tangy yogurt dessert with fresh mango pulp and saffron.",
    price: 6.99,
    category: "shrikhand",
    ingredients: ["Strained Yogurt", "Mango Pulp", "Sugar", "Saffron", "Cardamom"],
    expiryDate: "2023-06-10",
    images: [
      "https://images.unsplash.com/photo-1620179282320-da5c53dd9ed3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0JTIwZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "4",
    name: "Saffron Shrikhand",
    description: "Traditional sweet yogurt dessert infused with saffron and cardamom.",
    price: 5.99,
    category: "shrikhand",
    ingredients: ["Strained Yogurt", "Sugar", "Saffron", "Cardamom"],
    expiryDate: "2023-06-09",
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8eW9ndXJ0JTIwZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "5",
    name: "Strawberry Lassi",
    description: "Refreshing yogurt drink blended with fresh strawberries and a hint of mint.",
    price: 4.99,
    category: "drinks",
    ingredients: ["Yogurt", "Strawberries", "Sugar", "Mint"],
    expiryDate: "2023-06-08",
    images: [
      "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFzc2l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "6",
    name: "Mango Lassi",
    description: "Sweet and creamy yogurt drink with alphonso mango pulp.",
    price: 4.99,
    category: "drinks",
    ingredients: ["Yogurt", "Mango Pulp", "Sugar"],
    expiryDate: "2023-06-08",
    images: [
      "https://images.unsplash.com/photo-1553530666-ba11a90bb627?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFuZ28lMjBkZXNzZXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "7",
    name: "Paneer",
    description: "Fresh cottage cheese made from our farm milk. Soft and rich in texture.",
    price: 7.99,
    category: "others",
    ingredients: ["Milk", "Lemon Juice"],
    expiryDate: "2023-06-12",
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  },
  {
    id: "8",
    name: "Ghee",
    description: "Traditional clarified butter made using age-old techniques.",
    price: 9.99,
    category: "others",
    ingredients: ["Butter from Cow's Milk"],
    expiryDate: "2023-09-30",
    images: [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2hlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    ],
    inStock: true
  }
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
  }
];

// Testimonials data
export const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "I've been buying milk from this farm for over 3 years now. The quality is consistently excellent and my family loves it!",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "2",
    name: "Michael Thompson",
    role: "Chef",
    content: "As a professional chef, I'm very particular about my ingredients. The dairy products from this farm are exceptional and enhance all my dishes.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: "3",
    name: "Emma Davis",
    role: "Health Enthusiast",
    content: "I appreciate how this farm maintains the natural goodness in their products. Their low-fat milk is my go-to for my smoothies.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  }
];

// Carousel items for homepage
export const carouselItems = [
  {
    id: "1",
    title: "Farm Fresh Milk",
    description: "Straight from our farm to your table",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFpcnklMjBmYXJtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "2",
    title: "Artisanal Dairy Products",
    description: "Crafted with care using traditional methods",
    image: "https://images.unsplash.com/photo-1618580929334-668974537252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZGFpcnklMjBwcm9kdWN0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "3",
    title: "Organic Shrikhand",
    description: "A sweet treat for your special moments",
    image: "https://images.unsplash.com/photo-1551892589-865f69869476?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8eW9ndXJ0JTIwZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60",
  }
];

// Why Choose Us data
export const whyChooseUs = [
  {
    id: "1",
    title: "Farm-to-Table Freshness",
    description: "Our products go from our farm to your table within hours, ensuring maximum freshness.",
    icon: "Leaf"
  },
  {
    id: "2",
    title: "Ethical Farming",
    description: "Our cows are treated with care and respect, living in free-range environments.",
    icon: "Heart"
  },
  {
    id: "3",
    title: "Traditional Methods",
    description: "We use time-tested traditional methods to create authentic dairy products.",
    icon: "History"
  },
  {
    id: "4",
    title: "No Preservatives",
    description: "All our products are free from artificial preservatives and additives.",
    icon: "Check"
  }
];
