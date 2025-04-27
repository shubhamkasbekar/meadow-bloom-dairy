import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ContactMessage } from "../../types";
import {
  getAllContactMessages,
  updateContactMessageStatus,
} from "../../lib/contactService";

export default function ContactMessages() {
  const { user, isAdmin } = useAuth();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (user && isAdmin()) {
        setIsLoading(true);
        try {
          // Fetch contact messages
          const messagesData = await getAllContactMessages();
          setMessages(messagesData);
        } catch (error) {
          console.error("Error fetching messages:", error);
          toast.error("Failed to load messages from Firestore");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user, isAdmin]);

  // Protect admin route
  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle status update
  const handleUpdateStatus = async (
    messageId: string,
    newStatus: ContactMessage["status"]
  ) => {
    try {
      // Update in Firestore
      await updateContactMessageStatus(messageId, newStatus);

      // Update local state
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId ? { ...message, status: newStatus } : message
        )
      );

      toast.success(`Message status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/admin")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Messages</CardTitle>
            <CardDescription>
              Manage and respond to customer inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                No messages found
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(message.createdAt)}
                      </TableCell>
                      <TableCell>{message.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${message.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {message.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            message.feedbackType === "complaint"
                              ? "bg-red-500"
                              : message.feedbackType === "product"
                              ? "bg-blue-500"
                              : message.feedbackType === "suggestion"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }
                        >
                          {message.feedbackType}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {message.message}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={message.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                            >
                              <span>Actions</span>
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(message.id, "read")
                              }
                            >
                              Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStatus(message.id, "replied")
                              }
                            >
                              Mark as Replied
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <a
                                href={`mailto:${message.email}?subject=Re: Your message to Meadow Bloom Dairy`}
                                className="w-full"
                              >
                                Reply via Email
                              </a>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ContactMessage["status"] }) {
  switch (status) {
    case "new":
      return <Badge className="bg-yellow-500">New</Badge>;
    case "read":
      return <Badge className="bg-blue-500">Read</Badge>;
    case "replied":
      return <Badge className="bg-green-500">Replied</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
