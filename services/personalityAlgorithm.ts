
import { AnalysisResult, PersonalityScores, PsychologyDeepDive, CareerVector, LifestyleVector, LifeInsightDetail } from "../types";

/**
 * Deterministic Jungian Cognitive Function Generator
 * Generates the correct functional stack (Dominant through Inferior) for all 16 MBTI types.
 */
const generateCognitiveStack = (type: string) => {
  const isE = type[0] === 'E';
  const isS = type[1] === 'S';
  const isT = type[2] === 'T';
  const isJ = type[3] === 'J';

  const judgingFunc = isT ? (isE && isJ ? 'Te' : (isE && !isJ ? 'Ti' : (isJ ? 'Te' : 'Ti'))) : (isE && isJ ? 'Fe' : (isE && !isJ ? 'Fi' : (isJ ? 'Fe' : 'Fi')));
  const perceivingFunc = isS ? (isE && !isJ ? 'Se' : (isE && isJ ? 'Si' : (!isJ ? 'Se' : 'Si'))) : (isE && !isJ ? 'Ne' : (isE && isJ ? 'Ni' : (!isJ ? 'Ne' : 'Ni')));

  let dom, aux;
  if (isE) {
    if (isJ) { dom = judgingFunc; aux = perceivingFunc; }
    else { dom = perceivingFunc; aux = judgingFunc; }
  } else {
    if (isJ) { dom = perceivingFunc; aux = judgingFunc; } 
    else { dom = judgingFunc; aux = perceivingFunc; } 
  }

  const opposites: Record<string, string> = {
    'Te': 'Fi', 'Ti': 'Fe', 'Fe': 'Ti', 'Fi': 'Te',
    'Se': 'Ni', 'Si': 'Ne', 'Ne': 'Si', 'Ni': 'Se'
  };

  const nameMap: Record<string, string> = {
    'Te': 'Extraverted Thinking', 'Ti': 'Introverted Thinking',
    'Fe': 'Extraverted Feeling', 'Fi': 'Introverted Feeling',
    'Se': 'Extraverted Sensing', 'Si': 'Introverted Sensing',
    'Ne': 'Extraverted Intuition', 'Ni': 'Introverted Intuition'
  };

  return {
    dominant: nameMap[dom],
    auxiliary: nameMap[aux],
    tertiary: nameMap[opposites[aux]],
    inferior: nameMap[opposites[dom]],
    explanation: `Your mental hierarchy is governed by ${nameMap[dom]}, leading you to process reality through a lens of ${dom.includes('i') ? 'internal reflection' : 'external action'}. This is balanced by ${nameMap[aux]}, providing you with a reliable secondary perspective.`
  };
};

