export interface User {
  id: string;
  username: string;
  avatar_url: string;
  reputation_score: number;
  joined_date: string;
  total_auctions: number;
  total_bids: number;
}

export interface Bid {
  id: string;
  auction_id: string;
  bidder_username: string;
  bid_amount: number;
  timestamp: string;
}

export interface Comment {
  id: string;
  auction_id: string;
  commenter_username: string;
  content: string;
  timestamp: string;
}

export type AuctionStatus = 'active' | 'ended' | 'upcoming';

export interface Auction {
  id: string;
  title: string;
  description: string;
  seller_username: string;
  start_price: number;
  current_bid: number;
  end_time: string;
  status: AuctionStatus;
  image_urls: string[];
  category: string;
  created_at: string;
  bid_count: number;
  watchers: number;
}

export interface BidRequest {
  bid_amount: number;
  bidder_username: string;
}

export interface CommentRequest {
  content: string;
  commenter_username: string;
}

export interface PlatformStats {
  total_users: number;
  total_auctions: number;
  active_auctions: number;
  total_bids: number;
  total_auction_value: number;
  average_auction_value: number;
}

export interface CategoriesResponse {
  categories: string[];
} 