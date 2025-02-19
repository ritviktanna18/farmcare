import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Loader2, AlertCircle, Filter } from 'lucide-react';

const NewsCard = ({ article, index }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-green-900/30 rounded-xl overflow-hidden backdrop-blur-sm ring-1 ring-green-800/30 
        hover:ring-green-700/50 transition-all duration-300 flex flex-col h-full group"
    >
      {article.image && (
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-green-400 text-sm mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <time>{formatDate(article.publishedAt)}</time>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{article.source.name}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-green-200 mb-3 line-clamp-2 hover:text-green-300 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-green-100/90 mb-4 line-clamp-3 flex-grow text-sm">
          {article.description}
        </p>

        <div className="mt-auto pt-4 border-t border-green-800/50">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors group/link"
          >
            <span>Read Full Article</span>
            <ExternalLink className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const LoadingCard = () => (
  <div className="bg-green-900/30 rounded-xl overflow-hidden backdrop-blur-sm ring-1 ring-green-800/30 h-full">
    <div className="aspect-video bg-green-800/30 animate-pulse" />
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-4 bg-green-800/30 rounded w-24 animate-pulse" />
        <div className="h-4 bg-green-800/30 rounded w-32 animate-pulse" />
      </div>
      <div className="h-7 bg-green-800/30 rounded w-3/4 mb-4 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-green-800/30 rounded animate-pulse" />
        <div className="h-4 bg-green-800/30 rounded animate-pulse" />
        <div className="h-4 bg-green-800/30 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  </div>
);

const CategoryButton = ({ active, children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-300 ${
      active
        ? 'bg-green-500 text-green-950 font-medium shadow-lg ring-2 ring-green-400/50'
        : 'bg-green-900/50 text-green-300 hover:bg-green-800 ring-1 ring-green-800/50'
    }`}
  >
    {children}
  </motion.button>
);

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('agriculture');

  const categories = [
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'farming', label: 'Farming' },
    { value: 'organic farming', label: 'Organic' },
    { value: 'sustainable agriculture', label: 'Sustainable' }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${category}&lang=en&country=us&max=9&apikey=205b600b59b62d3da4b48da0414a68b3`
        );

        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        if (data.articles) {
          setNews(data.articles);
        } else {
          throw new Error('Invalid data received');
        }
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-green-900/50 ring-1 ring-green-500/50"
          >
            <Filter className="w-6 h-6 text-green-400" />
          </motion.div>

          <h1 className="text-4xl font-bold text-green-200 mb-4">
            Agricultural News & Insights
          </h1>
          <p className="text-green-400 text-lg mb-8 max-w-2xl mx-auto">
            Stay updated with the latest farming news, trends, and innovations
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.value}
                active={category === cat.value}
                onClick={() => setCategory(cat.value)}
              >
                {cat.label}
              </CategoryButton>
            ))}
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center p-4 mb-8 bg-red-900/20 rounded-xl"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center mb-8">
            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {loading ? (
              [...Array(6)].map((_, i) => <LoadingCard key={i} />)
            ) : (
              news.map((article, index) => (
                <NewsCard 
                  key={article.url || index} 
                  article={article}
                  index={index}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default News;