import React from 'react';
import Link from 'next/link';
import { MessageCircle, Building } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Rating } from '../ui/Rating';
import { Company } from '../../types';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const { id, name, category, logo, averageRating, totalComplaints, responseRate } = company;

  return (
    <Link href={`/companies/${id}`} className="block">
      <Card 
        hoverable 
        className="transition-all duration-200 transform hover:translate-y-[-2px]"
      >
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
              {logo ? (
                <img 
                  src={logo} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Building className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
              <span className="text-xs text-gray-500">{category}</span>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <Rating value={averageRating} />
            <span className="ml-2 text-sm font-medium text-gray-700">{averageRating.toFixed(1)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">Desabafos</span>
              <span className="font-medium text-gray-900 flex items-center">
                <MessageCircle className="w-3.5 h-3.5 mr-1 text-gray-400" />
                {totalComplaints}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Taxa de Resposta</span>
              <span className={`font-medium flex items-center ${
                responseRate >= 75 
                  ? 'text-green-600' 
                  : responseRate >= 50 
                    ? 'text-orange-600' 
                    : 'text-red-600'
              }`}>
                {responseRate}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};