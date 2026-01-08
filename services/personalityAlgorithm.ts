
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
    explanation: `Your mental hierarchy leads with ${nameMap[dom]}, focusing your energy on ${dom.includes('i') ? 'internal' : 'external'} ${dom.startsWith('T') || dom.startsWith('F') ? 'judgment' : 'perception'}.`
  };
};

const PERSONALITY_DATA: Record<string, Omit<AnalysisResult, 'typeCode'>> = {
  "INTJ": {
    typeName: "Architect",
    summary: "Strategic, imaginative, and logical masterminds.",
    strengths: ["Strategic", "Logical", "Independent", "Determined"],
    weaknesses: ["Arrogant", "Critical", "Dismissive"],
    psychology: { subconscious: "Future-simulation engine.", paradox: "Cold exterior, idealistic interior.", motivations: ["Efficiency", "Mastery"], fears: ["Intellectual failure"] },
    career: { title: "Strategic Specialist", description: "Complex problem solvers.", roles: ["Systems Architect", "Analyst"] },
    lifestyle: { hobbies: ["Chess", "Hiking", "Technical Research"], environment: "Quiet and orderly.", stressRelief: "Data organization." },
    cognitiveFunctions: generateCognitiveStack("INTJ"),
    lifeInsights: {
      work: { summary: "The ultimate fixers.", strengths: ["Long-term vision"], challenges: ["Impatience"], actionableTip: "Communicate your 'why'." },
      friendships: { summary: "Intellectual peers wanted.", strengths: ["Loyalty"], challenges: ["Aloofness"], actionableTip: "Show verbal appreciation." },
      relationships: { summary: "Team-based logic.", strengths: ["Commitment"], challenges: ["Bluntness"], actionableTip: "Practice active listening." },
      stress: { summary: "Tunnel-vision detail obsession.", strengths: ["Focus"], challenges: ["Impulsivity"], actionableTip: "Get physical exercise." },
      growth: "Embrace your internal values (Fi) to humanize your logic.",
      unhealthy: "Cynical perfectionism and social withdrawal."
    }
  },
  "INTP": {
    typeName: "Logician",
    summary: "Innovative inventors with an unquenchable thirst for knowledge.",
    strengths: ["Analytical", "Original", "Open-minded", "Objective"],
    weaknesses: ["Disconnected", "Insensitive", "Impatient"],
    psychology: { subconscious: "Theory-building laboratory.", paradox: "Deeply logical but prone to wild curiosity.", motivations: ["Understanding", "Consistency"], fears: ["Intellectual stagnation"] },
    career: { title: "Theoretical Researcher", description: "Solving abstract puzzles.", roles: ["Software Engineer", "Philosopher", "Mathematician"] },
    lifestyle: { hobbies: ["Programming", "Gaming", "Reading"], environment: "Intellectually cluttered.", stressRelief: "Exploring new concepts." },
    cognitiveFunctions: generateCognitiveStack("INTP"),
    lifeInsights: {
      work: { summary: "The problem-solver.", strengths: ["Creativity"], challenges: ["Routine tasks"], actionableTip: "Focus on execution, not just ideation." },
      friendships: { summary: "Seeking mental stimulation.", strengths: ["Honesty"], challenges: ["Emotional distance"], actionableTip: "Validate others' feelings even if illogical." },
      relationships: { summary: "Thoughtful and direct.", strengths: ["Integrity"], challenges: ["Communication gaps"], actionableTip: "Express your affection more explicitly." },
      stress: { summary: "Emotional outbursts.", strengths: ["Sudden clarity"], challenges: ["Loss of logic"], actionableTip: "Talk through the logic of your stress." },
      growth: "Develop social empathy (Fe).",
      unhealthy: "Total isolation and intellectual arrogance."
    }
  },
  "ENTJ": {
    typeName: "Commander",
    summary: "Bold, imaginative and strong-willed leaders.",
    strengths: ["Efficient", "Energetic", "Confident", "Strong-willed"],
    weaknesses: ["Stubborn", "Intolerant", "Impatient", "Arrogant"],
    psychology: { subconscious: "Operational efficiency engine.", paradox: "Hard-driving leader with a hidden sensitive core.", motivations: ["Structure", "Achievement"], fears: ["Inefficiency"] },
    career: { title: "Executive Leader", description: "Directing large-scale operations.", roles: ["CEO", "Entrepreneur", "Judge"] },
    lifestyle: { hobbies: ["Networking", "Strategy Games", "Fitness"], environment: "Structured and prestigious.", stressRelief: "Competitive action." },
    cognitiveFunctions: generateCognitiveStack("ENTJ"),
    lifeInsights: {
      work: { summary: "Natural born leader.", strengths: ["Strategic vision"], challenges: ["Intolerance"], actionableTip: "Learn to delegate with trust." },
      friendships: { summary: "Building high-performance networks.", strengths: ["Reliability"], challenges: ["Dominating"], actionableTip: "Practice listening more than speaking." },
      relationships: { summary: "Stable and goal-oriented.", strengths: ["Directness"], challenges: ["Emotional bluntness"], actionableTip: "Emotional support is a strategic win." },
      stress: { summary: "Hypersensitivity to failure.", strengths: ["Focus"], challenges: ["Rage"], actionableTip: "Step back and reflect on the big picture." },
      growth: "Connect with your inner values (Fi).",
      unhealthy: "Ruthless pragmatism and power-seeking."
    }
  },
  "ENTP": {
    typeName: "Debater",
    summary: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    strengths: ["Knowledgeable", "Quick thinker", "Original"],
    weaknesses: ["Argumentative", "Insensitive", "Intolerant"],
    psychology: { subconscious: "Possibility engine.", paradox: "Charming skeptic.", motivations: ["Understanding", "Challenge"], fears: ["Boredom"] },
    career: { title: "Innovative Visionary", description: "Challenging the status quo.", roles: ["Entrepreneur", "Lawyer", "Consultant"] },
    lifestyle: { hobbies: ["Debating", "Tech", "Travel"], environment: "Unstructured and stimulating.", stressRelief: "New ideas." },
    cognitiveFunctions: generateCognitiveStack("ENTP"),
    lifeInsights: {
      work: { summary: "Brainstorming champion.", strengths: ["Quick wit"], challenges: ["Follow-through"], actionableTip: "Partner with an organizer." },
      friendships: { summary: "Sparring partners wanted.", strengths: ["Originality"], challenges: ["Insensitivity"], actionableTip: "Agree to disagree sometimes." },
      relationships: { summary: "Endless exploration.", strengths: ["Enthusiasm"], challenges: ["Consistency"], actionableTip: "Routine can be romantic." },
      stress: { summary: "Obsessive sensory data check.", strengths: ["Research"], challenges: ["Withdrawal"], actionableTip: "Brainstorm a way out." },
      growth: "Follow through on your ideas (Si).",
      unhealthy: "Intellectual arrogance and chaos."
    }
  },
  "INFJ": {
    typeName: "Advocate",
    summary: "Quiet and mystical, yet very inspiring and tireless idealists.",
    strengths: ["Insightful", "Principled", "Passionate", "Altruistic"],
    weaknesses: ["Sensitive", "Private", "Burnout-prone"],
    psychology: { subconscious: "Global pattern recognition.", paradox: "Abstract visionary who is grounded by deep empathy.", motivations: ["Authenticity", "Helping"], fears: ["Vulnerability"] },
    career: { title: "Compassionate Strategist", description: "Long-term human development.", roles: ["Psychologist", "Spiritual Leader", "UX Designer"] },
    lifestyle: { hobbies: ["Writing", "Art", "Meditation"], environment: "Sanctuary-like.", stressRelief: "Solitude." },
    cognitiveFunctions: generateCognitiveStack("INFJ"),
    lifeInsights: {
      work: { summary: "The quiet leader.", strengths: ["Insight"], challenges: ["Conflict avoidance"], actionableTip: "Trust your intuition aloud." },
      friendships: { summary: "The 'Old Soul' friend.", strengths: ["Deep listening"], challenges: ["Over-giving"], actionableTip: "Set emotional boundaries." },
      relationships: { summary: "Intense and soulful.", strengths: ["Devotion"], challenges: ["Idealization"], actionableTip: "Communicate small needs." },
      stress: { summary: "Sensory overwhelm.", strengths: ["Hidden focus"], challenges: ["Indulgence"], actionableTip: "Return to your core values." },
      growth: "Engage with the physical world (Se).",
      unhealthy: "Elitist withdrawal and door-slamming."
    }
  },
  "INFP": {
    typeName: "Mediator",
    summary: "Idealistic, empathetic, and creative souls.",
    strengths: ["Empathetic", "Creative", "Passionate"],
    weaknesses: ["Idealistic", "Self-critical"],
    psychology: { subconscious: "Harmony engine.", paradox: "Soft but unyielding values.", motivations: ["Authenticity"], fears: ["Loss of meaning"] },
    career: { title: "Creative Humanist", description: "Improving the human condition.", roles: ["Writer", "Counselor", "Social Advocate"] },
    lifestyle: { hobbies: ["Journaling", "Photography", "Acoustic Music"], environment: "Artistic and safe.", stressRelief: "Nature retreat." },
    cognitiveFunctions: generateCognitiveStack("INFP"),
    lifeInsights: {
      work: { summary: "Mission-driven focus.", strengths: ["Innovation"], challenges: ["Deadlines"], actionableTip: "Personalize your routines." },
      friendships: { summary: "Soul-level connection.", strengths: ["Non-judgmental"], challenges: ["Withdrawing"], actionableTip: "Stay connected even when dreaming." },
      relationships: { summary: "Soulmate seekers.", strengths: ["Tenderness"], challenges: ["Unrealistic expectations"], actionableTip: "Conflict is healthy growth." },
      stress: { summary: "Hyper-critical rigid state.", strengths: ["Efficiency burst"], challenges: ["Micromanaging"], actionableTip: "Permission to be okay." },
      growth: "Develop concrete plans (Te) to manifest your vision.",
      unhealthy: "The Martyr syndrome and escapism."
    }
  },
  "ENFJ": {
    typeName: "Protagonist",
    summary: "Charismatic leaders who inspire and move people.",
    strengths: ["Charismatic", "Empathetic", "Reliable"],
    weaknesses: ["Sensitive", "Over-idealistic"],
    psychology: { subconscious: "Social optimizer.", paradox: "Surrounded but lonely.", motivations: ["Collective growth"], fears: ["Social rejection"] },
    career: { title: "Human Potential Advocate", description: "Visionary mentorship.", roles: ["Leader", "Coach", "Public Speaker"] },
    lifestyle: { hobbies: ["Volunteering", "Events", "Group Dynamics"], environment: "Collaborative and warm.", stressRelief: "Talking it out." },
    cognitiveFunctions: generateCognitiveStack("ENFJ"),
    lifeInsights: {
      work: { summary: "Leading via inspiration.", strengths: ["Communication"], challenges: ["Over-committing"], actionableTip: "Saying no is service too." },
      friendships: { summary: "Social circle glue.", strengths: ["Support"], challenges: ["Smothering"], actionableTip: "Vulnerability builds bonds." },
      relationships: { summary: "Deeply expressive love.", strengths: ["Listening"], challenges: ["Idealizing"], actionableTip: "Ground expectations in reality." },
      stress: { summary: "Critical logical withdrawal.", strengths: ["Analysis"], challenges: ["Self-sacrifice"], actionableTip: "Focus on your own center." },
      growth: "Balance feeling with internal logic (Ti).",
      unhealthy: "Manipulative social forcing for validation."
    }
  },
  "ENFP": {
    typeName: "Campaigner",
    summary: "Enthusiastic, creative and sociable free spirits.",
    strengths: ["Curious", "Observant", "Energetic", "Friendly"],
    weaknesses: ["Poor follow-through", "Overthinker", "Highly emotional"],
    psychology: { subconscious: "Possibility synthesizer.", paradox: "Optimistic socialite who needs deep private meaning.", motivations: ["Exploration", "Self-expression"], fears: ["Constraint"] },
    career: { title: "Creative Explorer", description: "Energizing people and projects.", roles: ["Designer", "Journalist", "Creative Director"] },
    lifestyle: { hobbies: ["Art", "Travel", "Writing"], environment: "Stimulating and diverse.", stressRelief: "Social novelty." },
    cognitiveFunctions: generateCognitiveStack("ENFP"),
    lifeInsights: {
      work: { summary: "The idea fountain.", strengths: ["Enthusiasm"], challenges: ["Structure"], actionableTip: "Set micro-deadlines to stay focused." },
      friendships: { summary: "Deep and wide social circle.", strengths: ["Supportive"], challenges: ["Over-commitment"], actionableTip: "Quality over quantity in time spent." },
      relationships: { summary: "Passionate and playful.", strengths: ["Affection"], challenges: ["Distraction"], actionableTip: "Anchor your excitement in shared stability." },
      stress: { summary: "Obsessive detail-checking.", strengths: ["Hidden focus"], challenges: ["Panic"], actionableTip: "Breathe and trust the flow." },
      growth: "Develop consistent habits (Si).",
      unhealthy: "Scattered energy and chronic indecision."
    }
  },
  "ISTJ": {
    typeName: "Logistician",
    summary: "Practical, fact-minded, and reliable individuals.",
    strengths: ["Reliable", "Responsible", "Direct"],
    weaknesses: ["Stubborn", "Judgmental", "Rigid"],
    psychology: { subconscious: "The Archivist.", paradox: "Traditional yet highly adaptive to proven systems.", motivations: ["Stability", "Honesty"], fears: ["Chaos", "Incompetence"] },
    career: { title: "Systems Guardian", description: "Precision and integrity.", roles: ["Auditor", "Admin", "Engineer"] },
    lifestyle: { hobbies: ["Organizing", "Crafts", "Collecting"], environment: "Structured and clean.", stressRelief: "Checking lists." },
    cognitiveFunctions: generateCognitiveStack("ISTJ"),
    lifeInsights: {
      work: { summary: "Efficiency through order.", strengths: ["Integrity"], challenges: ["Change resistance"], actionableTip: "Try one new method a month." },
      friendships: { summary: "Steady and loyal.", strengths: ["Dependability"], challenges: ["Emotional expression"], actionableTip: "Reliability is your love language." },
      relationships: { summary: "Stable team building.", strengths: ["Duty"], challenges: ["Emotional distance"], actionableTip: "Schedule quality time." },
      stress: { summary: "Catastrophizing the future.", strengths: ["Attention to detail"], challenges: ["Panic"], actionableTip: "Break tasks into tiny steps." },
      growth: "Open up to new possibilities (Ne).",
      unhealthy: "Obsessive micromanagement and inflexibility."
    }
  },
  "ISFJ": {
    typeName: "Defender",
    summary: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    strengths: ["Supportive", "Reliable", "Patient", "Observant"],
    weaknesses: ["Humble to a fault", "Too private", "Over-committed"],
    psychology: { subconscious: "Traditional caretaking.", paradox: "Reserved protector who notices every detail.", motivations: ["Security", "Connection"], fears: ["Instability"] },
    career: { title: "Community Pillar", description: "Reliable service to others.", roles: ["Nurse", "Teacher", "Librarian"] },
    lifestyle: { hobbies: ["Gardening", "Cooking", "Home Improvement"], environment: "Cozy and historic.", stressRelief: "Routine." },
    cognitiveFunctions: generateCognitiveStack("ISFJ"),
    lifeInsights: {
      work: { summary: "The unsung hero.", strengths: ["Loyalty"], challenges: ["Self-promotion"], actionableTip: "Don't be afraid to take credit for your work." },
      friendships: { summary: "The dependable listener.", strengths: ["Kindness"], challenges: ["Suppressed anger"], actionableTip: "Communicate your needs early." },
      relationships: { summary: "Devoted and caring.", strengths: ["Reliability"], challenges: ["Conflict avoidance"], actionableTip: "Open honesty is a form of care." },
      stress: { summary: "Impulsive catastrophic thinking.", strengths: ["Hidden focus"], challenges: ["Anxiety"], actionableTip: "Remind yourself of past successes." },
      growth: "Embrace logical objectivity (Ti).",
      unhealthy: "Passive-aggressive martyrdom."
    }
  },
  "ESTJ": {
    typeName: "Executive",
    summary: "Excellent administrators, unsurpassed at managing things – or people.",
    strengths: ["Dedicated", "Strong-willed", "Direct", "Reliable"],
    weaknesses: ["Inflexible", "Judgmental", "Too focused on status"],
    psychology: { subconscious: "Hierarchical structure.", paradox: "Traditional leader who values community stability.", motivations: ["Order", "Results"], fears: ["Chaos"] },
    career: { title: "Organizational Leader", description: "Managing complex systems.", roles: ["Project Manager", "Officer", "Administrator"] },
    lifestyle: { hobbies: ["Team Sports", "Civic Clubs", "Home repair"], environment: "Efficient and traditional.", stressRelief: "Hard work." },
    cognitiveFunctions: generateCognitiveStack("ESTJ"),
    lifeInsights: {
      work: { summary: "The manager.", strengths: ["Organization"], challenges: ["Inflexibility"], actionableTip: "Listen to new ideas before dismissing them." },
      friendships: { summary: "The group organizer.", strengths: ["Consistency"], challenges: ["Bossiness"], actionableTip: "Let others lead the plans sometimes." },
      relationships: { summary: "Stable and protective.", strengths: ["Commitment"], challenges: ["Emotional coldness"], actionableTip: "Show affection through words, not just tasks." },
      stress: { summary: "Hypersensitive emotional withdrawal.", strengths: ["Sudden depth"], challenges: ["Fragility"], actionableTip: "Accept your feelings as valid data." },
      growth: "Connect with abstract ideas (Ne).",
      unhealthy: "Tyrannical control and rigidity."
    }
  },
  "ESFJ": {
    typeName: "Consul",
    summary: "Extraordinarily caring, social and popular people, always eager to help.",
    strengths: ["Strong practical skills", "Warm", "Loyal", "Social"],
    weaknesses: ["Worried about status", "Inflexible", "Reluctant to innovate"],
    psychology: { subconscious: "Social harmony engine.", paradox: "The 'Mother' archetype of their group.", motivations: ["Belonging", "Social order"], fears: ["Ostracism"] },
    career: { title: "Social Coordinator", description: "Fostering community growth.", roles: ["HR Manager", "Teacher", "Sales Lead"] },
    lifestyle: { hobbies: ["Socializing", "Event hosting", "Family time"], environment: "Warm and inviting.", stressRelief: "Social connection." },
    cognitiveFunctions: generateCognitiveStack("ESFJ"),
    lifeInsights: {
      work: { summary: "The team builder.", strengths: ["Empathy"], challenges: ["Impersonal logic"], actionableTip: "Balance people needs with technical needs." },
      friendships: { summary: "The proactive friend.", strengths: ["Generosity"], challenges: ["Seeking approval"], actionableTip: "Value yourself apart from others' opinions." },
      relationships: { summary: "Deeply committed.", strengths: ["Affection"], challenges: ["Sensitivity to criticism"], actionableTip: "Critique of actions isn't a critique of your soul." },
      stress: { summary: "Overly critical logical spiral.", strengths: ["Sudden edge"], challenges: ["Hyper-logic"], actionableTip: "Breathe and return to your values." },
      growth: "Develop objective analysis (Ti).",
      unhealthy: "Manipulative people-pleasing."
    }
  },
  "ISTP": {
    typeName: "Virtuoso",
    summary: "Bold and practical experimenters, masters of all kinds of tools.",
    strengths: ["Optimistic", "Creative", "Practical", "Relaxed"],
    weaknesses: ["Stubborn", "Insensitive", "Easily bored"],
    psychology: { subconscious: "Mechanical analysis.", paradox: "Cool observer who is capable of sudden action.", motivations: ["Freedom", "Problem-solving"], fears: ["Helplessness"] },
    career: { title: "Technical Expert", description: "Hands-on problem solving.", roles: ["Pilot", "Mechanic", "Surgeon"] },
    lifestyle: { hobbies: ["DIY", "Motorcycles", "Surfing"], environment: "Tactile and functional.", stressRelief: "Physical exertion." },
    cognitiveFunctions: generateCognitiveStack("ISTP"),
    lifeInsights: {
      work: { summary: "The troubleshooter.", strengths: ["Pragmatism"], challenges: ["Commitment"], actionableTip: "Stick with projects through the 'boring' phase." },
      friendships: { summary: "The easy-going ally.", strengths: ["Freedom"], challenges: ["Distance"], actionableTip: "Initiate contact once in a while." },
      relationships: { summary: "Independent but loyal.", strengths: ["Honesty"], challenges: ["Emotional expression"], actionableTip: "Actions speak loud, but words are needed too." },
      stress: { summary: "Emotional instability.", strengths: ["Sudden warmth"], challenges: ["Meltdown"], actionableTip: "Identify the mechanical flaw in your day." },
      growth: "Connect with long-term vision (Ni).",
      unhealthy: "Cynical detachment and risky behavior."
    }
  },
  "ISFP": {
    typeName: "Adventurer",
    summary: "Flexible and charming artists, always ready to explore and experience something new.",
    strengths: ["Charming", "Sensitive", "Imaginative", "Passionate"],
    weaknesses: ["Fiercely independent", "Unpredictable", "Easily stressed"],
    psychology: { subconscious: "Aesthetic value engine.", paradox: "Quiet observer with a fiercely passionate inner soul.", motivations: ["Authenticity", "Sensory experience"], fears: ["Limitation"] },
    career: { title: "Creative Artisan", description: "Visual and sensory expression.", roles: ["Artist", "Chef", "Fashion Designer"] },
    lifestyle: { hobbies: ["Art", "Hiking", "Music"], environment: "Aesthetically pleasing.", stressRelief: "Creative release." },
    cognitiveFunctions: generateCognitiveStack("ISFP"),
    lifeInsights: {
      work: { summary: "The artistic contributor.", strengths: ["Authenticity"], challenges: ["Long-term planning"], actionableTip: "Set goals that align with your values." },
      friendships: { summary: "The gentle companion.", strengths: ["Empathy"], challenges: ["Avoidance"], actionableTip: "Face conflicts rather than running." },
      relationships: { summary: "Intense and present.", strengths: ["Devotion"], challenges: ["Sensitivity"], actionableTip: "Practice verbalizing your internal world." },
      stress: { summary: "Overly critical and bossy.", strengths: ["Hidden logic"], challenges: ["Aggression"], actionableTip: "Engage in a sensory activity (Se)." },
      growth: "Engage with objective systems (Te).",
      unhealthy: "Self-destructive impulsivity and isolation."
    }
  },
  "ESTP": {
    typeName: "Entrepreneur",
    summary: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    strengths: ["Bold", "Rational", "Direct", "Perceptive"],
    weaknesses: ["Risk-prone", "Impatient", "Insensitive"],
    psychology: { subconscious: "Kinetic adaptation.", paradox: "Action-oriented but logically detached.", motivations: ["Impact", "Thrills"], fears: ["Boredom"] },
    career: { title: "Tactical Responder", description: "Real-time problem solving.", roles: ["Entrepreneur", "Emergency Services", "Stock Trader"] },
    lifestyle: { hobbies: ["Extreme Sports", "Fast Cars", "Nightlife"], environment: "Fast-paced.", stressRelief: "Action." },
    cognitiveFunctions: generateCognitiveStack("ESTP"),
    lifeInsights: {
      work: { summary: "The fire-fighter.", strengths: ["Pragmatism"], challenges: ["Strategy"], actionableTip: "Think 3 steps ahead." },
      friendships: { summary: "The adventurous companion.", strengths: ["Presence"], challenges: ["Depth"], actionableTip: "Slow down for feelings." },
      relationships: { summary: "Dynamic and fun.", strengths: ["Honesty"], challenges: ["Commitment"], actionableTip: "Commitment is a long-game skill." },
      stress: { summary: "Paranoid suspicion.", strengths: ["Sudden depth"], challenges: ["Stalling"], actionableTip: "Exercise to ground yourself." },
      growth: "Develop your internal foresight (Ni).",
      unhealthy: "Reckless thrill-seeking and narcissism."
    }
  },
  "ESFP": {
    typeName: "Entertainer",
    summary: "Spontaneous, energetic, and enthusiastic people.",
    strengths: ["Bold", "Practical", "Social"],
    weaknesses: ["Easily bored", "Poor planners"],
    psychology: { subconscious: "The Performer.", paradox: "Life of party but deeply sensitive private self.", motivations: ["Pleasure", "Connection"], fears: ["Restriction"] },
    career: { title: "Dynamic Presenter", description: "Engagement and action.", roles: ["Artist", "Sales", "Host"] },
    lifestyle: { hobbies: ["Fashion", "Parties", "Sports"], environment: "Vibrant and aesthetic.", stressRelief: "Laughter and dance." },
    cognitiveFunctions: generateCognitiveStack("ESFP"),
    lifeInsights: {
      work: { summary: "Energy injection.", strengths: ["Adaptability"], challenges: ["Focus"], actionableTip: "Gamify your boring tasks." },
      friendships: { summary: "Generous and fun.", strengths: ["Warmth"], challenges: ["Conflict avoidance"], actionableTip: "Be the listener sometimes." },
      relationships: { summary: "Excitement and passion.", strengths: ["Presentness"], challenges: ["Long-term commitment"], actionableTip: "Plan a future milestone." },
      stress: { summary: "Paranoid future-guessing.", strengths: ["Awareness"], challenges: ["Panic"], actionableTip: "Trust your current senses." },
      growth: "Develop a long-term vision (Ni).",
      unhealthy: "Reckless pleasure-seeking and denial."
    }
  }
};

