export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  isVerified: boolean;
}

export interface BreachResult {
  name: string;
  title: string;
  domain: string;
  breachDate: string;
  addedDate: string;
  modifiedDate: string;
  pwnCount: number;
  description: string;
  logoPath: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  isRetired: boolean;
  isSpamList: boolean;
}

export interface PasswordBreachResult {
  breached: boolean;
  count: number;
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  type: 'email' | 'password';
  breachFound: boolean;
  breachCount: number;
  timestamp: string;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  dashboardNotifications: boolean;
  monitoredEmails: string[];
}