import {
  db,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  query,
  where,
  orderBy,
} from "./firebase";
import { Order, OrderStatus } from "../types";

// Collection reference
const ordersCollection = collection(db, "orders");

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(ordersCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
      } as Order)
  );
};

// Get orders for a specific user
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
      } as Order)
  );
};

// Get a single order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  const docRef = doc(db, "orders", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
    } as Order;
  } else {
    return null;
  }
};

// Create a new order
export const createOrder = async (
  orderData: Omit<Order, "id" | "createdAt">
): Promise<string> => {
  const newOrder = {
    ...orderData,
    createdAt: Timestamp.now(),
    status: orderData.status || ("placed" as OrderStatus),
  };

  const docRef = await addDoc(ordersCollection, newOrder);
  return docRef.id;
};

// Update an order's status
export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<void> => {
  const docRef = doc(db, "orders", id);
  await updateDoc(docRef, { status });
};

// Initialize orders in Firestore from mock data (one-time operation)
export const initializeOrdersInFirestore = async (
  orders: Order[]
): Promise<void> => {
  for (const order of orders) {
    await addDoc(ordersCollection, {
      ...order,
      createdAt: Timestamp.fromDate(new Date(order.createdAt)),
    });
  }
};
