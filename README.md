# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3118d267-d272-4c26-834a-f4bdfbc40396

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3118d267-d272-4c26-834a-f4bdfbc40396) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase (Firestore & Authentication)

## Firebase Setup

This project uses Firebase Firestore for data storage (products, orders, cart) but handles authentication using localStorage for simplicity. To set up Firebase for this project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add a web app to your Firebase project
3. Create a Firestore database
4. Update the Firebase configuration in `src/lib/firebase.ts` with your own Firebase project credentials:

```js
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

5. Initialize Firestore with mock data by uncommenting the initialization line in `src/main.tsx`:

```js
// Uncomment this line to populate Firestore with initial data
// initializeFirestore().catch(console.error);
```

Or use the Initialize Firestore button in the admin dashboard.

**Note:** Authentication is handled locally via localStorage for simplicity. User credentials are stored in Firestore but managed manually. This approach is not secure for production and is used for demonstration purposes only.

The admin login is static:

- Email: admin@dairyfarm.com
- Password: admin123

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3118d267-d272-4c26-834a-f4bdfbc40396) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
