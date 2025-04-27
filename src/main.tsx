import React from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { initializeFirestore } from "./lib/initFirestore";

// Optional: Initialize Firestore with mock data
// This should be run only once when setting up the app
// Uncomment this line to populate Firestore with initial data
// initializeFirestore().catch(console.error);

// Log a message about the auth setup for developers
console.log(
  "Note: This app uses Firestore for data storage but handles authentication via localStorage for simplicity. In a production environment, use a proper authentication system."
);

const root = document.getElementById("root");
if (root) {
  React.createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
