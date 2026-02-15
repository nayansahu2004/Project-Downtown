export const LOVE_QUOTES = [
  "In all the world, there is no heart for me like yours. — Maya Angelou",
  "You are my today and all of my tomorrows. — Leo Christopher",
  "I have found the one whom my soul loves. — Song of Solomon",
  "Whatever our souls are made of, his and mine are the same. — Emily Brontë",
  "Love is composed of a single soul inhabiting two bodies. — Aristotle",
  "I wish I could turn back the clock. I'd find you sooner and love you longer.",
  "You're the closest to heaven that I'll ever be.",
  "Every love story is beautiful, but ours is my favorite.",
  "I loved you yesterday, I love you today, I'll love you tomorrow.",
  "You are my sun, my moon, and all my stars. — E.E. Cummings",
  "To love and be loved is to feel the sun from both sides.",
  "I look at you and see the rest of my life in front of my eyes.",
  "My heart is, and always will be, yours. — Jane Austen",
  "You make me want to be a better person.",
  "In case you ever foolishly forget — I am never not thinking of you.",
  "The best thing to hold onto in life is each other. — Audrey Hepburn",
  "I fell in love the way you fall asleep: slowly, then all at once.",
  "You had me at hello.",
  "Love recognizes no barriers. — Maya Angelou",
  "Grow old with me, the best is yet to be. — Robert Browning",
  "If I know what love is, it is because of you. — Hermann Hesse",
  "Two souls with but a single thought, two hearts that beat as one.",
  "Love is not finding someone to live with; it's finding someone you can't live without.",
  "I want all of you, forever, every day. — Nicholas Sparks",
  "You are the answer to every prayer I've offered.",
  "Love planted a rose, and the world turned sweet.",
  "I choose you. And I'll choose you over and over and over.",
  "Together is a wonderful place to be.",
  "All that you are is all that I'll ever need. — Ed Sheeran",
  "You are my heart, my life, my one and only thought. — Arthur Conan Doyle",
  "Come live in my heart, and pay no rent.",
];

export const ANNIVERSARY_MESSAGE = "Happy Anniversary! 🎉💕 Two beautiful years of love, laughter, and endless memories together. Here's to forever! 🥂✨";

export function getDailyQuote(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return LOVE_QUOTES[dayOfYear % LOVE_QUOTES.length];
}

export function isAnniversary(): boolean {
  const now = new Date();
  return now.getMonth() === 1 && now.getDate() === 28;
}
