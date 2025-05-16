console.log('Complaints page file loaded');

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../../src/lib/supabase';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { Avatar } from '../../src/components/ui/Avatar';
import { Search, Filter, X, PlusCircle, Clock, Building } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'ignored';
  rating: number;
  company_id: string;
  company: {
    name: string;
    logo_url: string;
  };
  user_id: string;
  created_at: string;
}

export default function Complaints() {
  const router = useRouter();
  const { user } = useUser();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '' as 'pending' | 'in-progress' | 'resolved' | 'ignored' | '',
    rating: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('Complaints component mounted');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        console.log('Starting to fetch complaints...');
        
        // First, let's try a simple query without joins
        const { data: simpleData, error: simpleError } = await supabase
          .from('complaints')
          .select('*');

        const test = await supabase.from('complaints').select('*');
        console.log('Test query result:', { test });

        console.log('Simple query result:', { simpleData, simpleError });

        // Now try the full query
        let query = supabase
          .from('complaints')
          .select(`
            *,
            company:companies (
              name,
              logo_url
            )
          `)
          .order('created_at', { ascending: false });

        // Apply status filter
        if (filters.status) {
          query = query.eq('status', filters.status);
        }

        // Apply rating filter
        if (filters.rating > 0) {
          query = query.eq('rating', filters.rating);
        }

        console.log('Executing full Supabase query...');
        const { data, error } = await query;
        console.log('Full query response:', { data, error });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (isMounted) {
          console.log('Setting complaints data:', data);
          setComplaints(data || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        if (isMounted) {
          setError('Erro ao carregar desabafos. Por favor, tente novamente.');
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleStatusFilter = (status: 'pending' | 'in-progress' | 'resolved' | 'ignored' | '') => {
    setFilters(prev => ({
      ...prev,
      status: prev.status === status ? '' : status
    }));
  };

  const handleRatingFilter = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      rating: 0
    });
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            <p className="mt-4 text-gray-600">Carregando desabafos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start">
                      <Avatar
                        src={complaint.company.logo_url}
                        alt={complaint.company.name}
                        fallback={complaint.company.name}
                        size="sm"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{complaint.company.name}</div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant={complaint.status === 'resolved' ? 'success' : 'warning'}>
                      {complaint.status === 'resolved' ? 'Resolvido' : 'Em andamento'}
                    </Badge>
                  </div>

                  <Link href={`/complaints/${complaint.id}`}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-700">
                      {complaint.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {complaint.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Building className="h-4 w-4 mr-1" />
                      {complaint.company.name}
                    </div>
                    <Link href={`/complaints/${complaint.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
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
} 