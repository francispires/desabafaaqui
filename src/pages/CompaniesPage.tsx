import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { CompanyCard } from '../components/company/CompanyCard';
import { mockCompanies } from '../data/mockData';

export const CompaniesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(mockCompanies.map(company => company.category)));

  // Filter companies
  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? company.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Esconder filtros' : 'Mostrar filtros'}
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar empresas..."
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
                {selectedCategory && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center"
                  >
                    Limpar filtros <X className="h-3 w-3 ml-1" />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categorias</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                        ${selectedCategory === category
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-4">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-medium">{filteredCompanies.length}</span> empresas
              {selectedCategory && (
                <span> na categoria <span className="font-medium">{selectedCategory}</span></span>
              )}
              {searchQuery && (
                <span> com o termo "<span className="font-medium">{searchQuery}</span>"</span>
              )}
            </div>
          </div>

          {/* Company grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Nenhuma empresa encontrada com esses critérios.</p>
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