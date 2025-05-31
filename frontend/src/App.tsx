import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, User, Bell, Menu } from 'lucide-react';
import HomePage from './pages/HomePage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import WatchlistPage from './pages/WatchlistPage';
import ProfilePage from './pages/ProfilePage';
import Button from './components/ui/Button';
import Logo from './components/ui/Logo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-soft border-b border-secondary-200">
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
                    className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                  <Button variant="ghost" size="sm">
                    <Bell className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                  </Button>
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
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
            <Route path="/" element={<HomePage />} />
            <Route path="/auctions/:id" element={<AuctionDetailPage />} />
            <Route path="/sell" element={<CreateAuctionPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-secondary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Logo variant="dark" size="lg" className="mb-4" />
                <p className="text-secondary-300 mb-4 max-w-md">
                  The premier destination for collectors and enthusiasts. Discover unique items, 
                  place bids, and connect with a community of passionate buyers and sellers.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-secondary-300 hover:text-white">
                    Privacy Policy
                  </Button>
                  <Button variant="ghost" size="sm" className="text-secondary-300 hover:text-white">
                    Terms of Service
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li><button className="hover:text-white transition-colors text-left">Electronics</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Art & Collectibles</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Watches & Jewelry</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Musical Instruments</button></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-secondary-300">
                  <li><button className="hover:text-white transition-colors text-left">Help Center</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Contact Us</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Seller Guide</button></li>
                  <li><button className="hover:text-white transition-colors text-left">Buyer Protection</button></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
              <p>&copy; 2024 AuctionHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