const PERSONALITY_DATA: Record<string, Omit<AnalysisResult, 'typeCode'>> = {
  "INTJ": {
    typeName: "Architect",
    summary: "A visionary strategist who thrives on solving complex puzzles with surgical logic and creative depth.",
    strengths: ["Strategic Vision", "Logic-Driven", "Highly Independent", "Self-Motivated"],
    weaknesses: ["Over-Critical", "Socially Detached", "Arrogant", "Perfectionist"],
    psychology: { 
      subconscious: "A simulation engine that constantly predicts future outcomes based on current variables.", 
      paradox: "A radical idealist hidden beneath a cold, robotic exterior of pragmatism.", 
      motivations: ["Mastery", "Intellectual Autonomy", "Systemic Efficiency"], 
      fears: ["Intellectual failure", "Chaos", "Emotional vulnerability"] 
    },
    career: { title: "Chief Systems Architect", description: "Designing the blueprints of the future.", roles: ["Data Scientist", "System Analyst", "Strategic Planner"] },
    lifestyle: { hobbies: ["Technical Research", "Strategy Games", "Long-distance hiking"], environment: "A meticulously organized private laboratory or study.", stressRelief: "Data re-organization and solitude." },
    cognitiveFunctions: generateCognitiveStack("INTJ"),
    lifeInsights: {
      work: { summary: "The ultimate problem-solver who sees the invisible connections others miss.", strengths: ["Precision", "Vision"], challenges: ["Team collaboration", "Bureaucracy"], actionableTip: "Share your vision early so others can catch up to your pace." },
      friendships: { summary: "Selective and loyal, valuing intellectual synergy over casual interaction.", strengths: ["Truth-telling", "Reliability"], challenges: ["Small talk", "Emotional support"], actionableTip: "Try to appreciate the emotional context of your friends' problems." },
      relationships: { summary: "Intense, logical partners who value long-term growth and mental connection.", strengths: ["Commitment", "Depth"], challenges: ["Bluntness", "Hidden feelings"], actionableTip: "Expressing vulnerability is a strategic asset, not a weakness." },
      stress: { summary: "Under pressure, they fall into 'grip' behavior—obsessing over meaningless sensory details.", strengths: ["Sudden hyper-focus"], challenges: ["Impulsivity"], actionableTip: "Step away from the screen and engage in physical exercise." },
      growth: "Embrace your internal values (Introverted Feeling) to humanize your systemic logic.",
      unhealthy: "Cynical perfectionism leads to total isolation and elitist withdrawal."
    }
  },
  "INFP": {
    typeName: "Mediator",
    summary: "A gentle dreamer with an unyielding inner core of values and a profound capacity for empathy.",
    strengths: ["Empathetic", "Creative", "Idealistic", "Open-Minded"],
    weaknesses: ["Over-Sensitive", "Self-Critical", "Idealistic to a fault"],
    psychology: { 
      subconscious: "A moral compass that continuously checks every action against a deep well of personal integrity.", 
      paradox: "Soft and flexible on the outside, but as rigid as steel regarding core beliefs.", 
      motivations: ["Authenticity", "Expression", "Universal Harmony"], 
      fears: ["Loss of identity", "Insignificance", "Conflict"] 
    },
    career: { title: "Empathetic Visionary", description: "Giving voice to the human experience.", roles: ["Writer", "Counselor", "Social Advocate"] },
    lifestyle: { hobbies: ["Creative Writing", "Nature Walks", "Acoustic Music"], environment: "A cozy sanctuary filled with sentimental objects.", stressRelief: "Artistic expression and daydreaming." },
    cognitiveFunctions: generateCognitiveStack("INFP"),
    lifeInsights: {
      work: { summary: "Driven by purpose rather than profit, seeking to make a meaningful difference.", strengths: ["Creativity", "Integrity"], challenges: ["Rigid structures", "Deadlines"], actionableTip: "Break large projects into small, value-aligned milestones." },
      friendships: { summary: "Deep, soulful connections based on mutual understanding and non-judgment.", strengths: ["Acceptance", "Insight"], challenges: ["Withdrawing", "Over-giving"], actionableTip: "Communicate your need for space clearly so friends don't feel ghosted." },
      relationships: { summary: "Seeking 'The One' with a focus on spiritual and emotional synchronicity.", strengths: ["Devotion", "Playfulness"], challenges: ["Unrealistic expectations"], actionableTip: "Remember that conflict is an opportunity for growth, not a sign of failure." },
      stress: { summary: "When overwhelmed, they become uncharacteristically cold and rigid (Te grip).", strengths: ["Sudden productivity"], challenges: ["Hostility"], actionableTip: "Permission to fail is your best path back to balance." },
      growth: "Developing your logic (Extraverted Thinking) helps bring your beautiful dreams into reality.",
      unhealthy: "Becoming the 'Professional Martyr'—neglecting yourself to serve an impossible ideal."
    }
  },
  "ENFJ": {
    typeName: "Protagonist",
    summary: "Inspiring leaders who believe in the potential of everyone and work tirelessly to uplift their community.",
    strengths: ["Charismatic", "Empathetic", "Altruistic", "Reliable"],
    weaknesses: ["Over-Idealistic", "Too Sensitive", "Struggle with difficult decisions"],
    psychology: { 
      subconscious: "A social radar that maps the needs and potentials of everyone in the room.", 
      paradox: "A confident leader who often feels profound self-doubt in private.", 
      motivations: ["Collective Growth", "Social Harmony", "Impact"], 
      fears: ["Rejection", "Being useless", "Social discord"] 
    },
    career: { title: "Catalyst for Change", description: "Unlocking human potential through mentorship.", roles: ["Education Leader", "HR Director", "Non-Profit Founder"] },
    lifestyle: { hobbies: ["Event Planning", "Community Volunteering", "Public Speaking"], environment: "Vibrant, inclusive social hubs.", stressRelief: "Helping others solve their problems." },
    cognitiveFunctions: generateCognitiveStack("ENFJ"),
    lifeInsights: {
      work: { summary: "Natural mentors who build collaborative, high-trust environments.", strengths: ["Inspiration", "Communication"], challenges: ["Over-committing", "Conflict"], actionableTip: "You cannot pour from an empty cup; prioritize your own tasks first." },
      friendships: { summary: "The 'glue' of their social circles, always remembering birthdays and life goals.", strengths: ["Loyalty", "Support"], challenges: ["Smothering", "Ignoring boundaries"], actionableTip: "Let others support you too; vulnerability is a strength." },
      relationships: { summary: "Intensely expressive and devoted, focusing on the shared future of the couple.", strengths: ["Romance", "Planning"], challenges: ["Smothering", "Idealizing"], actionableTip: "Ground your expectations in the messy reality of everyday life." },
      stress: { summary: "Under extreme stress, they withdraw into critical, harsh logical spirals (Ti grip).", strengths: ["Sudden clarity"], challenges: ["Self-scathing"], actionableTip: "Connect with one trusted person to vent your feelings safely." },
      growth: "Strengthening your internal logic (Introverted Thinking) helps you make better long-term choices.",
      unhealthy: "Manipulative 'helpfulness' that seeks validation through others' dependence."
    }
  },
  // Adding placeholders for others to ensure the logic works for all, while enriching common ones
  "INTP": {
    typeName: "Logician",
    summary: "Innovative inventors with an unquenchable thirst for knowledge and a love for theoretical complexity.",
    strengths: ["Analytical", "Original", "Open-Minded", "Honest"],
    weaknesses: ["Disconnected", "Insensitive", "Impatient", "Second-guessing"],
    psychology: { subconscious: "An internal world of vast logical structures.", paradox: "A brilliant mind that often feels socially clumsy.", motivations: ["Understanding", "Truth"], fears: ["Incompetence"] },
    career: { title: "Theoretical Architect", description: "Solving the unsolvable.", roles: ["Software Engineer", "Philosopher", "Mathematician"] },
    lifestyle: { hobbies: ["Programming", "Strategy Games", "Philosophy"], environment: "Intellectually cluttered and private.", stressRelief: "Learning a new skill." },
    cognitiveFunctions: generateCognitiveStack("INTP"),
    lifeInsights: {
      work: { summary: "The problem-solver.", strengths: ["Objectivity"], challenges: ["Repetitive tasks"], actionableTip: "Focus on execution, not just ideation." },
      friendships: { summary: "Seeking mental stimulation.", strengths: ["No drama"], challenges: ["Distance"], actionableTip: "Express appreciation in words." },
      relationships: { summary: "Independent and direct.", strengths: ["Integrity"], challenges: ["Emotional cues"], actionableTip: "Small romantic gestures matter." },
      stress: { summary: "Emotional outbursts.", strengths: ["Sudden energy"], challenges: ["Loss of logic"], actionableTip: "Walk away and rethink the problem." },
      growth: "Embrace social empathy (Extraverted Feeling).",
      unhealthy: "Total isolation and intellectual arrogance."
    }
  }
};

// Fill the rest with dynamic mapping to prevent errors for any code
const getTemplateData = (typeCode: string): Omit<AnalysisResult, 'typeCode'> => {
  const isE = typeCode[0] === 'E';
  const isS = typeCode[1] === 'S';
  const isT = typeCode[2] === 'T';
  const isJ = typeCode[3] === 'J';

  return {
    typeName: "Dynamic Personality",
    summary: "A versatile and balanced archetype showing unique psychological flexibility.",
    strengths: [isT ? "Objective" : "Empathetic", isJ ? "Organized" : "Flexible", "Resilient"],
    weaknesses: ["Occasional Indecision", "Stress Sensitivity"],
    psychology: { subconscious: "A balanced cognitive engine.", paradox: "A mix of individual drive and social awareness.", motivations: ["Growth", "Stability"], fears: ["Loss of control"] },
    career: { title: "Strategic Specialist", description: "High-impact contributor.", roles: ["Consultant", "Analyst", "Lead"] },
    lifestyle: { hobbies: ["Exploring", "Learning", "Socializing"], environment: "Clean and inspiring.", stressRelief: "Mindfulness." },
    cognitiveFunctions: generateCognitiveStack(typeCode),
    lifeInsights: {
      work: { summary: "A reliable professional.", strengths: ["Diligence"], challenges: ["Adaptability"], actionableTip: "Focus on the big picture." },
      friendships: { summary: "A supportive ally.", strengths: ["Loyalty"], challenges: ["Communication"], actionableTip: "Initiate contact more." },
      relationships: { summary: "A devoted partner.", strengths: ["Trust"], challenges: ["Conflict"], actionableTip: "Express needs clearly." },
      stress: { summary: "Tends to over-analyze.", strengths: ["Detail focus"], challenges: ["Panic"], actionableTip: "Take slow breaths." },
      growth: "Find a mentor in your weakest trait domain.",
      unhealthy: "Over-reliance on dominant habits."
    }
  };
};

export const getDynamicDeepDive = (scores: PersonalityScores, typeCode: string): {title: string, content: string}[] => {
  const insights: {title: string, content: string}[] = [];
  const traits = [
    { name: 'Extraversion', value: scores.Extraversion, left: 'Introversion', right: 'Extraversion' },
    { name: 'Sensing', value: scores.Sensing, left: 'Intuition', right: 'Observant' },
    { name: 'Thinking', value: scores.Thinking, left: 'Feeling', right: 'Thinking' },
    { name: 'Judging', value: scores.Judging, left: 'Prospecting', right: 'Judging' }
  ];
  
  const dominant = traits.reduce((prev, curr) => 
    Math.abs(curr.value - 50) > Math.abs(prev.value - 50) ? curr : prev
  );

  insights.push({
    title: `Dominant Vector: ${dominant.value > 50 ? dominant.right : dominant.left}`,
    content: `Your high preference for ${dominant.value > 50 ? dominant.right : dominant.left} is the primary filter through which you view the world.`
  });

  return insights;
};

export const getPersonalityAnalysisAlgorithmic = (scores: PersonalityScores, typeCode: string): AnalysisResult => {
  const baseData = PERSONALITY_DATA[typeCode] || getTemplateData(typeCode);

  return {
    ...baseData,
    typeCode,
  } as AnalysisResult;
};
