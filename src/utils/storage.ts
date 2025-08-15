import { User, SearchHistory, NotificationSettings } from '../types';
import { encryptData, decryptData } from './crypto';

const STORAGE_KEYS = {
  USERS: 'guardify_users',
  CURRENT_USER: 'guardify_current_user',
  SEARCH_HISTORY: 'guardify_search_history',
  NOTIFICATIONS: 'guardify_notifications',
  THEME: 'guardify_theme',
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex !== -1) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, encryptData(JSON.stringify(users)));
};

export const getUsers = (): User[] => {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!encrypted) return [];
    
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return [];
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!encrypted) return null;
    
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, encryptData(JSON.stringify(user)));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const saveSearchHistory = (history: SearchHistory): void => {
  const allHistory = getSearchHistory();
  allHistory.unshift(history);
  
  // Keep only last 50 searches
  const trimmedHistory = allHistory.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, encryptData(JSON.stringify(trimmedHistory)));
};

export const getSearchHistory = (): SearchHistory[] => {
  try {
    const encrypted = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    if (!encrypted) return [];
    
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return [];
  }
};

export const getNotificationSettings = (userId: string): NotificationSettings => {
  try {
    const encrypted = localStorage.getItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`);
    if (!encrypted) {
      return {
        emailAlerts: true,
        dashboardNotifications: true,
        monitoredEmails: [],
      };
    }
    
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return {
      emailAlerts: true,
      dashboardNotifications: true,
      monitoredEmails: [],
    };
  }
};

export const saveNotificationSettings = (userId: string, settings: NotificationSettings): void => {
  localStorage.setItem(
    `${STORAGE_KEYS.NOTIFICATIONS}_${userId}`,
    encryptData(JSON.stringify(settings))
  );
};

export const getTheme = (): string => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

export const setTheme = (theme: string): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};