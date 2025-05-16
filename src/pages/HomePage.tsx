import React from 'react';
import Link from 'next/link';
import { SearchIcon, TrendingUp, AlertTriangle, CheckCircle, Building, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/Card';
import { ComplaintCard } from '../components/complaint/ComplaintCard';
import { CompanyCard } from '../components/company/CompanyCard';
import { mockCompanies, mockComplaints } from '../data/mockData';

export const HomePage: React.FC = () => {
  // Get the featured complaints and companies
  const featuredComplaints = mockComplaints.slice(0, 3);
  const featuredCompanies = mockCompanies.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Sua voz merece ser ouvida
                </h1>
                <p className="mt-4 text-lg text-blue-100 max-w-xl">
                  Compartilhe suas experiências com empresas e ajude outros consumidores. 
                  Resolva seus problemas e contribua para um mercado melhor.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="font-semibold shadow-lg hover:shadow-orange-500/20"
                  >
                    Fazer um desabafo
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Procurar empresa
                  </Button>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2">
                <div className="relative ml-10 mt-10">
                  <div className="absolute inset-0 bg-orange-500 rounded-lg transform rotate-3"></div>
                  <div className="relative bg-white text-gray-800 p-6 rounded-lg shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Problema resolvido!</h3>
                        <p className="text-sm text-gray-500">há 2 horas</p>
                      </div>
                    </div>
                    <p className="text-sm">"Após meu desabafo aqui, a empresa entrou em contato em menos de 24h e resolveu meu problema com o produto defeituoso."</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                        <span className="ml-2 text-sm font-medium">Amanda S.</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Resolvido ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Busque por empresa, marca ou serviço..."
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Button>Buscar</Button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  Telecomunicações
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  Bancos
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  E-commerce
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  Companhias Aéreas
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                  Streaming
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-700">24.5K</div>
                <p className="text-gray-500 text-sm mt-1">Desabafos</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-700">72%</div>
                <p className="text-gray-500 text-sm mt-1">Taxa de Resolução</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-700">3.6K</div>
                <p className="text-gray-500 text-sm mt-1">Empresas</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-700">48h</div>
                <p className="text-gray-500 text-sm mt-1">Tempo Médio Resposta</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Complaints Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900 ml-2">Desabafos em Destaque</h2>
              </div>
              <Link href="/complaints" className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium">
                Ver todos <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Building className="h-6 w-6 text-blue-700" />
                <h2 className="text-2xl font-bold text-gray-900 ml-2">Empresas em Destaque</h2>
              </div>
              <Link href="/companies" className="text-blue-700 hover:text-blue-800 flex items-center text-sm font-medium">
                Ver todas <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCompanies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Resolver seu problema com uma empresa nunca foi tão fácil. 
                Siga estas etapas simples e comece a ser ouvido.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Registre seu desabafo</h3>
                <p className="text-gray-600">
                  Relate em detalhes sua experiência com a empresa, anexe provas e classifique o atendimento.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. A empresa responde</h3>
                <p className="text-gray-600">
                  A empresa é notificada e tem a oportunidade de responder e oferecer uma solução para o seu problema.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Avalie a solução</h3>
                <p className="text-gray-600">
                  Quando seu problema for resolvido, você pode avaliar a solução e ajudar outros consumidores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-orange-500 text-white py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Pronto para compartilhar sua experiência?</h2>
            <p className="mt-4 text-orange-100 max-w-2xl mx-auto">
              Junte-se a milhares de consumidores que já encontraram soluções para seus problemas. 
              Sua voz pode fazer a diferença.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-8 bg-white text-orange-600 hover:bg-gray-100 font-semibold"
            >
              Registre seu desabafo agora
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};