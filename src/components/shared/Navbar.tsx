"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  user?: {
    name?: string | null;
    email: string;
    role: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">UndanganDigital</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Template
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Harga
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Fitur
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{user.name || user.email}</span>
                    {user.role === "PREMIUM" && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Premium</span>}
                  </div>
                  <Button variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost">Masuk</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Daftar Gratis</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Template
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Harga
            </Link>
            <Link href="/features" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Fitur
            </Link>

            {user ? (
              <div className="border-t pt-4 mt-4">
                <div className="px-3 py-2">
                  <div className="text-base font-medium text-gray-800">{user.name || user.email}</div>
                  {user.role === "PREMIUM" && <div className="text-sm text-yellow-600">Premium User</div>}
                </div>
                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900">Logout</button>
              </div>
            ) : (
              <div className="border-t pt-4 mt-4 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full">Daftar Gratis</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
