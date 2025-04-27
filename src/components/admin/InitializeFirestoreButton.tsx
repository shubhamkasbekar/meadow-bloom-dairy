import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { initializeFirestore } from "../../lib/initFirestore";

export default function InitializeFirestoreButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = async () => {
    const confirmed = window.confirm(
      "This will initialize Firestore with mock data. Any existing data with the same IDs will be overwritten. Proceed?"
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);
    try {
      await initializeFirestore();
      toast.success("Firestore initialized successfully with mock data!");
    } catch (error) {
      console.error("Error initializing Firestore:", error);
      toast.error("Failed to initialize Firestore");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleInitialize}
      disabled={isLoading}
      variant="destructive"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Initializing...
        </>
      ) : (
        "Initialize Firestore with Mock Data"
      )}
    </Button>
  );
}
