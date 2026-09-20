/**
 * @typedef {Object} LifeReceipt
 * @property {string} id
 * @property {string} timestamp
 * @property {string} date
 * @property {string} time
 * @property {'Music' | 'Movies & Entertainment' | 'Places' | 'Purchases' | 'Photos' | 'Messages' | 'Searches' | 'Events' | 'Personal Notes'} category
 * @property {string} subcategory
 * @property {string} item
 * @property {string} mode
 * @property {number} amount
 * @property {string} currency
 * @property {'Expense' | 'Income' | 'Digital Moment'} type
 * @property {string} location
 * @property {string} mood
 * @property {string} icon
 * @property {string} note
 * @property {string[]} tags
 * @property {string[]} connectedIds
 * @property {string} chronotype
 * @property {string} insights
 */

/** @type {LifeReceipt[]} */
export const LIFE_RECEIPTS = [
  // 1. MUSIC
  {
    id: "rec_104",
    timestamp: "2018-09-01 02:15:00",
    date: "01/09/2018",
    time: "02:15",
    category: "Music",
    subcategory: "Spotify Stream",
    item: "Midnight City - M83",
    mode: "Spotify Web Player",
    amount: 0.00,
    currency: "INR",
    type: "Digital Moment",
    location: "Personal Headphones",
    mood: "Contemplative",
    icon: "Music",
    note: "Played on loop while staring out of the window at 2:15 AM.",
    tags: ["2 AM Vibe", "Music", "Indie Synth"],
    connectedIds: ["rec_101", "rec_102"],
    chronotype: "Night Owl",
    insights: "2 AM music stream highly correlated with late night movie runs"
  },

  // 2. MOVIES & ENTERTAINMENT
  {
    id: "rec_101",
    timestamp: "2018-08-31 23:42:00",
    date: "31/08/2018",
    time: "23:42",
    category: "Movies & Entertainment",
    subcategory: "Cinema",
    item: "2 Movie Tickets - INOX Cinema",
    mode: "Debit Card",
    amount: 481.36,
    currency: "INR",
    type: "Expense",
    location: "INOX Multiplex",
    mood: "Nostalgic",
    icon: "Film",
    note: "Late night movie screening with a close friend after payday.",
    tags: ["Late Night", "Cinema", "Social"],
    connectedIds: ["rec_102", "rec_103", "rec_104"],
    chronotype: "Night Owl",
    insights: "Late Night Entertainment Spike after Monthly Salary Credit"
  },

  // 3. PURCHASES
  {
    id: "rec_102",
    timestamp: "2018-08-31 22:01:00",
    date: "31/08/2018",
    time: "22:01",
    category: "Purchases",
    subcategory: "Dinner",
    item: "Domino's Gourmet Pizza & Garlic Bread",
    mode: "Credit Card",
    amount: 510.85,
    currency: "INR",
    type: "Expense",
    location: "Domino's Pizza Outlet",
    mood: "Craving",
    icon: "Utensils",
    note: "Celebratory post-work Friday night dinner.",
    tags: ["Late Night Cravings", "Pizza", "Treat"],
    connectedIds: ["rec_101", "rec_103"],
    chronotype: "Night Owl",
    insights: "Food craving linked directly with payday income"
  },

  // 4. PLACES
  {
    id: "rec_501",
    timestamp: "2018-07-06 18:30:00",
    date: "06/07/2018",
    time: "18:30",
    category: "Places",
    subcategory: "Goa Trip",
    item: "Park Inn Resort Goa Transit Taxi",
    mode: "Cash",
    amount: 100.00,
    currency: "INR",
    type: "Expense",
    location: "Goa Coastal Highway",
    mood: "Relaxed & Beachy",
    icon: "Compass",
    note: "Arrived in monsoon Goa! Beach waves and rain breezes.",
    tags: ["Goa Vacation", "Travel", "Beach Retreat"],
    connectedIds: ["rec_502", "rec_503"],
    chronotype: "Evening",
    insights: "Mid-year vacation reset away from city routines"
  },

  // 5. PHOTOS
  {
    id: "rec_601",
    timestamp: "2018-07-07 19:15:00",
    date: "07/07/2018",
    time: "19:15",
    category: "Photos",
    subcategory: "Sunset Memory",
    item: "Sunset Photo Snapshot at Anjuna Beach",
    mode: "Smartphone Camera",
    amount: 0.00,
    currency: "INR",
    type: "Digital Moment",
    location: "Anjuna Beach Goa",
    mood: "Serene",
    icon: "Sparkles",
    note: "Golden hour sunset capture saved to gallery favorites.",
    tags: ["Photography", "Sunset", "Goa Memories"],
    connectedIds: ["rec_501", "rec_502"],
    chronotype: "Evening",
    insights: "Visual digital archive of calm emotional states"
  },

  // 6. MESSAGES
  {
    id: "rec_701",
    timestamp: "2018-08-15 22:30:00",
    date: "15/08/2018",
    time: "22:30",
    category: "Messages",
    subcategory: "Saved Note",
    item: "Saved Text: 'Remember to call Mom tomorrow'",
    mode: "WhatsApp / Chat",
    amount: 0.00,
    currency: "INR",
    type: "Digital Moment",
    location: "Personal Phone",
    mood: "Thoughtful",
    icon: "BookOpen",
    note: "Starred message reminder sent to self.",
    tags: ["Family", "Reminder", "Saved Chat"],
    connectedIds: ["rec_201"],
    chronotype: "Night",
    insights: "Strong interpersonal care & family relationship priority"
  },

  // 7. SEARCHES
  {
    id: "rec_801",
    timestamp: "2018-06-27 20:45:00",
    date: "27/06/2018",
    time: "20:45",
    category: "Searches",
    subcategory: "Web Search",
    item: "Search Query: 'Nehru planetarium stargazing shows'",
    mode: "Search Engine",
    amount: 0.00,
    currency: "INR",
    type: "Digital Moment",
    location: "Mobile Browser",
    mood: "Curious",
    icon: "Sparkle",
    note: "Looking up space & astronomy show timings before booking tickets.",
    tags: ["Search", "Astronomy", "Curiosity"],
    connectedIds: ["rec_403"],
    chronotype: "Evening",
    insights: "Web search directly preceding venue ticket purchase"
  },

  // 8. EVENTS
  {
    id: "rec_301",
    timestamp: "2018-09-16 17:15:00",
    date: "16/09/2018",
    time: "17:15",
    category: "Events",
    subcategory: "Ganesh Pujan",
    item: "Eco-Friendly Ganesh Idol & Puja Essentials",
    mode: "Cash",
    amount: 251.00,
    currency: "INR",
    type: "Expense",
    location: "Local Artisan Stalls",
    mood: "Devotional & Joyful",
    icon: "Sparkles",
    note: "Welcoming Bappa home for Ganesh Chaturthi festival!",
    tags: ["Ganesh Chaturthi", "Festival", "Family Tradition"],
    connectedIds: ["rec_302", "rec_303"],
    chronotype: "Evening",
    insights: "Cultural celebration peak in September"
  },

  // 9. PERSONAL NOTES
  {
    id: "rec_404",
    timestamp: "2018-03-23 19:48:00",
    date: "23/03/2018",
    time: "19:48",
    category: "Personal Notes",
    subcategory: "Book Reading",
    item: "Personal Note: 'Read Finding Your Next Job chapter 3'",
    mode: "Notes App",
    amount: 100.00,
    currency: "INR",
    type: "Expense",
    location: "Street Bookstore",
    mood: "Ambitious & Reflective",
    icon: "BookOpen",
    note: "Reading during commute to level up career ambitions.",
    tags: ["Career Growth", "Books", "Self Learning"],
    connectedIds: ["rec_801"],
    chronotype: "Evening",
    insights: "Active career progression planning & skill enhancement"
  }
];

