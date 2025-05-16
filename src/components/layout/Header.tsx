import React, { useState } from 'react';
import { Menu, X, Search, Bell, MessageSquare } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Avatar } from '../ui/Avatar';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submit
    console.log('Search query:', searchQuery);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const isActive = (path: string) => {
    return pathname != null && pathname !== undefined && pathname === path;
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
                  placeholder="Buscar empresas ou desabafos..."
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
                  <div className="relative">
                    <button 
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleSignOut}
                    >
                      <Avatar 
                        src={user.imageUrl} 
                        alt={user.fullName || 'User'} 
                        fallback={user.fullName}
                        size="sm"
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleSignIn}>
                  Entrar
                </Button>
                <Button variant="primary" size="sm" onClick={handleSignUp}>
                  Cadastrar
                </Button>
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
                  placeholder="Buscar empresas ou desabafos..."
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

          {/* Mobile profile section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isSignedIn ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar 
                    src={user.imageUrl} 
                    alt={user.fullName || 'User'} 
                    fallback={user.fullName}
                    size="md"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                  <button 
                    onClick={handleSignOut}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Sair
                  </button>
                </div>
                <button className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="px-4 flex flex-col space-y-2">
                <Button fullWidth onClick={handleSignIn}>Entrar</Button>
                <Button variant="outline" fullWidth onClick={handleSignUp}>Cadastrar</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};