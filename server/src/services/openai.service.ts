import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export class OpenAIService {
  /**
   * Génère un conseil motivationnel personnalisé
   */
  async generateMotivationalTip(userName: string, habits: any[]): Promise<string> {
    try {
      const habitsList = habits.map(h => h.name).join(', ');

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '150'),
        messages: [
          {
            role: 'system',
            content: `Tu es un coach de vie motivant et bienveillant. Tu donnes des conseils courts (2-3 phrases max),
                     encourageants et personnalisés pour aider les gens à maintenir leurs habitudes.`
          },
          {
            role: 'user',
            content: `Donne un conseil motivationnel à ${userName} qui travaille sur ces habitudes: ${habitsList}`
          }
        ],
      });

      return completion.choices[0]?.message?.content || 'Continuez votre excellent travail ! 💪';
    } catch (error) {
      console.error('OpenAI Error:', error);
      return 'Continuez sur votre lancée, vous faites un excellent travail ! 💪';
    }
  }

  /**
   * Analyse les habitudes et génère des insights
   */
  async analyzeHabits(habits: any[], checkIns: any[]): Promise<{
    insights: string[];
    recommendations: string[];
    strengths: string[];
    areasToImprove: string[];
  }> {
    try {
      const habitData = habits.map(h => ({
        name: h.name,
        category: h.category,
        frequency: h.frequency,
        checkInCount: checkIns.filter(c => c.habitId === h.id).length
      }));

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '800'),
        messages: [
          {
            role: 'system',
            content: `Tu es un analyste expert en développement personnel. Analyse les habitudes et donne des insights pertinents.
                     Réponds UNIQUEMENT en JSON avec cette structure exacte:
                     {
                       "insights": ["insight1", "insight2"],
                       "recommendations": ["rec1", "rec2"],
                       "strengths": ["force1", "force2"],
                       "areasToImprove": ["amélioration1", "amélioration2"]
                     }`
          },
          {
            role: 'user',
            content: `Analyse ces habitudes et leurs check-ins: ${JSON.stringify(habitData)}`
          }
        ],
      });

      const content = completion.choices[0]?.message?.content || '';
      const parsed = JSON.parse(content);

      return {
        insights: parsed.insights || [],
        recommendations: parsed.recommendations || [],
        strengths: parsed.strengths || [],
        areasToImprove: parsed.areasToImprove || []
      };
    } catch (error) {
      console.error('OpenAI Analysis Error:', error);
      return {
        insights: ['Continuez votre excellent travail !'],
        recommendations: ['Essayez de maintenir votre constance'],
        strengths: ['Vous êtes engagé dans votre développement'],
        areasToImprove: ['Continuez à vous améliorer chaque jour']
      };
    }
  }

  /**
   * Suggère de nouvelles habitudes basées sur les objectifs
   */
  async suggestHabits(userGoals: string, existingHabits: string[]): Promise<any[]> {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '600'),
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en formation d'habitudes. Suggère 3-5 habitudes pertinentes.
                     Réponds UNIQUEMENT en JSON avec un tableau d'objets ayant cette structure:
                     [{
                       "name": "Nom de l'habitude",
                       "description": "Description courte",
                       "category": "health|fitness|mental|productivity|social|other",
                       "frequency": "daily|weekly",
                       "icon": "emoji",
                       "why": "Pourquoi cette habitude est bénéfique"
                     }]`
          },
          {
            role: 'user',
            content: `Objectifs de l'utilisateur: ${userGoals}. Habitudes existantes: ${existingHabits.join(', ')}`
          }
        ],
      });

      const content = completion.choices[0]?.message?.content || '[]';
      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI Suggestions Error:', error);
      return [];
    }
  }

  /**
   * Analyse le sentiment d'une note
   */
  async analyzeSentiment(note: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative';
    score: number;
    keywords: string[];
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '200'),
        messages: [
          {
            role: 'system',
            content: `Analyse le sentiment de la note. Réponds UNIQUEMENT en JSON:
                     {
                       "sentiment": "positive|neutral|negative",
                       "score": 0-100,
                       "keywords": ["mot1", "mot2"]
                     }`
          },
          {
            role: 'user',
            content: note
          }
        ],
      });

      const content = completion.choices[0]?.message?.content || '';
      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI Sentiment Error:', error);
      return {
        sentiment: 'neutral',
        score: 50,
        keywords: []
      };
    }
  }

  /**
   * Chatbot assistant
   */
  async chat(messages: Array<{ role: string; content: string }>, userContext: any): Promise<string> {
    try {
      const systemPrompt = `Tu es un coach personnel bienveillant et motivant spécialisé dans le développement d'habitudes.

Contexte de l'utilisateur:
- Nom: ${userContext.userName}
- Niveau: ${userContext.level}
- Habitudes actives: ${userContext.habitCount}
- Points: ${userContext.totalPoints}

Tu dois:
- Être encourageant et positif
- Donner des conseils pratiques et actionnables
- Utiliser des emojis de manière appropriée
- Rester concis (3-4 phrases max)
- Personnaliser tes réponses selon le contexte`;

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '300'),
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      });

      return completion.choices[0]?.message?.content || 'Je suis là pour vous aider !';
    } catch (error) {
      console.error('OpenAI Chat Error:', error);
      return 'Désolé, je rencontre un problème. Pouvez-vous réessayer ?';
    }
  }

  /**
   * Génère un plan d'action personnalisé
   */
  async generateActionPlan(goal: string, timeframe: string): Promise<{
    steps: Array<{ week: number; action: string; tips: string[] }>;
    milestones: string[];
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '800'),
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en planification d'objectifs. Crée un plan d'action structuré.
                     Réponds UNIQUEMENT en JSON:
                     {
                       "steps": [
                         {
                           "week": 1,
                           "action": "Action principale",
                           "tips": ["conseil1", "conseil2"]
                         }
                       ],
                       "milestones": ["jalon1", "jalon2"]
                     }`
          },
          {
            role: 'user',
            content: `Objectif: ${goal}. Durée: ${timeframe}`
          }
        ],
      });

      const content = completion.choices[0]?.message?.content || '';
      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI Action Plan Error:', error);
      return {
        steps: [],
        milestones: []
      };
    }
  }

  /**
   * Génère un résumé hebdomadaire intelligent
   */
  async generateWeeklySummary(weekData: {
    checkInsCount: number;
    completedHabits: string[];
    missedHabits: string[];
    totalPoints: number;
  }): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '400'),
        messages: [
          {
            role: 'system',
            content: `Tu es un coach qui crée des résumés hebdomadaires motivants et constructifs.
                     Sois positif, mentionne les progrès, et donne 1-2 conseils pour la semaine prochaine.
                     Maximum 4-5 phrases.`
          },
          {
            role: 'user',
            content: `Cette semaine:
- ${weekData.checkInsCount} check-ins
- Habitudes complétées: ${weekData.completedHabits.join(', ')}
- Habitudes manquées: ${weekData.missedHabits.join(', ')}
- ${weekData.totalPoints} points gagnés`
          }
        ],
      });

      return completion.choices[0]?.message?.content || 'Belle semaine ! Continuez ainsi ! 💪';
    } catch (error) {
      console.error('OpenAI Summary Error:', error);
      return 'Belle semaine ! Continuez sur votre lancée ! 💪';
    }
  }
}

export const openaiService = new OpenAIService();
