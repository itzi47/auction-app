import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Sparkles, Share2, Clock, Eye, Heart, 
  ArrowRight, Home, Plus, MessageCircle, Trophy
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AuctionCreatedSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 300);
    
    // Auto-redirect after 10 seconds if user doesn't interact
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const mockAuctionData = {
    id: 'new-auction-123',
    title: 'Vintage Rolex Submariner',
    startingPrice: 2500,
    duration: '7 days',
    estimatedViews: '500-800',
    category: 'Watches & Jewelry'
  };

  const nextSteps = [
    {
      icon: Eye,
      title: 'Monitor Performance',
      description: 'Track views, bids, and engagement in real-time',
      action: 'View Analytics',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Share2,
      title: 'Share Your Auction',
      description: 'Increase visibility by sharing on social media',
      action: 'Get Share Link',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: MessageCircle,
      title: 'Engage with Bidders',
      description: 'Answer questions to build trust and increase bids',
      action: 'Check Messages',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const tips = [
    'Respond to questions quickly to build bidder confidence',
    'Consider adding more photos if buyers ask for specific angles',
    'Watch similar auctions to gauge market interest',
    'Promote your listing on social media for maximum exposure'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="relative inline-block mb-6">
              <CheckCircle className="w-24 h-24 text-success-500 mx-auto" />
              <Sparkles className="w-8 h-8 text-warning-500 absolute -top-2 -right-2 animate-pulse" />
              <Sparkles className="w-6 h-6 text-primary-500 absolute -bottom-1 -left-2 animate-pulse delay-300" />
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold text-secondary-900 mb-4 transition-all duration-1000 delay-300 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            🎉 Auction Created Successfully!
          </h1>
          
          <p className={`text-xl text-secondary-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
            showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            Your <span className="font-semibold text-primary-600">{mockAuctionData.title}</span> is now live and ready to receive bids!
          </p>
        </div>

        {/* Auction Summary */}
        <Card className={`p-8 mb-8 border-2 border-success-200 bg-gradient-to-r from-success-50 to-primary-50 transition-all duration-1000 delay-700 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-primary-600" />
                Auction Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Starting Price:</span>
                  <span className="font-bold text-lg text-secondary-900">${mockAuctionData.startingPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Duration:</span>
                  <span className="font-medium text-secondary-900">{mockAuctionData.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Category:</span>
                  <span className="font-medium text-secondary-900">{mockAuctionData.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-600">Estimated Views:</span>
                  <span className="font-medium text-success-600">{mockAuctionData.estimatedViews}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-white rounded-xl p-6 border border-secondary-200 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary-600" />
                  What Happens Next?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-secondary-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Your auction goes live immediately
                  </div>
                  <div className="flex items-center text-secondary-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Bidders can start placing bids right away
                  </div>
                  <div className="flex items-center text-secondary-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    You'll receive notifications for new bids
                  </div>
                  <div className="flex items-center text-secondary-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Auction ends automatically in {mockAuctionData.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <div className={`mb-8 transition-all duration-1000 delay-900 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Maximize Your Success
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">{step.title}</h3>
                  <p className="text-secondary-600 text-sm mb-4">{step.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {step.action}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pro Tips */}
        <Card className={`p-8 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200 mb-8 transition-all duration-1000 delay-1100 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <h3 className="text-xl font-bold text-secondary-900 mb-6 text-center">
            💡 Pro Tips for Higher Bids
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-700">{tip}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1300 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}>
          <Link to={`/auctions/${mockAuctionData.id}`}>
            <Button variant="primary" size="lg" className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              View Your Auction
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          
          <Link to="/sell">
            <Button variant="outline" size="lg" className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create Another Auction
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" size="lg" className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Floating Share Button */}
        <div className={`fixed bottom-8 right-8 transition-all duration-1000 delay-1500 ${
          showAnimation ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <Button 
            variant="primary" 
            size="lg" 
            className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCreatedSuccessPage; 