export const SPOTIFY_VAULT = [
  {
    id: "sp_01",
    track: "Born To Die",
    artist: "Lana Del Rey",
    album: "Born To Die - Paradise Edition",
    timestamp: "2013-07-08 02:50:24",
    time: "02:50 AM",
    durationMs: 285386,
    durationFormatted: "4:45",
    platform: "Web Player",
    reasonStart: "clickrow",
    reasonEnd: "unknown",
    skipped: false,
    mood: "Midnight Melancholy",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
    is2AM: true
  },
  {
    id: "sp_02",
    track: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    timestamp: "2013-07-08 03:20:36",
    time: "03:20 AM",
    durationMs: 243000,
    durationFormatted: "4:03",
    platform: "Web Player",
    reasonStart: "clickrow",
    reasonEnd: "clickrow",
    skipped: false,
    mood: "Synth Nostalgia",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
    is2AM: true
  },
  {
    id: "sp_03",
    track: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    timestamp: "2013-07-08 03:22:51",
    time: "03:22 AM",
    durationMs: 272000,
    durationFormatted: "4:32",
    platform: "Web Player",
    reasonStart: "clickrow",
    reasonEnd: "clickrow",
    skipped: false,
    mood: "Late Night Rock",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
    is2AM: true
  }
];

export const STORY_CHAPTERS = [
  {
    chapterId: 1,
    title: "Chapter I: The 2 AM Melancholy & Payday Indulgence",
    subtitle: "August 31 - September 1, 2018",
    theme: "Night Owl Cravings & Payday Reset",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
    summary: "When salary hit the bank on Friday morning, it triggered a classic urban lifecycle: late night pizza craving at Domino's, followed by midnight cinema tickets at INOX, culminating in a 2:15 AM M83 listening session with solitary reflections.",
    receiptIds: ["rec_102", "rec_101", "rec_104"],
    narrative: [
      "10:01 PM - Domino's Pizza order placed. The weekend officially begins with hot melted cheese.",
      "11:42 PM - 2 Tickets booked at INOX for a late night movie screening.",
      "02:15 AM - Headphones on. M83 'Midnight City' synth echoes in the quiet room."
    ],
    personaBadge: "The Midnight Dreamer",
    quote: "Disconnected receipts don't just show money spent — they reveal how we seek balance between work, craving, and quiet reflection."
  }
];

export const ANALYTICS_DATA = {
  chronotype: {
    nightOwl: 42,
    earlyBird: 28,
    afternoon: 30
  },
  categoryBreakdown: [
    { name: "Purchases & Food", amount: 4850, color: "#f59e0b" },
    { name: "Investments & PPF", amount: 22500, color: "#10b981" },
    { name: "Health & Eyewear", amount: 6890, color: "#ef4444" },
    { name: "Entertainment & Cinema", amount: 2570, color: "#8b5cf6" },
    { name: "Travel & Transit", amount: 3750, color: "#06b6d4" },
    { name: "Festivals & Gifts", amount: 2050, color: "#ec4899" }
  ],
  topObsessions: [
    { title: "Domino's Pizza & Snacks", count: 18, icon: "Pizza" },
    { title: "M83 & Indie Synth Music", count: 47, icon: "Music" },
    { title: "Sony & Audio Tech Gear", count: 6, icon: "Headphones" },
    { title: "INOX & PVR Movies", count: 12, icon: "Film" },
    { title: "Shrikhand & Sweets", count: 9, icon: "Utensils" }
  ]
};
