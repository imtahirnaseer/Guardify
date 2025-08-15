import React, { useState } from 'react';
import { Shield, Mail, Lock, Eye, EyeOff, CheckCircle, AlertTriangle, Zap, Star, User, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  isValidEmail, 
  checkEmailExists, 
  checkEmailStrength, 
  generateSecureEmailSuggestions,
  checkPasswordStrength,
  generateSecurePassword,
  checkPasswordBreach
} from '../services/breachApi';

export const Blink: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [emailResults, setEmailResults] = useState<any>(null);
  const [passwordResults, setPasswordResults] = useState<any>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const handleEmailCheck = async () => {
    if (!email || !isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsCheckingEmail(true);
    setEmailError(null);
    setEmailResults(null);

    try {
      // Check email strength
      const strengthCheck = checkEmailStrength(email);
      
      // Check if email already exists (simulated)
      const emailExists = await checkEmailExists(email);
      
      // Generate secure alternatives
      const baseName = email.split('@')[0];
      const suggestions = generateSecureEmailSuggestions(baseName);
      setEmailSuggestions(suggestions);

      setEmailResults({
        email,
        isValid: true,
        exists: emailExists,
        strength: strengthCheck,
        suggestions,
      });
    } catch (error: any) {
      setEmailError(error.message || 'Failed to check email');
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handlePasswordCheck = async () => {
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }

    setIsCheckingPassword(true);
    setPasswordError(null);
    setPasswordResults(null);

    try {
      // Check password strength
      const strengthCheck = checkPasswordStrength(password);
      
      // Check if password is breached
      const breachCheck = await checkPasswordBreach(password);

      setPasswordResults({
        password: '***hidden***',
        strength: strengthCheck,
        breach: breachCheck,
      });
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to check password');
    } finally {
      setIsCheckingPassword(false);
    }
  };

  const useEmailSuggestion = (suggestedEmail: string) => {
    setEmail(suggestedEmail);
    setEmailResults(null);
    setEmailError(null);
  };

  const usePasswordSuggestion = () => {
    const newPassword = generateSecurePassword(16);
    setPassword(newPassword);
    setPasswordResults(null);
    setPasswordError(null);
  };

  const getStrengthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    if (score >= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStrengthBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
            <Zap className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blink Security Check
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Validate your email and password security before registering on any website. 
            Get instant feedback and secure alternatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Security Validation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Email Validation
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for registration"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              <button
                onClick={handleEmailCheck}
                disabled={isCheckingEmail || !email}
                className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isCheckingEmail ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Shield className="h-5 w-5" />
                )}
                <span>{isCheckingEmail ? 'Validating...' : 'Validate Email'}</span>
              </button>

              {emailError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{emailError}</p>
                </div>
              )}

              {emailResults && (
                <div className="space-y-4">
                  {/* Email Availability */}
                  <div className={`rounded-lg p-4 ${
                    !emailResults.exists 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {!emailResults.exists ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      )}
                      <span className={`font-semibold ${
                        !emailResults.exists ? 'text-green-800 dark:text-green-300' : 'text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {!emailResults.exists ? 'Email Available' : 'Email May Be Taken'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      !emailResults.exists ? 'text-green-700 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {!emailResults.exists 
                        ? 'This email appears to be available for registration.'
                        : 'This email might already be in use. Consider alternatives.'
                      }
                    </p>
                  </div>

                  {/* Email Strength */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Email Security Score</h3>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${getStrengthBgColor(emailResults.strength.score)}`}
                          style={{ width: `${emailResults.strength.score}%` }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${getStrengthColor(emailResults.strength.score)}`}>
                        {emailResults.strength.score}/100
                      </span>
                    </div>
                    {emailResults.strength.suggestions.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggestions:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {emailResults.strength.suggestions.map((suggestion: string, index: number) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Secure Email Suggestions */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Star className="h-4 w-4 text-purple-500 mr-2" />
                      Secure Email Alternatives
                    </h3>
                    <div className="space-y-2">
                      {emailSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3">
                          <code className="text-sm text-gray-800 dark:text-gray-200 flex-1">
                            {suggestion}
                          </code>
                          <button
                            onClick={() => useEmailSuggestion(suggestion)}
                            className="ml-3 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                          >
                            Use This
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                      These providers offer enhanced privacy and security features
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Password Security Validation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Password Validation
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password for registration"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordCheck}
                disabled={isCheckingPassword || !password}
                className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isCheckingPassword ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Shield className="h-5 w-5" />
                )}
                <span>{isCheckingPassword ? 'Validating...' : 'Validate Password'}</span>
              </button>

              {passwordError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm">{passwordError}</p>
                </div>
              )}

              {passwordResults && (
                <div className="space-y-4">
                  {/* Password Strength */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Password Strength</h3>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${getStrengthBgColor(passwordResults.strength.score)}`}
                          style={{ width: `${passwordResults.strength.score}%` }}
                        ></div>
                      </div>
                      <span className={`font-semibold ${getStrengthColor(passwordResults.strength.score)}`}>
                        {passwordResults.strength.level}
                      </span>
                    </div>
                    {passwordResults.strength.suggestions.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Improvements:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {passwordResults.strength.suggestions.map((suggestion: string, index: number) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Breach Check Results */}
                  <div className={`rounded-lg p-4 ${
                    !passwordResults.breach.breached 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {!passwordResults.breach.breached ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                      <span className={`font-semibold ${
                        !passwordResults.breach.breached ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                      }`}>
                        {!passwordResults.breach.breached ? 'Password Secure' : 'Password Compromised'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      !passwordResults.breach.breached ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                    }`}>
                      {!passwordResults.breach.breached 
                        ? 'This password has not been found in any known breaches.'
                        : `This password has been seen ${passwordResults.breach.count.toLocaleString()} times in breaches.`
                      }
                    </p>
                  </div>

                  {/* Secure Password Generator */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <RefreshCw className="h-4 w-4 text-purple-500 mr-2" />
                      Generate Secure Password
                    </h3>
                    <button
                      onClick={usePasswordSuggestion}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Generate New Secure Password
                    </button>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                      16+ characters with mixed case, numbers, and symbols
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Security Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Registration Security Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Unique Emails</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use different emails for different services to limit breach impact
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Strong Passwords</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use unique, complex passwords for every account
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2FA Always</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enable two-factor authentication wherever possible
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};