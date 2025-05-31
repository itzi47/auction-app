import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Gavel, User } from 'lucide-react';
import { Auction } from '../types';
import Card from './ui/Card';

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'ended':
        return 'bg-secondary-100 text-secondary-800';
      case 'upcoming':
        return 'bg-warning-100 text-warning-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  return (
    <Link to={`/auctions/${auction.id}`} className="block group">
      <Card variant="default" padding="none" className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={auction.image_urls[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
            alt={auction.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
              {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
            <div className="flex items-center text-white text-xs">
              <Eye className="w-3 h-3 mr-1" />
              {auction.watchers}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="text-xs text-primary-600 font-medium mb-1">
            {auction.category}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-secondary-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {auction.title}
          </h3>

          {/* Seller */}
          <div className="flex items-center text-sm text-secondary-600 mb-3">
            <User className="w-4 h-4 mr-1" />
            {auction.seller_username}
          </div>

          {/* Price Info */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary-600">Current Bid</span>
              <span className="font-bold text-lg text-secondary-900">
                {formatPrice(auction.current_bid)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-secondary-500">Starting at {formatPrice(auction.start_price)}</span>
              <span className="text-secondary-600 flex items-center">
                <Gavel className="w-3 h-3 mr-1" />
                {auction.bid_count} bids
              </span>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
            <div className="flex items-center text-sm text-secondary-600">
              <Clock className="w-4 h-4 mr-1" />
              {formatTimeRemaining(auction.end_time)}
            </div>
            <div className="text-xs text-secondary-500">
              {auction.status === 'active' ? 'remaining' : ''}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AuctionCard; 