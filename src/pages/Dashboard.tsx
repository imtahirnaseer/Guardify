import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SearchHistory } from '../types';
import { getSearchHistory } from '../utils/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Clock, Mail, Lock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    if (user) {
      const history = getSearchHistory().filter(h => h.userId === user.id);
      setSearchHistory(history);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const totalSearches = searchHistory.length;
  const breachesFound = searchHistory.filter(h => h.breachFound).length;
  const emailSearches = searchHistory.filter(h => h.type === 'email').length;
  const passwordSearches = searchHistory.filter(h => h.type === 'password').length;

  // Chart data
  const searchTypeData = [
    { name: 'Email Searches', value: emailSearches, color: '#3B82F6' },
    { name: 'Password Searches', value: passwordSearches, color: '#EF4444' },
  ];

  const monthlyData = searchHistory.reduce((acc, search) => {
    const month = new Date(search.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.searches++;
      if (search.breachFound) existing.breaches++;
    } else {
      acc.push({
        month,
        searches: 1,
        breaches: search.breachFound ? 1 : 0,
      });
    }
    return acc;
  }, [] as any[]);

  const stats = [
    {
      title: 'Total Searches',
      value: totalSearches,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Breaches Found',
      value: breachesFound,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'bg-red-500',
    },
    {
      title: 'Secure Accounts',
      value: totalSearches - breachesFound,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'Account Age',
      value: `${Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days`,
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Security Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user.email}. Here's your security overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        {totalSearches > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Search Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Search Types
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={searchTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {searchTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Monthly Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Activity Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="searches" fill="#3B82F6" name="Total Searches" />
                  <Bar dataKey="breaches" fill="#EF4444" name="Breaches Found" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Security Checks
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your latest breach monitoring activity
            </p>
          </div>

          <div className="p-6">
            {searchHistory.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No searches yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Start by checking your email or password for breaches
                </p>
                <a
                  href="/check"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check Now
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {searchHistory.slice(0, 10).map((search, index) => (
                  <motion.div
                    key={search.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${search.type === 'email' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
                        {search.type === 'email' ? (
                          <Mail className={`h-5 w-5 ${search.type === 'email' ? 'text-blue-600' : 'text-purple-600'}`} />
                        ) : (
                          <Lock className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {search.query}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(search.timestamp).toLocaleDateString()} at{' '}
                          {new Date(search.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {search.breachFound ? (
                        <>
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            {search.breachCount} breach{search.breachCount !== 1 ? 'es' : ''} found
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            Secure
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};