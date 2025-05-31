import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Trophy, Star, Calendar, MapPin, Shield, 
  Gavel, Eye, Heart, MessageCircle, TrendingUp, Award,
  Grid, List, Filter, Search
} from 'lucide-react';
import { getUserProfile, getAuctions } from '../services/api';
import { User, Auction } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AuctionCard from '../components/AuctionCard';
import Breadcrumb from '../components/ui/Breadcrumb';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userAuctions, setUserAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'auctions' | 'bids' | 'reviews'>('auctions');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const breadcrumbItems = [
    { label: 'Browse', href: '/' },
    { label: 'Users', href: '/users' },
    { label: username || 'Profile', isActive: true }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      
      try {
        setLoading(true);
        const [userData, allAuctions] = await Promise.all([
          getUserProfile(username),
          getAuctions()
        ]);
        
        setUser(userData);
        setUserAuctions(allAuctions.filter(auction => auction.seller_username === username));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getReputationBadge = (score: number) => {
    if (score >= 95) return { label: 'Elite Seller', color: 'bg-purple-100 text-purple-800', icon: Trophy };
    if (score >= 90) return { label: 'Top Rated', color: 'bg-yellow-100 text-yellow-800', icon: Star };
    if (score >= 80) return { label: 'Trusted', color: 'bg-blue-100 text-blue-800', icon: Shield };
    if (score >= 70) return { label: 'Verified', color: 'bg-green-100 text-green-800', icon: Award };
    return { label: 'New Seller', color: 'bg-gray-100 text-gray-800', icon: Shield };
  };

  const renderUserStats = () => {
    if (!user) return null;

    const stats = [
      { 
        label: 'Total Auctions', 
        value: user.total_auctions, 
        icon: Gavel, 
        color: 'text-primary-600',
        bgColor: 'bg-primary-100'
      },
      { 
        label: 'Successful Bids', 
        value: user.total_bids, 
        icon: TrendingUp, 
        color: 'text-success-600',
        bgColor: 'bg-success-100'
      },
      { 
        label: 'Reputation Score', 
        value: `${user.reputation_score}%`, 
        icon: Star, 
        color: 'text-warning-600',
        bgColor: 'bg-warning-100'
      },
      { 
        label: 'Profile Views', 
        value: '2.4k', 
        icon: Eye, 
        color: 'text-secondary-600',
        bgColor: 'bg-secondary-100'
      }
    ];

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bgColor} mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-secondary-900 mb-1">{stat.value}</div>
              <div className="text-sm text-secondary-600">{stat.label}</div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'auctions':
        return (
          <div>
            {userAuctions.length === 0 ? (
              <Card className="text-center py-12">
                <Gavel className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">No Active Auctions</h3>
                <p className="text-secondary-600">
                  {user?.username} hasn't listed any auctions yet.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </div>
        );
      
      case 'bids':
        return (
          <Card className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Bidding History</h3>
            <p className="text-secondary-600 mb-4">
              This feature is coming soon. View {user?.username}'s bidding activity and win history.
            </p>
            <Button variant="outline">View All Bids</Button>
          </Card>
        );
      
      case 'reviews':
        return (
          <div className="space-y-4">
            {/* Mock reviews */}
            {[
              {
                id: 1,
                reviewer: 'vintage_hunter',
                rating: 5,
                comment: 'Excellent seller! Item exactly as described and shipped quickly.',
                date: '2024-01-15',
                auction: 'Vintage Rolex Submariner'
              },
              {
                id: 2,
                reviewer: 'art_collector',
                rating: 5,
                comment: 'Amazing experience. Professional packaging and great communication.',
                date: '2024-01-10',
                auction: 'Original Picasso Sketch'
              },
              {
                id: 3,
                reviewer: 'tech_enthusiast',
                rating: 4,
                comment: 'Good seller, item in great condition. Would buy again!',
                date: '2024-01-05',
                auction: 'MacBook Pro M3 Max'
              }
            ].map((review) => (
              <Card key={review.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face`}
                      alt={review.reviewer}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-secondary-900">{review.reviewer}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-warning-500 fill-current' : 'text-secondary-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-secondary-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-secondary-700 mb-3">{review.comment}</p>
                <div className="text-sm text-secondary-600">
                  Auction: <span className="font-medium">{review.auction}</span>
                </div>
              </Card>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">User Not Found</h2>
          <p className="text-secondary-600 mb-6">The user you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const reputationBadge = getReputationBadge(user.reputation_score);
  const BadgeIcon = reputationBadge.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Profile Header */}
        <Card className="p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-secondary-900">{user.username}</h1>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${reputationBadge.color}`}>
                    <BadgeIcon className="w-4 h-4 mr-1" />
                    {reputationBadge.label}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-secondary-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {formatJoinDate(user.joined_date)}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Global
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(user.reputation_score / 20) 
                            ? 'text-warning-500 fill-current' 
                            : 'text-secondary-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-secondary-700">
                    {user.reputation_score}% positive feedback
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </Card>

        {/* User Stats */}
        {renderUserStats()}

        {/* Tabs */}
        <Card className="mb-6">
          <div className="border-b border-secondary-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'auctions', label: 'Auctions', count: userAuctions.length },
                { id: 'bids', label: 'Bids', count: user.total_bids },
                { id: 'reviews', label: 'Reviews', count: 47 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-secondary-100 text-secondary-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage; 