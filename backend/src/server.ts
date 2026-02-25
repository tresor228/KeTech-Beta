import express, { Express } from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import './config/firebase'; // Import to initialize Firebase Admin SDK

// Import des routes
import authRoutes from './routes/auth.routes';
import kycRoutes from './routes/kyc.routes';
import aiRoutes from './routes/ai.routes';
// import userRoutes from './routes/user.routes';
import developerRoutes from './routes/developer.routes';
// import companyRoutes from './routes/company.routes';

const app: Express = express();

// Middlewares
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes de santé
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    message: 'KeTech API is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/developer', developerRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/developers', developerRoutes);
// app.use('/api/companies', companyRoutes);

// Gestion des erreurs
app.use(errorHandler);

// Route 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
  });
});

// Démarrage du serveur
const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Serveur KeTech démarré sur le port ${PORT}`);
  console.log(`📡 Mode: ${env.NODE_ENV}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`🔗 Frontend: ${env.FRONTEND_URL}`);
});

export default app;
