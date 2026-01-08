
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, PersonalityScores } from "../types";

/**
 * Generates a deeply insightful, nuanced personality analysis using Gemini 3 Pro.
 * This service leverages the advanced reasoning capabilities of the Gemini model
 * to provide a more sophisticated psychometric report than a deterministic algorithm can.
 */
export async function getGeminiPersonalityAnalysis(scores: PersonalityScores, typeCode: string): Promise<AnalysisResult> {
  // Initialize the Gemini API client using the API key from environment variables.
  // The API key is provided by the execution context via process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Perform a comprehensive psychometric analysis for a user with the following personality profile:
- MBTI Type Code: ${typeCode}
- Detailed Scores: ${JSON.stringify(scores)} (where scores are 0-100 indicating dominance of the second trait in the pair: E-I, S-N, T-F, J-P).

The analysis must be professional, psychologically insightful, and empathetic. Focus on the nuances of this specific score distribution. 

Your response MUST be in JSON format and match the required schema.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 4000 }, // Allocate thinking budget for deep psychological reasoning
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            typeName: { type: Type.STRING, description: "The descriptive name of the archetype (e.g., 'The Architect')" },
            summary: { type: Type.STRING, description: "A high-level overview of the personality" },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            psychology: {
              type: Type.OBJECT,
              properties: {
                subconscious: { type: Type.STRING },
                paradox: { type: Type.STRING },
                motivations: { type: Type.ARRAY, items: { type: Type.STRING } },
                fears: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["subconscious", "paradox", "motivations", "fears"]
            },
            career: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                roles: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "roles"]
            },
            lifestyle: {
              type: Type.OBJECT,
              properties: {
                hobbies: { type: Type.ARRAY, items: { type: Type.STRING } },
                environment: { type: Type.STRING },
                stressRelief: { type: Type.STRING }
              },
              required: ["hobbies", "environment", "stressRelief"]
            },
            cognitiveFunctions: {
              type: Type.OBJECT,
              properties: {
                dominant: { type: Type.STRING },
                auxiliary: { type: Type.STRING },
                tertiary: { type: Type.STRING },
                inferior: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["dominant", "auxiliary", "tertiary", "inferior", "explanation"]
            },
            lifeInsights: {
              type: Type.OBJECT,
              properties: {
                work: { 
                  type: Type.OBJECT, 
                  properties: { 
                    summary: { type: Type.STRING },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                    actionableTip: { type: Type.STRING }
                  },
                  required: ["summary", "strengths", "challenges", "actionableTip"]
                },
                friendships: { 
                  type: Type.OBJECT, 
                  properties: { 
                    summary: { type: Type.STRING },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                    actionableTip: { type: Type.STRING }
                  },
                  required: ["summary", "strengths", "challenges", "actionableTip"]
                },
                relationships: { 
                  type: Type.OBJECT, 
                  properties: { 
                    summary: { type: Type.STRING },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                    actionableTip: { type: Type.STRING }
                  },
                  required: ["summary", "strengths", "challenges", "actionableTip"]
                },
                stress: { 
                  type: Type.OBJECT, 
                  properties: { 
                    summary: { type: Type.STRING },
                    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                    challenges: { type: Type.ARRAY, items: { type: Type.STRING } },
                    actionableTip: { type: Type.STRING }
                  },
                  required: ["summary", "strengths", "challenges", "actionableTip"]
                },
                growth: { type: Type.STRING },
                unhealthy: { type: Type.STRING }
              },
              required: ["work", "friendships", "relationships", "stress", "growth", "unhealthy"]
            }
          },
          required: ["typeName", "summary", "strengths", "weaknesses", "psychology", "career", "lifestyle", "cognitiveFunctions", "lifeInsights"]
        },
      },
    });

    const jsonStr = response.text.trim();
    if (!jsonStr) {
      throw new Error("Received an empty response from the AI model.");
    }
    
    // Parse the JSON output and ensure typeCode is integrated before returning
    const result = JSON.parse(jsonStr) as Omit<AnalysisResult, 'typeCode'>;
    return {
      ...result,
      typeCode: typeCode
    } as AnalysisResult;
    
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    throw error;
  }
}
