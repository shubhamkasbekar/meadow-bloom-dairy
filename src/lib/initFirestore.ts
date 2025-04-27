import { products, orders, contactMessages } from "../data/mockData";
import { initializeProductsInFirestore } from "./productService";
import { initializeOrdersInFirestore } from "./orderService";
import { initializeContactMessagesInFirestore } from "./contactService";
import { db, doc, setDoc, Timestamp } from "./firebase";

// Mock users data
const mockUsers = [
  {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    id: "user2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    role: "user",
  },
];

// Mock user auth data (this would be hashed passwords in a real application)
const mockUserAuth = [
  {
    email: "john@example.com",
    password: "password123",
    lastLogin: Timestamp.now(),
  },
  {
    email: "jane@example.com",
    password: "password123",
    lastLogin: Timestamp.now(),
  },
];

// Initialize users in Firestore
const initializeUsersInFirestore = async () => {
  try {
    console.log("Initializing users...");
    // Add users
    for (let i = 0; i < mockUsers.length; i++) {
      const user = mockUsers[i];
      const authData = mockUserAuth[i];

      // Add user profile
      await setDoc(doc(db, "users", user.id), user);
      // Add user auth data
      await setDoc(doc(db, "userAuth", user.id), authData);
    }
    console.log("Users initialized successfully");
  } catch (error) {
    console.error("Error initializing users:", error);
    throw error;
  }
};

// Function to initialize Firestore with mock data
export const initializeFirestore = async (): Promise<void> => {
  try {
    console.log("Starting to populate Firestore with initial data...");

    // Initialize products collection
    await initializeProductsInFirestore(products);
    console.log("Products initialized successfully");

    // Initialize orders collection
    await initializeOrdersInFirestore(orders);
    console.log("Orders initialized successfully");

    // Initialize contact messages collection
    await initializeContactMessagesInFirestore(contactMessages);
    console.log("Contact messages initialized successfully");

    // Initialize users collection
    await initializeUsersInFirestore();

    console.log("Firestore initialization complete");
  } catch (error) {
    console.error("Error initializing Firestore:", error);
    throw error;
  }
};
