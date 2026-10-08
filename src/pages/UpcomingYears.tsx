import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNextRakhi, getRakhiForYear } from "@/lib/rakhi-dates";

const UpcomingYears = () => {
  const firstYear = getNextRakhi().year;
  const years = Array.from({ length: 2050 - firstYear + 1 }, (_, index) => firstYear + index);

  return (
    <main className="min-h-dvh px-4 py-8 sm:px-6 sm:py-12" style={{ background: "var(--grad-sunset)" }}>
      <div className="mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Rakhi wishes
          </Link>
        </Button>

        <header className="mb-8 sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Raksha Bandhan calendar
          </div>
          <h1 className="font-cinzel text-3xl font-black text-foreground sm:text-5xl">Upcoming Rakhi dates</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Choose a year to open its countdown and make a wish for that celebration.
          </p>
        </header>

        <div className="divide-y divide-amber-500/15 border-y border-amber-500/15">
          {years.map((year) => {
            const date = getRakhiForYear(year, "en");
            return (
              <div key={year} className="flex flex-wrap items-center justify-between gap-4 py-4 sm:py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-gold text-amber-950">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-cinzel text-lg font-bold text-foreground">Raksha Bandhan {year}</h2>
                    <p className="text-sm text-muted-foreground">{date.dateLabel}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="glass border-amber-400/35">
                  <Link to={`/year/${year}`}>
                    Open {year}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Dates are shown in your local calendar. The list extends automatically as each festival year passes.
        </p>
      </div>
    </main>
  );
};

export default UpcomingYears;