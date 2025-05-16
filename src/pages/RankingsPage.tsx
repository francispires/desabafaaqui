import React from 'react';
import { Trophy } from 'lucide-react';

export const RankingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900">Company Rankings</h1>
      </div>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Rated Companies</h2>
          <div className="space-y-4">
            {/* Placeholder for rankings content - will be implemented later */}
            <p className="text-gray-600">Rankings will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingsPage;