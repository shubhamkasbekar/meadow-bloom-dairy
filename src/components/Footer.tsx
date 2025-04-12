
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dairy-brown text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Meadow Bloom Dairy</h3>
            <p className="mb-4 text-gray-200">
              From our farm to your table - bringing you the freshest dairy products since 2013.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-dairy-accent text-gray-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-dairy-accent text-gray-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-dairy-accent text-gray-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li>
                <Link to="/" className="hover:text-dairy-accent">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-dairy-accent">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-dairy-accent">Contact Us</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-dairy-accent">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-dairy-accent">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-gray-200">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Dairy Lane, Farm County
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                (123) 456-7890
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                info@meadowbloomdairy.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} Meadow Bloom Dairy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
