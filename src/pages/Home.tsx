import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, Bell, Lock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8"
            >
              <Shield className="h-16 w-16 text-blue-600" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Guard Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Digital Identity
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Monitor data breaches, check compromised passwords, and get instant alerts 
              when your credentials are exposed in security incidents.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/check"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span>Check Breaches Now</span>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <Bell className="h-5 w-5" />
                <span>Get Alerts</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Security Monitoring
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Advanced tools to protect your digital identity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Breach Detection
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Instantly check if your email or password has been compromised in known data breaches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Bell className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Real-time Alerts
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get notified immediately when your credentials appear in new data breaches.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Secure Checking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Privacy-first approach using k-Anonymity for password checks without exposing your data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Protecting Users Worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join millions who trust Guardify with their digital security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">2M+</div>
              <div className="text-gray-600 dark:text-gray-300">Users Protected</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Breaches Monitored</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Protecting Your Digital Identity Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't wait for a breach to happen. Monitor your accounts and stay ahead of threats.
            </p>
            <Link
              to="/check"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <Search className="h-5 w-5" />
              <span>Check Your Security Now</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};