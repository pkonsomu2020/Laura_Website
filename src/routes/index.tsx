import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, Calendar, MapPin, Clock, Send } from "lucide-react";
import picnicImg from "@/assets/love-picnic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You, My Love - Happy Girlfriends Day 💗" },
      { name: "description", content: "A little love letter for my favorite person. Happy Girlfriends Day, August 1st 2026." },
      { property: "og:title", content: "For You, My Love - Happy Girlfriends Day 💗" },
      { property: "og:description", content: "A little love letter for my favorite person." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LovePage,
});

const TARGET = new Date("2026-08-01T00:00:00");

const reasons = [
  { emoji: "🌸", title: "Your smile", text: "It genuinely makes my whole day brighter." },
  { emoji: "☕", title: "Slow mornings with you", text: "Coffee tastes better when you're across the table." },
  { emoji: "💌", title: "Your laugh", text: "The best sound I know - I'd bottle it if I could." },
  { emoji: "🌙", title: "Late night talks", text: "3am with you feels like the safest place on earth." },
  { emoji: "🎧", title: "Our playlist", text: "Every song is quietly about you." },
  { emoji: "🥐", title: "The tiny things", text: "How you scrunch your nose, steal my hoodie, hold my hand." },
];

const memories = [
  { title: "The first hello", note: "I still remember exactly what you were wearing." },
  { title: "Our first trip", note: "Getting lost with you is my favorite kind of lost." },
  { title: "That rainy day", note: "One umbrella, two coffees, and a lot of giggling." },
  { title: "The kitchen dance", note: "Burnt pancakes, perfect song, perfect you." },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

function useElapsedSince(start: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, now.getTime() - start.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 10,
        size: 14 + Math.random() * 22,
        opacity: 0.35 + Math.random() * 0.4,
        key: i,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.key}
          className="animate-float-heart absolute"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
          }}
        >
          <Heart
            style={{ width: h.size, height: h.size }}
            className="fill-rose text-rose"
          />
        </span>
      ))}
    </div>
  );
}

const MET_DATE = new Date("2025-09-01T00:00:00");
const DATING_DATE = new Date("2026-06-13T00:00:00");

