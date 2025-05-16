import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Building, MapPin, Globe, Phone, Mail, MessageCircle, TrendingUp, ExternalLink, Clock } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Rating } from '../components/ui/Rating';
import { ComplaintCard } from '../components/complaint/ComplaintCard';
import { mockCompanies, mockComplaints } from '../data/mockData';

export const CompanyDetailPage: React.FC = () => {
  const { id } = useRouter().query;
  const [activeTab, setActiveTab] = useState<'complaints' | 'info'>('complaints');
  
  // Find the company
  const company = mockCompanies.find(company => company.id === id);
  
  // Get complaints for this company
  const companyComplaints = mockComplaints.filter(complaint => complaint.companyId === id);
  
  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Empresa não encontrada</h1>
            <Link href="/companies">
              <Button>Voltar para lista de empresas</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getResponseRateColor = (rate: number) => {
    if (rate >= 75) return 'text-green-600';
    if (rate >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Company header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-md flex-shrink-0">
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold">{company.name}</h1>
                  <Badge variant="primary" className="ml-4">{company.category}</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <Rating value={company.averageRating} />
                  <span className="ml-2 text-lg font-medium">{company.averageRating.toFixed(1)}</span>
                  <span className="mx-3 text-blue-300">•</span>
                  <span className="text-sm">
                    <span className="font-medium">{company.totalComplaints}</span> desabafos
                  </span>
                  <span className="mx-3 text-blue-300">•</span>
                  <span className={`text-sm ${getResponseRateColor(company.responseRate)}`}>
                    <span className="font-medium">{company.responseRate}%</span> de resposta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex -mb-px">
              <button 
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'complaints' 
                    ? 'border-blue-700 text-blue-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('complaints')}
              >
                Desabafos ({companyComplaints.length})
              </button>
              <button 
                className={`ml-8 py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'info' 
                    ? 'border-blue-700 text-blue-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('info')}
              >
                Informações
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'complaints' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Desabafos sobre {company.name}</h2>
                <Link href={`/create-complaint?companyId=${company.id}`}>
                  <Button variant="primary" size="sm">
                    Registrar Desabafo
                  </Button>
                </Link>
              </div>

              {companyComplaints.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {companyComplaints.map(complaint => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum desabafo registrado</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Seja o primeiro a registrar um desabafo sobre esta empresa.
                  </p>
                  <div className="mt-6">
                    <Link href={`/create-complaint?companyId=${company.id}`}>
                      <Button variant="primary">Registrar Desabafo</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações sobre {company.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main info card */}
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="divide-y divide-gray-200">
                      <div className="py-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Sobre a empresa</h3>
                        <p className="text-gray-600">
                          Informações detalhadas sobre {company.name} ainda não foram preenchidas.
                          Se você representa esta empresa, entre em contato para adicionar informações.
                        </p>
                      </div>
                      
                      <div className="py-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Contato</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Globe className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Website não informado</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Telefone não informado</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <span>E-mail não informado</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Endereço não informado</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats card */}
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Estatísticas</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Avaliação média</span>
                            <span className="text-sm font-medium text-gray-900">{company.averageRating.toFixed(1)}/5</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${(company.averageRating / 5) * 100}%`,
                                backgroundColor: 
                                  company.averageRating >= 4 ? '#10B981' : 
                                  company.averageRating >= 3 ? '#F59E0B' : 
                                  '#EF4444'
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Taxa de resposta</span>
                            <span className={`text-sm font-medium ${getResponseRateColor(company.responseRate)}`}>
                              {company.responseRate}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${company.responseRate}%`,
                                backgroundColor: 
                                  company.responseRate >= 75 ? '#10B981' : 
                                  company.responseRate >= 50 ? '#F59E0B' : 
                                  '#EF4444'
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Total de desabafos</span>
                            <span className="text-sm font-medium text-gray-900">{company.totalComplaints}</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Tempo médio de resposta</span>
                            <span className="text-sm font-medium text-gray-900">48h</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};