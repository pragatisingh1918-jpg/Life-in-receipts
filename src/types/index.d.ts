export interface LifeReceipt {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  category: 'Music' | 'Movies & Entertainment' | 'Places' | 'Purchases' | 'Photos' | 'Messages' | 'Searches' | 'Events' | 'Personal Notes';
  subcategory: string;
  item: string;
  mode: string;
  amount: number;
  currency: string;
  type: 'Expense' | 'Income' | 'Digital Moment';
  location: string;
  mood: string;
  icon: string;
  note: string;
  tags: string[];
  connectedIds: string[];
  chronotype: string;
  insights: string;
}

export interface StoryChapter {
  chapterId: number;
  title: string;
  subtitle: string;
  theme: string;
  coverImage: string;
  summary: string;
  receiptIds: string[];
  narrative: string[];
  personaBadge: string;
  quote: string;
}
