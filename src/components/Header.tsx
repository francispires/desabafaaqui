"use client";

import { useState } from 'react';
import { Menu, X, Search, Bell, MessageSquare } from 'lucide-react';
import { UserButton, useUser, useClerk, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-700" />
              <span className="ml-2 text-xl font-bold text-blue-700">DesabafeAqui</span>
            </Link>
          </div>

          {/* Search input - hidden on mobile */}
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center sm:mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Busque por empresa, marca ou serviço..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Navigation - hidden on mobile */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link 
              href="/companies" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/companies')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Empresas
            </Link>
            <Link 
              href="/complaints" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/complaints')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Desabafos
            </Link>
            <Link 
              href="/rankings" 
              className={`px-3 py-2 text-sm font-medium ${
                isActive('/rankings')
                  ? 'text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Rankings
            </Link>
            
            {isSignedIn ? (
              <>
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700">
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-3 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md">
                    Cadastrar
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          {/* Mobile search input */}
          <div className="px-4 py-2">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Busque por empresa, marca ou serviço..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Mobile menu links */}
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/companies"
              className={`block px-4 py-2 text-base font-medium ${
                isActive('/companies')
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              Empresas
            </Link>
            <Link
              href="/complaints"
              className={`block px-4 py-2 text-base font-medium ${
                isActive('/complaints')
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              Desabafos
            </Link>
            <Link
              href="/rankings"
              className={`block px-4 py-2 text-base font-medium ${
                isActive('/rankings')
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
              }`}
            >
              Rankings
            </Link>
          </div>

          {/* Mobile auth buttons */}
          {!isSignedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Visitante</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <SignInButton mode="modal">
                  <button className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">
                    Entrar
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50">
                    Cadastrar
                  </button>
                </SignUpButton>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
} 