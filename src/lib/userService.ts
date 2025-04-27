import {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "./firebase";
import { User } from "../types";

// Collection reference
const usersCollection = collection(db, "users");

// Register a new user
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> => {
  try {
    // Check if email already exists
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      throw new Error("Email already in use");
    }

    // Create user ID
    const userId = `user-${Date.now()}`;

    // Create user document
    const userData: User = {
      id: userId,
      firstName,
      lastName,
      email,
      role: "user",
    };

    // Store password (In a real app, this should be hashed)
    const userAuth = {
      email,
      password,
      lastLogin: Timestamp.now(),
    };

    // Add user to Firestore - create two documents:
    // 1. Public user profile without password
    await setDoc(doc(db, "users", userId), userData);
    // 2. User auth info with password (in real app, use a proper auth system)
    await setDoc(doc(db, "userAuth", userId), userAuth);

    // Save user data to localStorage for session management
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    // Find user by email
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error("User not found");
    }

    const userId = snapshot.docs[0].id;
    const userData = snapshot.docs[0].data() as User;

    // Get auth data to verify password
    const authDoc = await getDoc(doc(db, "userAuth", userId));

    if (!authDoc.exists()) {
      throw new Error("Auth data not found");
    }

    const authData = authDoc.data();

    // Verify password (In a real app, compare hashed passwords)
    if (authData.password !== password) {
      throw new Error("Invalid password");
    }

    // Update last login
    await setDoc(
      doc(db, "userAuth", userId),
      { lastLogin: Timestamp.now() },
      { merge: true }
    );

    // Save user data to localStorage for session management
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Get user data by ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data(),
      } as User;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  id: string,
  data: Partial<Omit<User, "id" | "role">>
): Promise<void> => {
  const userRef = doc(db, "users", id);
  await setDoc(userRef, data, { merge: true });

  // Update localStorage if the current user is being updated
  const currentUser = localStorage.getItem("user");
  if (currentUser) {
    const user = JSON.parse(currentUser);
    if (user.id === id) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...data,
        })
      );
    }
  }
};

// Log out user (just clear localStorage)
export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem("user");
};

// Check if user is authenticated by checking localStorage
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("user") !== null;
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
