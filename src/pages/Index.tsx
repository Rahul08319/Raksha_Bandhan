import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  Flame,
  Gift,
  Globe,
  Heart,
  Mail,
  Moon,
  Music,
  Palette,
  Share2,
  Shuffle,
  Smile,
  Sparkles,
  Sun,
  Volume2,
  VolumeX,
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
  GlowOrb,
} from "@/components/FestiveDecorations";
import { RakhiCeremonyModal } from "@/components/RakhiCeremonyModal";
import { FestiveJukebox } from "@/components/FestiveJukebox";

/* ── Intersection-observer reveal hook ─────────────────────────────── */
function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── RevealSection wrapper ─────────────────────────────────────────── */
const RevealSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? "animate-spring-in" : "reveal-hidden"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Countdown hook ────────────────────────────────────────────────── */
const useCountdown = (target: number) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const distance = Math.max(target - now, 0);
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
    done: distance === 0,
  };
};

/* ── Floating petal ────────────────────────────────────────────────── */
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
    className="pointer-events-none fixed text-lg sm:text-2xl animate-float-up z-0 select-none"
    style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    aria-hidden="true"
  >
    {emoji}
  </div>
);

/* ── Confetti burst ─────────────────────────────────────────────────── */
const fireFestiveConfetti = () => {
  festiveAudio.playCelebrationChord();
  const colors = ["#f97316", "#eab308", "#ec4899", "#a855f7", "#22c55e", "#ffd700", "#ef4444"];
  const end = Date.now() + 1000;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 80, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 80, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 140, spread: 120, origin: { y: 0.52 }, colors });
};

/* ── Suggested names ────────────────────────────────────────────────── */
const SUGGESTED_NAMES = [
  "Bhaiya 👦", "Didi 👧", "Chhote 🧒", "Chhoti 👧",
  "My Brother 👑", "My Sister 💖", "Aarav 🌟", "Ananya 🌸",
];

