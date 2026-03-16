export interface Item {
  level: number;
  name: string;
  emoji: string;
  radius: number;
  score: number;
  color: string;
}

export const ITEMS: Item[] = [
  { level: 1,  name: "梅おにぎり",       emoji: "🍙", radius: 20,  score: 1,  color: "#ef4444" },
  { level: 2,  name: "鮭おにぎり",       emoji: "🍘", radius: 28,  score: 3,  color: "#f97316" },
  { level: 3,  name: "ツナマヨ",         emoji: "🍥", radius: 36,  score: 6,  color: "#fbbf24" },
  { level: 4,  name: "昆布おにぎり",     emoji: "🌿", radius: 44,  score: 10, color: "#22c55e" },
  { level: 5,  name: "天むす",           emoji: "🦐", radius: 52,  score: 15, color: "#06b6d4" },
  { level: 6,  name: "焼きおにぎり",     emoji: "🔥", radius: 60,  score: 21, color: "#f59e0b" },
  { level: 7,  name: "おむすびキング",   emoji: "👑", radius: 70,  score: 28, color: "#a855f7" },
  { level: 8,  name: "超特大おにぎり",   emoji: "🏔️", radius: 82,  score: 36, color: "#6366f1" },
  { level: 9,  name: "おにぎりレジェンド", emoji: "✨", radius: 96,  score: 45, color: "#d4af37" },
  { level: 10, name: "神おにぎり",       emoji: "🌟", radius: 112, score: 55, color: "#ffd700" },
];

export function getRandomDropItem(): Item {
  const dropLevels = [0, 1, 2]; // level 1, 2, 3 (index)
  const idx = dropLevels[Math.floor(Math.random() * dropLevels.length)];
  return ITEMS[idx];
}
