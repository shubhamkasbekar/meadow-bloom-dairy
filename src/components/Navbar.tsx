
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Package,
  Home,
  Phone,
  Settings
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-dairy-accent">Meadow Bloom</span>
            <span className="text-xl font-light ml-1">Dairy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-dairy-accent transition-colors">
              Contact
            </Link>
            {isAdmin() && (
              <Link to="/admin" className="text-gray-700 hover:text-dairy-accent transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Auth & Cart Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hello, {user.firstName}</span>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-dairy-accent hover:bg-dairy-brown text-white flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dairy-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-dairy-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <h2 className="text-xl font-bold mb-4">Meadow Bloom Dairy</h2>
                    
                    {user ? (
                      <div className="mb-6 p-4 bg-dairy-green rounded-md">
                        <p className="text-sm text-gray-600">Logged in as</p>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                      </div>
                    ) : (
                      <div className="mb-6 space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate("/login")}
                          asChild
                        >
                          <SheetClose asChild>
                            <Link to="/login" className="flex items-center">
                              <LogIn className="mr-2 h-4 w-4" />
                              Login
                            </Link>
                          </SheetClose>
                        </Button>
                        
                        <Button 
                          className="w-full justify-start bg-dairy-accent hover:bg-dairy-brown"
                          onClick={() => navigate("/signup")}
                          asChild
                        >
                          <SheetClose asChild>
                            <Link to="/signup" className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              Sign Up
                            </Link>
                          </SheetClose>
                        </Button>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <SheetClose asChild>
                        <Link
                          to="/"
                          className="flex items-center px-2 py-2 rounded-md hover:bg-dairy-peach"
                        >
                          <Home className="mr-2 h-4 w-4" />
                          Home
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link
                          to="/products"
                          className="flex items-center px-2 py-2 rounded-md hover:bg-dairy-peach"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Products
                        </Link>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link
                          to="/contact"
                          className="flex items-center px-2 py-2 rounded-md hover:bg-dairy-peach"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Link>
                      </SheetClose>
                      
                      {isAdmin() && (
                        <SheetClose asChild>
                          <Link
                            to="/admin"
                            className="flex items-center px-2 py-2 rounded-md hover:bg-dairy-peach"
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            Admin
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  </div>
                  
                  {user && (
                    <div className="mt-auto border-t pt-4">
                      <SheetClose asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
