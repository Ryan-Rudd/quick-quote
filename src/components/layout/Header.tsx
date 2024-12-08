import React from 'react';
import { Link } from 'react-router-dom';
import { Quote, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';

export function Header() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Quote className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">QuickQuote</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link to="/quotes" className="text-gray-700 hover:text-indigo-600">
                  Quotes
                </Link>
                <Link to="/clients" className="text-gray-700 hover:text-indigo-600">
                  Clients
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}