import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Search, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { getAuctions } from '../services/api';
import { Auction } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import AuctionCard from '../components/AuctionCard';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';

const WatchlistPage: React.FC = () => {
  const [watchedAuctions, setWatchedAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('ending_soon');

  // Mock watched auction IDs - in a real app this would come from user preferences
  const watchedIds = ['1', '3', '5', '7', '9'];

  const breadcrumbItems = [
    { label: 'Browse', href: '/' },
    { label: 'My Watchlist', isActive: true }
  ];

  useEffect(() => {
    const fetchWatchedAuctions = async () => {
      try {
        setLoading(true);
        const allAuctions = await getAuctions();
        const watched = allAuctions.filter(auction => watchedIds.includes(auction.id));
        setWatchedAuctions(watched);
      } catch (error) {
        console.error('Error fetching watched auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchedAuctions();
  }, []);

  const categories = Array.from(new Set(watchedAuctions.map(auction => auction.category)));

  const filteredAuctions = watchedAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || auction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'ending_soon':
        return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
      case 'price_low':
        return a.current_bid - b.current_bid;
      case 'price_high':
        return b.current_bid - a.current_bid;
      case 'most_bids':
        return b.bid_count - a.bid_count;
      default:
        return 0;
    }
  });

  const handleRemoveFromWatchlist = (auctionId: string) => {
    setWatchedAuctions(prev => prev.filter(auction => auction.id !== auctionId));
  };

  const handleClearWatchlist = () => {
    if (window.confirm('Are you sure you want to remove all items from your watchlist?')) {
      setWatchedAuctions([]);
    }
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

  const renderListView = () => (
    <div className="space-y-4">
      {sortedAuctions.map((auction) => (
        <Card key={auction.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-6">
            <Link to={`/auctions/${auction.id}`} className="flex-shrink-0">
              <img
                src={auction.image_urls[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                alt={auction.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </Link>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link to={`/auctions/${auction.id}`}>
                    <h3 className="text-lg font-semibold text-secondary-900 hover:text-primary-600 transition-colors mb-1">
                      {auction.title}
                    </h3>
                  </Link>
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded mb-2">
                    {auction.category}
                  </span>
                  <p className="text-secondary-600 text-sm line-clamp-2">{auction.description}</p>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWatchlist(auction.id)}
                    className="text-accent-600 hover:text-accent-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-sm text-secondary-500">Current Bid</span>
                    <div className="text-lg font-bold text-secondary-900">
                      ${auction.current_bid.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-secondary-500">Bids</span>
                    <div className="text-sm font-medium text-secondary-700">{auction.bid_count}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-secondary-500">Time Left</span>
                  <div className="text-sm font-medium text-secondary-700">
                    {formatTimeRemaining(auction.end_time)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <Card className="text-center py-16">
      <div className="max-w-md mx-auto">
        <Heart className="w-16 h-16 text-secondary-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Your Watchlist is Empty</h2>
        <p className="text-secondary-600 mb-8">
          Start watching auctions to keep track of items you're interested in. 
          You'll get notifications when they're ending soon!
        </p>
        <Link to="/">
          <Button variant="primary" className="flex items-center mx-auto">
            <Search className="w-4 h-4 mr-2" />
            Browse Auctions
          </Button>
        </Link>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">My Watchlist</h1>
            <p className="text-lg text-secondary-600">
              {watchedAuctions.length} item{watchedAuctions.length !== 1 ? 's' : ''} you're watching
            </p>
          </div>
          
          {watchedAuctions.length > 0 && (
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleClearWatchlist}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {watchedAuctions.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {/* Filters and Controls */}
            <Card className="p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                  <div className="flex-1 max-w-md">
                    <Input
                      placeholder="Search your watchlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="ending_soon">Ending Soon</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="most_bids">Most Bids</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Results */}
            {sortedAuctions.length === 0 ? (
              <Card className="text-center py-12">
                <Filter className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">No matches found</h3>
                <p className="text-secondary-600">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </Card>
            ) : (
              <div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedAuctions.map((auction) => (
                      <div key={auction.id} className="relative group">
                        <AuctionCard auction={auction} />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromWatchlist(auction.id)}
                          className="absolute top-2 right-2 bg-white bg-opacity-90 text-accent-600 hover:text-accent-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderListView()
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage; 