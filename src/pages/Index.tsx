import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import FloatingEmojis from "@/components/FloatingEmojis";
import { getDailyQuote, isAnniversary, ANNIVERSARY_MESSAGE } from "@/lib/quotes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

function getTimeLeft() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let target = new Date(targetYear, 1, 28, 0, 0, 0);
  if (now > target) {
    target = new Date(targetYear + 1, 1, 28, 0, 0, 0);
  }
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Index = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [songName, setSongName] = useState("");
  const [songs, setSongs] = useState<{ id: string; song_name: string; created_at: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Live countdown
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      const { data } = await supabase
        .from("song_suggestions")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setSongs(data);
    };
    fetchSongs();

    // Realtime
    const channel = supabase
      .channel("songs-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "song_suggestions" },
        (payload) => {
          setSongs((prev) => [payload.new as any, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName.trim()) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("song_suggestions")
      .insert({ song_name: songName.trim() });
    if (error) {
      toast({ title: "Oops!", description: "Could not add song. Try again!", variant: "destructive" });
    } else {
      setSongName("");
      toast({ title: "Added! 🎵", description: "Your song suggestion is now visible to everyone!" });
    }
    setSubmitting(false);
  };

  const anniversary = isAnniversary();
  const quote = anniversary ? ANNIVERSARY_MESSAGE : getDailyQuote();

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(330 80% 92%), hsl(280 60% 88%), hsl(320 60% 94%))" }}>
      <FloatingEmojis />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 space-y-16">
        {/* Countdown Section */}
        <section className="text-center space-y-6">
          {anniversary ? (
            <div className="space-y-4 animate-fade-in">
              <h1 className="font-dancing text-6xl md:text-7xl font-bold text-primary drop-shadow-lg">
                Happy Anniversary! 🎉💕
              </h1>
              <p className="text-lg text-muted-foreground font-medium">Two years of love & magic ✨</p>
            </div>
          ) : (
            <>
              <h1 className="font-dancing text-5xl md:text-6xl font-bold text-primary drop-shadow-lg">
                Our Anniversary 💕
              </h1>
              <p className="text-muted-foreground text-lg font-medium">Counting down to February 28th ✨</p>
              <div className="flex justify-center gap-3 md:gap-5 flex-wrap">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="relative group"
                  >
                    {/* Decorative pulsing ring */}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 blur-sm group-hover:blur-md transition-all" style={{ animation: "pulse-heart 2s ease-in-out infinite" }} />
                    <div className="relative rounded-2xl px-5 py-4 md:px-7 md:py-5 backdrop-blur-sm border border-primary/20 bg-card/80 shadow-lg">
                      <span className="block text-4xl md:text-5xl font-bold text-primary font-dancing">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-wider">
                        {unit.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Decorative hearts */}
              <div className="flex justify-center gap-4 text-2xl">
                <span style={{ animation: "pulse-heart 1.5s ease-in-out infinite" }}>💗</span>
                <span style={{ animation: "sparkle 2s ease-in-out infinite 0.3s" }}>✨</span>
                <span style={{ animation: "pulse-heart 1.8s ease-in-out infinite 0.5s" }}>💜</span>
                <span style={{ animation: "sparkle 2.2s ease-in-out infinite 0.7s" }}>⭐</span>
                <span style={{ animation: "pulse-heart 1.6s ease-in-out infinite 1s" }}>💗</span>
              </div>
            </>
          )}
        </section>

        {/* Daily Quote */}
        <section className="text-center">
          <Card className="border-primary/20 bg-card/70 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                {anniversary ? "🎊 Anniversary Special 🎊" : "💌 Today's Love Note"}
              </p>
              <p className="font-dancing text-2xl md:text-3xl text-primary leading-relaxed">
                "You and me togethor, and we can fight the world forever"
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Song Suggestions */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="font-dancing text-4xl font-bold text-primary">
              Music to Play in Car 🎵
            </h2>
            <p className="text-muted-foreground mt-1">Suggest a song for our playlist!</p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Type a song name..."
              className="bg-card/80 backdrop-blur-sm border-primary/30 focus-visible:ring-primary placeholder:text-muted-foreground/60"
            />
            <Button
              type="submit"
              disabled={submitting || !songName.trim()}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg px-6 shrink-0"
            >
              {submitting ? "..." : "Add 🎶"}
            </Button>
          </form>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {songs.length === 0 && (
              <p className="text-center text-muted-foreground py-6">
                No songs yet — be the first to suggest one! 🎤
              </p>
            )}
            {songs.map((song) => (
              <Card
                key={song.id}
                className="border-primary/15 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors"
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-xl">🎵</span>
                  <span className="font-medium text-foreground">{song.song_name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center pb-8">
          <p className="text-muted-foreground text-sm font-dancing text-lg">
            💖Made by Nayan for his Vritea💖
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
