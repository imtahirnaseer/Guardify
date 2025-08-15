import React, { useState } from 'react';
import { SearchForm } from '../components/BreachCheck/SearchForm';
import { ResultsDisplay } from '../components/BreachCheck/ResultsDisplay';
import { checkEmailBreach, checkPasswordBreach } from '../services/breachApi';
import { BreachResult, PasswordBreachResult, SearchHistory } from '../types';
import { saveSearchHistory } from '../utils/storage';
import { generateId } from '../utils/crypto';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export const BreachCheck: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailResults, setEmailResults] = useState<BreachResult[] | null>(null);
  const [passwordResult, setPasswordResult] = useState<PasswordBreachResult | null>(null);
  const [searchType, setSearchType] = useState<'email' | 'password'>('email');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailSearch = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setPasswordResult(null);
    
    try {
      const results = await checkEmailBreach(email);
      setEmailResults(results);
      setSearchType('email');
      setSearchQuery(email);

      // Save search history if user is logged in
      if (user) {
        const history: SearchHistory = {
          id: generateId(),
          userId: user.id,
          query: email,
          type: 'email',
          breachFound: results.length > 0,
          breachCount: results.length,
          timestamp: new Date().toISOString(),
        };
        saveSearchHistory(history);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while checking the email.');
      setEmailResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSearch = async (password: string) => {
    setIsLoading(true);
    setError(null);
    setEmailResults(null);
    
    try {
      const result = await checkPasswordBreach(password);
      setPasswordResult(result);
      setSearchType('password');
      setSearchQuery('***hidden***');

      // Save search history if user is logged in
      if (user) {
        const history: SearchHistory = {
          id: generateId(),
          userId: user.id,
          query: 'Password Check',
          type: 'password',
          breachFound: result.breached,
          breachCount: result.count,
          timestamp: new Date().toISOString(),
        };
        saveSearchHistory(history);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while checking the password.');
      setPasswordResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Breach Checker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Protect your digital identity by checking if your credentials have been compromised
          </p>
        </motion.div>

        <SearchForm
          onEmailSearch={handleEmailSearch}
          onPasswordSearch={handlePasswordSearch}
          isLoading={isLoading}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
          >
            <div className="text-red-800 dark:text-red-300 text-center">
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {(emailResults !== null || passwordResult !== null) && (
          <div className="mt-8">
            <ResultsDisplay
              emailResults={emailResults || undefined}
              passwordResult={passwordResult || undefined}
              searchType={searchType}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {!user && (emailResults !== null || passwordResult !== null) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Want to monitor your accounts continuously?
            </h3>
            <p className="text-blue-700 dark:text-blue-400 mb-4">
              Register for an account to get real-time alerts and track your security history.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create Account
              </a>
              <a
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg transition-colors"
              >
                Sign In
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};