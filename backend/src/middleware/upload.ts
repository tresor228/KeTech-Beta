import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env';

// Créer le dossier uploads s'il n'existe pas
const uploadDir = env.UPLOAD_DIR;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFolder = file.fieldname === 'idDocumentFront' || file.fieldname === 'idDocumentBack' 
      ? 'kyc' 
      : 'general';
    const dest = path.join(uploadDir, subFolder);
    
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filtre des types de fichiers acceptés
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Utilisez JPEG, JPG, PNG ou PDF.'));
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE,
  },
  fileFilter,
});

// Upload spécifique pour les documents KYC
export const uploadKYCDocuments = upload.fields([
  { name: 'idDocumentFront', maxCount: 1 },
  { name: 'idDocumentBack', maxCount: 1 },
]);
