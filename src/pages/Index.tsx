import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Gift,
  Share2,
  Download,
  Mail,
  Globe,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Copy,
  Check,
  Shuffle,
  Music,
  Smile,
  Flame,
  Award,
  Heart,
  Palette,
  Clock,
} from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import {
  LANGS,
  TEMPLATES,
  CARD_STICKERS,
  SIBLING_TITLES,
  BORDER_STYLES,
  t as translations,
  type Lang,
  type WishTemplate,
} from "@/lib/rakhi-i18n";
import { getNextRakhi } from "@/lib/rakhi-dates";
import { festiveAudio } from "@/lib/soundEffects";
import {
  SacredRakhiMotif,
  AuspiciousDiya,
  AmbientMandala,
  FestiveToran,
  CornerFiligree,
} from "@/components/FestiveDecorations";
import { RakhiCeremonyModal } from "@/components/RakhiCeremonyModal";

// Live Countdown hook
const useCountdown = (target: number) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const distance = Math.max(target - now, 0);
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
    done: distance === 0,
  };
};

// Floating festive flower / sparkle particle
const Petal = ({
  delay,
  duration,
  left,
  emoji,
}: {
  delay: number;
  duration: number;
  left: number;
  emoji: string;
}) => (
  <div
    className="pointer-events-none fixed text-xl sm:text-2xl animate-float-up z-0 select-none opacity-80"
    style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    aria-hidden="true"
  >
    {emoji}
  </div>
);

// Multi-directional celebration confetti
const fireFestiveConfetti = () => {
  festiveAudio.playCelebrationChord();
  const end = Date.now() + 850;
  const colors = ["#f97316", "#eab308", "#ec4899", "#a855f7", "#22c55e", "#ffd700"];
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.75 },
      colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.75 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({
    particleCount: 120,
    spread: 110,
    origin: { y: 0.55 },
    colors,
  });
};

const SUGGESTED_NAMES = [
  "Bhaiya 👦",
  "Didi 👧",
  "Chhote 🧒",
  "Chhoti 👧",
  "My Brother 👑",
  "My Sister 💖",
  "Aarav 🌟",
  "Ananya 🌸",
];

