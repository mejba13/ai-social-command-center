/**
 * Seed data for brand voices
 * Use this to populate your app with sample brand voice profiles
 */

export const seedBrandVoices = [
  {
    id: 'bv_tech_startup',
    name: 'Tech Startup',
    description: 'Innovative, forward-thinking, and developer-friendly',
    tone: 'Professional but approachable',
    targetAudience: 'Developers, tech enthusiasts, early adopters',
    keyPhrases: [
      'innovation at scale',
      'developer-first',
      'cutting-edge',
      'open source',
      'community-driven',
    ],
    dosList: [
      'Use technical terms when appropriate',
      'Highlight innovation and technology',
      'Be transparent and authentic',
      'Share behind-the-scenes development',
      'Encourage community participation',
    ],
    dontsList: [
      'Avoid marketing jargon',
      'Don\'t oversimplify technical concepts',
      'Don\'t ignore user feedback',
      'Avoid being overly corporate',
    ],
    isDefault: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'bv_lifestyle_brand',
    name: 'Lifestyle Brand',
    description: 'Warm, inspiring, and aspirational with a personal touch',
    tone: 'Casual and inspirational',
    targetAudience: 'Young professionals, lifestyle enthusiasts, wellness seekers',
    keyPhrases: [
      'live your best life',
      'wellness journey',
      'authentic living',
      'mindful moments',
      'self-care',
    ],
    dosList: [
      'Use emojis and visual language',
      'Share personal stories',
      'Be encouraging and positive',
      'Use aspirational imagery',
      'Create community feeling',
    ],
    dontsList: [
      'Avoid being preachy',
      'Don\'t use corporate language',
      'Avoid negativity',
      'Don\'t be overly salesy',
    ],
    isDefault: false,
    createdAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: 'bv_corporate',
    name: 'Corporate Professional',
    description: 'Authoritative, trustworthy, and industry-leading',
    tone: 'Professional and formal',
    targetAudience: 'Business leaders, enterprise clients, industry professionals',
    keyPhrases: [
      'industry leadership',
      'proven results',
      'data-driven insights',
      'strategic partnership',
      'excellence in execution',
    ],
    dosList: [
      'Use data and statistics',
      'Highlight achievements and credentials',
      'Be concise and clear',
      'Focus on business value',
      'Maintain professional tone',
    ],
    dontsList: [
      'Avoid casual language',
      'Don\'t use emojis',
      'Avoid unsubstantiated claims',
      'Don\'t be overly creative',
    ],
    isDefault: false,
    createdAt: new Date('2024-02-01').toISOString(),
  },
  {
    id: 'bv_ecommerce',
    name: 'E-commerce Fun',
    description: 'Exciting, deal-focused, and customer-obsessed',
    tone: 'Enthusiastic and friendly',
    targetAudience: 'Online shoppers, deal hunters, product enthusiasts',
    keyPhrases: [
      'limited time offer',
      'customer favorite',
      'best seller',
      'trending now',
      'you deserve it',
    ],
    dosList: [
      'Create urgency with deals',
      'Use enthusiastic language',
      'Highlight benefits and features',
      'Include clear calls-to-action',
      'Share customer testimonials',
    ],
    dontsList: [
      'Avoid aggressive selling',
      'Don\'t mislead on pricing',
      'Avoid overwhelming with options',
      'Don\'t ignore customer concerns',
    ],
    isDefault: false,
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'bv_education',
    name: 'Educational Authority',
    description: 'Knowledgeable, helpful, and empowering',
    tone: 'Educational and supportive',
    targetAudience: 'Learners, professionals seeking knowledge, students',
    keyPhrases: [
      'learn something new',
      'knowledge is power',
      'master the basics',
      'level up your skills',
      'expert insights',
    ],
    dosList: [
      'Break down complex topics',
      'Use examples and analogies',
      'Encourage questions',
      'Provide actionable tips',
      'Share credible sources',
    ],
    dontsList: [
      'Avoid condescending language',
      'Don\'t oversimplify important nuances',
      'Avoid technical jargon without explanation',
      'Don\'t claim to know everything',
    ],
    isDefault: false,
    createdAt: new Date('2024-02-15').toISOString(),
  },
];

/**
 * Load seed brand voices into localStorage
 */
export function loadSeedBrandVoices() {
  if (typeof window !== 'undefined') {
    const existing = localStorage.getItem('brandVoices');
    if (!existing || JSON.parse(existing).length === 0) {
      localStorage.setItem('brandVoices', JSON.stringify(seedBrandVoices));
      console.log('✅ Loaded seed brand voices');
      return seedBrandVoices;
    }
    return JSON.parse(existing);
  }
  return [];
}

/**
 * Reset brand voices to seed data
 */
export function resetBrandVoices() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('brandVoices', JSON.stringify(seedBrandVoices));
    console.log('✅ Reset brand voices to seed data');
    return seedBrandVoices;
  }
  return [];
}