/* ── CountdownDigit ─────────────────────────────────────────────────── */
const CountdownDigit = ({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) => {
  const display = String(value).padStart(2, "0");
  const [prev, setPrev] = useState(display);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (display !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setPrev(display);
        setFlip(false);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [display, prev]);

  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-shine-top stagger-${index + 1}`}
      style={{ animationFillMode: "both" }}
    >
      {/* Glass body */}
      <div className="glass rounded-2xl sm:rounded-3xl px-2 py-4 sm:px-3 sm:py-5 text-center">
        {/* Top specular line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div
          className={`font-cinzel text-3xl sm:text-5xl font-black tabular-nums text-grad-gold transition-all duration-200 ${
            flip ? "translate-y-1 opacity-60 scale-95" : "translate-y-0 opacity-100 scale-100"
          }`}
          style={{ letterSpacing: "-0.02em" }}
        >
          {display}
        </div>
        <div className="mt-1 text-[9px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
      </div>

      {/* Gradient accent at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-grad-gold opacity-60" />
    </div>
  );
};

/* ── BentoTraditionCard ─────────────────────────────────────────────── */
const BentoTraditionCard = ({
  icon,
  title,
  desc,
  hero = false,
  delay = 0,
}: {
  icon: string;
  title: string;
  desc: string;
  hero?: boolean;
  delay?: number;
}) => (
  <RevealSection delay={delay}>
    <div
      className={`group relative overflow-hidden rounded-3xl glass-shine-top transition-all duration-300 press-effect
        hover:scale-[1.025] hover:shadow-glow cursor-default select-none
        ${hero ? "row-span-2 min-h-[240px]" : "min-h-[140px]"}`}
    >
      <div className="glass rounded-3xl p-6 h-full flex flex-col">
        {/* Specular */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

        {/* Icon */}
        <div
          className={`flex items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm mb-4 transition-transform duration-300 group-hover:scale-110
            ${hero ? "h-16 w-16 text-3xl" : "h-12 w-12 text-2xl"}`}
        >
          {icon}
        </div>

        <h4
          className={`font-cinzel font-bold text-foreground leading-tight
            ${hero ? "text-xl sm:text-2xl" : "text-base"}`}
        >
          {title}
        </h4>
        <p className={`mt-2 leading-relaxed text-muted-foreground ${hero ? "text-sm" : "text-xs"}`}>
          {desc}
        </p>

        {/* Bottom subtle gold line */}
        <div className="mt-auto pt-4">
          <div className="h-0.5 w-10 rounded-full bg-grad-gold opacity-50" />
        </div>
      </div>
    </div>
  </RevealSection>
);

/* ── PanchagCard ────────────────────────────────────────────────────── */
const PanchagCard = ({
  label,
  time,
  note,
  highlight = false,
}: {
  label: string;
  time: string;
  note: string;
  highlight?: boolean;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl press-effect group transition-all duration-200 hover:scale-[1.02]
      ${highlight ? "bg-amber-500/15 border border-amber-400/40" : "glass"}`}
  >
    <div className="p-4 sm:p-5">
      <div
        className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1
          ${highlight ? "text-amber-700 dark:text-amber-300" : "text-primary"}`}
      >
        {label}
      </div>
      <div className="font-cinzel text-base sm:text-lg font-black text-foreground">
        {time}
      </div>
      <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 leading-snug">
        {note}
      </div>
    </div>
    {highlight && (
      <div className="absolute right-3 top-3 text-lg">✨</div>
    )}
  </div>
);

/* ────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────── */
const Index = () => {
  const [recipientName, setRecipientName] = useState("Dearest Sibling");
  const [customMessage, setCustomMessage] = useState("");
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(["diya", "lotus", "mithai"]);
  const [lang, setLang] = useState<Lang>("en");
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCeremonyOpen, setIsCeremonyOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("partner");
  const [selectedBorder, setSelectedBorder] = useState<string>("gold");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [heroMounted, setHeroMounted] = useState(false);

  const rakhi = useMemo(
    () => getNextRakhi(Date.now(), lang, selectedYear),
    [lang, selectedYear]
  );
  const { days, hours, minutes, seconds, done } = useCountdown(rakhi.date.getTime());
  const cardRef = useRef<HTMLDivElement>(null);

  const T = translations[lang];
  const template: WishTemplate = TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];

  /* ── Init ── */
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) setIsDarkMode(true);

    const params = new URLSearchParams(window.location.search);
    const bl   = params.get("bl");
    const lp   = params.get("lang") as Lang | null;
    const tp   = params.get("tpl");
    const msg  = params.get("msg");
    const stk  = params.get("stk");
    const ttl  = params.get("ttl");
    const bdr  = params.get("bdr");
    const yr   = params.get("yr");

    if (lp  && LANGS.some((l) => l.code === lp))             setLang(lp);
    if (tp  && TEMPLATES.some((x) => x.id === tp))           setTemplateId(tp);
    if (ttl && SIBLING_TITLES.some((s) => s.id === ttl))     setSelectedTitle(ttl);
    if (bdr && BORDER_STYLES.some((b) => b.id === bdr))      setSelectedBorder(bdr);
    if (yr  && !isNaN(Number(yr)))                            setSelectedYear(Number(yr));
    if (msg) { setCustomMessage(decodeURIComponent(msg)); setUseCustomMessage(true); }
    if (stk) {
      const s = stk.split(",");
      if (s.length > 0) setSelectedStickers(s);
    }
    if (bl) {
      const clean = decodeURIComponent(bl).replace(/-/g, " ").trim();
      if (clean) { setRecipientName(clean); setTimeout(fireFestiveConfetti, 500); }
    }

    // Hero entrance delay
    setTimeout(() => setHeroMounted(true), 80);
  }, []);

  /* ── Scroll nav glass ── */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.title = `Raksha Bandhan ${rakhi.year} — Sacred Bond & Celebration`;
  }, [rakhi.year]);

  const toggleTheme = () => {
    festiveAudio.playSparkle();
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    festiveAudio.enabled = next;
    if (next) { festiveAudio.playSparkle(); toast.success("Audio chimes enabled 🎶"); }
    else toast.info("Audio muted");
  };

  /* ── Petals (memoized) ── */
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        delay:    Math.random() * 9,
        duration: 10 + Math.random() * 10,
        left:     Math.random() * 100,
        emoji:    ["🌸", "🌺", "✨", "🪷", "🌼", "🪔", "💖", "⭐", "🌟", "🌹"][i % 10],
      })),
    []
  );

  /* ── Sticker toggle ── */
  const toggleSticker = (id: string) => {
    festiveAudio.playSparkle();
    setSelectedStickers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  /* ── Shuffle theme ── */
  const handleShuffleTheme = () => {
    festiveAudio.playSparkle();
    const others = TEMPLATES.filter((t) => t.id !== templateId);
    const random = others[Math.floor(Math.random() * others.length)];
    setTemplateId(random.id);
    toast.success(`Theme: ${random.name} ✨`);
  };

  /* ── Share URL ── */
  const buildShareUrl = useCallback(() => {
    const base = window.location.href.split("?")[0];
    const encodedName = encodeURIComponent(recipientName).replace(/%20/g, "-");
    let url = `${base}?bl=${encodedName}&lang=${lang}&tpl=${template.id}`;
    if (useCustomMessage && customMessage.trim()) url += `&msg=${encodeURIComponent(customMessage.trim())}`;
    if (selectedStickers.length > 0) url += `&stk=${encodeURIComponent(selectedStickers.join(","))}`;
    if (selectedTitle) url += `&ttl=${encodeURIComponent(selectedTitle)}`;
    if (selectedBorder) url += `&bdr=${encodeURIComponent(selectedBorder)}`;
    if (selectedYear) url += `&yr=${encodeURIComponent(selectedYear)}`;
    return url;
  }, [recipientName, lang, template.id, useCustomMessage, customMessage, selectedStickers, selectedTitle, selectedBorder, selectedYear]);

  const activeMessage = useCustomMessage && customMessage.trim() ? customMessage.trim() : template.messages[lang];

  const shareOnWhatsApp = () => {
    festiveAudio.playSparkle();
    const shareUrl = buildShareUrl();
    const text = `✨ *${recipientName}* ${T.wishes} *${T.happy.replace("{year}", String(rakhi.year))}*! 🪔🎁%0A%0A"${encodeURIComponent(activeMessage)}"%0A%0A👉 *Your personalized card:*%0A${encodeURIComponent(shareUrl)}`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareViaEmail = () => {
    festiveAudio.playSparkle();
    const subject = encodeURIComponent(T.emailSubject);
    const body = encodeURIComponent(`✨ ${recipientName} ${T.wishes} ${T.happy.replace("{year}", String(rakhi.year))}!\n\n"${activeMessage}"\n\n${buildShareUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyShareLink = async () => {
    festiveAudio.playSparkle();
    try {
      await navigator.clipboard.writeText(buildShareUrl());
      setIsCopied(true);
      toast.success("Link copied! 🎁");
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      toast.error("Could not copy link.");
    }
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    festiveAudio.playSparkle();
    setIsDownloading(true);
    toast.loading("Rendering HD card…", { id: "dl" });
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: isDarkMode ? "#130722" : "#FFF7ED",
      });
      const a = document.createElement("a");
      a.download = `rakhi-${recipientName.toLowerCase().replace(/\s+/g, "-")}.png`;
      a.href = dataUrl;
      a.click();
      toast.success("Card downloaded! 🌟", { id: "dl" });
    } catch {
      toast.error("Could not render card.", { id: "dl" });
    } finally {
      setIsDownloading(false);
    }
  };

  const langFontClass =
    lang === "hi" || lang === "mr" ? "font-devanagari"
    : lang === "gu" ? "font-gujarati"
    : lang === "ta" ? "font-tamil"
    : "";

  /* ────────────────────────────────────────────────────────────────
     RENDER
  ─────────────────────────────────────────────────────────────── */
  return (
    <main
      className={`relative min-h-dvh overflow-x-hidden transition-colors duration-500 ${langFontClass}`}
      style={{ background: "var(--grad-sunset)" }}
    >
      {/* ── Toran banner ── */}
      <FestiveToran />

      {/* ── Floating petals ── */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {petals.map((p) => <Petal key={p.id} {...p} />)}
      </div>

      {/* ── Ambient glow orbs ── */}
      <GlowOrb className="-top-40 -left-40 z-0" color="orange" size={520} />
      <GlowOrb className="top-1/2 -right-48 z-0" color="rose" size={480} />
      <GlowOrb className="bottom-20 left-1/3 z-0" color="violet" size={380} />

      {/* ── Rotating mandalas ── */}
      <AmbientMandala className="-top-24 -left-24 w-80 h-80 sm:w-[500px] sm:h-[500px] text-amber-500/18" />
      <AmbientMandala className="top-2/3 -right-32 w-72 h-72 sm:w-[440px] sm:h-[440px] text-rose-400/15" />

      {/* ── Sticky Nav ── */}
      <nav
        className={`sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 transition-all duration-300 ${
          navScrolled
            ? "glass-heavy shadow-md border-b border-amber-500/15"
            : "bg-transparent border-b border-amber-500/10"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm press-effect">
            <span className="text-2xl" aria-hidden="true">🪔</span>
          </div>
          <div>
            <div className="font-cinzel text-base sm:text-xl font-black tracking-wider text-foreground leading-none">
              BANDHAN
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-widest">
              Sacred Festive Studio
            </div>
          </div>
        </div>

        {/* Nav controls */}
        <div className="flex items-center gap-2">
          {/* Jukebox */}
          <FestiveJukebox />

          {/* Sound */}
          <button
            onClick={toggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-full glass press-effect hover:border-amber-400/50 transition-all"
            title={soundEnabled ? "Mute audio" : "Enable festive chimes"}
            aria-label="Toggle Sound"
          >
            {soundEnabled
              ? <Volume2 className="h-4 w-4 text-amber-500" />
              : <VolumeX className="h-4 w-4 text-muted-foreground" />}
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full glass press-effect hover:border-amber-400/50 transition-all"
            title="Toggle theme"
            aria-label="Toggle Theme"
          >
            {isDarkMode
              ? <Sun className="h-4 w-4 text-amber-400" />
              : <Moon className="h-4 w-4 text-primary" />}
          </button>

          {/* Language */}
          <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-semibold">
            <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
            <select
              value={lang}
              onChange={(e) => { festiveAudio.playSparkle(); setLang(e.target.value as Lang); }}
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

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 sm:pt-14 sm:pb-28">

        {/* ━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━ */}
        <header className="text-center pt-8 pb-6">
          {/* Badge chip */}
          <div
            className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs sm:text-sm font-semibold text-primary shadow-sm press-effect transition-all
              ${heroMounted ? "animate-badge-pop" : "opacity-0"}`}
          >
            <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>{T.chip.replace("{date}", rakhi.dateLabel)}</span>
          </div>

          {/* Diya */}
          <div
            className={`flex justify-center mb-4 transition-all ${heroMounted ? "animate-spring-in stagger-2" : "opacity-0"}`}
          >
            <AuspiciousDiya size={64} />
          </div>

          {/* H1 — Apple large display style */}
          <h1
            className={`font-cinzel font-extrabold tracking-tight transition-all
              ${heroMounted ? "animate-spring-in stagger-3" : "opacity-0"}`}
            style={{
              fontSize: "clamp(2.4rem, 8vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-grad-gold animate-shimmer">{T.title}</span>
          </h1>

          {/* Script subtitle */}
          <div
            className={`font-script text-3xl sm:text-5xl text-foreground/80 mt-2 block transition-all
              ${heroMounted ? "animate-spring-in stagger-4" : "opacity-0"}`}
          >
            {T.subtitle}
          </div>

          {/* Description */}
          <p
            className={`mx-auto mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground transition-all
              ${heroMounted ? "animate-spring-in stagger-5" : "opacity-0"}`}
          >
            {T.intro}
          </p>

          {/* CTA buttons */}
          <div
            className={`mt-8 flex flex-wrap justify-center items-center gap-3 transition-all
              ${heroMounted ? "animate-spring-in stagger-6" : "opacity-0"}`}
          >
            {/* Primary CTA */}
            <Button
              type="button"
              onClick={() => { festiveAudio.playCelebrationChord(); setIsCeremonyOpen(true); }}
              className="h-13 px-7 rounded-2xl bg-grad-festive text-sm sm:text-base font-bold text-white shadow-lg hover:shadow-glow press-effect transition-all border-0"
            >
              <Sparkles className="mr-2 h-5 w-5" aria-hidden="true" />
              Start Virtual Ceremony 🪔
            </Button>

            {/* Secondary CTAs */}
            <Button
              type="button"
              onClick={() => {
                const playing = festiveAudio.activeTrackId;
                if (playing) { festiveAudio.stopMusic(); toast.info("Music paused"); }
                else { festiveAudio.playTrack("phoolon"); toast.success("🌸 Playing Bollywood tribute!"); }
              }}
              variant="outline"
              className="h-13 px-5 rounded-2xl glass border-amber-400/30 text-sm font-bold text-foreground hover:border-amber-400 press-effect transition-all"
            >
              <Music className="h-4 w-4 text-amber-500 mr-2" aria-hidden="true" />
              Bollywood Song 🎶
            </Button>

            <Button
              type="button"
              onClick={fireFestiveConfetti}
              variant="outline"
              className="h-13 px-5 rounded-2xl glass border-amber-400/30 text-sm font-bold text-foreground hover:border-amber-400 press-effect transition-all"
            >
              Celebrate 🎉
            </Button>
          </div>
        </header>

        {/* ━━━━━━━━━━━━━━━━━━━━ COUNTDOWN ━━━━━━━━━━━━━━━━━━━━ */}
        <RevealSection className="mt-10 sm:mt-14">
          <div className="glass-heavy glass-shine-top rounded-3xl p-5 sm:p-7 max-w-2xl mx-auto overflow-hidden">
            {/* Top specular */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest text-primary mb-5">
              <Flame className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {done ? `🎉 ${T.today}` : T.arrives}
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: T.days,    value: days },
                { label: T.hours,   value: hours },
                { label: T.minutes, value: minutes },
                { label: T.seconds, value: seconds },
              ].map((c, i) => (
                <CountdownDigit key={c.label} value={c.value} label={c.label} index={i} />
              ))}
            </div>

            {/* Year switcher */}
            <div className="mt-5 pt-4 border-t border-amber-500/15 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-semibold text-foreground text-xs">
                <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Festival Year:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => { festiveAudio.playSparkle(); setSelectedYear(null); }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all press-effect ${
                    selectedYear === null
                      ? "bg-grad-gold text-amber-950 shadow-sm"
                      : "glass hover:text-foreground"
                  }`}
                >
                  ⚡ Auto
                </button>
                {[2026, 2027, 2028, 2029, 2030, 2031].map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => { festiveAudio.playSparkle(); setSelectedYear(y); }}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all press-effect ${
                      selectedYear === y
                        ? "bg-amber-500 text-amber-950 shadow-sm"
                        : "glass hover:text-foreground"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ━━━━━━━━━━━━━━━━━━━━ CARD STUDIO ━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-14 sm:mt-20" aria-label="Wish Card Studio">
          <RevealSection>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-primary mb-3">
                <Palette className="h-3.5 w-3.5" aria-hidden="true" />
                Live Wish Card Studio
              </div>
              <h2
                className="font-cinzel font-bold text-foreground"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.015em", lineHeight: 1.1 }}
              >
                Design Your Sacred Card
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                All changes appear instantly on the card preview — then share or download in HD.
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* ─ Left: Customizer ─ */}
            <div className="lg:col-span-5 space-y-4">
              <RevealSection delay={50}>
                <div className="glass-heavy glass-shine-top rounded-3xl p-5 sm:p-7 space-y-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                  {/* ①  Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      <span>Sibling Name</span>
                      <span className="text-[10px] text-primary font-medium normal-case tracking-normal">Live sync ✦</span>
                    </label>
                    <Input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Aarav, Didi, Bhaiya…"
                      className="h-12 rounded-2xl border-amber-400/35 bg-background/80 px-4 text-base font-semibold focus-visible:ring-amber-500 focus-visible:ring-2"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {SUGGESTED_NAMES.map((sug) => {
                        const clean = sug.replace(/[^\w\s]/gi, "").trim();
                        return (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => { festiveAudio.playSparkle(); setRecipientName(clean); }}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold glass press-effect hover:border-primary/50 transition-all"
                          >
                            {sug}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ② Title */}
                  <div className="space-y-2 pt-4 border-t border-amber-500/12">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Honorary Title
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {SIBLING_TITLES.map((st) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => { festiveAudio.playSparkle(); setSelectedTitle(st.id); }}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all press-effect ${
                            selectedTitle === st.id
                              ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/60 shadow-sm"
                              : "glass text-muted-foreground hover:border-primary/40"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ③ Theme */}
                  <div className="space-y-2 pt-4 border-t border-amber-500/12">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Theme ({TEMPLATES.length})
                      </label>
                      <button
                        type="button"
                        onClick={handleShuffleTheme}
                        className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 press-effect"
                      >
                        <Shuffle className="h-3 w-3" aria-hidden="true" />
                        Shuffle
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.id}
                          type="button"
                          onClick={() => { festiveAudio.playSparkle(); setTemplateId(tpl.id); }}
                          className={`rounded-2xl border-2 p-2.5 text-left transition-all press-effect flex items-center gap-2 ${
                            templateId === tpl.id
                              ? "border-amber-500 bg-amber-500/15 shadow-sm"
                              : "border-transparent glass hover:border-amber-400/40"
                          }`}
                        >
                          <span className="text-xl">{tpl.emoji}</span>
                          <span className="text-xs font-bold truncate">{tpl.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ④ Border */}
                  <div className="space-y-2 pt-4 border-t border-amber-500/12">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Border Frame
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BORDER_STYLES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => { festiveAudio.playSparkle(); setSelectedBorder(b.id); }}
                          className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-all press-effect ${
                            selectedBorder === b.id
                              ? "border-amber-500 bg-amber-500/15"
                              : "border-transparent glass hover:border-amber-400/40"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ⑤ Stickers */}
                  <div className="space-y-2 pt-4 border-t border-amber-500/12">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <Smile className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      Auspicious Stickers
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {CARD_STICKERS.map((stk) => {
                        const on = selectedStickers.includes(stk.id);
                        return (
                          <button
                            key={stk.id}
                            type="button"
                            onClick={() => toggleSticker(stk.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all press-effect ${
                              on
                                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/60 shadow-sm"
                                : "glass text-muted-foreground hover:border-primary/50"
                            }`}
                          >
                            <span aria-hidden="true">{stk.emoji}</span>
                            <span>{stk.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ⑥ Custom message */}
                  <div className="space-y-2 pt-4 border-t border-amber-500/12">
                    <button
                      type="button"
                      onClick={() => setUseCustomMessage(!useCustomMessage)}
                      className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 press-effect transition-all"
                    >
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      {useCustomMessage ? "Use poetic verse template" : "+ Write your own message"}
                    </button>
                    {useCustomMessage && (
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Write your heartfelt words here…"
                        rows={3}
                        className="w-full rounded-2xl border border-amber-400/35 bg-background/80 p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                      />
                    )}
                  </div>

                  {/* Celebrate CTA */}
                  <Button
                    type="button"
                    onClick={fireFestiveConfetti}
                    className="w-full h-12 mt-1 rounded-2xl bg-grad-festive text-sm font-bold text-white shadow-md press-effect hover:shadow-glow border-0 transition-all"
                  >
                    <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                    Celebrate with Confetti & Chimes 🎉
                  </Button>
                </div>
              </RevealSection>
            </div>

            {/* ─ Right: Card Preview + Actions ─ */}
            <div className="lg:col-span-7 space-y-4">
              <RevealSection delay={100}>
                <div className="flex items-center justify-between px-1 mb-2">
                  <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
                    <Award className="h-4 w-4" aria-hidden="true" />
                    Live Preview
                  </span>
                  <span className="text-xs text-muted-foreground italic">Tap card to sparkle ✨</span>
                </div>

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

                {/* Action grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <Button
                    onClick={shareOnWhatsApp}
                    className="h-12 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-md hover:bg-emerald-700 press-effect transition-all border-0"
                  >
                    <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Share on WhatsApp
                  </Button>
                  <Button
                    onClick={downloadImage}
                    disabled={isDownloading}
                    variant="outline"
                    className="h-12 rounded-2xl glass border-amber-400/35 text-sm font-bold hover:border-amber-400 press-effect transition-all"
                  >
                    <Download className="mr-2 h-4 w-4 text-amber-500" aria-hidden="true" />
                    {isDownloading ? "Rendering…" : "Download HD PNG"}
                  </Button>
                  <Button
                    onClick={copyShareLink}
                    variant="outline"
                    className="h-12 rounded-2xl glass border-amber-400/35 text-sm font-bold hover:border-amber-400 press-effect transition-all"
                  >
                    {isCopied
                      ? <Check className="mr-2 h-4 w-4 text-emerald-500" aria-hidden="true" />
                      : <Copy  className="mr-2 h-4 w-4 text-primary"    aria-hidden="true" />}
                    {isCopied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    onClick={shareViaEmail}
                    variant="ghost"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Mail className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    {T.shareEmail}
                  </Button>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━ PANCHANG ━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-16 sm:mt-24" aria-label="Panchang guide">
          <RevealSection>
            <div className="glass-heavy glass-shine-top rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm shrink-0">
                  <Clock className="h-6 w-6 text-amber-950" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="font-cinzel font-bold text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 1.7rem)", letterSpacing: "-0.01em" }}
                  >
                    Shubh Muhurat & Vedic Panchang
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Auspicious timing guidance for Raksha Bandhan {rakhi.year}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <PanchagCard
                  label="Aparahna Kaal (Prime)"
                  time="01:45 PM – 04:18 PM"
                  note="Most auspicious window to tie the sacred Rakhi thread"
                  highlight
                />
                <PanchagCard
                  label="Pradosh Kaal"
                  time="06:50 PM – 09:05 PM"
                  note="Ideal evening window for sibling celebrations & gatherings"
                />
                <PanchagCard
                  label="Shravana Purnima"
                  time="Full Moon Tithi"
                  note="Sacred lunar phase — celebrating unconditional sibling bonds"
                />
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━ BENTO TRADITIONS ━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-16 sm:mt-24" aria-label="Sacred traditions">
          <RevealSection>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-primary mb-3">
                <Heart className="h-3.5 w-3.5 text-rose-500" aria-hidden="true" />
                Sacred Traditions
              </div>
              <h2
                className="font-cinzel font-bold text-foreground"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", letterSpacing: "-0.015em" }}
              >
                The Rituals of Raksha Bandhan
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Ancient practices that celebrate unconditional love and lifelong camaraderie.
              </p>
            </div>
          </RevealSection>

          {/* Apple-style bento grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-4">
            <BentoTraditionCard
              icon="🪔"
              title="Aarti & Sacred Blessings"
              desc="Lighting the ceremonial diya lamp and circling it with prayers for long life, happiness and peace. The golden flame embodies divine protection bestowed on the brother."
              hero
              delay={0}
            />
            <BentoTraditionCard
              icon="🔴"
              title="Shubh Tilak & Akshat"
              desc="Sacred vermillion and unbroken rice grains applied on the forehead, invoking divine protection and auspiciousness."
              delay={80}
            />
            <BentoTraditionCard
              icon="🧵"
              title="Sacred Rakhi Thread"
              desc="Tying the silk Kalawa thread on the right wrist — an unbreakable covenant of loyalty and love."
              delay={160}
            />
            <BentoTraditionCard
              icon="🍬"
              title="Mithai & Sweet Exchange"
              desc="Feeding traditional sweets like Ladoo, Kaju Katli and Ghewar — celebrating lifelong sweetness."
              delay={240}
            />
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━ FEATURES STRIP ━━━━━━━━━━━━━━━━━━━━ */}
        <RevealSection className="mt-16 sm:mt-24" delay={80}>
          <div className="glass-heavy glass-shine-top rounded-3xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { icon: "🎵", label: "4 Bollywood Tracks", desc: "100% royalty-free synthesized" },
                { icon: "📅", label: "2024–2099 Dates",   desc: "Astronomical Panchang engine" },
                { icon: "🌐", label: "5 Languages",        desc: "Hindi, English, Marathi, Gujarati, Tamil" },
                { icon: "🎨", label: "6 Luxury Themes",    desc: "Royal, Silk, Gold & more" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-2 group">
                  <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-grad-gold shadow-glow-sm text-2xl transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </div>
                  <div className="font-cinzel text-xs sm:text-sm font-black text-foreground">{f.label}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── Footer ── */}
        <footer className="mt-20 text-center text-xs text-muted-foreground">
          <div className="flex justify-center mb-3">
            <AuspiciousDiya size={36} />
          </div>
          <p className="font-medium">
            Crafted with <span className="text-rose-500">♥</span> for brothers & sisters across the globe
            {" "}• Raksha Bandhan {rakhi.year}
          </p>
          <p className="text-[11px] text-muted-foreground/60 mt-1">
            Free, open-source festive wish studio • Built with love & code
          </p>
        </footer>
      </div>

      {/* ── Ceremony Modal ── */}
      <RakhiCeremonyModal
        siblingName={recipientName || "Sibling"}
        isOpen={isCeremonyOpen}
        onClose={() => setIsCeremonyOpen(false)}
      />
    </main>
  );
};

