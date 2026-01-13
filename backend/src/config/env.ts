import { config } from 'dotenv';

config();

export const env = {
  // Server
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // OpenAI
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

  // Email (optionnel)
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // File Upload
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE ? parseInt(process.env.MAX_FILE_SIZE) : 5242880, // 5MB
};

// Validation des variables d'environnement requises
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Variable d'environnement manquante: ${envVar}`);
    process.exit(1);
  }
}
