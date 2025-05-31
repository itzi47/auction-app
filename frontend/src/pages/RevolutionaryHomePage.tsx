import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import { 
  Sparkles, TrendingUp, Users, Gavel, Clock, 
  Star, ArrowRight, Search, Filter, Eye
} from 'lucide-react';
import { getAuctions } from '../services/api';
import { Auction } from '../types';
import AuctionCard from '../components/AuctionCard';
import AnimatedCard from '../components/revolutionary/AnimatedCard';
import MagneticButton from '../components/revolutionary/MagneticButton';
import ParticleBackground from '../components/revolutionary/ParticleBackground';

const RevolutionaryHomePage: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [heroRef, heroInView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1
  });

  const [statsRef, statsInView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1
  });

  const [auctionsRef, auctionsInView] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        const data = await getAuctions();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const categories = ['Electronics', 'Art & Collectibles', 'Watches & Jewelry', 'Musical Instruments', 'Automotive'];

  const stats = [
    { 
      icon: Users, 
      value: '50,000+', 
      label: 'Active Users',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    { 
      icon: Gavel, 
      value: '10,000+', 
      label: 'Live Auctions',
      color: 'from-purple-500 to-pink-500',
      delay: 0.4
    },
    { 
      icon: TrendingUp, 
      value: '$2.5M+', 
      label: 'Total Value',
      color: 'from-green-500 to-emerald-500',
      delay: 0.6
    },
    { 
      icon: Clock, 
      value: '24/7', 
      label: 'Live Bidding',
      color: 'from-orange-500 to-red-500',
      delay: 0.8
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  };

  const heroVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Revolutionary Particle Background */}
      <ParticleBackground 
        variant="constellation" 
        particleCount={30}
        colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
      />
      
      {/* Revolutionary Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)
          `
        }}
      >
        <motion.div
          className="text-center z-10 max-w-6xl mx-auto px-4"
          variants={heroVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          {/* Revolutionary Title */}
          <motion.h1 
            className="heading-revolutionary mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            🚀 The Future of
            <br />
            <span className="text-gradient">
              Auction Experience
            </span>
          </motion.h1>

          {/* Revolutionary Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Experience the most advanced auction platform with 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> cutting-edge technology</span>, 
            stunning visuals, and revolutionary user experience.
          </motion.p>

          {/* Revolutionary CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagneticButton
              variant="gradient"
              effect="magnetic"
              size="xl"
              className="min-w-[200px]"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Start Bidding Now
              <ArrowRight className="w-5 h-5 ml-3" />
            </MagneticButton>

            <MagneticButton
              variant="glass"
              effect="glow"
              size="xl"
              className="min-w-[200px]"
            >
              <Gavel className="w-6 h-6 mr-3" />
              Create Auction
            </MagneticButton>
          </motion.div>

          {/* Revolutionary Search Bar */}
          <motion.div
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="glass p-6 rounded-3xl">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for rare items, collectibles, or anything unique..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-revolutionary w-full pl-12 pr-4 py-4 text-lg"
                  />
                </div>
                <MagneticButton variant="primary" effect="ripple" size="lg">
                  <Search className="w-5 h-5" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </section>

      {/* Revolutionary Stats Section */}
      <section ref={statsRef} className="py-20 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              Trusted by Collectors Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of passionate collectors in the most advanced auction ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                >
                  <AnimatedCard 
                    variant="glass" 
                    hoverEffect="lift"
                    className="text-center p-8 h-full"
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-3xl font-bold text-gray-900 mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, delay: stat.delay }}
                    >
                      {stat.value}
                    </motion.h3>
                    
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </AnimatedCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Revolutionary Categories */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Explore Premium Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MagneticButton
                  variant={selectedCategory === category ? "gradient" : "glass"}
                  effect="magnetic"
                  size="md"
                  className="w-full h-16"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </MagneticButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Auction Grid */}
      <section ref={auctionsRef} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={auctionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4">
              Live Auctions
            </h2>
            <p className="text-xl text-gray-600">
              Discover extraordinary items with revolutionary bidding experience
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading-revolutionary"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={auctionsInView ? "visible" : "hidden"}
            >
              {auctions.slice(0, 8).map((auction, index) => (
                <motion.div
                  key={auction.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <AnimatedCard variant="3d" hoverEffect="lift">
                    <AuctionCard auction={auction} />
                  </AnimatedCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <MagneticButton
              variant="gradient"
              effect="ripple"
              size="lg"
            >
              <Eye className="w-5 h-5 mr-3" />
              View All Auctions
              <ArrowRight className="w-5 h-5 ml-3" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RevolutionaryHomePage; 