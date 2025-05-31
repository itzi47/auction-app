import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Bell, BellRing, Trash2, Check, CheckCheck, 
  Gavel, Heart, MessageCircle, Trophy, Clock, Filter,
  Eye, EyeOff, Settings
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';

interface Notification {
  id: string;
  type: 'bid' | 'auction_ending' | 'auction_won' | 'auction_lost' | 'follow' | 'message' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
  metadata?: {
    auctionTitle?: string;
    bidAmount?: number;
    username?: string;
  };
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const breadcrumbItems = [
    { label: 'Browse', href: '/' },
    { label: 'Notifications', isActive: true }
  ];

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'bid',
      title: 'New Bid on Your Auction',
      message: 'Someone placed a $2,500 bid on your Vintage Rolex Submariner',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      actionUrl: '/auctions/1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      metadata: {
        auctionTitle: 'Vintage Rolex Submariner',
        bidAmount: 2500,
        username: 'vintage_hunter'
      }
    },
    {
      id: '2',
      type: 'auction_ending',
      title: 'Auction Ending Soon',
      message: 'Original Picasso Sketch ends in 2 hours - You\'re currently the highest bidder!',
      timestamp: '2024-01-15T08:15:00Z',
      isRead: false,
      actionUrl: '/auctions/3',
      metadata: {
        auctionTitle: 'Original Picasso Sketch'
      }
    },
    {
      id: '3',
      type: 'auction_won',
      title: 'Congratulations! You Won',
      message: 'You won the MacBook Pro M3 Max auction for $3,200',
      timestamp: '2024-01-14T16:45:00Z',
      isRead: true,
      actionUrl: '/auctions/5',
      metadata: {
        auctionTitle: 'MacBook Pro M3 Max',
        bidAmount: 3200
      }
    },
    {
      id: '4',
      type: 'follow',
      title: 'New Follower',
      message: 'art_collector started following you',
      timestamp: '2024-01-14T14:20:00Z',
      isRead: true,
      actionUrl: '/profile/art_collector',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
      metadata: {
        username: 'art_collector'
      }
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You\'ve become a "Trusted Seller" with 95% positive feedback',
      timestamp: '2024-01-14T12:00:00Z',
      isRead: true
    },
    {
      id: '6',
      type: 'message',
      title: 'New Message',
      message: 'tech_enthusiast sent you a message about Gibson Les Paul',
      timestamp: '2024-01-14T10:30:00Z',
      isRead: false,
      actionUrl: '/messages/tech_enthusiast',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      metadata: {
        username: 'tech_enthusiast',
        auctionTitle: 'Gibson Les Paul'
      }
    },
    {
      id: '7',
      type: 'auction_lost',
      title: 'Auction Ended',
      message: 'Someone outbid you on Pokemon Card Collection. Final price: $1,850',
      timestamp: '2024-01-13T20:15:00Z',
      isRead: true,
      actionUrl: '/auctions/9',
      metadata: {
        auctionTitle: 'Pokemon Card Collection',
        bidAmount: 1850
      }
    }
  ];

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setNotifications(mockNotifications);
      setLoading(false);
    };

    loadNotifications();
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'bid': return Gavel;
      case 'auction_ending': return Clock;
      case 'auction_won': return Trophy;
      case 'auction_lost': return Clock;
      case 'follow': return Heart;
      case 'message': return MessageCircle;
      case 'achievement': return Trophy;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'bid': return 'text-primary-600 bg-primary-100';
      case 'auction_ending': return 'text-warning-600 bg-warning-100';
      case 'auction_won': return 'text-success-600 bg-success-100';
      case 'auction_lost': return 'text-secondary-600 bg-secondary-100';
      case 'follow': return 'text-pink-600 bg-pink-100';
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'achievement': return 'text-purple-600 bg-purple-100';
      default: return 'text-secondary-600 bg-secondary-100';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return time.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'important': return ['auction_won', 'auction_ending', 'bid'].includes(notification.type);
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderNotification = (notification: Notification) => {
    const Icon = getNotificationIcon(notification.type);
    const colorClasses = getNotificationColor(notification.type);

    return (
      <Card 
        key={notification.id} 
        className={`p-6 transition-all duration-200 hover:shadow-lg ${
          !notification.isRead ? 'border-l-4 border-l-primary-500 bg-primary-50/30' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start space-x-4">
          {notification.avatar ? (
            <div className="relative">
              <img
                src={notification.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${colorClasses}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses}`}>
              <Icon className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-base font-semibold mb-1 ${
                  !notification.isRead ? 'text-secondary-900' : 'text-secondary-700'
                }`}>
                  {notification.title}
                  {!notification.isRead && (
                    <span className="ml-2 w-2 h-2 bg-primary-500 rounded-full inline-block"></span>
                  )}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed mb-2">
                  {notification.message}
                </p>
                <div className="flex items-center space-x-4 text-xs text-secondary-500">
                  <span>{formatTimeAgo(notification.timestamp)}</span>
                  {notification.metadata?.auctionTitle && (
                    <span className="text-primary-600 font-medium">
                      {notification.metadata.auctionTitle}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                  className="text-secondary-400 hover:text-accent-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {notification.actionUrl && (
              <Link to={notification.actionUrl}>
                <Button variant="outline" size="sm" className="mt-3">
                  View Details
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <Card className="text-center py-16">
      <Bell className="w-16 h-16 text-secondary-300 mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">All Caught Up!</h2>
      <p className="text-secondary-600 mb-8">
        You have no new notifications. We'll let you know when something important happens.
      </p>
      <Link to="/">
        <Button variant="primary">Browse Auctions</Button>
      </Link>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link to="/" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2 flex items-center">
              <BellRing className="w-8 h-8 mr-3 text-primary-600" />
              Notifications
            </h1>
            <p className="text-lg text-secondary-600">
              {unreadCount > 0 ? (
                <>
                  <span className="font-semibold text-primary-600">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
                </>
              ) : (
                'You\'re all caught up!'
              )}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-secondary-700">Filter:</span>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All', count: notifications.length },
                { id: 'unread', label: 'Unread', count: unreadCount },
                { id: 'important', label: 'Important', count: notifications.filter(n => ['auction_won', 'auction_ending', 'bid'].includes(n.type)).length }
              ].map((filterOption) => (
                <Button
                  key={filterOption.id}
                  variant={filter === filterOption.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.id as any)}
                  className="flex items-center space-x-1"
                >
                  <span>{filterOption.label}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    filter === filterOption.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-secondary-100 text-secondary-600'
                  }`}>
                    {filterOption.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(renderNotification)}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 