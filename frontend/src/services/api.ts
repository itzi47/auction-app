import axios from 'axios';
import {
  User,
  Auction,
  Bid,
  Comment,
  BidRequest,
  CommentRequest,
  PlatformStats,
  CategoriesResponse,
  AuctionStatus
} from '../types';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// User API functions
export const getUserProfile = async (username: string): Promise<User> => {
  const response = await api.get<User>(`/api/users/${username}`);
  return response.data;
};

export const getUserAuctions = async (username: string): Promise<Auction[]> => {
  const response = await api.get<Auction[]>(`/api/users/${username}/auctions`);
  return response.data;
};

export const getUserBids = async (username: string): Promise<Bid[]> => {
  const response = await api.get<Bid[]>(`/api/users/${username}/bids`);
  return response.data;
};

// Auction API functions
export const getAuctions = async (
  category?: string,
  status?: AuctionStatus,
  limit?: number
): Promise<Auction[]> => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);
  if (limit) params.append('limit', limit.toString());
  
  const response = await api.get<Auction[]>(`/api/auctions?${params.toString()}`);
  return response.data;
};

export const getAuctionById = async (auctionId: string): Promise<Auction> => {
  const response = await api.get<Auction>(`/api/auctions/${auctionId}`);
  return response.data;
};

export const placeBid = async (auctionId: string, bidRequest: BidRequest): Promise<Auction> => {
  const response = await api.post<Auction>(`/api/auctions/${auctionId}/bids`, bidRequest);
  return response.data;
};

export const getAuctionBids = async (auctionId: string): Promise<Bid[]> => {
  const response = await api.get<Bid[]>(`/api/auctions/${auctionId}/bids`);
  return response.data;
};

// Comment API functions
export const getComments = async (auctionId: string): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/api/auctions/${auctionId}/comments`);
  return response.data;
};

export const postComment = async (auctionId: string, commentRequest: CommentRequest): Promise<Comment[]> => {
  const response = await api.post<Comment[]>(`/api/auctions/${auctionId}/comments`, commentRequest);
  return response.data;
};

// Platform API functions
export const getPlatformStats = async (): Promise<PlatformStats> => {
  const response = await api.get<PlatformStats>('/api/stats');
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<CategoriesResponse>('/api/categories');
  return response.data.categories;
};

export default api; 