const DEFAULT_INSIGHT = (typeCode: string): LifeInsightDetail => ({
  summary: `As an ${typeCode}, you bring a balanced approach to this area of life.`,
  strengths: ["Adaptability", "Engagement"],
  challenges: ["Consistency"],
  actionableTip: "Lean into your core strengths while being mindful of your specific type dynamics."
});

const DEFAULT_PSYCHOLOGY: PsychologyDeepDive = {
  subconscious: "A balanced cognitive engine prioritizing both adaptation and integrity.",
  paradox: "A mix of individual drive and social awareness.",
  motivations: ["Authenticity", "Growth", "Impact"],
  fears: ["Irrelevance", "Stagnation"]
};

export const getDynamicDeepDive = (scores: PersonalityScores, typeCode: string): {title: string, content: string}[] => {
  const insights: {title: string, content: string}[] = [];
  const traits = [
    { name: 'Extraversion', value: scores.Extraversion, left: 'Introversion', right: 'Extraversion' },
    { name: 'Sensing', value: scores.Sensing, left: 'Intuition', right: 'Sensing' },
    { name: 'Thinking', value: scores.Thinking, left: 'Feeling', right: 'Thinking' },
    { name: 'Judging', value: scores.Judging, left: 'Prospecting', right: 'Judging' }
  ];
  
  const dominant = traits.reduce((prev, curr) => 
    Math.abs(curr.value - 50) > Math.abs(prev.value - 50) ? curr : prev
  );

  insights.push({
    title: `Primary Cognitive Pivot: ${dominant.value > 50 ? dominant.right : dominant.left}`,
    content: `Your ${Math.abs(dominant.value - 50) + 50}% orientation toward ${dominant.value > 50 ? dominant.right : dominant.left} is the defining trait of your psychological structure.`
  });

  return insights;
};

