import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Eye, Gavel, User, Heart, Share2, 
  ArrowLeft, MessageCircle, Send, DollarSign 
} from 'lucide-react';
import { 
  getAuctionById, 
  getComments, 
  placeBid, 
  postComment,
  getUserProfile 
} from '../services/api';
import { Auction, Comment, User as UserType } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const AuctionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [seller, setSeller] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [commentText, setCommentText] = useState('');
  const [bidding, setBidding] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock current user - in a real app this would come from auth context
  const currentUser = 'vintage_hunter';

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [auctionData, commentsData] = await Promise.all([
          getAuctionById(id),
          getComments(id)
        ]);
        
        setAuction(auctionData);
        setComments(commentsData);
        
        // Fetch seller info
        const sellerData = await getUserProfile(auctionData.seller_username);
        setSeller(sellerData);
      } catch (error) {
        console.error('Error fetching auction details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auction || !bidAmount) return;

    const amount = parseFloat(bidAmount);
    if (amount <= auction.current_bid) {
      alert('Bid must be higher than current bid');
      return;
    }

    try {
      setBidding(true);
      const updatedAuction = await placeBid(auction.id, {
        bid_amount: amount,
        bidder_username: currentUser
      });
      setAuction(updatedAuction);
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    } finally {
      setBidding(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auction || !commentText.trim()) return;

    try {
      setCommenting(true);
      const updatedComments = await postComment(auction.id, {
        content: commentText.trim(),
        commenter_username: currentUser
      });
      setComments(updatedComments);
      setCommentText('');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setCommenting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading auction details...</p>
        </div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center py-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Auction Not Found</h2>
          <p className="text-secondary-600 mb-6">The auction you're looking for doesn't exist.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card padding="none" className="overflow-hidden">
              <div className="relative">
                <img
                  src={auction.image_urls[currentImageIndex] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'}
                  alt={auction.title}
                  className="w-full h-96 object-cover"
                />
                {auction.image_urls.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {auction.image_urls.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Auction Info */}
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                    {auction.category}
                  </span>
                  <h1 className="text-3xl font-bold text-secondary-900">{auction.title}</h1>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-secondary-700 mb-6 leading-relaxed">{auction.description}</p>

              {/* Seller Info */}
              {seller && (
                <div className="flex items-center p-4 bg-secondary-50 rounded-lg mb-6">
                  <img
                    src={seller.avatar_url}
                    alt={seller.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-secondary-900">{seller.username}</h3>
                      <span className="ml-2 text-sm text-secondary-600">
                        {seller.reputation_score}% positive feedback
                      </span>
                    </div>
                    <p className="text-sm text-secondary-600">
                      {seller.total_auctions} auctions • {seller.total_bids} bids
                    </p>
                  </div>
                  <Link to={`/profile/${seller.username}`}>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </Link>
                </div>
              )}

              {/* Auction Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-secondary-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg mx-auto mb-1">
                    <Eye className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="text-lg font-semibold text-secondary-900">{auction.watchers}</div>
                  <div className="text-xs text-secondary-600">Watchers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-success-100 rounded-lg mx-auto mb-1">
                    <Gavel className="w-4 h-4 text-success-600" />
                  </div>
                  <div className="text-lg font-semibold text-secondary-900">{auction.bid_count}</div>
                  <div className="text-xs text-secondary-600">Bids</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-warning-100 rounded-lg mx-auto mb-1">
                    <Clock className="w-4 h-4 text-warning-600" />
                  </div>
                  <div className="text-lg font-semibold text-secondary-900">{formatTimeRemaining(auction.end_time)}</div>
                  <div className="text-xs text-secondary-600">Remaining</div>
                </div>
              </div>
            </Card>

            {/* Comments Section */}
            <Card>
              <h3 className="text-xl font-bold text-secondary-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handlePostComment} className="mb-6">
                <div className="flex space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <Input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Ask a question or leave a comment..."
                      className="mb-2"
                    />
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="sm" 
                      isLoading={commenting}
                      disabled={!commentText.trim()}
                      className="flex items-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      alt={comment.commenter_username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-secondary-50 rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-secondary-900">{comment.commenter_username}</span>
                          <span className="text-xs text-secondary-500 ml-2">{formatDate(comment.timestamp)}</span>
                        </div>
                        <p className="text-secondary-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-center text-secondary-500 py-8">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Bidding */}
          <div className="space-y-6">
            <Card>
              <div className="text-center mb-6">
                <div className="text-sm text-secondary-600 mb-1">Current Bid</div>
                <div className="text-4xl font-bold text-secondary-900 mb-2">
                  {formatPrice(auction.current_bid)}
                </div>
                <div className="text-sm text-secondary-500">
                  Starting bid: {formatPrice(auction.start_price)}
                </div>
              </div>

              {auction.status === 'active' ? (
                <form onSubmit={handlePlaceBid} className="space-y-4">
                  <Input
                    type="number"
                    label="Your Bid"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder={`Minimum: ${formatPrice(auction.current_bid + 1)}`}
                    min={auction.current_bid + 1}
                    step="1"
                  />
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-full flex items-center justify-center"
                    isLoading={bidding}
                    disabled={!bidAmount || parseFloat(bidAmount) <= auction.current_bid}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Place Bid
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="text-lg font-medium text-secondary-900 mb-2">Auction Ended</div>
                  <div className="text-secondary-600">This auction is no longer accepting bids</div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-secondary-200">
                <div className="flex items-center justify-between text-sm text-secondary-600 mb-2">
                  <span>Auction ends:</span>
                  <span>{formatDate(auction.end_time)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-secondary-600">
                  <span>Time remaining:</span>
                  <span className="font-medium">{formatTimeRemaining(auction.end_time)}</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h4 className="font-medium text-secondary-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Auction
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailPage; 