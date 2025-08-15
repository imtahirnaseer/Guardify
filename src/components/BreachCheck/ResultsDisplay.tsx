import React from 'react';
import { AlertTriangle, CheckCircle, Shield, Calendar, Users, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreachResult, PasswordBreachResult } from '../../types';

interface ResultsDisplayProps {
  emailResults?: BreachResult[];
  passwordResult?: PasswordBreachResult;
  searchType: 'email' | 'password';
  searchQuery: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  emailResults,
  passwordResult,
  searchType,
  searchQuery,
}) => {
  if (searchType === 'email' && emailResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {emailResults.length === 0 ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
              Good News!
            </h3>
            <p className="text-green-700 dark:text-green-400 text-lg">
              <strong>{searchQuery}</strong> was not found in any known data breaches.
            </p>
            <p className="text-green-600 dark:text-green-500 mt-2">
              Your email appears to be secure, but continue to monitor for new breaches.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">
                Breach Detected!
              </h3>
              <p className="text-red-700 dark:text-red-400 text-lg">
                <strong>{searchQuery}</strong> was found in <strong>{emailResults.length}</strong> data breach{emailResults.length > 1 ? 'es' : ''}.
              </p>
              <p className="text-red-600 dark:text-red-500 mt-2">
                Review the details below and take appropriate security measures.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                Breach Details
              </h4>
              {emailResults.map((breach, index) => (
                <motion.div
                  key={breach.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <Shield className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                          {breach.title}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {breach.domain}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(breach.breachDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>{breach.pwnCount.toLocaleString()} affected</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {breach.description}
                  </p>

                  <div>
                    <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Compromised Data:
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {breach.dataClasses.map((dataClass) => (
                        <span
                          key={dataClass}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded-full"
                        >
                          <Database className="h-3 w-3" />
                          <span>{dataClass}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  }

  if (searchType === 'password' && passwordResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {!passwordResult.breached ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
              Password Secure!
            </h3>
            <p className="text-green-700 dark:text-green-400 text-lg">
              Your password was not found in any known password breaches.
            </p>
            <p className="text-green-600 dark:text-green-500 mt-2">
              This password appears to be unique and secure.
            </p>
          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-2">
              Password Compromised!
            </h3>
            <p className="text-red-700 dark:text-red-400 text-lg mb-4">
              This password has been seen <strong>{passwordResult.count.toLocaleString()}</strong> times in data breaches.
            </p>
            <div className="bg-white dark:bg-red-900/40 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                Recommended Actions:
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                <li>• Change this password immediately</li>
                <li>• Use a unique, strong password for each account</li>
                <li>• Consider using a password manager</li>
                <li>• Enable two-factor authentication where possible</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return null;
};