export const getPersonalityAnalysisAlgorithmic = (scores: PersonalityScores, typeCode: string): AnalysisResult => {
  const baseData = PERSONALITY_DATA[typeCode] || {
    typeName: "Equanimous Archetype",
    summary: "A versatile profile showing significant psychological flexibility.",
    strengths: ["Adaptability", "Pragmatism"],
    weaknesses: ["Indecision"],
    psychology: DEFAULT_PSYCHOLOGY,
    career: { title: "Versatile Generalist", description: "Balanced skills across diverse domains.", roles: ["Consultant", "Educator", "Project Manager"] },
    lifestyle: { hobbies: ["Reading", "Walking", "Social Exploration"], environment: "Balanced between quiet and engagement.", stressRelief: "Variety of activity." },
    cognitiveFunctions: generateCognitiveStack(typeCode),
    lifeInsights: { 
        work: DEFAULT_INSIGHT(typeCode), 
        friendships: DEFAULT_INSIGHT(typeCode), 
        relationships: DEFAULT_INSIGHT(typeCode), 
        stress: DEFAULT_INSIGHT(typeCode),
        growth: "Focusing on a specific mastery and deepening impact.",
        unhealthy: "Lack of direction and scattered energy."
    }
  };

  return {
    ...baseData,
    typeCode,
  } as AnalysisResult;
};
