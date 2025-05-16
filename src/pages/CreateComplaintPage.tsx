import React from 'react';
import { Button } from '../components/ui/Button';
import { MessageSquarePlus } from 'lucide-react';

export const CreateComplaintPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquarePlus className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Create a Complaint</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Complaint Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Brief description of your complaint"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Provide details about your complaint..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="product">Product Issue</option>
                <option value="service">Customer Service</option>
                <option value="billing">Billing Problem</option>
                <option value="delivery">Delivery Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">
                Submit Complaint
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateComplaintPage;