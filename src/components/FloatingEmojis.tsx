import { useMemo } from "react";

const EMOJI_STICKERS = [
  "💕", "✨", "🌸", "💗", "🎵", "💫", "🌷", "💝",
  "🦋", "🌺", "💖", "🎶", "💐", "🌟", "💘", "🌹",
  "💜", "🎀", "💞", "🌙", "⭐", "🪻", "🩷", "🩵",
];

const FloatingEmojis = () => {
  const emojis = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: EMOJI_STICKERS[i % EMOJI_STICKERS.length],
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: 20 + Math.random() * 24,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {emojis.map((e) => (
        <span
          key={e.id}
          className="absolute opacity-0"
          style={{
            left: `${e.left}%`,
            bottom: "-40px",
            fontSize: `${e.size}px`,
            animation: `float-up ${e.duration}s linear ${e.delay}s infinite`,
            filter: "grayscale(0.3) brightness(1.1)",
            WebkitTextStroke: "1px hsl(330 80% 60% / 0.3)",
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingEmojis;
