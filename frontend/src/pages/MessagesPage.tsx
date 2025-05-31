import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, MessageCircle, Send, Search, MoreVertical, 
  Phone, Video, Info, Paperclip, Smile, Image as ImageIcon,
  Check, CheckCheck, Circle, Star, Archive, Trash2
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Breadcrumb from '../components/ui/Breadcrumb';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  isRead: boolean;
  type: 'text' | 'image' | 'auction_link';
  imageUrl?: string;
  auctionData?: {
    id: string;
    title: string;
    image: string;
    price: number;
  };
}

interface Conversation {
  id: string;
  participant: {
    username: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  messages: Message[];
}

const MessagesPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Browse', href: '/' },
    { label: 'Messages', isActive: true }
  ];

  // Mock conversations data
  const mockConversations: Conversation[] = [
    {
      id: '1',
      participant: {
        username: 'vintage_hunter',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'Is the Rolex still available?',
      lastMessageTime: '2024-01-15T10:30:00Z',
      unreadCount: 2,
      isStarred: true,
      messages: [
        {
          id: '1',
          text: 'Hi! I\'m interested in your Vintage Rolex Submariner',
          timestamp: '2024-01-15T09:00:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        },
        {
          id: '2',
          text: 'Hello! It\'s still available. Do you have any specific questions?',
          timestamp: '2024-01-15T09:15:00Z',
          isOwn: true,
          isRead: true,
          type: 'text'
        },
        {
          id: '3',
          text: 'Can you send more pictures of the watch face?',
          timestamp: '2024-01-15T09:30:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        },
        {
          id: '4',
          text: 'Sure! Here are some detailed photos',
          timestamp: '2024-01-15T09:45:00Z',
          isOwn: true,
          isRead: true,
          type: 'image',
          imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&h=200&fit=crop'
        },
        {
          id: '5',
          text: 'Perfect! What\'s the reserve price?',
          timestamp: '2024-01-15T10:00:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        },
        {
          id: '6',
          text: 'Is the Rolex still available?',
          timestamp: '2024-01-15T10:30:00Z',
          isOwn: false,
          isRead: false,
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      participant: {
        username: 'art_collector',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=50&h=50&fit=crop&crop=face',
        isOnline: false,
        lastSeen: '2024-01-15T08:45:00Z'
      },
      lastMessage: 'Thanks for the quick shipping!',
      lastMessageTime: '2024-01-14T16:20:00Z',
      unreadCount: 0,
      isStarred: false,
      messages: [
        {
          id: '1',
          text: 'Hi! I won your Picasso sketch auction',
          timestamp: '2024-01-14T14:00:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        },
        {
          id: '2',
          text: 'Congratulations! I\'ll prepare it for shipping today',
          timestamp: '2024-01-14T14:15:00Z',
          isOwn: true,
          isRead: true,
          type: 'text'
        },
        {
          id: '3',
          text: 'Thanks for the quick shipping!',
          timestamp: '2024-01-14T16:20:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        }
      ]
    },
    {
      id: '3',
      participant: {
        username: 'tech_enthusiast',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        isOnline: true
      },
      lastMessage: 'MacBook Pro M3 Max - Interested!',
      lastMessageTime: '2024-01-14T12:10:00Z',
      unreadCount: 1,
      isStarred: false,
      messages: [
        {
          id: '1',
          text: 'Hi! I saw your MacBook Pro listing',
          timestamp: '2024-01-14T12:00:00Z',
          isOwn: false,
          isRead: true,
          type: 'text'
        },
        {
          id: '2',
          text: 'MacBook Pro M3 Max - Interested!',
          timestamp: '2024-01-14T12:10:00Z',
          isOwn: false,
          isRead: false,
          type: 'auction_link',
          auctionData: {
            id: '5',
            title: 'MacBook Pro M3 Max 16-inch',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=75&fit=crop',
            price: 3200
          }
        }
      ]
    }
  ];

  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      setConversations(mockConversations);
      if (mockConversations.length > 0) {
        setActiveConversation(mockConversations[0].id);
      }
      setLoading(false);
    };

    loadConversations();
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getActiveConversation = () => {
    return conversations.find(c => c.id === activeConversation);
  };

  const sendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      timestamp: new Date().toISOString(),
      isOwn: true,
      isRead: false,
      type: 'text'
    };

    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: messageText,
              lastMessageTime: newMessage.timestamp
            }
          : conv
      )
    );

    setMessageText('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${
        message.isOwn ? 'order-2' : 'order-1'
      }`}>
        <div className={`rounded-2xl px-4 py-2 ${
          message.isOwn 
            ? 'bg-primary-600 text-white rounded-br-md' 
            : 'bg-white border border-secondary-200 text-secondary-900 rounded-bl-md'
        }`}>
          {message.type === 'text' && (
            <p className="text-sm leading-relaxed">{message.text}</p>
          )}
          
          {message.type === 'image' && (
            <div>
              <img 
                src={message.imageUrl} 
                alt="Shared image" 
                className="rounded-lg max-w-full h-auto mb-2"
              />
              {message.text && <p className="text-sm">{message.text}</p>}
            </div>
          )}
          
          {message.type === 'auction_link' && message.auctionData && (
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <div className="flex items-center space-x-3">
                <img 
                  src={message.auctionData.image} 
                  alt={message.auctionData.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{message.auctionData.title}</h4>
                  <p className="text-sm opacity-75">${message.auctionData.price.toLocaleString()}</p>
                </div>
              </div>
              {message.text && <p className="text-sm mt-2">{message.text}</p>}
            </div>
          )}
        </div>
        
        <div className={`flex items-center mt-1 space-x-1 ${
          message.isOwn ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs text-secondary-500">{formatTime(message.timestamp)}</span>
          {message.isOwn && (
            <div className="text-primary-600">
              {message.isRead ? (
                <CheckCheck className="w-3 h-3" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderConversationItem = (conversation: Conversation) => (
    <div
      key={conversation.id}
      onClick={() => setActiveConversation(conversation.id)}
      className={`p-4 cursor-pointer transition-colors border-b border-secondary-100 hover:bg-secondary-50 ${
        activeConversation === conversation.id ? 'bg-primary-50 border-r-4 border-r-primary-500' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={conversation.participant.avatar}
            alt={conversation.participant.username}
            className="w-12 h-12 rounded-full"
          />
          {conversation.participant.isOnline ? (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
          ) : (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary-300 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900 truncate flex items-center">
              {conversation.participant.username}
              {conversation.isStarred && (
                <Star className="w-3 h-3 text-warning-500 ml-1 fill-current" />
              )}
            </h3>
            <span className="text-xs text-secondary-500">
              {formatTime(conversation.lastMessageTime)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-secondary-600 truncate">{conversation.lastMessage}</p>
            {conversation.unreadCount > 0 && (
              <span className="ml-2 bg-primary-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  const activeConv = getActiveConversation();

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
            <h1 className="text-4xl font-bold text-secondary-900 mb-2 flex items-center">
              <MessageCircle className="w-8 h-8 mr-3 text-primary-600" />
              Messages
            </h1>
            <p className="text-lg text-secondary-600">
              {totalUnread > 0 ? (
                <>
                  <span className="font-semibold text-primary-600">{totalUnread}</span> unread message{totalUnread !== 1 ? 's' : ''}
                </>
              ) : (
                'All messages read'
              )}
            </p>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b border-secondary-200">
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No conversations</h3>
                    <p className="text-secondary-600">Start a conversation with other users</p>
                  </div>
                ) : (
                  filteredConversations.map(renderConversationItem)
                )}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {activeConv ? (
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-secondary-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={activeConv.participant.avatar}
                        alt={activeConv.participant.username}
                        className="w-10 h-10 rounded-full"
                      />
                      {activeConv.participant.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-success-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{activeConv.participant.username}</h3>
                      <p className="text-sm text-secondary-600">
                        {activeConv.participant.isOnline ? 'Online' : `Last seen ${formatTime(activeConv.participant.lastSeen || '')}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeConv.messages.map(renderMessage)}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-secondary-200">
                  <div className="flex items-end space-x-3">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1">
                      <Input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={sendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-secondary-300 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">Select a Conversation</h2>
                  <p className="text-secondary-600">
                    Choose a conversation from the left to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 