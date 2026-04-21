import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Gift, Share2, Star, Download, Mail, Globe } from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import {
  LANGS,
  TEMPLATES,
  t as translations,
  type Lang,
  type WishTemplate,
} from "@/lib/rakhi-i18n";

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
    className="pointer-events-none absolute text-2xl animate-float-up"
    style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
    aria-hidden
  >
    {emoji}
  </div>
);

const fireConfetti = () => {
  const end = Date.now() + 800;
  const colors = ["#f97316", "#eab308", "#ec4899", "#a855f7", "#22c55e"];
  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.8 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.8 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors });
};

const Index = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);
  const { days, hours, minutes, seconds, done } = useCountdown();
  const cardRef = useRef<HTMLDivElement>(null);

  const T = translations[lang];
  const template: WishTemplate =
    TEMPLATES.find((x) => x.id === templateId) ?? TEMPLATES[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bl = params.get("bl");
    const lp = params.get("lang") as Lang | null;
    const tp = params.get("tpl");
    if (lp && LANGS.some((l) => l.code === lp)) setLang(lp);
    if (tp && TEMPLATES.some((x) => x.id === tp)) setTemplateId(tp);
    if (bl) {
      const clean = decodeURIComponent(bl).replace(/-/g, " ").trim();
      if (clean) {
        setSubmitted(clean);
        setTimeout(fireConfetti, 400);
      }
    }
    document.title = "Raksha Bandhan 2026 — Send a Heartfelt Wish";
  }, []);

  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
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
    setTimeout(fireConfetti, 250);
  };

  const buildShareUrl = () => {
    if (!submitted) return window.location.href;
    const base = window.location.href.split("?")[0];
    const encodedName = encodeURIComponent(submitted).replace(/%20/g, "-");
    return `${base}?bl=${encodedName}&lang=${lang}&tpl=${template.id}`;
  };

  const wishText = () =>
    `${submitted} ${T.wishes} ${T.happy} 🎁✨\n\n"${template.messages[lang]}"`;

  const shareOnWhatsApp = () => {
    if (!submitted) return;
    const text = `*${submitted}* — ${T.happy} 🎁✨%0A${encodeURIComponent(
      template.messages[lang]
    )}%0A👉 ${buildShareUrl()}`;
    window.location.href = `whatsapp://send?text=${text}`;
  };

  const shareViaEmail = () => {
    if (!submitted) return;
    const subject = encodeURIComponent(T.emailSubject);
    const body = encodeURIComponent(`${wishText()}\n\n${buildShareUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const downloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#FFF4E6",
      });
      const link = document.createElement("a");
      link.download = `rakhi-wish-${submitted ?? "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image:", err);
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
    <main className={`relative min-h-screen overflow-hidden bg-gradient-sunset ${langFontClass}`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        {petals.map((p) => (
          <Petal key={p.id} {...p} />
        ))}
      </div>

      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-festive opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-gradient-gold opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-6 sm:px-5 sm:py-12">
        {/* Language selector */}
        <div className="mb-4 flex items-center justify-end gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <label className="sr-only">{T.pickLang}</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="rounded-full border border-primary/30 bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={T.pickLang}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.native}
              </option>
            ))}
          </select>
        </div>

        {/* Header */}
        <header className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-3 py-1.5 text-[11px] font-medium text-primary backdrop-blur sm:px-4 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            {T.chip}
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-gradient-festive animate-shimmer bg-[length:200%_auto]">
              {T.title}
            </span>
            <br />
            <span className="font-script text-3xl font-normal text-foreground/80 sm:text-5xl">
              {T.subtitle}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-lg">
            {T.intro}
          </p>
        </header>

        {/* Countdown */}
        <section className="mt-8 sm:mt-10">
          <div className="rounded-2xl border border-primary/20 bg-card/70 p-4 shadow-festive backdrop-blur sm:rounded-3xl sm:p-6">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">
              {done ? `🎉 ${T.today}` : T.arrives}
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-4">
              {[
                { label: T.days, value: days },
                { label: T.hours, value: hours },
                { label: T.minutes, value: minutes },
                { label: T.seconds, value: seconds },
              ].map((c, i) => (
                <div key={i} className="rounded-xl bg-gradient-festive p-[2px] sm:rounded-2xl">
                  <div className="rounded-[10px] bg-card px-1 py-3 text-center sm:rounded-[14px] sm:px-2 sm:py-4">
                    <div className="font-display text-2xl font-black text-gradient-festive tabular-nums sm:text-5xl">
                      {String(c.value).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:mt-1 sm:text-xs sm:tracking-widest">
                      {c.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wish / Form */}
        <section className="mt-8 sm:mt-10">
          {submitted ? (
            <div className="space-y-5">
              {/* Template picker */}
              <div className="rounded-2xl border border-accent/30 bg-card/80 p-4 backdrop-blur sm:p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                  {T.pickStyle}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setTemplateId(tpl.id)}
                      className={`group rounded-xl border-2 p-3 text-left transition ${
                        templateId === tpl.id
                          ? "border-primary bg-primary/10 shadow-festive"
                          : "border-border bg-background/50 hover:border-primary/40"
                      }`}
                    >
                      <div className="text-2xl">{tpl.emoji}</div>
                      <div className="mt-1 text-xs font-bold">{tpl.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <WishCard
                ref={cardRef}
                name={submitted}
                template={template}
                lang={lang}
                T={T}
                langFontClass={langFontClass}
              />

              {/* Actions */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  onClick={shareOnWhatsApp}
                  className="h-12 rounded-2xl bg-[hsl(142_70%_49%)] text-sm font-bold text-white hover:bg-[hsl(142_70%_45%)] hover:shadow-glow sm:h-14 sm:text-base"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  {T.shareWA}
                </Button>
                <Button
                  onClick={shareViaEmail}
                  className="h-12 rounded-2xl bg-gradient-festive text-sm font-bold text-primary-foreground hover:opacity-95 hover:shadow-glow sm:h-14 sm:text-base"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {T.shareEmail}
                </Button>
                <Button
                  onClick={downloadImage}
                  variant="outline"
                  className="h-12 rounded-2xl border-primary/40 text-sm font-semibold sm:h-14 sm:text-base"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {T.download}
                </Button>
                <Button
                  onClick={() => setSubmitted(null)}
                  variant="outline"
                  className="h-12 rounded-2xl border-primary/30 text-sm font-semibold sm:h-14 sm:text-base"
                >
                  {T.change}
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-accent/30 bg-card/80 p-5 shadow-festive backdrop-blur sm:rounded-3xl sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-gold shadow-glow sm:h-11 sm:w-11">
                  <Gift className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">
                    {T.createWish}
                  </h2>
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {T.enterName}
                  </p>
                </div>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={T.namePh}
                className="h-12 rounded-2xl border-primary/30 bg-background/80 px-4 text-base sm:h-14 sm:px-5"
                autoFocus
              />
              <Button
                type="submit"
                className="mt-4 h-12 w-full rounded-2xl bg-gradient-festive text-sm font-bold text-primary-foreground shadow-festive hover:opacity-95 hover:shadow-glow sm:h-14 sm:text-base"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                {T.createBtn}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground sm:text-xs">
                {T.tagline}
              </p>
            </form>
          )}
        </section>

        {/* Features */}
        <section className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {[
            { icon: Heart, title: "Heartfelt", desc: "Crafted with love for siblings" },
            { icon: Star, title: "Personalised", desc: "Your name, your wish" },
            { icon: Share2, title: "One-tap share", desc: "WhatsApp, Email, Image" },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-festive sm:p-5"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-gold">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>

        <footer className="mt-12 pb-10 text-center text-xs text-muted-foreground sm:mt-14">
          Made with <span className="text-primary">♥</span> for every brother & sister • Raksha
          Bandhan 2026
        </footer>
      </div>
    </main>
  );
};

type WishCardProps = {
  name: string;
  template: WishTemplate;
  lang: Lang;
  T: (typeof translations)[Lang];
  langFontClass: string;
};

const WishCard = ({
  ref,
  name,
  template,
  lang,
  T,
  langFontClass,
}: WishCardProps & { ref: React.RefObject<HTMLDivElement> }) => (
  <div
    ref={ref}
    className={`relative overflow-hidden rounded-3xl ${template.gradient} p-[3px] shadow-festive ${langFontClass}`}
  >
    <div className="relative rounded-[22px] bg-card px-5 py-8 text-center sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-1 w-40 rounded-b-full bg-gradient-gold" />
      </div>
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold shadow-glow animate-pulse-glow sm:mb-6 sm:h-20 sm:w-20">
        <span className="text-3xl animate-wiggle sm:text-4xl">{template.emoji}</span>
      </div>
      <p className="font-script text-2xl text-primary sm:text-4xl">{T.dearest}</p>
      <h2 className="mt-2 font-display text-3xl font-black leading-tight sm:mt-3 sm:text-6xl break-words">
        <span className={template.accent}>{name}</span>
      </h2>
      <p className="font-script text-xl text-muted-foreground sm:text-3xl">{T.wishes}</p>
      <h3 className="mt-2 font-display text-2xl font-black text-gradient-gold sm:text-5xl">
        {T.happy}
      </h3>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/80 sm:mt-6 sm:text-base">
        "{template.messages[lang]}"
      </p>
      <div className="mt-3 flex justify-center gap-1 text-2xl sm:mt-4">
        <span>🎁</span>
        <span>✨</span>
        <span>🪷</span>
        <span>💝</span>
        <span>🌺</span>
      </div>
    </div>
  </div>
);

export default Index;
