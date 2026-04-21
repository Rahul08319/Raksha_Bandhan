import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Gift, Share2, Star } from "lucide-react";

const TARGET_DATE = new Date("Aug 28, 2026 00:00:00").getTime();

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const distance = Math.max(TARGET_DATE - now, 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    done: distance === 0,
  };
};

const Petal = ({ delay, duration, left, emoji }: { delay: number; duration: number; left: number; emoji: string }) => (
  <div
    className="pointer-events-none absolute text-2xl animate-float-up"
    style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    aria-hidden
  >
    {emoji}
  </div>
);

const Index = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const { days, hours, minutes, seconds, done } = useCountdown();

  // Read prefilled name from URL (?bl=Name)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bl = params.get("bl");
    if (bl) {
      const clean = decodeURIComponent(bl).replace(/-/g, " ").trim();
      if (clean) setSubmitted(clean);
    }
    document.title = "Raksha Bandhan 2026 — Send a Heartfelt Wish";
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        left: Math.random() * 100,
        emoji: ["🌸", "🌺", "✨", "🪷", "💛", "🧡"][i % 6],
      })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSubmitted(trimmed);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareOnWhatsApp = () => {
    if (!submitted) return;
    const url = (window.location.href.split("?")[0] + "?bl=" + submitted).replace(/ /g, "-");
    const text = `*${submitted}* has sent you a special Raksha Bandhan wish 🎁✨%0A👉 ${url}`;
    window.location.href = `whatsapp://send?text=${text}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-sunset">
      {/* Floating petals */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {petals.map((p) => (
          <Petal key={p.id} {...p} />
        ))}
      </div>

      {/* Decorative rangoli corners */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-festive opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-10 sm:py-16">
        {/* Header */}
        <header className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Raksha Bandhan • 28 August 2026
          </div>
          <h1 className="font-display text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            <span className="text-gradient-festive animate-shimmer bg-[length:200%_auto]">Happy Rakhi</span>
            <br />
            <span className="font-script text-4xl font-normal text-foreground/80 sm:text-5xl">
              A bond beyond words
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            A sacred thread of love, protection & endless memories. Send a personalised
            Raksha Bandhan wish to your brother or sister this year. 💖
          </p>
        </header>

        {/* Countdown */}
        <section className="mt-10">
          <div className="rounded-3xl border border-primary/20 bg-card/70 p-6 shadow-festive backdrop-blur">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
              {done ? "It's Rakhi Day! 🎉" : "Rakhi arrives in"}
            </p>
            <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl bg-gradient-festive p-[2px]"
                >
                  <div className="rounded-[14px] bg-card px-2 py-4 text-center">
                    <div className="font-display text-3xl font-black text-gradient-festive sm:text-5xl tabular-nums">
                      {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
                      {c.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wish / Form Card */}
        <section className="mt-10">
          {submitted ? (
            <WishCard name={submitted} onShare={shareOnWhatsApp} onReset={() => setSubmitted(null)} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-accent/30 bg-card/80 p-6 shadow-festive backdrop-blur sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-gold shadow-glow">
                  <Gift className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">Create your wish</h2>
                  <p className="text-sm text-muted-foreground">Enter your name to personalise</p>
                </div>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (e.g. Aarav)"
                className="h-14 rounded-2xl border-primary/30 bg-background/80 px-5 text-base"
                autoFocus
              />
              <Button
                type="submit"
                className="mt-4 h-14 w-full rounded-2xl bg-gradient-festive text-base font-bold text-primary-foreground shadow-festive hover:opacity-95 hover:shadow-glow"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Create My Wish
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Free • No sign-up • Share instantly on WhatsApp
              </p>
            </form>
          )}
        </section>

        {/* Features */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Heart, title: "Heartfelt", desc: "Crafted with love for siblings" },
            { icon: Star, title: "Personalised", desc: "Your name, your wish" },
            { icon: Share2, title: "One-tap share", desc: "Direct to WhatsApp" },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-festive"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>

        <footer className="mt-14 pb-24 text-center text-xs text-muted-foreground">
          Made with <span className="text-primary">♥</span> for every brother & sister • Raksha Bandhan 2026
        </footer>
      </div>
    </main>
  );
};

const WishCard = ({ name, onShare, onReset }: { name: string; onShare: () => void; onReset: () => void }) => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-festive p-[3px] shadow-festive">
    <div className="relative rounded-[22px] bg-card px-6 py-10 text-center sm:px-10 sm:py-14">
      {/* Rakhi thread decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-1 w-40 rounded-b-full bg-gradient-gold" />
      </div>
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold shadow-glow animate-pulse-glow">
        <span className="text-4xl animate-wiggle">🪔</span>
      </div>
      <p className="font-script text-3xl text-primary sm:text-4xl">Dearest sibling,</p>
      <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-6xl">
        <span className="text-gradient-festive">{name}</span>
      </h2>
      <p className="font-script text-2xl text-muted-foreground sm:text-3xl">wishes you a</p>
      <h3 className="mt-2 font-display text-3xl font-black text-gradient-gold sm:text-5xl">
        Happy Raksha Bandhan 2026
      </h3>
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
        “We gain and lose things every day — but trust me on one thing, you'll never lose me.
        I will always be here. 🌸”
      </p>
      <div className="mt-4 flex justify-center gap-1 text-2xl">
        <span>🎁</span><span>✨</span><span>🪷</span><span>💝</span><span>🌺</span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={onShare}
          className="h-14 rounded-2xl bg-[#25D366] px-8 text-base font-bold text-white hover:bg-[#25D366]/90 hover:shadow-glow"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share on WhatsApp
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="h-14 rounded-2xl border-primary/30 px-6 text-base font-semibold"
        >
          Change name
        </Button>
      </div>
    </div>
  </div>
);

export default Index;
