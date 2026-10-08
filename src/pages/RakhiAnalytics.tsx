import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, Download, Heart, LogIn, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TEMPLATES } from "@/lib/rakhi-i18n";
import { supabase } from "@/integrations/supabase/client";

type AnalyticsRow = {
  template_id: string;
  event_type: string;
  people: number;
  actions: number;
};

const EVENT_LABELS = {
  name_entered: { label: "Names entered", icon: Users },
  whatsapp_share: { label: "WhatsApp shares", icon: Share2 },
  png_download: { label: "PNG downloads", icon: Download },
} as const;

const RakhiAnalytics = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let alive = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (alive) setUserEmail(data.user?.email ?? null);
      if (alive) setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userEmail) {
      setRows([]);
      setAuthorized(false);
      return;
    }
    let alive = true;
    setLoading(true);
    void supabase.functions.invoke<{ rows?: AnalyticsRow[] }>("rakhi-analytics")
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) {
          setAuthorized(false);
          setRows([]);
          return;
        }
        setAuthorized(true);
        setRows(data?.rows ?? []);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, [userEmail]);

  const matrix = useMemo(() => {
    const byTemplate = new Map<string, Map<string, number>>();
    rows.forEach((row) => {
      const counts = byTemplate.get(row.template_id) ?? new Map<string, number>();
      counts.set(row.event_type, Number(row.people));
      byTemplate.set(row.template_id, counts);
    });
    return TEMPLATES.map((template) => ({ template, counts: byTemplate.get(template.id) ?? new Map<string, number>() }));
  }, [rows]);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error("Sign-in failed. Check your email and password.");
  };

  const signUp = async () => {
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/analytics` },
    });
    setBusy(false);
    if (error) {
      toast.error("Could not create this account.");
      return;
    }
    if (!data.session) toast.success("Check your email to confirm your account, then sign in.");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

  return (
    <main className="min-h-dvh px-4 py-8 sm:px-6 sm:py-12" style={{ background: "var(--grad-sunset)" }}>
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to wishes</Link>
        </Button>

        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-primary">
            <BarChart3 className="h-4 w-4" /> Private studio
          </div>
          <h1 className="font-cinzel text-3xl font-black text-foreground sm:text-5xl">Wish performance</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Anonymous counts by wish style. Names and message text are never included in these reports.</p>
        </header>

        {!userEmail ? (
          <section className="max-w-lg border-y border-amber-500/20 py-7" aria-labelledby="analytics-signin-title">
            <h2 id="analytics-signin-title" className="font-cinzel text-xl font-bold text-foreground">Owner sign-in</h2>
            <p className="mt-2 text-sm text-muted-foreground">Only an account granted owner access can see these totals.</p>
            <form onSubmit={signIn} className="mt-5 space-y-3">
              <Input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" />
              <Input type="password" autoComplete="current-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" aria-label="Password" />
              <div className="flex flex-wrap gap-3 pt-1">
                <Button type="submit" disabled={busy}><LogIn className="mr-2 h-4 w-4" />Sign in</Button>
                <Button type="button" variant="outline" className="glass" disabled={busy} onClick={() => void signUp()}>Create owner account</Button>
              </div>
            </form>
          </section>
        ) : loading ? (
          <p className="py-8 text-muted-foreground">Checking private access…</p>
        ) : !authorized ? (
          <section className="max-w-2xl border-y border-amber-500/20 py-7">
            <h2 className="font-cinzel text-xl font-bold text-foreground">Access is not enabled for this account</h2>
            <p className="mt-2 text-sm text-muted-foreground">The signed-in account has not been assigned owner access yet.</p>
            <Button variant="outline" className="mt-5 glass" onClick={() => void signOut()}>Sign out</Button>
          </section>
        ) : (
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
              <p className="text-sm text-muted-foreground">Signed in as <span className="font-semibold text-foreground">{userEmail}</span></p>
              <Button variant="outline" className="glass" onClick={() => void signOut()}>Sign out</Button>
            </div>
            <div className="grid grid-cols-3 gap-3 border-b border-amber-500/20 pb-4 text-center sm:gap-6">
              {Object.entries(EVENT_LABELS).map(([eventType, item]) => {
                const Icon = item.icon;
                const people = rows.reduce((total, row) => row.event_type === eventType ? total + Number(row.people) : total, 0);
                return (
                  <div key={eventType} className="py-4">
                    <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <div className="font-cinzel text-2xl font-black text-foreground">{people}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead><tr className="border-b border-amber-500/20 text-muted-foreground">
                  <th className="px-3 py-3 font-semibold">Wish style</th>
                  {Object.entries(EVENT_LABELS).map(([eventType, item]) => <th key={eventType} className="px-3 py-3 text-right font-semibold">{item.label}</th>)}
                </tr></thead>
                <tbody>{matrix.map(({ template, counts }) => <tr key={template.id} className="border-b border-amber-500/10">
                  <th className="px-3 py-4 font-semibold text-foreground"><span className="mr-2">{template.emoji}</span>{template.name}</th>
                  {Object.keys(EVENT_LABELS).map((eventType) => <td key={eventType} className="px-3 py-4 text-right tabular-nums text-foreground">{counts.get(eventType) ?? 0}</td>)}
                </tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Heart className="h-3.5 w-3.5" />Counts represent anonymous browser sessions per action and style.</p>
          </section>
        )}
      </div>
    </main>
  );
};

export default RakhiAnalytics;