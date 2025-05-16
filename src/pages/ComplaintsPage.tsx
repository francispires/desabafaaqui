import React, { useState } from 'react';
import { Search, Filter, X, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { ComplaintCard } from '../components/complaint/ComplaintCard';
import { mockComplaints } from '../data/mockData';
import { FilterOptions } from '../types';

export const ComplaintsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  // Filter complaints
  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !filters.status || complaint.status === filters.status;
    const matchesRating = !filters.rating || complaint.rating === filters.rating;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const handleStatusFilter = (status: 'pending' | 'in-progress' | 'resolved' | 'ignored' | undefined) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status === status ? undefined : status
    }));
  };

  const handleRatingFilter = (rating: number | undefined) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? undefined : rating
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Desabafos</h1>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Filter className="h-4 w-4" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Esconder filtros' : 'Mostrar filtros'}
              </Button>
              <Link href="/create-complaint">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<PlusCircle className="h-4 w-4" />}
                >
                  Novo Desabafo
                </Button>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar desabafos por título, empresa ou conteúdo..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                {(filters.status || filters.rating) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center"
                  >
                    Limpar filtros <X className="h-3 w-3 ml-1" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Status filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatusFilter('pending')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${filters.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                      Aguardando
                    </button>
                    <button
                      onClick={() => handleStatusFilter('in-progress')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${filters.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                      Em andamento
                    </button>
                    <button
                      onClick={() => handleStatusFilter('resolved')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${filters.status === 'resolved'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                      Resolvido
                    </button>
                    <button
                      onClick={() => handleStatusFilter('ignored')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${filters.status === 'ignored'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                      Ignorado
                    </button>
                  </div>
                </div>

                {/* Rating filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Avaliação</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleRatingFilter(rating)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                          ${filters.rating === rating
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                          }`}
                      >
                        {rating} {rating === 1 ? 'estrela' : 'estrelas'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-medium">{filteredComplaints.length}</span> desabafos
              {filters.status && (
                <span> com status <span className="font-medium">{
                  filters.status === 'pending' ? 'Aguardando' :
                  filters.status === 'in-progress' ? 'Em andamento' :
                  filters.status === 'resolved' ? 'Resolvido' : 
                  'Ignorado'
                }</span></span>
              )}
              {filters.rating && (
                <span> com <span className="font-medium">{filters.rating} {filters.rating === 1 ? 'estrela' : 'estrelas'}</span></span>
              )}
              {searchQuery && (
                <span> para o termo "<span className="font-medium">{searchQuery}</span>"</span>
              )}
            </div>
          </div>

          {/* Complaints grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>

          {filteredComplaints.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhum desabafo encontrado com esses critérios.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={clearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};