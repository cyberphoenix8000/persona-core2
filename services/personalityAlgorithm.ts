
import { AnalysisResult, PersonalityScores } from "../types";

/**
 * Deterministic Jungian Cognitive Function Generator
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
  // ANALYSTS (NT)
  "INTJ": {
    typeName: "Architect (Introverted, Intuitive, Thinking, Judging)",
    summary: "Strategic masterminds with an insatiable thirst for knowledge and a surgical approach to problem-solving.",
    strengths: ["Strategic Vision", "High Autonomy", "Logical Precision", "Determination"],
    weaknesses: ["Arrogance", "Emotional Blindness", "Over-critical", "Social Detachment"],
    psychology: { 
      subconscious: "A probabilistic engine that simulations thousands of future timelines simultaneously.", 
      paradox: "A radical idealist who hides behind a shield of cold, pragmatic realism.", 
      motivations: ["Universal Mastery", "Structural Integrity", "Efficiency"], 
      fears: ["Intellectual Failure", "Emotional Entrapment", "Unpredictability"] 
    },
    career: { title: "Chief Systems Strategist", description: "Blueprinting long-term systemic evolution.", roles: ["CEO", "Lead Architect", "Political Scientist"] },
    lifestyle: { hobbies: ["Chess", "Technical Research", "Solo Exploration"], environment: "A minimalist, hyper-organized sanctuary.", stressRelief: "Data re-classification and heavy exercise." },
    cognitiveFunctions: generateCognitiveStack("INTJ"),
    lifeInsights: {
      work: { summary: "The ultimate independent contributor who values competence above all.", strengths: ["Long-term Vision", "Efficiency"], challenges: ["Micro-management", "Soft Skills"], actionableTip: "Invest in building social capital; it's a strategic resource." },
      friendships: { summary: "Few but intense connections built on intellectual mutual respect.", strengths: ["Loyalty", "Brutal Honesty"], challenges: ["Emotional validation", "Availability"], actionableTip: "Try to understand the 'logic' of emotions rather than dismissing them." },
      relationships: { summary: "Logical partners who seek a 'power couple' dynamic and mutual growth.", strengths: ["Stability", "Commitment"], challenges: ["Vulnerability", "Small talk"], actionableTip: "Explicitly schedule 'check-ins' to discuss feelings to avoid emotional buildup." },
      stress: { summary: "In 'Grip' (Inferior Se), they become obsessed with sensory input—overeating, cleaning, or risky physical behavior.", strengths: ["Sudden hyper-focus"], challenges: ["Impulsivity"], actionableTip: "Force yourself into nature; the complexity of biology calms your systems." },
      growth: "Embrace Introverted Feeling (Fi) to discover a deeper sense of personal purpose beyond raw efficiency.",
      unhealthy: "The 'Elitist Hermit'—believing everyone is beneath their intellect and withdrawing into total cynicism."
    }
  },
  "INTP": {
    typeName: "Logician (Introverted, Intuitive, Thinking, Perceiving)",
    summary: "Brilliant theorists who love analyzing complex systems and finding the underlying principles of reality.",
    strengths: ["Originality", "Abstract Reasoning", "Intellectual Honesty", "Adaptability"],
    weaknesses: ["Absent-mindedness", "Insensitivity", "Procrastination", "Self-doubt"],
    psychology: { 
      subconscious: "A recursive loop of 'Why?' and 'How?' that never accepts the status quo.", 
      paradox: "A person who seeks objective truth but constantly doubts their own conclusions.", 
      motivations: ["Logical Consistency", "Knowledge Acquisition", "Autonomy"], 
      fears: ["Intellectual Incompetence", "Emotional Outbursts", "Social Conformity"] 
    },
    career: { title: "Theoretical Innovator", description: "Solving problems others don't even see yet.", roles: ["Physics Researcher", "Software Engineer", "Philosopher"] },
    lifestyle: { hobbies: ["Programming", "Tabletop RPGs", "Deep Reading"], environment: "Intellectually cluttered but functionally useful.", stressRelief: "Solving a completely new, unrelated puzzle." },
    cognitiveFunctions: generateCognitiveStack("INTP"),
    lifeInsights: {
      work: { summary: "The 'Ideas Person' who thrives in research and development.", strengths: ["Objectivity", "Creativity"], challenges: ["Routine Tasks", "Implementation"], actionableTip: "Find a 'Judger' partner to help you push your theories into reality." },
      friendships: { summary: "Low-maintenance friends who value deep intellectual rabbit-holes.", strengths: ["Non-judgmental", "Insightful"], challenges: ["Reliability", "Social cues"], actionableTip: "Remember that 'I'm thinking of you' is a logical step in friendship maintenance." },
      relationships: { summary: "Authentic and independent, requiring significant space for mental exploration.", strengths: ["Integrity", "Calmness"], challenges: ["Expressing affection", "Boredom"], actionableTip: "Verbalizing your appreciation is more effective than assuming they 'just know' it's logical." },
      stress: { summary: "In 'Grip' (Inferior Fe), they become uncharacteristically emotional, hypersensitive to criticism, and prone to social anxiety.", strengths: ["Emotional breakthrough"], challenges: ["Loss of control"], actionableTip: "Acknowledge the emotion as a data point; don't fight it." },
      growth: "Developing Extraverted Intuition (Ne) helps you apply your theories to the real world instead of just internal models.",
      unhealthy: "The 'Arrogant Outsider'—using logic as a weapon to avoid human connection."
    }
  },
  "ENTJ": {
    typeName: "Commander (Extraverted, Intuitive, Thinking, Judging)",
    summary: "Strategic leaders who see opportunities where others see obstacles and move with decisive authority.",
    strengths: ["Strong Will", "Efficiency", "Strategic Thinking", "Confidence"],
    weaknesses: ["Stubbornness", "Impatience", "Coldness", "Arrogance"],
    psychology: { 
      subconscious: "An expansionist drive to organize the world into high-performance structures.", 
      paradox: "A person who values raw power but deeply respects anyone who can stand up to them.", 
      motivations: ["Influence", "Legacy", "Objective Mastery"], 
      fears: ["Inefficiency", "Loss of Control", "Emotional Dependence"] 
    },
    career: { title: "Organizational Architect", description: "Building empires through sheer force of will.", roles: ["CEO", "Venture Capitalist", "Military Officer"] },
    lifestyle: { hobbies: ["Bodybuilding", "Market Trading", "Mastering Skills"], environment: "Sleek, professional, and built for productivity.", stressRelief: "Competitive sports or intense physical training." },
    cognitiveFunctions: generateCognitiveStack("ENTJ"),
    lifeInsights: {
      work: { summary: "Natural leaders who thrive in high-stakes environments.", strengths: ["Decision Making", "Standard Setting"], challenges: ["Empathy", "Accepting suggestions"], actionableTip: "Ask 'How do you feel about this?' before 'How will we do this?' to gain team buy-in." },
      friendships: { summary: "Friends who push you to be your best and value shared ambitions.", strengths: ["Supportive", "Challenging"], challenges: ["Dominance", "Softness"], actionableTip: "Friendship isn't always a competition; enjoy the slow moments too." },
      relationships: { summary: "Intense and growth-oriented, treating the relationship as a project to be optimized.", strengths: ["Reliability", "Ambition"], challenges: ["Softness", "Giving Control"], actionableTip: "Surrendering control in small ways can actually build trust and intimacy." },
      stress: { summary: "Under pressure (Inferior Fi), they become uncharacteristically sensitive, brooding on their own perceived failures.", strengths: ["Hidden depth"], challenges: ["Self-loathing"], actionableTip: "Journaling can help translate your confusing internal feelings into the 'logic' you prefer." },
      growth: "Cultivating your auxiliary Ni (Introverted Intuition) allows you to see the human long-term impacts of your decisions.",
      unhealthy: "The 'Merciless Tyrant'—crushing anyone in the way of a goal they don't even value anymore."
    }
  },
  "ENTP": {
    typeName: "Debater (Extraverted, Intuitive, Thinking, Perceiving)",
    summary: "The ultimate mental gymnast—clever, energetic, and constantly seeking to deconstruct and rebuild the world.",
    strengths: ["Innovative", "Knowledgeable", "Quick-Witted", "Charismatic"],
    weaknesses: ["Argumentative", "Insensitive", "Intolerant of routine", "Easily bored"],
    psychology: { 
      subconscious: "A chaotic sandbox where ideas are collided to see which ones survive the impact.", 
      paradox: "A person who argues for the sake of it to find the truth, but is often seen as not caring about the truth.", 
      motivations: ["Novelty", "Intellectual Conflict", "Possibility"], 
      fears: ["Stagnation", "Being wrong without knowing it", "Losing freedom"] 
    },
    career: { title: "Creative Disrupter", description: "Challenging the status quo to find better ways forward.", roles: ["Entrepreneur", "Inventor", "Creative Director"] },
    lifestyle: { hobbies: ["Debating", "Starting new projects", "Travel"], environment: "Dynamic, messy, and full of half-finished inspirations.", stressRelief: "Engaging in a friendly but heated intellectual argument." },
    cognitiveFunctions: generateCognitiveStack("ENTP"),
    lifeInsights: {
      work: { summary: "Thrives in the 'Visionary' phase but struggles with the 'Maintenance' phase.", strengths: ["Pivot Mastery", "Innovation"], challenges: ["Follow-through", "Details"], actionableTip: "Delegate the finishing touches so you can move to the next big problem." },
      friendships: { summary: "The life of the party and the primary source of 'what-if' scenarios.", strengths: ["Entertainment", "Intellectual growth"], challenges: ["Argumentativeness", "Reliability"], actionableTip: "Not every conversation needs to be a debate; sometimes 'I hear you' is the best response." },
      relationships: { summary: "Exciting and unpredictable, needing a partner who is their intellectual equal.", strengths: ["Spontaneity", "Encouragement"], challenges: ["Emotional follow-up", "Stability"], actionableTip: "Consistency in chores and dates is a form of respect for your partner's time." },
      stress: { summary: "In 'Grip' (Inferior Si), they become hyper-focused on minor physical ailments or obsessively re-reading old emails.", strengths: ["Detail cleanup"], challenges: ["Hypochondria"], actionableTip: "Routine can be medicine; try doing one small thing at the same time every day." },
      growth: "Developing your tertiary Fe (Extraverted Feeling) will make you a much more persuasive and influential visionary.",
      unhealthy: "The 'Sociopathic Trickster'—manipulating social systems just to see them fail."
    }
  },

  // DIPLOMATS (NF)
  "INFJ": {
    typeName: "Advocate (Introverted, Intuitive, Feeling, Judging)",
    summary: "Quiet, mystical, and deeply inspiring idealists who work tirelessly to make a positive impact on the human condition.",
    strengths: ["Deep Insight", "Idealistic", "Decisive", "Altruistic"],
    weaknesses: ["Burnout-prone", "Private", "Perfectionist", "Avoids Conflict"],
    psychology: { 
      subconscious: "A web of human interconnectedness that spans past, present, and future.", 
      paradox: "A person who deeply loves humanity but often feels alienated from individual humans.", 
      motivations: ["Global Harmony", "Spiritual Depth", "Helping"], 
      fears: ["Meaninglessness", "Corruption", "Being misunderstood"] 
    },
    career: { title: "Humanistic Visionary", description: "Finding the path to collective healing.", roles: ["Counselor", "Writer", "Non-Profit Leader"] },
    lifestyle: { hobbies: ["Writing", "Artistic expression", "Meditation"], environment: "A serene, meaningful, and slightly mysterious space.", stressRelief: "Creative catharsis through art or music." },
    cognitiveFunctions: generateCognitiveStack("INFJ"),
    lifeInsights: {
      work: { summary: "Driven by values and long-term vision rather than power or money.", strengths: ["Empathy", "Organization"], challenges: ["Direct confrontation", "Burnout"], actionableTip: "Your 'Ni' visions are data; trust them, but learn to explain them in 'Te' terms to colleagues." },
      friendships: { summary: "Seek soul-deep connections and have a 'door slam' policy for toxic behavior.", strengths: ["Listening", "Wisdom"], challenges: ["Vulnerability", "Self-sacrifice"], actionableTip: "Don't wait for people to read your mind; tell them what you need directly." },
      relationships: { summary: "Seeking 'The One' and capable of incredible devotion and romantic depth.", strengths: ["Intimacy", "Insight"], challenges: ["Over-idealization", "Unmet needs"], actionableTip: "Conflict isn't the end of a relationship; it's a necessary bridge to deeper intimacy." },
      stress: { summary: "In 'Grip' (Inferior Se), they indulge in sensory excess—overspending, reckless driving, or physical impulsivity.", strengths: ["Physical presence"], challenges: ["Self-sabotage"], actionableTip: "Grounding exercises that focus on five senses can pull you back into your body." },
      growth: "Strengthening your auxiliary Fe helps you translate your internal visions into actionable social changes.",
      unhealthy: "The 'Martyred Hermit'—convinced they are the only ones who care, leading to total social withdrawal."
    }
  },
  "INFP": {
    typeName: "Mediator (Introverted, Intuitive, Feeling, Perceiving)",
    summary: "Gentle dreamers with a rich inner world and an unwavering commitment to their personal values.",
    strengths: ["Authentic", "Creative", "Empathetic", "Optimistic"],
    weaknesses: ["Impractical", "Self-Critical", "Vulnerable to criticism", "Avoids data"],
    psychology: { subconscious: "A sanctuary of pure values where every action is weighed for its moral purity.", paradox: "The most flexible person you know, until you hit a core value—then they are a brick wall.", motivations: ["Self-expression", "Authenticity", "Healing"], fears: ["Betrayal of Self", "Uniformity", "Loss of Meaning"] },
    career: { title: "Artistic Healer", description: "Giving voice to the voiceless.", roles: ["Novelist", "Psychologist", "Linguist"] },
    lifestyle: { hobbies: ["Poetry", "Gaming", "Photography"], environment: "Cozy, eclectic, and filled with memories.", stressRelief: "Daydreaming in a safe, quiet space." },
    cognitiveFunctions: generateCognitiveStack("INFP"),
    lifeInsights: {
      work: { summary: "Must believe in the mission to be productive.", strengths: ["Integrity", "Adaptability"], challenges: ["Structure", "Criticism"], actionableTip: "Externalize your tasks using lists to prevent mental overwhelm." },
      friendships: { summary: "Deeply loyal but often guarded, choosing friends who respect their depth.", strengths: ["Acceptance", "Support"], challenges: ["Withdrawing", "Insecurity"], actionableTip: "It's okay to let people see your 'messy' side; that's where true connection lives." },
      relationships: { summary: "Idealistic and soulful, seeking a partner who can explore the depths with them.", strengths: ["Devotion", "Tenderness"], challenges: ["Avoidance", "Expectations"], actionableTip: "Love is an action, not just a feeling; show it through small, consistent efforts." },
      stress: { summary: "In 'Grip' (Inferior Te), they become uncharacteristically cold, critical, and obsessively organized.", strengths: ["Sudden productivity"], challenges: ["Aggression"], actionableTip: "Physical activity or a hot bath can help you transition back to 'Feeling'." },
      growth: "Developing your Extraverted Intuition (Ne) helps you see the many ways your values can be applied to the world.",
      unhealthy: "The 'Depressed Idealist'—refusing to engage with reality because it's not 'perfect'."
    }
  },
  "ENFJ": {
    typeName: "Protagonist (Extraverted, Intuitive, Feeling, Judging)",
    summary: "Charismatic and inspiring leaders who work to unify people for a common cause and see the potential in everyone.",
    strengths: ["Inspirational", "Reliable", "Altruistic", "Natural Leader"],
    weaknesses: ["Overly Idealistic", "Too Selfless", "Fluctuating Self-Esteem", "Struggle with tough choices"],
    psychology: { subconscious: "A social harmony map that constantly seeks to optimize the 'vibe' of the group.", paradox: "A confident leader who often feels profound imposter syndrome in private.", motivations: ["Collective Uplift", "Meaning", "Order"], fears: ["Isolation", "Discord", "Failing others"] },
    career: { title: "Catalyst of Potential", description: "Leading teams toward a shared vision of greatness.", roles: ["Motivational Speaker", "Teacher", "Public Relations"] },
    lifestyle: { hobbies: ["Social Organizing", "Workshops", "Theater"], environment: "Vibrant, inclusive, and aesthetically pleasing.", stressRelief: "Verbalizing their worries to a trusted friend." },
    cognitiveFunctions: generateCognitiveStack("ENFJ"),
    lifeInsights: {
      work: { summary: "Natural mentors who build collaborative, high-trust cultures.", strengths: ["Diplomacy", "Energy"], challenges: ["Saying No", "Bureaucracy"], actionableTip: "Remember that you can't help everyone; focus your energy where it's most effective." },
      friendships: { summary: "The 'Mom/Dad' of the group, always looking out for others' needs.", strengths: ["Empathy", "Warmth"], challenges: ["Smothering", "Ignoring Self"], actionableTip: "Let your friends support you too; vulnerability is a way to bond." },
      relationships: { summary: "Intensely expressive and romantic, valuing long-term commitment and harmony.", strengths: ["Passion", "Stability"], challenges: ["Over-giving", "Idealizing"], actionableTip: "Make space for your partner to be imperfect; love the reality, not just the potential." },
      stress: { summary: "In 'Grip' (Inferior Ti), they withdraw and become harshly critical of themselves and others, obsessing over 'truth'.", strengths: ["Sudden logic"], challenges: ["Self-doubt"], actionableTip: "Logic is just one tool; your feelings are still your primary guide. Be kind to yourself." },
      growth: "Cultivating your Ni helps you see when someone's 'potential' is actually a dead end for your energy.",
      unhealthy: "The 'Manipulative Guru'—using their social insight to control others under the guise of 'helping'."
    }
  },
  "ENFP": {
    typeName: "Campaigner (Extraverted, Intuitive, Feeling, Perceiving)",
    summary: "Enthusiastic, creative, and free-spirited individuals who find reasons to smile in any situation.",
    strengths: ["Curious", "Observant", "Energetic", "Excellent Communicator"],
    weaknesses: ["Poor Practical Skills", "Struggle to Focus", "Overthink", "Easily Stressed"],
    psychology: { subconscious: "A kaleidoscope of possibilities where every new idea is a potential life path.", paradox: "Extremely social, yet requiring significant alone time to process deep emotional themes.", motivations: ["Novelty", "Emotional Truth", "Freedom"], fears: ["Boredom", "Restriction", "Artificiality"] },
    career: { title: "Creative Evangelist", description: "Finding the spark in everything and everyone.", roles: ["Journalist", "Entertainer", "Social Entrepreneur"] },
    lifestyle: { hobbies: ["Traveling", "Learning Instruments", "Improv"], environment: "Eclectic, inspiring, and slightly chaotic.", stressRelief: "Going on a spontaneous adventure or deep conversation." },
    cognitiveFunctions: generateCognitiveStack("ENFP"),
    lifeInsights: {
      work: { summary: "Thrive in brainstorming but wilt under repetitive schedules.", strengths: ["Enthusiasm", "Networking"], challenges: ["Finishing projects", "Data"], actionableTip: "Set artificial deadlines with rewards to keep yourself on track." },
      friendships: { summary: "Warm, accepting, and the first person people call when they need an uplift.", strengths: ["Support", "Fun"], challenges: ["Follow-through", "Depth saturation"], actionableTip: "Focus on deepening a few relationships rather than having a hundred acquaintances." },
      relationships: { summary: "Vibrant and intense, needing a partner who values growth and exploration.", strengths: ["Creativity", "Devotion"], challenges: ["Smothering", "Distraction"], actionableTip: "Daily routines aren't boring; they are the framework for a stable shared life." },
      stress: { summary: "In 'Grip' (Inferior Si), they become obsessively focused on minor details, health issues, or past mistakes.", strengths: ["Sudden organization"], challenges: ["Paranoia"], actionableTip: "Engage in a sensory task that is comforting, like baking or gardening." },
      growth: "Developing your auxiliary Fi helps you choose which ideas are actually worth your precious energy.",
      unhealthy: "The 'Scattered Hedonist'—constantly seeking new thrills to avoid feeling any real pain."
    }
  },

  // SENTINELS (SJ)
  "ISTJ": {
    typeName: "Logistician (Introverted, Sensing, Thinking, Judging)",
    summary: "Practical and fact-minded individuals whose reliability cannot be doubted.",
    strengths: ["Responsible", "Honest", "Direct", "Calm"],
    weaknesses: ["Stubborn", "Judgmental", "Insensitive", "Often blame themselves"],
    psychology: { subconscious: "A database of proven methods and historical data points.", paradox: "A traditionalist who is actually the best person to lead a radical innovation if you prove it works.", motivations: ["Stability", "Duty", "Factual Truth"], fears: ["Chaos", "Incompetence", "Dishonesty"] },
    career: { title: "Reliability Engineer", description: "Ensuring the foundations of the world remain solid.", roles: ["Accountant", "Judge", "Project Manager"] },
    lifestyle: { hobbies: ["Restoring things", "Gardening", "History"], environment: "Clean, functional, and deeply traditional.", stressRelief: "Finishing a small, tangible task." },
    cognitiveFunctions: generateCognitiveStack("ISTJ"),
    lifeInsights: {
      work: { summary: "The 'Rock' of any organization, valuing structure and clear expectations.", strengths: ["Accuracy", "Duty"], challenges: ["Change", "Abstract theory"], actionableTip: "Learn to 'think out loud' occasionally so people know your logic." },
      friendships: { summary: "Loyal for life, expressing love through acts of service and reliability.", strengths: ["Dependability", "Practicality"], challenges: ["Emotional talk", "Rigidity"], actionableTip: "Ask 'How can I support you?' to show care without needing to be emotional." },
      relationships: { summary: "Stable and protective partners who value traditional roles and security.", strengths: ["Commitment", "Planning"], challenges: ["Spontaneity", "Warmth"], actionableTip: "Schedule 'adventure days' to keep the spark alive in your structured life." },
      stress: { summary: "In 'Grip' (Inferior Ne), they become uncharacteristically prone to 'doomsday' scenarios and paranoia.", strengths: ["Emergency foresight"], challenges: ["Anxiety"], actionableTip: "Look at the evidence of your past successes to counter the irrational fear." },
      growth: "Developing your Fi (Introverted Feeling) helps you connect to your own personal desires outside of 'duty'." ,
      unhealthy: "The 'Bitter Bureaucrat'—enforcing rules for the sake of rules, even when they cause harm."
    }
  },
  "ISFJ": {
    typeName: "Defender (Introverted, Sensing, Feeling, Judging)",
    summary: "Dedicated and warm protectors who are always ready to defend their loved ones.",
    strengths: ["Supportive", "Reliable", "Patient", "Observant"],
    weaknesses: ["Too Humble", "Take things personally", "Repress feelings", "Over-committed"],
    psychology: { subconscious: "A warm archive of others' needs, likes, and histories.", paradox: "Quiet and unassuming, but capable of extreme fierce action when a loved one is threatened.", motivations: ["Security", "Community", "Harmony"], fears: ["Instability", "Ingratitude", "Conflict"] },
    career: { title: "Community Guardian", description: "Creating safe spaces through dedicated service.", roles: ["Nurse", "Social Worker", "Customer Support"] },
    lifestyle: { hobbies: ["Cooking", "Crafting", "Hosting small dinners"], environment: "Warm, soft, and inviting sanctuary.", stressRelief: "Acts of care for others or a familiar book." },
    cognitiveFunctions: generateCognitiveStack("ISFJ"),
    lifeInsights: {
      work: { summary: "The unsung hero who remembers every detail and cares about the team.", strengths: ["Diligence", "Kindness"], challenges: ["Self-promotion", "Critique"], actionableTip: "Your contributions are valuable; don't be afraid to take credit for your work." },
      friendships: { summary: "Nurturers who remember birthdays and small details about your life.", strengths: ["Listening", "Memory"], challenges: ["Boundaries", "Passive-aggression"], actionableTip: "Saying 'no' is a way to protect the 'yes' you give to your closest friends." },
      relationships: { summary: "Deeply committed and traditional, seeking a peaceful and stable home life.", strengths: ["Tenderness", "Devotion"], challenges: ["Self-sacrifice", "Stagnation"], actionableTip: "Voice your own needs clearly; your partner isn't as observant as you are." },
      stress: { summary: "In 'Grip' (Inferior Ne), they become obsessively worried about the future and see threats everywhere.", strengths: ["Suddenly creative"], challenges: ["Paranoia"], actionableTip: "Ground yourself in the 'now' by focusing on physical comfort." },
      growth: "Strengthening your Ti (Introverted Thinking) helps you make decisions based on logic, not just emotional history.",
      unhealthy: "The 'Martyred Doormat'—allowing others to use them while building immense internal resentment."
    }
  },
  "ESTJ": {
    typeName: "Executive (Extraverted, Sensing, Thinking, Judging)",
    summary: "Excellent administrators, unsurpassed at managing things—or people.",
    strengths: ["Dedicated", "Direct", "Reliable", "Excellent Organizer"],
    weaknesses: ["Inflexible", "Judgmental", "Difficulty with empathy", "Struggle with abstract"],
    psychology: { subconscious: "A command center where all variables are organized for maximum throughput.", paradox: "A loud, confident leader who is secretly very sensitive to traditional etiquette and respect.", motivations: ["Order", "Productivity", "Social Status"], fears: ["Chaos", "Social shame", "Inefficiency"] },
    career: { title: "Chief Operations Officer", description: "Making the engine of society run on time.", roles: ["Project Manager", "Financial Advisor", "Police Officer"] },
    lifestyle: { hobbies: ["Sports", "Home Improvement", "Civic Leadership"], environment: "Symmetrical, high-quality, and prestigious.", stressRelief: "A well-organized social event or competitive game." },
    cognitiveFunctions: generateCognitiveStack("ESTJ"),
    lifeInsights: {
      work: { summary: "The person who gets things done, preferring clear hierarchies and rules.", strengths: ["Decisiveness", "Hard work"], challenges: ["Innovation", "Softness"], actionableTip: "Not all problems are 'tasks'; some need emotional space to resolve." },
      friendships: { summary: "Active and loyal, usually the one who organizes the group gatherings.", strengths: ["Stability", "Honesty"], challenges: ["Controlling", "Impatience"], actionableTip: "Relax the rules sometimes; the best memories are often unplanned." },
      relationships: { summary: "Traditional and protective, seeking a partner who shares their work ethic.", strengths: ["Commitment", "Reliability"], challenges: ["Warmth", "Expressiveness"], actionableTip: "Learn to 'soften' your tone; what sounds like a command to others is just a suggestion to you." },
      stress: { summary: "In 'Grip' (Inferior Fi), they become uncharacteristically withdrawn, sensitive, and prone to feeling 'unappreciated'.", strengths: ["Sudden introspection"], challenges: ["Emotional hypersensitivity"], actionableTip: "Exercise and sleep are your best resets when the world feels messy." },
      growth: "Developing your auxiliary Si helps you remember the 'human' history of a process before you optimize it away.",
      unhealthy: "The 'Power-Hungry Bully'—demanding respect they haven't earned through genuine leadership."
    }
  },
  "ESFJ": {
    typeName: "Consul (Extraverted, Sensing, Feeling, Judging)",
    summary: "Extraordinarily caring, social, and popular people who are always eager to help.",
    strengths: ["Strong Practical Skills", "Warm", "Loyal", "Connecting Others"],
    weaknesses: ["Worried about Social Status", "Inflexible", "Struggle with data", "Needy"],
    psychology: { subconscious: "A social nexus where every connection is a potential source of harmony.", paradox: "Extremely popular, but often feels deeply insecure about their true worth outside of their service to others.", motivations: ["Harmony", "Belonging", "Helping"], fears: ["Ostracization", "Conflict", "Indifference"] },
    career: { title: "Harmony Architect", description: "Building the social fabric of the community.", roles: ["Healthcare Admin", "Teacher", "Event Planner"] },
    lifestyle: { hobbies: ["Volunteering", "Parties", "Church/Civic groups"], environment: "Comfortable, festive, and full of guests.", stressRelief: "Talking it out with their largest group of friends." },
    cognitiveFunctions: generateCognitiveStack("ESFJ"),
    lifeInsights: {
      work: { summary: "The 'Glue' of the office, making sure everyone feels included.", strengths: ["Collaboration", "Detail oriented"], challenges: ["Conflict", "Abstract planning"], actionableTip: "Trust the data as much as the people; it's a different kind of truth." },
      friendships: { summary: "Supportive, active, and the first to offer help or host a party.", strengths: ["Warmth", "Networking"], challenges: ["Gossip", "Sensitivity"], actionableTip: "Focus on true connection, not just social approval." },
      relationships: { summary: "Doting and traditional partners who prioritize the happiness of their loved ones.", strengths: ["Romance", "Planning"], challenges: ["Smothering", "Conflict avoidance"], actionableTip: "Arguments aren't the end; they are just 'high-volume communication' sessions." },
      stress: { summary: "In 'Grip' (Inferior Ti), they become uncharacteristically cold, critical, and obsessively logical in a negative way.", strengths: ["Sudden analysis"], challenges: ["Harshness"], actionableTip: "Stop trying to 'fix' it for a moment; just be in the feeling." },
      growth: "Strengthening your Si helps you create stable traditions that don't rely on constant external approval.",
      unhealthy: "The 'Social Police'—using inclusion and exclusion to manipulate group dynamics for their own comfort."
    }
  },

  // EXPLORERS (SP)
  "ISTP": {
    typeName: "Virtuoso (Introverted, Sensing, Thinking, Perceiving)",
    summary: "Bold and practical experimenters, masters of all kinds of tools.",
    strengths: ["Optimistic", "Creative", "Practical", "Relaxed"],
    weaknesses: ["Stubborn", "Insensitive", "Private", "Easily Bored"],
    psychology: { subconscious: "A mechanical blueprint where everything is a series of levers and gears.", paradox: "Quiet and reserved, but the first one to jump into a dangerous situation to fix it.", motivations: ["Mastery", "Freedom", "Understanding how things work"], fears: ["Helplessness", "Boredom", "Invasion of space"] },
    career: { title: "Technical Craftsman", description: "Mastering the physical world through precision.", roles: ["Engineer", "Pilot", "Forensic Scientist"] },
    lifestyle: { hobbies: ["Mechanics", "X-Sports", "Video games"], environment: "Functional, rugged, and filled with tools.", stressRelief: "Engaging in a physical, skill-based activity." },
    cognitiveFunctions: generateCognitiveStack("ISTP"),
    lifeInsights: {
      work: { summary: "The 'Troubleshooter' who thrives in crisis but hates pointless meetings.", strengths: ["Efficiency", "Calmness"], challenges: ["Bureaucracy", "Planning"], actionableTip: "Explain your 'shortcuts' so others don't think you're just being lazy." },
      friendships: { summary: "Low-maintenance friends who show loyalty through action, not words.", strengths: ["Chill", "Reliability"], challenges: ["Emotional distance", "Ghosting"], actionableTip: "A text back every once in a while goes a long way for your 'Fe' friends." },
      relationships: { summary: "Independent and adventurous partners who need significant freedom.", strengths: ["Fun", "Practicality"], challenges: ["Commitment", "Sharing feelings"], actionableTip: "Routine can be a 'tool' to build a stronger relationship; use it." },
      stress: { summary: "In 'Grip' (Inferior Fe), they become uncharacteristically emotional or socially sensitive.", strengths: ["Sudden social energy"], challenges: ["Loss of coolness"], actionableTip: "Permission to fail at being 'the cool one' can release the pressure." },
      growth: "Developing your Ni (Introverted Intuition) helps you see the long-term consequences of your immediate actions.",
      unhealthy: "The 'Reckless Loner'—taking extreme risks to feel anything at all."
    }
  },
  "ISFP": {
    typeName: "Adventurer (Introverted, Sensing, Feeling, Perceiving)",
    summary: "Flexible and charming artists, always ready to explore and experience something new.",
    strengths: ["Charming", "Sensitive", "Imaginative", "Passionate"],
    weaknesses: ["Fiercely Independent", "Unpredictable", "Easily Stressed", "Overly Competitive"],
    psychology: { subconscious: "A canvas of sensory aesthetics and internal moral purity.", paradox: "Deeply sensitive to beauty, but capable of extreme ruggedness in the right environment.", motivations: ["Self-Expression", "Aesthetics", "Freedom"], fears: ["Conformity", "Harshness", "Loss of Identity"] },
    career: { title: "Aesthetic Visionary", description: "Infusing the world with beauty and personal truth.", roles: ["Designer", "Chef", "Musician"] },
    lifestyle: { hobbies: ["Painting", "Hiking", "Fashion"], environment: "Beautiful, tactile, and ever-changing.", stressRelief: "Immersing themselves in nature or art." },
    cognitiveFunctions: generateCognitiveStack("ISFP"),
    lifeInsights: {
      work: { summary: "Driven by passion; if they don't love it, they won't do it.", strengths: ["Creativity", "Visual detail"], challenges: ["Structure", "Data"], actionableTip: "Turn your tasks into 'creative challenges' to keep your interest high." },
      friendships: { summary: "Quiet, supportive, and the best people to have a sensory experience with.", strengths: ["Acceptance", "Aesthetics"], challenges: ["Withdrawal", "Sensitivity"], actionableTip: "Speak your mind sooner; don't let small hurts build up." },
      relationships: { summary: "Romantic and present, valuing the 'now' above all else.", strengths: ["Intimacy", "Passion"], challenges: ["Planning", "Criticism"], actionableTip: "The future is just a series of 'nows'; planning it makes the nows better." },
      stress: { summary: "In 'Grip' (Inferior Te), they become uncharacteristically harsh, critical, and obsessively organized.", strengths: ["Sudden focus"], challenges: ["Hostility"], actionableTip: "Stop and breathe. Your worth is not your productivity." },
      growth: "Strengthening your Se (Extraverted Sensing) helps you stay grounded in the real world when your feelings get too heavy.",
      unhealthy: "The 'Wounded Artist'—using their pain as an excuse to neglect their responsibilities."
    }
  },
  "ESTP": {
    typeName: "Entrepreneur (Extraverted, Sensing, Thinking, Perceiving)",
    summary: "Smart, energetic, and very perceptive people who truly enjoy living on the edge.",
    strengths: ["Bold", "Rational", "Original", "Perceptive"],
    weaknesses: ["Insensitive", "Impatient", "Risk-Prone", "Miss the big picture"],
    psychology: { subconscious: "A high-speed sensory input processor looking for the 'win'.", paradox: "A person who loves the thrill of the moment but is secretly very good at long-term probability.", motivations: ["Excitement", "Winning", "Impact"], fears: ["Boredom", "Loss of agency", "Invisibility"] },
    career: { title: "Tactical Opportunist", description: "Seizing the moment to achieve maximum results.", roles: ["Sales Lead", "Stock Trader", "Athlete"] },
    lifestyle: { hobbies: ["Skydiving", "Clubbing", "Fixing things"], environment: "Expensive, modern, and built for entertainment.", stressRelief: "A high-adrenaline physical challenge." },
    cognitiveFunctions: generateCognitiveStack("ESTP"),
    lifeInsights: {
      work: { summary: "The 'Fixer' who thrives in chaos and hates theory.", strengths: ["Problem Solving", "Charisma"], challenges: ["Follow-through", "Rules"], actionableTip: "Patience is a tactical advantage; learn to use it." },
      friendships: { summary: "The life of the party, always up for a spontaneous trip.", strengths: ["Fun", "Directness"], challenges: ["Depth", "Reliability"], actionableTip: "Sometimes people need your presence, not just your jokes." },
      relationships: { summary: "Exciting and physical, valuing shared activities and high energy.", strengths: ["Passion", "Presentness"], challenges: ["Commitment", "Emotional talk"], actionableTip: "Vulnerability is the highest form of risk; take it occasionally." },
      stress: { summary: "In 'Grip' (Inferior Ni), they become uncharacteristically paranoid about 'hidden meanings' and the future.", strengths: ["Sudden intuition"], challenges: ["Conspiracy thinking"], actionableTip: "Stick to the facts in front of you; your brain is over-processing the 'what-ifs'." },
      growth: "Developing your auxiliary Ti helps you slow down and make smarter, more sustainable bets.",
      unhealthy: "The 'Con Artist'—using their charisma and perception purely for personal gain without remorse."
    }
  },
  "ESFP": {
    typeName: "Entertainer (Extraverted, Sensing, Feeling, Perceiving)",
    summary: "Spontaneous, energetic, and enthusiastic people—life is never boring around them.",
    strengths: ["Bold", "Original", "Practical", "Excellent People Skills"],
    weaknesses: ["Sensitive", "Conflict-Averse", "Easily Bored", "Poor Planners"],
    psychology: { subconscious: "A high-vibrancy sensory playground where every moment is an opportunity for joy.", paradox: "Always the center of attention, but often surprisingly private about their deepest insecurities.", motivations: ["Connection", "Aesthetics", "Joy"], fears: ["Missing out", "Loneliness", "Criticism"] },
    career: { title: "Vibrancy Ambassador", description: "Injecting life and energy into every system.", roles: ["Fashion Designer", "Actor", "Social Coordinator"] },
    lifestyle: { hobbies: ["Dancing", "Shopping", "Parties"], environment: "Bright, social, and constantly updated.", stressRelief: "Being surrounded by their favorite people." },
    cognitiveFunctions: generateCognitiveStack("ESFP"),
    lifeInsights: {
      work: { summary: "Great in teams and customer-facing roles.", strengths: ["Enthusiasm", "Service"], challenges: ["Repetitive work", "Focus"], actionableTip: "Break your day into 'sets' of work to keep the energy high." },
      friendships: { summary: "The most generous and fun friends who live for the moment.", strengths: ["Warmth", "Fun"], challenges: ["Reliability", "Drama"], actionableTip: "Listen as much as you perform; people love the 'you' behind the show." },
      relationships: { summary: "Intensely affectionate and playful, valuing sensory romance.", strengths: ["Passion", "Attentiveness"], challenges: ["Conflict", "Commitment"], actionableTip: "Conflict is just another way to get to know your partner better." },
      stress: { summary: "In 'Grip' (Inferior Ni), they become uncharacteristically withdrawn and paranoid about the future.", strengths: ["Sudden insight"], challenges: ["Anxiety"], actionableTip: "Focus on a small, physical project to ground your mind." },
      growth: "Developing your auxiliary Fi helps you find a sense of self that isn't dependent on the room's energy.",
      unhealthy: "The 'Attention Addict'—acting out in increasingly reckless ways to avoid being ignored."
    }
  }
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
  const baseData = PERSONALITY_DATA[typeCode];

  // Fallback for safety, though all 16 should be covered
  if (!baseData) {
     return {
        typeCode,
        typeName: `The Dynamic (${typeCode})`,
        summary: "A unique cognitive blend showing high adaptability.",
        strengths: ["Adaptability", "Resilience"],
        weaknesses: ["Occasional Indecision"],
        psychology: { subconscious: "Balanced", paradox: "Versatile", motivations: ["Growth"], fears: ["Stagnation"] },
        career: { title: "Specialist", description: "Adaptable professional.", roles: ["Consultant"] },
        lifestyle: { hobbies: ["Various"], environment: "Balanced", stressRelief: "Rest" },
        cognitiveFunctions: generateCognitiveStack(typeCode),
        lifeInsights: {
           work: { summary: "Flexible", strengths: ["Agility"], challenges: ["Focus"], actionableTip: "Plan ahead." },
           friendships: { summary: "Loyal", strengths: ["Empathy"], challenges: ["Boundaries"], actionableTip: "Communicate." },
           relationships: { summary: "Supportive", strengths: ["Trust"], challenges: ["Conflict"], actionableTip: "Openness." },
           stress: { summary: "Calm", strengths: ["Resilience"], challenges: ["Panic"], actionableTip: "Breathe." },
           growth: "Focus on your auxiliary trait.",
           unhealthy: "Avoid over-reliance on your dominant trait."
        }
     } as AnalysisResult;
  }

  return {
    ...baseData,
    typeCode,
  } as AnalysisResult;
};
