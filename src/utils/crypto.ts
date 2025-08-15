import CryptoJS from 'crypto-js';
import { sha1 } from 'js-sha1';

const SECRET_KEY = 'guardify-secret-key-2024';

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password + SECRET_KEY).toString();
};

export const createPasswordHash = (password: string): { hash: string; prefix: string } => {
  const fullHash = sha1(password).toUpperCase();
  const prefix = fullHash.substring(0, 5);
  const suffix = fullHash.substring(5);
  
  return {
    hash: fullHash,
    prefix,
  };
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};