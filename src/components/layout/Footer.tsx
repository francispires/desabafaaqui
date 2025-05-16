import React from 'react';
import { MessageSquare, Instagram, Twitter, Facebook, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">DesabafeAqui</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              A plataforma onde você pode compartilhar suas experiências com empresas
              e buscar soluções para problemas de consumo.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Navegação</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-400 hover:text-white text-sm">
                  Empresas
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-gray-400 hover:text-white text-sm">
                  Desabafos
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="text-gray-400 hover:text-white text-sm">
                  Rankings
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Recursos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white text-sm">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/consumer-rights" className="text-gray-400 hover:text-white text-sm">
                  Direitos do Consumidor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contato</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                contato@desabafeaqui.com.br
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/for-companies" className="text-gray-400 hover:text-white text-sm">
                  Para Empresas
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white text-sm">
                  Trabalhe Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} DesabafeAqui. Todos os direitos reservados.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-white">
              Termos de Uso
            </Link>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="text-xs text-gray-400 hover:text-white">
              Política de Cookies
            </Link>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
            Feito com <Heart className="h-3 w-3 mx-1 text-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};