const Index = () => {
  const [recipientName, setRecipientName] = useState("Dearest Sibling");
  const [customMessage, setCustomMessage] = useState("");
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(["diya", "lotus", "mithai"]);
  const [lang, setLang] = useState<Lang>("en");
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientMusicOn, setAmbientMusicOn] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCeremonyOpen, setIsCeremonyOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("partner");
  const [selectedBorder, setSelectedBorder] = useState<string>("gold");

  const rakhi = useMemo(() => getNextRakhi(Date.now(), lang), [lang]);
  const { days, hours, minutes, seconds, done } = useCountdown(rakhi.date.getTime());
  const cardRef = useRef<HTMLDivElement>(null);

  const T = translations[lang];
  const template: WishTemplate =
    TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];

  // Initialize theme, audio, and URL parameters
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDarkMode(true);
    }

    const params = new URLSearchParams(window.location.search);
    const bl = params.get("bl");
    const lp = params.get("lang") as Lang | null;
    const tp = params.get("tpl");
    const msg = params.get("msg");
    const stk = params.get("stk");
    const ttl = params.get("ttl");
    const bdr = params.get("bdr");

    if (lp && LANGS.some((l) => l.code === lp)) setLang(lp);
    if (tp && TEMPLATES.some((x) => x.id === tp)) setTemplateId(tp);
    if (ttl && SIBLING_TITLES.some((s) => s.id === ttl)) setSelectedTitle(ttl);
    if (bdr && BORDER_STYLES.some((b) => b.id === bdr)) setSelectedBorder(bdr);
    if (msg) {
      setCustomMessage(decodeURIComponent(msg));
      setUseCustomMessage(true);
    }
    if (stk) {
      const splitStk = stk.split(",");
      if (splitStk.length > 0) setSelectedStickers(splitStk);
    }
    if (bl) {
      const clean = decodeURIComponent(bl).replace(/-/g, " ").trim();
      if (clean) {
        setRecipientName(clean);
        setTimeout(fireFestiveConfetti, 400);
      }
    }
  }, []);

  useEffect(() => {
    document.title = `Raksha Bandhan ${rakhi.year} — Sacred Bond & Celebration Wish`;
  }, [rakhi.year]);

  const toggleTheme = () => {
    festiveAudio.playSparkle();
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    festiveAudio.enabled = next;
    if (next) {
      festiveAudio.playSparkle();
      toast.success("Festive audio chimes enabled 🎶");
    } else {
      toast.info("Audio muted");
    }
  };

  const toggleAmbientMusic = () => {
    const active = festiveAudio.toggleAmbientMusic();
    setAmbientMusicOn(active);
    if (active) {
      toast.success("Playing ambient temple sitar drone 🪔");
    } else {
      toast.info("Ambient music stopped");
    }
  };

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 9,
        left: Math.random() * 100,
        emoji: ["🌸", "🌺", "✨", "🪷", "🌼", "🪔", "💖", "⭐"][i % 8],
      })),
    []
  );

  const toggleSticker = (id: string) => {
    festiveAudio.playSparkle();
    setSelectedStickers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleShuffleTheme = () => {
    festiveAudio.playSparkle();
    const otherTemplates = TEMPLATES.filter((t) => t.id !== templateId);
    const randomTpl = otherTemplates[Math.floor(Math.random() * otherTemplates.length)];
    setTemplateId(randomTpl.id);
    toast.success(`Theme switched to ${randomTpl.name}! ✨`);
  };

  const buildShareUrl = () => {
    const base = window.location.href.split("?")[0];
    const encodedName = encodeURIComponent(recipientName).replace(/%20/g, "-");
    let url = `${base}?bl=${encodedName}&lang=${lang}&tpl=${template.id}`;
    if (useCustomMessage && customMessage.trim()) {
      url += `&msg=${encodeURIComponent(customMessage.trim())}`;
    }
    if (selectedStickers.length > 0) {
      url += `&stk=${encodeURIComponent(selectedStickers.join(","))}`;
    }
    if (selectedTitle) {
      url += `&ttl=${encodeURIComponent(selectedTitle)}`;
    }
    if (selectedBorder) {
      url += `&bdr=${encodeURIComponent(selectedBorder)}`;
    }
    return url;
  };

  const activeMessage = useCustomMessage && customMessage.trim()
    ? customMessage.trim()
    : template.messages[lang];

  const happyText = T.happy.replace("{year}", String(rakhi.year));
  const chipText = T.chip.replace("{date}", rakhi.dateLabel);
  const wishText = () =>
    `✨ *${recipientName}* ${T.wishes} ${happyText}! 🎁\n\n"${activeMessage}"\n\n👉 Open your sacred festive card:\n${buildShareUrl()}`;

  const shareOnWhatsApp = () => {
    festiveAudio.playSparkle();
    const shareUrl = buildShareUrl();
    const message = `✨ *${recipientName}* ${T.wishes} *${happyText}*! 🪔🎁%0A%0A"${encodeURIComponent(
      activeMessage
    )}"%0A%0A👉 *Tap to view your personalized card:*%0A${encodeURIComponent(shareUrl)}`;
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  const shareViaEmail = () => {
    festiveAudio.playSparkle();
    const subject = encodeURIComponent(T.emailSubject);
    const body = encodeURIComponent(`${wishText()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyShareLink = async () => {
    festiveAudio.playSparkle();
    const link = buildShareUrl();
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      toast.success("Shareable link copied to clipboard! 🎁");
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    festiveAudio.playSparkle();
    setIsDownloading(true);
    toast.loading("Rendering 3x high-definition card...", { id: "download-toast" });

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: isDarkMode ? "#130722" : "#FFF7ED",
      });
      const link = document.createElement("a");
      link.download = `rakhi-card-${recipientName.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Card downloaded successfully! 🌟", { id: "download-toast" });
    } catch (err) {
      console.error("Failed to download card:", err);
      toast.error("Could not download image. Please try again.", { id: "download-toast" });
    } finally {
      setIsDownloading(false);
    }
  };

  const langFontClass =
    lang === "hi" || lang === "mr"
      ? "font-devanagari"
      : lang === "gu"
      ? "font-gujarati"
      : lang === "ta"
      ? "font-tamil"
      : "";

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden bg-gradient-sunset transition-colors duration-500 ${langFontClass}`}
    >
      {/* Decorative Toran Banner at viewport top */}
      <FestiveToran />

      {/* Floating Petals & Ambient Sparkles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {petals.map((p) => (
          <Petal key={p.id} {...p} />
        ))}
      </div>

      {/* Ambient Rotating Background Mandalas */}
      <AmbientMandala className="-top-32 -left-32 w-96 h-96 sm:w-[540px] sm:h-[540px] text-amber-500/20" />
      <AmbientMandala className="top-1/3 -right-40 w-96 h-96 sm:w-[580px] sm:h-[580px] text-rose-500/20" />
      <AmbientMandala className="bottom-0 left-1/4 w-80 h-80 sm:w-[480px] sm:h-[480px] text-orange-500/15" />

      {/* Radial festive ambient glow orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-festive opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-60 h-[450px] w-[450px] rounded-full bg-gradient-gold opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-secondary/15 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-7 pb-16 sm:px-6 sm:pt-10 sm:pb-24">
        {/* Top Navigation Bar */}
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-gold shadow-glow">
              <span className="text-2xl">🪔</span>
            </div>
            <div>
              <div className="font-cinzel text-base font-black tracking-wider text-foreground sm:text-xl">
                BANDHAN
              </div>
              <div className="text-[10px] font-bold text-primary uppercase tracking-widest">
                Sacred Festive Studio
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ambient Music Button */}
            <button
              onClick={toggleAmbientMusic}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold backdrop-blur transition hover:scale-105 ${
                ambientMusicOn
                  ? "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400 shadow-glow"
                  : "border-amber-500/30 bg-card/70 text-muted-foreground hover:text-foreground"
              }`}
              title="Toggle ambient Indian temple sitar drone"
            >
              <Music className={`h-3.5 w-3.5 ${ambientMusicOn ? "animate-pulse" : ""}`} />
              <span className="hidden sm:inline">
                {ambientMusicOn ? "Music Playing 🎶" : "Ambient Sitar"}
              </span>
            </button>

            {/* Sound Chimes Toggle */}
            <button
              onClick={toggleSound}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/30 bg-card/70 text-foreground backdrop-blur transition hover:scale-105 hover:border-primary focus:outline-none"
              title={soundEnabled ? "Mute audio" : "Enable festive chimes"}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-amber-500" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/30 bg-card/70 text-foreground backdrop-blur transition hover:scale-105 hover:border-primary focus:outline-none"
              title="Toggle theme"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-card/80 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
              <Globe className="h-3.5 w-3.5 text-primary" />
              <select
                value={lang}
                onChange={(e) => {
                  festiveAudio.playSparkle();
                  setLang(e.target.value as Lang);
                }}
                className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
                aria-label={T.pickLang}
              >
                {LANGS.map((l) => (
                  <option key={l.code} value={l.code} className="bg-card text-foreground">
                    {l.native}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center pt-2 pb-4">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-card/80 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur sm:text-sm">
            <Sparkles className="h-4 w-4 text-amber-500 animate-spin-slow" />
            <span>{chipText}</span>
          </div>

          <div className="flex justify-center mb-1">
            <AuspiciousDiya size={52} />
          </div>

          <h1 className="font-cinzel text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient-gold animate-shimmer">
              {T.title}
            </span>
            <br />
            <span className="font-script text-3xl sm:text-5xl md:text-6xl font-normal text-foreground/90 block mt-1">
              {T.subtitle}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {T.intro}
          </p>

          {/* Virtual Rakhi Ceremony & Confetti CTAs */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                festiveAudio.playCelebrationChord();
                setIsCeremonyOpen(true);
              }}
              className="h-12 px-6 rounded-2xl bg-gradient-festive text-sm sm:text-base font-bold text-white shadow-festive hover:shadow-glow hover:scale-105 active:scale-95 transition"
            >
              <Sparkles className="mr-2 h-5 w-5 animate-spin-slow" />
              Start Virtual Rakhi Ceremony 🪔
            </Button>
            <Button
              type="button"
              onClick={fireFestiveConfetti}
              variant="outline"
              className="h-12 px-5 rounded-2xl border-amber-500/40 bg-card/80 text-sm font-bold text-foreground shadow-sm hover:border-amber-500 hover:bg-card transition"
            >
              Celebrate 🎉
            </Button>
          </div>
        </header>

        {/* Real-time Countdown Banner */}
        <section className="mt-6 sm:mt-8">
          <div className="rounded-3xl border border-amber-500/30 bg-card/80 p-4 sm:p-6 shadow-festive backdrop-blur-md max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">
              <Flame className="h-4 w-4 text-amber-500" />
              <span>{done ? `🎉 ${T.today}` : T.arrives}</span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: T.days, value: days },
                { label: T.hours, value: hours },
                { label: T.minutes, value: minutes },
                { label: T.seconds, value: seconds },
              ].map((c, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl bg-gradient-gold p-[2px] transition hover:scale-105"
                >
                  <div className="rounded-[14px] bg-card/95 px-1 py-3 text-center sm:px-2 sm:py-4 backdrop-blur">
                    <div className="font-cinzel text-2xl font-black text-gradient-gold tabular-nums sm:text-4xl">
                      {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground sm:text-xs">
                      {c.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Interactive Card Studio (2-Column Desktop, Stacked Mobile) */}
        <section className="mt-10 sm:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Customizer Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl border border-amber-500/30 bg-card/85 p-5 sm:p-7 shadow-md backdrop-blur-md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-gold shadow-sm">
                    <Palette className="h-5 w-5 text-amber-950" />
                  </div>
                  <div>
                    <h2 className="font-cinzel text-lg font-bold text-foreground sm:text-xl">
                      Card Customizer
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Edit details &amp; see the card update live
                    </p>
                  </div>
                </div>

                {/* 1. Recipient Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Recipient / Sibling Name</span>
                    <span className="text-[10px] text-primary font-normal">Real-time sync</span>
                  </label>
                  <Input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter name (e.g. Aarav, Didi, Bhaiya)"
                    className="h-12 rounded-2xl border-amber-500/40 bg-background/90 px-4 text-base font-semibold focus-visible:ring-amber-500"
                  />
                  {/* Quick suggestion chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {SUGGESTED_NAMES.map((sug) => {
                      const clean = sug.replace(/[^\w\s]/gi, "").trim();
                      return (
                        <button
                          key={sug}
                          type="button"
                          onClick={() => {
                            festiveAudio.playSparkle();
                            setRecipientName(clean);
                          }}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold border border-amber-500/30 bg-background/60 hover:border-primary hover:bg-primary/10 transition"
                        >
                          {sug}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Sibling Honorary Title Ribbon */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Honorary Sibling Title</span>
                    <span className="text-[10px] text-primary font-normal">Card Badge</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SIBLING_TITLES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          festiveAudio.playSparkle();
                          setSelectedTitle(st.id);
                        }}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                          selectedTitle === st.id
                            ? "border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300 shadow-sm"
                            : "border-border/60 bg-background/60 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Theme Selection */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Card Theme ({TEMPLATES.length})
                    </label>
                    <button
                      type="button"
                      onClick={handleShuffleTheme}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1"
                    >
                      <Shuffle className="h-3 w-3" />
                      Shuffle
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => {
                          festiveAudio.playSparkle();
                          setTemplateId(tpl.id);
                        }}
                        className={`rounded-2xl border-2 p-2.5 text-left transition flex items-center gap-2 ${
                          templateId === tpl.id
                            ? "border-amber-500 bg-amber-500/15 shadow-sm"
                            : "border-border/60 bg-background/50 hover:border-amber-500/40"
                        }`}
                      >
                        <span className="text-xl">{tpl.emoji}</span>
                        <span className="text-xs font-bold truncate">{tpl.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Embossed Border Frame */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Embossed Border Frame
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BORDER_STYLES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          festiveAudio.playSparkle();
                          setSelectedBorder(b.id);
                        }}
                        className={`p-2 rounded-xl border-2 text-xs font-bold text-left transition ${
                          selectedBorder === b.id
                            ? "border-amber-500 bg-amber-500/15"
                            : "border-border/60 bg-background/50 hover:border-amber-500/40"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Auspicious Stickers Multi-Select */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Smile className="h-3.5 w-3.5 text-primary" />
                    <span>Auspicious Stickers</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {CARD_STICKERS.map((stk) => {
                      const isSelected = selectedStickers.includes(stk.id);
                      return (
                        <button
                          key={stk.id}
                          type="button"
                          onClick={() => toggleSticker(stk.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                            isSelected
                              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500"
                              : "bg-background/60 text-muted-foreground border border-border/70 hover:border-primary/50"
                          }`}
                        >
                          <span>{stk.emoji}</span>
                          <span>{stk.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Custom Message Option */}
                <div className="space-y-2 pt-4 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setUseCustomMessage(!useCustomMessage)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1.5 transition"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {useCustomMessage
                      ? "Use poetic verse template"
                      : "+ Write your own personal message"}
                  </button>

                  {useCustomMessage && (
                    <textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Write your heartfelt words here..."
                      rows={3}
                      className="w-full rounded-2xl border border-amber-500/40 bg-background/90 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  )}
                </div>

                {/* Celebration Button */}
                <Button
                  type="button"
                  onClick={fireFestiveConfetti}
                  className="w-full h-12 mt-2 rounded-2xl bg-gradient-festive text-sm font-bold text-white shadow-festive hover:opacity-95 transition"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Celebrate with Confetti &amp; Chimes 🎉
                </Button>
              </div>
            </div>

            {/* Right Column: Live Card Preview & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  Live Greeting Card Preview
                </span>
                <span className="text-xs text-muted-foreground italic">
                  Tap card to sparkle ✨
                </span>
              </div>

              {/* The Wish Card Display */}
              <WishCard
                ref={cardRef}
                name={recipientName || "Dearest Sibling"}
                template={template}
                lang={lang}
                T={T}
                langFontClass={langFontClass}
                year={rakhi.year}
                customMessage={activeMessage}
                selectedStickers={selectedStickers}
                selectedTitle={selectedTitle}
                selectedBorder={selectedBorder}
                onTriggerFestive={fireFestiveConfetti}
              />

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={shareOnWhatsApp}
                  className="h-12 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition active:scale-95"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share on WhatsApp
                </Button>

                <Button
                  onClick={downloadImage}
                  disabled={isDownloading}
                  variant="outline"
                  className="h-12 rounded-2xl border-amber-500/40 bg-card/90 text-sm font-bold shadow-sm hover:bg-card hover:border-amber-500 transition active:scale-95"
                >
                  <Download className="mr-2 h-4 w-4 text-amber-500" />
                  {isDownloading ? "Rendering..." : "Download Card (PNG)"}
                </Button>

                <Button
                  onClick={copyShareLink}
                  variant="outline"
                  className="h-12 rounded-2xl border-amber-500/40 bg-card/90 text-sm font-bold shadow-sm hover:bg-card hover:border-amber-500 transition active:scale-95"
                >
                  {isCopied ? (
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4 text-primary" />
                  )}
                  {isCopied ? "Link Copied!" : "Copy Share Link"}
                </Button>
              </div>

              <div className="text-center">
                <Button
                  onClick={shareViaEmail}
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  <Mail className="mr-1.5 h-3.5 w-3.5" />
                  {T.shareEmail}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Auspicious Shubh Muhurat & Panchang Card */}
        <section className="mt-14 sm:mt-20 max-w-4xl mx-auto rounded-3xl border border-amber-500/30 bg-card/85 p-6 sm:p-8 shadow-festive backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-gold shadow-glow">
              <Clock className="h-5 w-5 text-amber-950" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-foreground sm:text-2xl">
                Auspicious Shubh Muhurat &amp; Vedic Panchang
              </h3>
              <p className="text-xs text-muted-foreground">
                Astrological timing guidance for tying Rakhi on Raksha Bandhan {rakhi.year}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                Aparahna Kaal (Prime Time)
              </div>
              <div className="text-lg font-black font-cinzel text-foreground mt-1">
                01:45 PM – 04:18 PM
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Most auspicious window to tie Rakhi &amp; perform Aarti
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Pradosh Kaal Muhurat
              </div>
              <div className="text-lg font-black font-cinzel text-foreground mt-1">
                06:50 PM – 09:05 PM
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Ideal evening window for sibling gatherings
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Shravana Purnima Tithi
              </div>
              <div className="text-lg font-black font-cinzel text-foreground mt-1">
                Full Moon Lunar Phase
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                Auspicious lunar celebration of unconditional bonds
              </div>
            </div>
          </div>
        </section>

        {/* Festive Traditions & Significance Section */}
        <section className="mt-14 sm:mt-18">
          <div className="text-center mb-8">
            <h3 className="font-cinzel text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sacred Traditions of Raksha Bandhan
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 max-w-md mx-auto">
              The time-honored rituals that celebrate unconditional love and lifelong camaraderie.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🪔",
                title: "Aarti & Blessings",
                desc: "Lighting the ceremonial diya lamp and circling it with prayers for long life, happiness, and peace.",
              },
              {
                icon: "🔴",
                title: "Shubh Tilak & Akshat",
                desc: "Applying sacred vermillion and unbroken rice grains on the forehead invoking divine protection.",
              },
              {
                icon: "🧵",
                title: "Sacred Rakhi Thread",
                desc: "Tying the Kalawa silk thread onto the right wrist, symbolizing an unbreakable covenant of loyalty.",
              },
              {
                icon: "🍬",
                title: "Mithai & Sweet Exchange",
                desc: "Offering traditional sweets like Kaju Katli, Ladoo, and Ghewar celebrating lifelong sweetness.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group relative rounded-3xl border border-amber-500/20 bg-card/75 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-festive"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold shadow-sm text-2xl">
                  {f.icon}
                </div>
                <h4 className="font-cinzel text-base font-bold text-foreground">{f.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-muted-foreground sm:mt-20">
          <div className="flex justify-center items-center gap-2 mb-2">
            <AuspiciousDiya size={28} />
          </div>
          <p>
            Crafted with <span className="text-rose-500">♥</span> for brothers & sisters across the globe • Raksha Bandhan {rakhi.year}
          </p>
          <p className="text-[11px] text-muted-foreground/70 mt-1">
            Free, open-source festive wish studio
          </p>
        </footer>
      </div>

      {/* Interactive Virtual Rakhi Ceremony Modal */}
      <RakhiCeremonyModal
        siblingName={recipientName || "Sibling"}
        isOpen={isCeremonyOpen}
        onClose={() => setIsCeremonyOpen(false)}
      />
    </main>
  );
};

type WishCardProps = {
  name: string;
  template: WishTemplate;
  lang: Lang;
  T: (typeof translations)[Lang];
  langFontClass: string;
  year: number;
  customMessage: string;
  selectedStickers: string[];
  selectedTitle?: string;
  selectedBorder?: string;
  onTriggerFestive?: () => void;
};

// Luxury Wish Card Component
const WishCard = forwardRef<HTMLDivElement, WishCardProps>(
  (
    {
      name,
      template,
      lang,
      T,
      langFontClass,
      year,
      customMessage,
      selectedStickers,
      selectedTitle,
      selectedBorder,
      onTriggerFestive,
    },
    ref
  ) => {
    const titleObj = SIBLING_TITLES.find((t) => t.id === selectedTitle);
    const borderObj = BORDER_STYLES.find((b) => b.id === selectedBorder);

    return (
      <div
        ref={ref}
        onClick={onTriggerFestive}
        title="Click to celebrate with sparkles!"
        className={`group relative overflow-hidden rounded-3xl p-[3px] shadow-festive cursor-pointer transition duration-300 hover:scale-[1.01] ${template.gradient} ${borderObj?.borderClass ?? ""} ${langFontClass}`}
      >
        {/* Card Body with Glass Effect */}
        <div className="relative rounded-[22px] bg-card/95 px-6 py-10 text-center sm:px-10 sm:py-14 backdrop-blur-md">
          {/* Corner Filigree Borders */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Top Gold Accent Ribbon */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <div className="h-1.5 w-48 rounded-b-full bg-gradient-gold shadow-glow" />
          </div>

          {/* Centerpiece Sacred Rakhi Motif with Glowing Halo */}
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-gold/20 shadow-glow animate-pulse-glow sm:mb-5 sm:h-28 sm:w-28">
            <SacredRakhiMotif className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>

          {/* Honorary Title Badge */}
          {titleObj && (
            <div className="mx-auto mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-amber-400/40 bg-amber-500/15 text-[11px] font-black tracking-widest text-amber-700 dark:text-amber-300 shadow-sm">
              <Award className="h-3 w-3 text-amber-500" />
              <span>⚜️ {titleObj.tag} ⚜️</span>
            </div>
          )}

          {/* Greeting Calligraphy */}
          <p className="font-script text-2xl text-primary sm:text-4xl">
            {T.dearest}
          </p>

          {/* Recipient Name in majestic typography */}
          <h2 className="mt-1 font-cinzel text-3xl font-black tracking-tight sm:mt-2 sm:text-5xl md:text-6xl break-words">
            <span className={template.accent}>{name}</span>
          </h2>

          <p className="font-script text-xl text-muted-foreground sm:text-3xl mt-1">
            {T.wishes}
          </p>

          {/* Happy Raksha Bandhan Festive Title */}
          <h3 className="mt-1 font-cinzel text-2xl font-black text-gradient-gold sm:text-4xl md:text-5xl">
            {T.happy.replace("{year}", String(year))}
          </h3>

          {/* Poetic / Custom Message Box */}
          <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-amber-500/20 bg-background/50 p-4 sm:p-5 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-foreground/90 sm:text-base italic">
              "{customMessage}"
            </p>
          </div>

          {/* Selected Auspicious Stickers Tray */}
          {selectedStickers.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center items-center gap-2">
              {selectedStickers.map((stkId) => {
                const found = CARD_STICKERS.find((s) => s.id === stkId);
                return found ? (
                  <span
                    key={stkId}
                    className="inline-flex items-center justify-center text-2xl sm:text-3xl px-2.5 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 shadow-sm transition hover:scale-110"
                  >
                    {found.emoji}
                  </span>
                ) : null;
              })}
            </div>
          )}

          {/* Bottom Royal Seal Watermark */}
          <div className="mt-7 pt-4 border-t border-amber-500/20 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            <span>Sacred Rakhi • Tied with Eternal Love</span>
          </div>
        </div>
      </div>
    );
  }
);
WishCard.displayName = "WishCard";

export default Index;

