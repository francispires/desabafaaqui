import { create } from 'zustand';
import { Company, Complaint, User } from '../types';
import { supabase } from './supabase';

interface Store {
  companies: Company[];
  complaints: Complaint[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchCompanies: () => Promise<void>;
  fetchComplaints: () => Promise<void>;
  createComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  companies: [],
  complaints: [],
  searchQuery: '',
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  fetchCompanies: async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching companies:', error);
      return;
    }
    
    set({ companies: data });
  },
  
  fetchComplaints: async () => {
    const { data, error } = await supabase
      .from('complaints')
      .select(`
        *,
        companies (
          name,
          logo_url
        ),
        users (
          name,
          avatar_url
        ),
        responses (*)
      `)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching complaints:', error);
      return;
    }
    
    set({ complaints: data });
  },
  
  createComplaint: async (complaint) => {
    const { data, error } = await supabase
      .from('complaints')
      .insert([complaint])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating complaint:', error);
      return;
    }
    
    const complaints = get().complaints;
    set({ complaints: [data, ...complaints] });
  },
}));