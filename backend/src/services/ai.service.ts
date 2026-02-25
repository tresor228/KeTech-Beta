import OpenAI from 'openai';
import { env } from '../config/env';
import prisma from '../config/database';
import { BadRequestError } from '../utils/errors';

// Initialiser OpenAI
const openai = env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
  : null;

export const aiService = {
  // Recommander des projets adaptés au profil d'un développeur
  recommendProjects: async (developerId: string) => {
    try {
      // Récupérer le profil développeur
      const developer = await prisma.developerProfile.findUnique({
        where: { id: developerId },
        include: {
          skills: true,
          user: {
            include: {
              kyc: true,
            },
          },
        },
      });

      if (!developer) {
        throw new BadRequestError('Profil développeur non trouvé');
      }

      // Récupérer tous les projets actifs
      const projects = await prisma.project.findMany({
        where: { isActive: true },
      });

      if (!openai) {
        // Fallback: recommandations basiques basées sur les compétences
        return recommendProjectsFallback(developer, projects);
      }

      // Construire le prompt pour ChatGPT
      const skillsList = developer.skills.map(s => `${s.name} (${s.level})`).join(', ');
      const prompt = `Tu es un système de recommandation pour une plateforme d'évaluation technique.
      
Profil du développeur:
- Niveau global: ${developer.level}
- Compétences: ${skillsList || 'Aucune compétence spécifiée'}
- Objectifs: ${developer.objectives.join(', ') || 'Aucun objectif spécifié'}
- Centres d'intérêt: ${developer.interests.join(', ') || 'Aucun intérêt spécifié'}

Projets disponibles:
${projects.map((p, i) => `${i + 1}. ${p.title} - ${p.difficulty} - Technologies: ${p.technologies.join(', ')} - ${p.description}`).join('\n')}

Recommandez les 5 meilleurs projets pour ce développeur en fonction de son profil, ses compétences et ses objectifs.
Répondez UNIQUEMENT avec un JSON array des IDs des projets recommandés, du plus recommandé au moins recommandé.
Format: [id1, id2, id3, id4, id5]`;

      // Appeler l'API OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant expert en recommandation de projets techniques. Tu réponds UNIQUEMENT avec des JSON arrays.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) {
        return recommendProjectsFallback(developer, projects);
      }

      // Parser la réponse JSON
      try {
        const recommendedIds = JSON.parse(content) as string[];
        const recommendedProjects = projects
          .filter(p => recommendedIds.includes(p.id))
          .sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id))
          .slice(0, 5);

        return recommendedProjects.length > 0
          ? recommendedProjects
          : recommendProjectsFallback(developer, projects);
      } catch (error) {
        console.error('Erreur parsing réponse OpenAI:', error);
        return recommendProjectsFallback(developer, projects);
      }
    } catch (error) {
      console.error('Erreur recommandation projets:', error);
      // Fallback vers recommandations basiques
      const developer = await prisma.developerProfile.findUnique({
        where: { id: developerId },
        include: { skills: true },
      });
      if (!developer) throw error;
      const projects = await prisma.project.findMany({ where: { isActive: true } });
      return recommendProjectsFallback(developer, projects);
    }
  },

  // Recommander des développeurs compatibles pour collaboration
  recommendCollaborators: async (developerId: string, limit: number = 10) => {
    try {
      // Récupérer le profil développeur
      const developer = await prisma.developerProfile.findUnique({
        where: { id: developerId },
        include: {
          skills: true,
        },
      });

      if (!developer) {
        throw new BadRequestError('Profil développeur non trouvé');
      }

      // Récupérer d'autres développeurs (exclure soi-même)
      const developers = await prisma.developerProfile.findMany({
        where: {
          id: { not: developerId },
          availability: { not: 'unavailable' },
        },
        include: {
          skills: true,
          user: {
            include: {
              kyc: true,
            },
          },
        },
        take: 50, // Limiter pour le matching
      });

      if (!openai) {
        // Fallback: matching basique
        return recommendCollaboratorsFallback(developer, developers, limit);
      }

      // Construire le prompt pour ChatGPT
      const developerSkills = developer.skills.map(s => `${s.name} (${s.level})`).join(', ');
      const candidatesList = developers.map((d, i) => {
        const skills = d.skills.map(s => `${s.name} (${s.level})`).join(', ');
        return `${i + 1}. ID: ${d.id} - ${d.firstName} ${d.lastName} - Niveau: ${d.level} - Compétences: ${skills} - Objectifs: ${d.objectives.join(', ')} - Intérêts: ${d.interests.join(', ')}`;
      }).join('\n');

      const prompt = `Tu es un système de matching pour une plateforme de collaboration entre développeurs.

Profil du développeur recherchant des collaborateurs:
- ID: ${developer.id}
- Niveau: ${developer.level}
- Compétences: ${developerSkills || 'Aucune'}
- Objectifs: ${developer.objectives.join(', ') || 'Aucun'}
- Intérêts: ${developer.interests.join(', ') || 'Aucun'}

Candidats disponibles:
${candidatesList}

Recommandez les ${limit} meilleurs développeurs pour collaborer avec ce développeur.
Le matching doit se baser sur:
1. Complémentarité des compétences (pas nécessairement identiques)
2. Niveaux compatibles
3. Objectifs et intérêts communs
4. Disponibilité

Répondez UNIQUEMENT avec un JSON array des IDs des développeurs recommandés, du plus compatible au moins compatible.
Format: [id1, id2, id3, ...]`;

      // Appeler l'API OpenAI
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant expert en matching de collaborateurs techniques. Tu réponds UNIQUEMENT avec des JSON arrays.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) {
        return recommendCollaboratorsFallback(developer, developers, limit);
      }

      // Parser la réponse JSON
      try {
        const recommendedIds = JSON.parse(content) as string[];
        const recommendedDevelopers = developers
          .filter(d => recommendedIds.includes(d.id))
          .sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id))
          .slice(0, limit);

        return recommendedDevelopers.length > 0
          ? recommendedDevelopers
          : recommendCollaboratorsFallback(developer, developers, limit);
      } catch (error) {
        console.error('Erreur parsing réponse OpenAI:', error);
        return recommendCollaboratorsFallback(developer, developers, limit);
      }
    } catch (error) {
      console.error('Erreur recommandation collaborateurs:', error);
      // Fallback
      const developer = await prisma.developerProfile.findUnique({
        where: { id: developerId },
        include: { skills: true },
      });
      if (!developer) throw error;
      const developers = await prisma.developerProfile.findMany({
        where: { id: { not: developerId } },
        include: { skills: true },
        take: 50,
      });
      return recommendCollaboratorsFallback(developer, developers, limit);
    }
  },

  // Suggérer des technologies à apprendre
  suggestTechnologies: async (developerId: string) => {
    try {
      const developer = await prisma.developerProfile.findUnique({
        where: { id: developerId },
        include: {
          skills: true,
        },
      });

      if (!developer) {
        throw new BadRequestError('Profil développeur non trouvé');
      }

      const currentSkills = developer.skills.map(s => s.name);

      if (!openai) {
        // Fallback: suggestions basiques
        const commonTechnologies = ['React', 'Node.js', 'TypeScript', 'Python', 'Docker', 'AWS'];
        return commonTechnologies.filter(tech => !currentSkills.includes(tech)).slice(0, 5);
      }

      const prompt = `Tu es un assistant pour une plateforme d'apprentissage technique.

Compétences actuelles du développeur:
${currentSkills.length > 0 ? currentSkills.join(', ') : 'Aucune compétence spécifiée'}

Niveau: ${developer.level}
Objectifs: ${developer.objectives.join(', ') || 'Aucun objectif'}

Suggère 5 technologies à apprendre qui seraient pertinentes pour ce développeur en fonction de:
1. Ses compétences actuelles
2. Son niveau
3. Ses objectifs
4. Les tendances actuelles du marché

Réponds UNIQUEMENT avec un JSON array des noms de technologies.
Format: ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"]`;

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant expert en technologies de développement. Tu réponds UNIQUEMENT avec des JSON arrays.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) {
        const commonTechnologies = ['React', 'Node.js', 'TypeScript', 'Python', 'Docker'];
        return commonTechnologies.filter(tech => !currentSkills.includes(tech)).slice(0, 5);
      }

      try {
        const suggestions = JSON.parse(content) as string[];
        return Array.isArray(suggestions) ? suggestions.slice(0, 5) : [];
      } catch (error) {
        console.error('Erreur parsing réponse OpenAI:', error);
        const commonTechnologies = ['React', 'Node.js', 'TypeScript', 'Python', 'Docker'];
        return commonTechnologies.filter(tech => !currentSkills.includes(tech)).slice(0, 5);
      }
    } catch (error) {
      console.error('Erreur suggestion technologies:', error);
      return [];
    }
  },
};

