import {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "./firebase";
import { Product } from "../types";

// Collection reference
const productsCollection = collection(db, "products");

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Product;
  } else {
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const q = query(productsCollection, where("category", "==", category));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );
};

// Add a new product
export const addProduct = async (
  product: Omit<Product, "id">
): Promise<string> => {
  // Create a doc reference with auto-generated ID
  const newDocRef = doc(productsCollection);

  // Add ID to the product object using the generated ID
  await setDoc(newDocRef, {
    ...product,
  });

  return newDocRef.id;
};

// Update a product
export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<void> => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, data);
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};

// Initialize products in Firestore from mock data (one-time operation)
export const initializeProductsInFirestore = async (
  products: Product[]
): Promise<void> => {
  for (const product of products) {
    const docRef = doc(db, "products", product.id);
    await setDoc(docRef, product);
  }
};
