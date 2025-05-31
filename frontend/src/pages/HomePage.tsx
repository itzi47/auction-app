import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Users, DollarSign, Gavel } from 'lucide-react';
import { getAuctions, getPlatformStats } from '../services/api';
import { Auction, PlatformStats } from '../types';
import AuctionCard from '../components/AuctionCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [auctionsData, statsData] = await Promise.all([
          getAuctions(),
          getPlatformStats()
        ]);
        setAuctions(auctionsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || auction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(auctions.map(auction => auction.category)));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading amazing auctions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Auctions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of collectors and enthusiasts in the most exciting auction platform
            </p>
            
            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stats.total_users}</div>
                  <div className="text-blue-200 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stats.active_auctions}</div>
                  <div className="text-blue-200 text-sm">Live Auctions</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{stats.total_bids}</div>
                  <div className="text-blue-200 text-sm">Total Bids</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mx-auto mb-2">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{formatPrice(stats.total_auction_value)}</div>
                  <div className="text-blue-200 text-sm">Total Value</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <Button variant="primary" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Auctions Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">
              {selectedCategory ? `${selectedCategory} Auctions` : 'All Auctions'}
            </h2>
            <p className="text-secondary-600">
              {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredAuctions.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-secondary-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No auctions found</h3>
              <p className="text-secondary-600">Try adjusting your search or filter criteria</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAuctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 