// Fonctions de fallback (recommandations basiques sans IA)
function recommendProjectsFallback(developer: any, projects: any[]) {
  const developerSkills = developer.skills.map((s: any) => s.name.toLowerCase());
  const developerLevel = developer.level;

  return projects
    .filter(project => {
      // Filtrer par niveau
      const levelMatch = project.difficulty === developerLevel ||
        (developerLevel === 'beginner' && ['beginner', 'intermediate'].includes(project.difficulty)) ||
        (developerLevel === 'intermediate' && ['beginner', 'intermediate', 'advanced'].includes(project.difficulty));

      // Vérifier si au moins une technologie correspond
      const techMatch = project.technologies.some((tech: string) =>
        developerSkills.some((skill: string) => skill.includes(tech.toLowerCase()) || tech.toLowerCase().includes(skill))
      );

      return levelMatch && (techMatch || developerSkills.length === 0);
    })
    .sort((a, b) => {
      // Trier par correspondance de technologies
      const aMatch = a.technologies.filter((t: string) =>
        developerSkills.some((s: string) => s.includes(t.toLowerCase()))
      ).length;
      const bMatch = b.technologies.filter((t: string) =>
        developerSkills.some((s: string) => s.includes(t.toLowerCase()))
      ).length;
      return bMatch - aMatch;
    })
    .slice(0, 5);
}

function recommendCollaboratorsFallback(developer: any, developers: any[], limit: number) {
  const developerSkills = developer.skills.map((s: any) => s.name.toLowerCase());

  return developers
    .map(d => {
      const dSkills = d.skills.map((s: any) => s.name.toLowerCase());
      const commonSkills = developerSkills.filter((s: string) => dSkills.includes(s)).length;
      const allSkills = [...new Set([...developerSkills, ...dSkills])].length;
      const similarity = allSkills > 0 ? commonSkills / allSkills : 0;

      // Bonus pour objectifs/intérêts communs
      const commonObjectives = developer.objectives.filter((o: string) => d.objectives.includes(o)).length;
      const commonInterests = developer.interests.filter((i: string) => d.interests.includes(i)).length;

      return {
        ...d,
        _score: similarity * 0.7 + (commonObjectives + commonInterests) * 0.15,
      };
    })
    .sort((a, b) => b._score - a._score)
    .slice(0, limit)
    .map(({ _score, ...rest }) => rest);
}
