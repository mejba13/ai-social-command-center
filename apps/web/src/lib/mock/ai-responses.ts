/**
 * Mock AI responses for development
 * Use these when you don't have API keys configured
 */

export const mockCaptions = {
  professional: [
    'Excited to share our latest innovation with the community. This breakthrough represents months of dedicated work and collaboration. Ready to transform the industry together? 🚀\n\n#Innovation #Technology #Business',
    'We believe in building solutions that empower people. Today marks another milestone in our journey toward creating meaningful impact. Join us as we continue to push boundaries.\n\n#Leadership #Growth #Impact',
    'Thrilled to announce this achievement. Our team has worked tirelessly to bring this vision to life, and we can\'t wait to see the positive change it creates.\n\n#Success #TeamWork #Excellence',
  ],
  casual: [
    'Hey everyone! 👋 Just had to share this awesome news with you all. We\'ve been working on something really cool and can\'t wait for you to check it out! Let us know what you think! 💙\n\n#Community #Exciting #NewRelease',
    'Guess what?! 🎉 We finally did it! After countless coffee runs and late nights, here it is. Huge thanks to everyone who supported us along the way. You rock! 🙌\n\n#Grateful #Milestone #Celebration',
    'Can we just take a moment to appreciate how far we\'ve come? 😊 This journey has been incredible, and it\'s all because of amazing people like you. More good stuff coming soon!\n\n#Journey #Community #Grateful',
  ],
  funny: [
    'POV: You just realized Monday isn\'t so bad when you have something this exciting to share 😄 Check out what we\'ve been cooking up (spoiler: it\'s not our lunch)\n\n#MondayVibes #Funny #WorkLife',
    'They said it couldn\'t be done. We said "hold our coffee" ☕️ Here\'s proof that sometimes the best ideas come from the most caffeinated minds 🧠\n\n#Innovation #CoffeeFueled #TechHumor',
    'Breaking: Local team discovers revolutionary way to [describe your thing]. Scientists baffled. Competitors shook. Us? Just getting started 😎\n\n#Humor #Winning #GameChanger',
  ],
  inspirational: [
    'Every great achievement starts with a single step forward. Today, we take that step together. Here\'s to turning dreams into reality and never giving up on what truly matters. ✨\n\n#Inspiration #Dreams #Purpose',
    'The future belongs to those who believe in the beauty of their vision. We\'re here to prove that with passion, persistence, and the right people, anything is possible. 🌟\n\n#BelieveInYourself #Future #Possibility',
    'Success isn\'t just about what you accomplish, it\'s about what you inspire others to do. Today, we hope to spark that inspiration in you. Let\'s create something extraordinary together. 💫\n\n#Motivation #Together #Excellence',
  ],
  educational: [
    'Here\'s something you might not know: [Insert interesting fact]. Understanding this concept is key to mastering [topic]. Let\'s break it down step by step so everyone can benefit. 📚\n\n#Learning #Education #Knowledge',
    'Quick lesson: The difference between good and great often comes down to understanding the fundamentals. Today, we\'re diving deep into [topic] to help you level up your expertise. 🎓\n\n#LearnSomethingNew #Skills #Growth',
    '3 key takeaways you need to know about [topic]:\n1. [Point one]\n2. [Point two]\n3. [Point three]\n\nMaster these, and you\'re well on your way to success. 💡\n\n#Tips #Education #Mastery',
  ],
};

export const mockHashtags = [
  '#Innovation',
  '#Technology',
  '#Business',
  '#Growth',
  '#Success',
  '#Leadership',
  '#Inspiration',
  '#Community',
  '#Digital',
  '#Future',
  '#TeamWork',
  '#Excellence',
  '#Strategy',
  '#Trending',
  '#MondayMotivation',
];

export const mockImageUrls = [
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1024&h=1024',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1024&h=1024',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1024&h=1024',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1024&h=1024',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1024&h=1024',
];

export const mockRepurposedContent = {
  'long-form': {
    caption: 'Here\'s the TL;DR version: [Summary of key points in 1-2 sentences] Check out the full article for all the details and insights! 📖',
    thread: 'Thread 🧵\n\n1/ Main idea: [Opening hook]\n\n2/ Key point #1: [First major point]\n\n3/ Key point #2: [Second major point]\n\n4/ Takeaway: [Conclusion and CTA]',
    'short-form': 'Quick take: [Main message in one powerful sentence] 💡\n\nWhat do you think?',
  },
  video: {
    caption: '🎥 Just watched this and had to share the highlights:\n\n✨ [Key moment 1]\n✨ [Key moment 2]\n✨ [Key moment 3]\n\nWatch the full video to learn more!',
    thread: 'Breaking down the video 🎬\n\n1/ Opening: [What the video is about]\n\n2/ Best part: [Most valuable insight]\n\n3/ My take: [Your perspective]\n\n4/ Link: [Where to watch]',
  },
  article: {
    caption: '📰 Just read an insightful article about [topic]. Here are my top 3 takeaways:\n\n1️⃣ [Takeaway 1]\n2️⃣ [Takeaway 2]\n3️⃣ [Takeaway 3]\n\nThoughts?',
    carousel: 'Slide 1: [Title and main hook]\nSlide 2: [First key point]\nSlide 3: [Second key point]\nSlide 4: [Third key point]\nSlide 5: [Conclusion and CTA]',
  },
};

/**
 * Generate mock AI caption based on options
 */
export function generateMockCaption(options: {
  topic: string;
  tone?: string;
  length?: string;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
}): string[] {
  const { topic, tone = 'professional', includeHashtags = true, includeEmojis = true } = options;

  const templates = mockCaptions[tone as keyof typeof mockCaptions] || mockCaptions.professional;

  // Customize templates with the actual topic
  return templates.map((template) => {
    let caption = template.replace(/\[.*?\]/g, topic);

    if (!includeEmojis) {
      caption = caption.replace(/[^\w\s#@.,!?'-]/g, '');
    }

    if (!includeHashtags) {
      caption = caption.replace(/#\w+/g, '').trim();
    }

    return caption;
  });
}

/**
 * Generate mock hashtags
 */
export function generateMockHashtags(): string[] {
  return mockHashtags.slice(0, 15);
}

/**
 * Generate mock image URL
 */
export function generateMockImageUrl(options: {
  style?: string;
  aspectRatio?: string;
}): string {
  const { aspectRatio = '1:1' } = options;

  // Return a random Unsplash image with appropriate dimensions
  const randomIndex = Math.floor(Math.random() * mockImageUrls.length);
  let url = mockImageUrls[randomIndex];

  // Adjust dimensions based on aspect ratio
  const dimensions: Record<string, string> = {
    '1:1': 'w=1024&h=1024',
    '16:9': 'w=1792&h=1024',
    '9:16': 'w=1024&h=1792',
    '4:5': 'w=1024&h=1280',
  };

  if (url.includes('?')) {
    url = url.split('?')[0];
  }

  return `${url}?${dimensions[aspectRatio] || dimensions['1:1']}`;
}

/**
 * Generate mock repurposed content
 */
export function generateMockRepurposedContent(options: {
  content: string;
  fromFormat: string;
  toFormat: string;
}): string {
  const { fromFormat, toFormat } = options;

  const template = mockRepurposedContent[fromFormat as keyof typeof mockRepurposedContent];
  if (template) {
    return template[toFormat as keyof typeof template] || 'Repurposed content will appear here';
  }

  return 'Repurposed content will appear here';
}

/**
 * Simulate API delay for realistic mock responses
 */
export function simulateDelay(ms: number = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