function LovePage() {
  const { days, hours, mins, secs } = useCountdown(TARGET);
  const metSince = useElapsedSince(MET_DATE);
  const datingSince = useElapsedSince(DATING_DATE);
  const [dateChoice, setDateChoice] = useState<"aug1" | "aug8" | "custom">("aug1");
  const [customDate, setCustomDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const chosenDate =
    dateChoice === "aug1" ? "August 1, 2026" :
    dateChoice === "aug8" ? "August 8, 2026" :
    customDate ? new Date(customDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "your pick";

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20 text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide text-primary shadow-[var(--shadow-soft)]">
          Girlfriends Day · August 1, 2026
        </p>
        <h1 className="font-display mt-6 text-6xl md:text-8xl leading-[0.95] text-primary">
          Laura my Queen
        </h1>
        <p className="font-serif italic mt-4 text-2xl md:text-3xl text-foreground/80">
          This little corner of the internet is just for you.
        </p>
        <div className="mt-10 flex justify-center">
          <div className="relative animate-gentle-float">
            <div className="absolute -inset-6 rounded-full bg-rose/20 blur-3xl" />
            <img
              src="/Laura.jpeg"
              alt="A couple under a sky of soft pink clouds and floating hearts"
              width={1024}
              height={1024}
              className="relative w-72 md:w-96 rounded-[2rem] shadow-[var(--shadow-heart)] ring-4 ring-white"
            />
            <Heart className="absolute -top-4 -right-4 h-12 w-12 fill-rose text-rose animate-heartbeat" />
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white/70 backdrop-blur p-8 md:p-12 shadow-[var(--shadow-soft)] text-center">
          <h2 className="text-3xl md:text-4xl">Counting down to our day</h2>
          <p className="text-muted-foreground mt-2">Until Girlfriends Day, August 1st 2026</p>
          <div className="mt-8 grid grid-cols-4 gap-3 md:gap-6">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: mins },
              { label: "Seconds", value: secs },
            ].map((u) => (
              <div key={u.label} className="rounded-2xl bg-gradient-to-br from-blush to-white p-4 md:p-6 border border-border">
                <div className="font-serif text-4xl md:text-6xl text-primary tabular-nums">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground mt-1">{u.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW FAR WE'VE COME */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl">How far we've come</h2>
          <p className="font-serif italic text-lg text-muted-foreground mt-2">From the first hello to right now.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              label: "Since we met",
              sub: "September 2025",
              values: metSince,
            },
            {
              label: "Since we started dating",
              sub: "June 13, 2026",
              values: datingSince,
            },
          ].map((milestone) => (
            <div
              key={milestone.label}
              className="rounded-3xl bg-white/80 backdrop-blur p-6 md:p-8 border border-border shadow-[var(--shadow-soft)] text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Calendar className="h-3.5 w-3.5" /> {milestone.sub}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-primary mt-4">{milestone.label}</h3>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                  { label: "Days", value: milestone.values.days },
                  { label: "Hours", value: milestone.values.hours },
                  { label: "Mins", value: milestone.values.mins },
                  { label: "Secs", value: milestone.values.secs },
                ].map((u) => (
                  <div key={u.label} className="rounded-2xl bg-gradient-to-br from-blush to-white p-3 border border-border">
                    <div className="font-serif text-2xl md:text-3xl text-primary tabular-nums">{String(u.value).padStart(2, "0")}</div>
                    <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1">{u.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REASONS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl">Things I love about you</h2>
          <p className="font-serif italic text-lg text-muted-foreground mt-2">…a very small sample.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-3xl bg-white/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-heart)] transition-all duration-300"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{r.emoji}</div>
              <h3 className="font-serif text-2xl text-primary">{r.title}</h3>
              <p className="text-foreground/70 mt-2 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMORIES */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl">Our little museum</h2>
            <p className="font-serif italic text-lg text-muted-foreground mt-2">A few favorites, on the wall of my heart.</p>
            <ul className="mt-6 space-y-4">
              {memories.map((m, i) => (
                <li key={m.title} className="flex gap-4 items-start">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-serif text-xl">{m.title}</div>
                    <div className="text-foreground/70">{m.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={picnicImg}
              alt="Watercolor picnic basket with roses and hearts"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full rounded-[2rem] shadow-[var(--shadow-heart)] animate-gentle-float"
            />
          </div>
        </div>
      </section>

      {/* DATE BOOKING */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[2rem] bg-gradient-to-br from-white via-blush/40 to-white p-8 md:p-12 shadow-[var(--shadow-heart)] border border-border">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Calendar className="h-3.5 w-3.5" /> Book our date
            </div>
            <h2 className="text-4xl md:text-5xl mt-4">Will you go out with me?</h2>
            <p className="font-serif italic text-lg text-muted-foreground mt-2">Pick a day. I'll bring the flowers.</p>
          </div>

          {submitted ? (
            <div className="mt-10 text-center rounded-2xl bg-white/80 p-8 border border-border">
              <Heart className="mx-auto h-14 w-14 fill-rose text-rose animate-heartbeat" />
              <h3 className="font-display text-4xl text-primary mt-4">Yay! It's a date 💗</h3>
              <p className="mt-3 text-foreground/80">
                <strong>{chosenDate}</strong> at <strong>{time}</strong>
                {place && <> · <MapPin className="inline h-4 w-4" /> {place}</>}
              </p>
              {note && <p className="mt-3 font-serif italic text-muted-foreground">"{note}"</p>}
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-primary underline underline-offset-4"
              >
                Change our plans
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-3">Choose a day</label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "aug1", label: "Aug 1", sub: "Girlfriends Day" },
                    { id: "aug8", label: "Aug 8", sub: "One week later" },
                    { id: "custom", label: "Custom", sub: "You pick" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDateChoice(opt.id as typeof dateChoice)}
                      className={`rounded-2xl p-4 border-2 transition-all text-left ${
                        dateChoice === opt.id
                          ? "border-primary bg-primary/10 shadow-[var(--shadow-soft)]"
                          : "border-border bg-white/60 hover:border-primary/40"
                      }`}
                    >
                      <div className="font-serif text-xl text-primary">{opt.label}</div>
                      <div className="text-xs text-muted-foreground">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {dateChoice === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Your date</label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline h-4 w-4 mr-1" /> Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" /> Where?
                  </label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Our favorite café ✨"
                    className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">A little note (optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Wear the dress I love 💗"
                  className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-rose)] px-8 py-4 text-primary-foreground font-medium text-lg shadow-[var(--shadow-heart)] hover:scale-[1.02] transition-transform"
              >
                <Send className="h-5 w-5" /> Send me an invitation
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 text-center">
        <Heart className="mx-auto h-6 w-6 fill-rose text-rose animate-heartbeat" />
        <p className="font-display text-3xl text-primary mt-3">Yours, always.</p>
        <p className="text-xs text-muted-foreground mt-2">Made with love · Girlfriends Day 2026</p>
      </footer>
    </div>
  );
}
