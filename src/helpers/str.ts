import crypto from 'crypto';

export const generateKeyId = (): string => {
  return crypto.randomBytes(20).toString('hex');
};

export const generateRandomNumber = () => {
  return Math.random() * 1000;
};