/* ──────────────────────────────────────────────────────────────────
   WISH CARD COMPONENT
─────────────────────────────────────────────────────────────────── */
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

const WishCard = forwardRef<HTMLDivElement, WishCardProps>(
  ({ name, template, lang, T, langFontClass, year, customMessage, selectedStickers, selectedTitle, selectedBorder, onTriggerFestive }, ref) => {
    const titleObj  = SIBLING_TITLES.find((t) => t.id === selectedTitle);
    const borderObj = BORDER_STYLES.find((b) => b.id === selectedBorder);

    return (
      <div
        ref={ref}
        onClick={onTriggerFestive}
        title="Click to celebrate with sparkles!"
        className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.015]
          press-effect ${template.gradient} ${borderObj?.borderClass ?? ""} ${langFontClass}`}
        style={{ boxShadow: "var(--shadow-lg), var(--shadow-glow-sm)" }}
      >
        {/* Gradient border shell (3px) */}
        <div className="absolute inset-0 rounded-3xl" style={{ padding: "3px" }}>
          <div className="h-full w-full rounded-[21px]" />
        </div>

        {/* Card body — Liquid Glass */}
        <div className="relative rounded-3xl glass-heavy px-6 py-10 text-center sm:px-10 sm:py-14">
          {/* Specular top */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {/* Corner filigrees */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Top ribbon */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <div className="h-1.5 w-40 rounded-b-full bg-grad-gold shadow-glow-sm" />
          </div>

          {/* Centerpiece rakhi motif */}
          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-amber-500/15 animate-pulse-glow sm:h-32 sm:w-32">
            <SacredRakhiMotif className="w-24 h-24 sm:w-28 sm:h-28" />
          </div>

          {/* Honorary title badge */}
          {titleObj && (
            <div className="mx-auto mb-4 inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-amber-400/40 bg-amber-500/15 text-[11px] font-black tracking-widest text-amber-700 dark:text-amber-300 shadow-sm animate-badge-pop">
              <Award className="h-3 w-3 text-amber-500" aria-hidden="true" />
              <span>⚜️ {titleObj.tag} ⚜️</span>
            </div>
          )}

          {/* Greeting */}
          <p className="font-script text-2xl sm:text-4xl text-primary">{T.dearest}</p>

          {/* Recipient name */}
          <h2
            className="mt-1 sm:mt-2 font-cinzel font-black tracking-tight break-words"
            style={{ fontSize: "clamp(1.8rem, 6vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            <span className={template.accent}>{name}</span>
          </h2>

          <p className="font-script text-xl sm:text-3xl text-muted-foreground mt-1">{T.wishes}</p>

          {/* Festival title */}
          <h3
            className="mt-1 font-cinzel font-black text-grad-gold"
            style={{ fontSize: "clamp(1.3rem, 4vw, 2.2rem)", letterSpacing: "-0.015em" }}
          >
            {T.happy.replace("{year}", String(year))}
          </h3>

          {/* Message box */}
          <div className="mx-auto mt-6 max-w-lg rounded-2xl glass-subtle p-4 sm:p-5">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/90 italic">
              "{customMessage}"
            </p>
          </div>

          {/* Sticker tray */}
          {selectedStickers.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center items-center gap-2">
              {selectedStickers.map((stkId) => {
                const found = CARD_STICKERS.find((s) => s.id === stkId);
                return found ? (
                  <span
                    key={stkId}
                    className="inline-flex items-center justify-center text-2xl sm:text-3xl px-3 py-1.5 bg-amber-500/12 rounded-full border border-amber-400/20 shadow-sm transition-transform hover:scale-110"
                    aria-hidden="true"
                  >
                    {found.emoji}
                  </span>
                ) : null;
              })}
            </div>
          )}

          {/* Royal seal */}
          <div className="mt-8 pt-4 border-t border-amber-400/20 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
            <span>Sacred Rakhi • Tied with Eternal Love</span>
          </div>
        </div>
      </div>
    );
  }
);
WishCard.displayName = "WishCard";

export default Index;
