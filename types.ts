
export enum Dimension {
  EI = 'Extraversion_Introversion',
  SN = 'Sensing_Intuition',
  TF = 'Thinking_Feeling',
  JP = 'Judging_Perceiving'
}

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  reverse: boolean; 
}

export interface UserResponse {
  questionId: number;
  value: number; 
}

export interface PersonalityScores {
  Extraversion: number;
  Sensing: number;
  Thinking: number;
  Judging: number;
}

export interface PsychologyDeepDive {
  subconscious: string;
  paradox: string;
  motivations: string[];
  fears: string[];
}

export interface CareerVector {
  title: string;
  description: string;
  roles: string[];
}

export interface LifestyleVector {
  hobbies: string[];
  environment: string;
  stressRelief: string;
}

export interface LifeInsightDetail {
  summary: string;
  strengths: string[];
  challenges: string[];
  actionableTip: string;
}

export interface AnalysisResult {
  typeCode: string;
  typeName: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  psychology: PsychologyDeepDive;
  career: CareerVector;
  lifestyle: LifestyleVector;
  cognitiveFunctions: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
    explanation: string;
  };
  lifeInsights: {
    work: LifeInsightDetail;
    friendships: LifeInsightDetail;
    relationships: LifeInsightDetail;
    stress: LifeInsightDetail;
    growth: string;
    unhealthy: string;
  };
}
