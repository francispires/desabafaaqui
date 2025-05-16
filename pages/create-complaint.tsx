import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { supabase } from '../src/lib/supabase';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { Input } from '../src/components/ui/Input';
import { Textarea } from '../src/components/ui/Textarea';
import { Select } from '../src/components/ui/Select';
import { Rating } from '../src/components/ui/Rating';
import { Building, ArrowLeft, AlertTriangle } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo_url?: string;
}

export default function CreateComplaint() {
  const router = useRouter();
  const { user } = useUser();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name, logo_url')
        .order('name');

      if (error) throw error;
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Erro ao carregar empresas. Por favor, tente novamente.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert({
          title,
          description,
          rating,
          company_id: selectedCompany,
          user_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      router.push(`/complaints/${data.id}`);
    } catch (error) {
      console.error('Error creating complaint:', error);
      setError('Erro ao criar desabafo. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso restrito</h1>
            <p className="text-gray-600 mb-4">Você precisa estar logado para criar um desabafo.</p>
            <Link href="/sign-in">
              <Button>Fazer login</Button>
            </Link>
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back navigation */}
          <div className="mb-6">
            <Link href="/complaints" className="inline-flex items-center text-sm text-blue-700 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para desabafos
            </Link>
          </div>

          <Card>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar novo desabafo</h1>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Company selection */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <Select
                      id="company"
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      required
                    >
                      <option value="">Selecione uma empresa</option>
                      {companies.map(company => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Digite um título para seu desabafo"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva sua experiência em detalhes..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Avaliação
                    </label>
                    <Rating value={rating} onChange={setRating} />
                  </div>

                  {/* Submit button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Criar desabafo'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 