import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, User, Bell, Menu } from 'lucide-react';
import RevolutionaryHomePage from './pages/RevolutionaryHomePage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import WatchlistPage from './pages/WatchlistPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import AuctionCreatedSuccessPage from './pages/AuctionCreatedSuccessPage';
import Button from './components/ui/Button';
import Logo from './components/ui/Logo';
import './styles/revolution.css';

function App() {
  // Mock notification counts - in a real app this would come from an API
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(2);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Revolutionary Navigation */}
        <nav className="nav-revolutionary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <Logo variant="default" size="md" />
              </Link>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-lg mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search auctions..."
                    className="input-revolutionary w-full pl-10 pr-4 py-2"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Browse
                </Link>
                <Link to="/sell" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Sell
                </Link>
                <Link to="/watchlist" className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Watchlist
                </Link>
                
                {/* User Actions */}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-secondary-200">
                  {/* Notifications */}
                  <Link to="/notifications">
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-5 h-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium pulse-glow">
                          {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </span>
                      )}
                    </Button>
                  </Link>

                  {/* Messages */}
                  <Link to="/messages">
                    <Button variant="ghost" size="sm" className="relative">
                      <User className="w-5 h-5" />
                      {unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium pulse-glow">
                          {unreadMessages > 9 ? '9+' : unreadMessages}
                        </span>
                      )}
                    </Button>
                  </Link>
                  
                  <button className="btn-revolutionary">
                    Sign In
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<RevolutionaryHomePage />} />
            <Route path="/auctions/:id" element={<AuctionDetailPage />} />
            <Route path="/sell" element={<CreateAuctionPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/auction-created-success" element={<AuctionCreatedSuccessPage />} />
          </Routes>
        </main>

        {/* Revolutionary Footer */}
        <footer className="bg-secondary-900 text-white relative overflow-hidden">
          {/* Particle Background for Footer */}
          <div className="absolute inset-0 opacity-20">
            <div className="particles-bg"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Logo variant="dark" size="lg" className="mb-4" />
                <p className="text-secondary-300 mb-4 max-w-md">
                  The premier destination for collectors and enthusiasts. Discover unique items, 
                  place bids, and connect with a community of passionate buyers and sellers.
                </p>
                <div className="flex space-x-4">
                  <button className="btn-revolutionary">
                    Privacy Policy
                  </button>
                  <button className="btn-revolutionary">
                    Terms of Service
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gradient">Categories</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Electronics</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Art & Collectibles</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Watches & Jewelry</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Musical Instruments</button></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gradient">Support</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Help Center</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Contact Us</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Seller Guide</button></li>
                  <li><button className="hover:text-white transition-colors text-left hover-lift">Buyer Protection</button></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
              <p>&copy; 2024 AuctionHub. All rights reserved. <span className="text-gradient">Revolutionary Experience</span></p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
