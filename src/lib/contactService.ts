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
  orderBy,
} from "./firebase";
import { ContactMessage } from "../types";

// Collection reference
const contactMessagesCollection = collection(db, "contactMessages");

// Get all contact messages
export const getAllContactMessages = async (): Promise<ContactMessage[]> => {
  const q = query(contactMessagesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
      } as ContactMessage)
  );
};

// Get a single message by ID
export const getContactMessageById = async (
  id: string
): Promise<ContactMessage | null> => {
  const docRef = doc(db, "contactMessages", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
    } as ContactMessage;
  } else {
    return null;
  }
};

// Create a new contact message
export const createContactMessage = async (
  messageData: Omit<ContactMessage, "id" | "createdAt" | "status">
): Promise<string> => {
  const newMessage = {
    ...messageData,
    createdAt: Timestamp.now(),
    status: "new" as ContactMessage["status"],
  };

  const docRef = await addDoc(contactMessagesCollection, newMessage);
  return docRef.id;
};

// Update a message's status
export const updateContactMessageStatus = async (
  id: string,
  status: ContactMessage["status"]
): Promise<void> => {
  const docRef = doc(db, "contactMessages", id);
  await updateDoc(docRef, { status });
};

// Initialize contactMessages in Firestore (for testing/demo purposes)
export const initializeContactMessagesInFirestore = async (
  messages: ContactMessage[]
): Promise<void> => {
  for (const message of messages) {
    await addDoc(contactMessagesCollection, {
      ...message,
      createdAt: Timestamp.fromDate(new Date(message.createdAt)),
    });
  }
};
