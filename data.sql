-- ==========================================
-- 1. TYPES ÉNUMÉRÉS (ENUMS)
-- ==========================================
CREATE TYPE "UserRole" AS ENUM ('DEVELOPER', 'COMPANY', 'ADMIN');
CREATE TYPE "CompanyType" AS ENUM ('STARTUP', 'AGENCE', 'PME', 'GRAND_GROUPE', 'AUTRE');
CREATE TYPE "IDType" AS ENUM ('PASSPORT', 'NATIONAL_ID', 'DRIVERS_LICENSE', 'OTHER');
CREATE TYPE "KYCStatus" AS ENUM ('NOT_VERIFIED', 'PENDING', 'VERIFIED', 'REJECTED');
CREATE TYPE "KeyTransactionType" AS ENUM ('EARNED', 'SPENT', 'GIFTED');
CREATE TYPE "SubmissionStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'GRADED', 'EXPIRED');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN');
CREATE TYPE "CollaborationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- ==========================================
-- 2. TABLES DES UTILISATEURS & PROFILS
-- ==========================================

-- Table de base des utilisateurs
CREATE TABLE "users" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "firebaseUid" TEXT UNIQUE,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT,
    "emailVerified" BOOLEAN DEFAULT FALSE,
    "role" "UserRole" DEFAULT 'DEVELOPER',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Profil Développeur mis à jour (Université & Pays inclus)
CREATE TABLE "developer_profiles" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "firstName" TEXT,
    "lastName" TEXT,
    "bio" TEXT,
    "avatar" TEXT,
    "country" TEXT,             -- AJOUTÉ : Pays de résidence
    "university" TEXT,          -- AJOUTÉ : Nom de l'université / établissement
    "location" TEXT,            -- Ville ou région précise
    "github" TEXT,
    "linkedin" TEXT,
    "portfolio" TEXT,
    "globalScore" DOUBLE PRECISION DEFAULT 0,
    "level" TEXT DEFAULT 'beginner', -- beginner, intermediate, advanced, expert
    "objectives" TEXT[] DEFAULT '{}', -- Utilisé pour reco IA (ex: "Apprendre React", "Freelance")
    "interests" TEXT[] DEFAULT '{}',  -- Utilisé pour reco IA (ex: "IA", "Web3", "Cyber")
    "availability" TEXT DEFAULT 'available',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Compétences techniques
CREATE TABLE "skills" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "developerId" UUID REFERENCES "developer_profiles"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "level" TEXT DEFAULT 'beginner',
    "yearsExperience" INTEGER,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("developerId", "name")
);

-- Profil Entreprise
CREATE TABLE "company_profiles" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "website" TEXT,
    "country" TEXT,             -- Cohérence avec profil développeur
    "location" TEXT,
    "type" "CompanyType" NOT NULL,
    "size" TEXT,
    "industry" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. GAMIFICATION (SYSTÈME DE KEYS)
-- ==========================================
CREATE TABLE "user_keys" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "balance" INTEGER DEFAULT 100,
    "totalEarned" INTEGER DEFAULT 100,
    "totalSpent" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "key_transactions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "users"("id") ON DELETE CASCADE,
    "type" "KeyTransactionType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. ÉCOSYSTÈME PROJETS ET RECOMMANDATIONS
-- ==========================================

-- Projets collaboratifs / d'entraînement
CREATE TABLE "projects" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "duration" TEXT,
    "points" INTEGER DEFAULT 0, -- Points gagnés pour le globalScore
    "technologies" TEXT[] DEFAULT '{}',
    "category" TEXT, -- Frontend, Backend, Fullstack, AI, Mobile
    "instructions" JSONB,
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Membres des projets
CREATE TABLE "project_members" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "projectId" UUID REFERENCES "projects"("id") ON DELETE CASCADE,
    "developerId" UUID REFERENCES "developer_profiles"("id") ON DELETE CASCADE,
    "role" TEXT DEFAULT 'member',
    "status" TEXT DEFAULT 'active',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("projectId", "developerId")
);

-- Offres de recrutement
CREATE TABLE "jobs" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "companyId" UUID REFERENCES "company_profiles"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "country" TEXT, -- Permet de filtrer les jobs par pays
    "contractType" TEXT, -- CDI, Stage, Freelance
    "experienceLevel" TEXT,
    "keysRequired" INTEGER DEFAULT 5,
    "skills" TEXT[] DEFAULT '{}',
    "isActive" BOOLEAN DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. KYC & RÉALISATIONS
-- ==========================================
CREATE TABLE "kyc" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
    "status" "KYCStatus" DEFAULT 'NOT_VERIFIED',
    "idType" "IDType",
    "idNumber" TEXT,
    "idDocumentFront" TEXT,
    "verifiedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "achievements" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "developerId" UUID REFERENCES "developer_profiles"("id") ON DELETE CASCADE,
    "type" TEXT NOT NULL, -- badge, certificate
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "unlockedAt" TIMESTAMPTZ DEFAULT NOW(),
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. INDEX DE PERFORMANCE (OPTIMISATION IA)
-- ==========================================
CREATE INDEX idx_dev_interests ON "developer_profiles" USING GIN ("interests");
CREATE INDEX idx_dev_objectives ON "developer_profiles" USING GIN ("objectives");
CREATE INDEX idx_dev_university ON "developer_profiles"("university");
CREATE INDEX idx_dev_country ON "developer_profiles"("country");
CREATE INDEX idx_project_techs ON "projects" USING GIN ("technologies");

-- ==========================================
-- 7. AUTOMATISATION DES MISES À JOUR
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
DECLARE
    t text;
BEGIN
    FOR t IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE 'pg_%') 
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = t AND column_name = 'updatedAt') THEN
            EXECUTE format('CREATE TRIGGER update_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()', t);
        END IF;
    END LOOP;
END $$;
