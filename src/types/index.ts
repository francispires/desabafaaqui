// Core type definitions for the application

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
};

export type Company = {
  id: string;
  name: string;
  category: string;
  logo?: string;
  averageRating: number;
  totalComplaints: number;
  responseRate: number;
};

export type Complaint = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  rating: number;
  status: 'pending' | 'in-progress' | 'resolved' | 'ignored';
  weight: number;
  agrees: number;
  disagrees: number;
  userReaction?: 'agree' | 'disagree' | null;
  comments?: Comment[];
  responses?: Response[];
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  parentId?: string;
  replies?: Comment[];
  createdAt: Date;
};

export type Reaction = {
  id: string;
  complaintId: string;
  userId: string;
  type: 'agree' | 'disagree';
  createdAt: Date;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type FilterOptions = {
  status?: 'pending' | 'in-progress' | 'resolved' | 'ignored';
  rating?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
  category?: string;
};

export type Response = {
  id: string;
  complaintId: string;
  authorType: 'company' | 'user';
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
};