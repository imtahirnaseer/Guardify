import React, { useState } from 'react';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFormProps {
  onEmailSearch: (email: string) => void;
  onPasswordSearch: (password: string) => void;
  isLoading: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ 
  onEmailSearch, 
  onPasswordSearch, 
  isLoading 
}) => {
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onEmailSearch(email.trim());
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onPasswordSearch(password);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Check Your Security
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find out if your email or password has been compromised in a data breach
        </p>
      </div>

      {/* Tab Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-8">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
            activeTab === 'email'
              ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Mail className="h-5 w-5" />
          <span className="font-medium">Email Check</span>
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
            activeTab === 'password'
              ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Lock className="h-5 w-5" />
          <span className="font-medium">Password Check</span>
        </button>
      </div>

      {/* Email Search Form */}
      {activeTab === 'email' && (
        <motion.form
          key="email"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleEmailSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                required
                disabled={isLoading}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We'll check if your email appears in any known data breaches
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Checking...' : 'Check Email'}</span>
          </button>
        </motion.form>
      )}

      {/* Password Search Form */}
      {activeTab === 'password' && (
        <motion.form
          key="password"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handlePasswordSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your password is hashed locally and never stored or transmitted in plain text
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Checking...' : 'Check Password'}</span>
          </button>
        </motion.form>
      )}
    </motion.div>
  );
};