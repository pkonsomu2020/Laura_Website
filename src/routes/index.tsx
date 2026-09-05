import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, Calendar, MapPin, Clock, Send, Sparkles, Coffee, Music, Smile, Compass, Flame, Camera, Image as ImageIcon } from "lucide-react";
import picnicImg from "@/assets/love-picnic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Laura, My Love 💗 | Forever & Always" },
      { name: "description", content: "A little love letter and special corner of the internet created just for Laura." },
      { property: "og:title", content: "For Laura, My Love 💗 | Forever & Always" },
      { property: "og:description", content: "A little love letter and special corner of the internet created just for Laura." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LovePage,
});

// Dates
const MET_DATE = new Date("2025-09-01T00:00:00");
const DATING_DATE = new Date("2026-06-13T00:00:00");

// Calculate next anniversary (June 13)
function getNextAnniversary() {
  const now = new Date();
  let nextYear = now.getFullYear();
  let nextDate = new Date(`${nextYear}-06-13T00:00:00`);
  if (now.getTime() > nextDate.getTime()) {
    nextDate = new Date(`${nextYear + 1}-06-13T00:00:00`);
  }
  return nextDate;
}

const reasons = [
  { emoji: "🌸", icon: Smile, title: "Your Radiant Smile", tag: "Daily Joy", text: "It genuinely lights up my whole world and makes everything better." },
  { emoji: "☕", icon: Coffee, title: "Slow Morning Coffees", tag: "Usual Routine", text: "Coffee tastes infinitely sweeter whenever you're sitting across from me." },
  { emoji: "💌", icon: Flame, title: "Your Infectious Laugh", tag: "Favorite Sound", text: "The sweetest sound in the universe—I wish I could bottle it forever." },
  { emoji: "🌙", icon: Compass, title: "Late Night Conversations", tag: "Safe Haven", text: "Talking with you at 3am feels like the safest, warmest place on Earth." },
  { emoji: "🎧", icon: Music, title: "Our Shared Songs", tag: "Soundtrack", text: "Every romantic song on my playlist quietly reminds me of you." },
  { emoji: "🥐", icon: Sparkles, title: "The Tiny Sweet Things", tag: "Little Gestures", text: "How you steal my hoodies, scrunch your nose, and softly hold my hand." },
];

const memories = [
  { title: "The First Hello", date: "September 2025", note: "I still remember the butterflies and exactly what you were wearing." },
  { title: "Our First Trip Together", date: "Special Adventure", note: "Getting lost anywhere with you is my absolute favorite kind of adventure." },
  { title: "That Rainy Coffee Afternoon", date: "Sweet Memories", note: "One shared umbrella, warm cups, and endless giggling." },
  { title: "The Kitchen Dance Party", date: "Home Sweet Home", note: "Burnt pancakes, our favorite song playing, and pure magic." },
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
      Array.from({ length: 16 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        size: 14 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
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

function LovePage() {
  const nextAnniversary = useMemo(() => getNextAnniversary(), []);
  const anniversaryCountdown = useCountdown(nextAnniversary);
  const metSince = useElapsedSince(MET_DATE);
  const datingSince = useElapsedSince(DATING_DATE);

  // Love tap counter
  const [loveCount, setLoveCount] = useState(100);
  const [heartsBurst, setHeartsBurst] = useState<{ id: number; x: number; y: number }[]>([]);

  // Booking state
  const [dateChoice, setDateChoice] = useState<"weekend" | "dinner" | "picnic" | "custom">("weekend");
  const [customDate, setCustomDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoveCount((c) => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newId = Date.now() + Math.random();
    setHeartsBurst((prev) => [...prev.slice(-10), { id: newId, x, y }]);
    setTimeout(() => {
      setHeartsBurst((prev) => prev.filter((h) => h.id !== newId));
    }, 1000);
  };

  const getChosenDateString = () => {
    if (dateChoice === "weekend") return "This Coming Weekend";
    if (dateChoice === "dinner") return "Romantic Sunset Dinner";
    if (dateChoice === "picnic") return "Surprise Picnic Date";
    if (customDate) {
      return new Date(customDate).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Our Chosen Day";
  };

  return (
    <div className="relative min-h-screen selection:bg-rose/20 selection:text-primary">
      <FloatingHearts />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-4 z-40 mx-auto max-w-5xl px-6 pt-2">
        <div className="glass-card rounded-full px-6 py-3 border border-white/90 shadow-lg flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Heart className="h-4 w-4 fill-rose text-rose animate-pulse" />
            <span>Laura & Me</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              to="/"
              className="text-primary font-bold hover:text-rose transition-colors"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 bg-rose/10 text-primary px-3.5 py-1.5 rounded-full border border-rose/30 hover:bg-primary hover:text-white transition-all"
            >
              <Camera className="h-3.5 w-3.5" /> Our Gallery 📸
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-5 py-2 text-xs font-semibold tracking-wide text-primary shadow-sm border border-rose/30">
          <Sparkles className="h-4 w-4 text-rose animate-pulse" />
          <span>Forever & Always · Built For Laura</span>
        </div>

        <h1 className="font-display mt-6 text-6xl md:text-8xl lg:text-9xl leading-none text-primary drop-shadow-sm">
          Laura, My Queen
        </h1>

        <p className="font-serif italic mt-4 text-2xl md:text-3xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          This little corner of the internet is created just for you.
        </p>

        {/* HERO PHOTO FRAME WITH INTERACTIVE LOVE TAP */}
        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="relative group">
            {/* Ambient Background Halos */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-rose/30 via-pink-400/20 to-primary/30 blur-3xl opacity-80 animate-pulse-slow" />

            <div className="relative animate-gentle-float">
              <img
                src="/Laura.jpeg"
                alt="Laura"
                width={1024}
                height={1024}
                className="relative w-72 md:w-96 h-72 md:h-96 object-cover rounded-[2.5rem] shadow-2xl ring-8 ring-white/90 glass-card"
              />
              <Heart className="absolute -top-5 -right-5 h-14 w-14 fill-rose text-rose animate-heartbeat drop-shadow-md" />
            </div>
          </div>

          {/* INTERACTIVE LOVE COUNTER BUTTON */}
          <button
            onClick={handleLoveClick}
            type="button"
            className="relative mt-8 group inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur px-6 py-3 border border-rose/30 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Heart className="h-5 w-5 fill-rose text-rose group-hover:scale-125 transition-transform" />
            <span className="font-medium text-foreground text-sm">
              Send Love ({loveCount})
            </span>
            <span className="text-xs text-rose font-semibold bg-rose/10 px-2 py-0.5 rounded-full">
              Tap me!
            </span>

            {/* HEART EXPLOSIONS */}
            {heartsBurst.map((hb) => (
              <span
                key={hb.id}
                className="pointer-events-none absolute text-rose text-xl animate-ping"
                style={{ left: hb.x, top: hb.y - 20 }}
              >
                💖
              </span>
            ))}
          </button>
        </div>
      </section>

      {/* MILESTONE COUNTERS: TIME TOGETHER */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">Every Second Spent Loving You</h2>
          <p className="font-serif italic text-lg text-muted-foreground mt-2">
            Counting the beautiful moments since we met and since we became us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Time Since We Met",
              subtitle: "First Hello · Sept 2025",
              badgeIcon: Calendar,
              values: metSince,
            },
            {
              title: "Time Since We Became Us",
              subtitle: "Officially Together · June 13, 2026",
              badgeIcon: Heart,
              values: datingSince,
            },
          ].map((m) => (
            <div
              key={m.title}
              className="glass-card glass-card-hover rounded-3xl p-8 text-center border border-white/80"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold text-primary">
                <m.badgeIcon className="h-3.5 w-3.5" />
                <span>{m.subtitle}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-primary mt-4">{m.title}</h3>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {[
                  { label: "Days", value: m.values.days },
                  { label: "Hours", value: m.values.hours },
                  { label: "Mins", value: m.values.mins },
                  { label: "Secs", value: m.values.secs },
                ].map((u) => (
                  <div
                    key={u.label}
                    className="rounded-2xl bg-white/90 p-3.5 border border-rose/20 shadow-sm"
                  >
                    <div className="font-serif text-2xl md:text-4xl text-primary tabular-nums font-bold">
                      {String(u.value).padStart(2, "0")}
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground mt-1 font-medium">
                      {u.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NEXT ANNIVERSARY TICKER */}
        <div className="mt-10 rounded-3xl glass-card p-8 md:p-10 border border-white/90 text-center shadow-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Next Big Celebration
          </div>
          <h3 className="text-3xl md:text-4xl font-serif mt-3 text-primary">
            Countdown to Our Next Anniversary
          </h3>
          <p className="text-muted-foreground text-sm mt-1">June 13th</p>

          <div className="mt-6 grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
            {[
              { label: "Days", value: anniversaryCountdown.days },
              { label: "Hours", value: anniversaryCountdown.hours },
              { label: "Minutes", value: anniversaryCountdown.mins },
              { label: "Seconds", value: anniversaryCountdown.secs },
            ].map((u) => (
              <div key={u.label} className="rounded-2xl bg-gradient-to-br from-blush/60 to-white p-4 md:p-6 border border-rose/20 shadow-sm">
                <div className="font-serif text-3xl md:text-5xl text-primary tabular-nums font-bold">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{u.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS WHY I LOVE YOU */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif">Reasons Why I Love You</h2>
          <p className="font-serif italic text-lg text-muted-foreground mt-2">
            Just a few of the million reasons why you mean everything to me.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-white/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{r.emoji}</span>
                  <span className="text-[11px] font-semibold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                    {r.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-primary">{r.title}</h3>
                <p className="text-foreground/80 mt-3 leading-relaxed text-sm md:text-base">
                  {r.text}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose/10 flex items-center gap-2 text-rose text-xs font-medium">
                <Heart className="h-3.5 w-3.5 fill-rose" /> Forever cherished
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR MEMORIES MUSEUM */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Moments We Treasure
            </div>
            <h2 className="text-4xl md:text-5xl font-serif">Our Little Museum</h2>
            <p className="font-serif italic text-lg text-muted-foreground mt-2">
              Snapshots of love etched forever on the wall of my heart.
            </p>

            <ul className="mt-8 space-y-5">
              {memories.map((m, i) => (
                <li key={m.title} className="glass-card rounded-2xl p-5 border border-white/80 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-base font-bold shadow-sm">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-xl text-primary font-semibold">{m.title}</h4>
                      <span className="text-[10px] text-muted-foreground bg-white/80 px-2 py-0.5 rounded-full border border-rose/20">
                        {m.date}
                      </span>
                    </div>
                    <p className="text-foreground/70 text-sm mt-1 leading-relaxed">{m.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-rose/20 to-primary/20 blur-2xl" />
            <img
              src={picnicImg}
              alt="Watercolor picnic basket with roses and hearts"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative w-full rounded-[2.5rem] shadow-2xl border-4 border-white/90 animate-gentle-float"
            />
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW SECTION */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/90 shadow-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold text-primary mb-3">
            <Camera className="h-3.5 w-3.5 text-rose" /> Memories Captured
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-primary">Our Photo Gallery 📸</h2>
          <p className="font-serif italic text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
            A beautiful collection of our favorite smiles, adventures, and quiet moments together.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 1, src: "/GALLERY/img1.jpeg", label: "Sweet Smiles" },
              { id: 2, src: "/GALLERY/img2.jpeg", label: "Adventures" },
              { id: 3, src: "/GALLERY/img3.jpeg", label: "Laughs Together" },
              { id: 4, src: "/GALLERY/img4.jpeg", label: "Forever & Always" },
            ].map((img) => (
              <Link
                key={img.id}
                to="/gallery"
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white/80"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white text-xs font-semibold">
                  {img.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-rose)] px-8 py-3.5 text-primary-foreground font-semibold text-base shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Camera className="h-5 w-5" /> Explore Full Gallery 📸 →
            </Link>
          </div>
        </div>
      </section>

      {/* DATE BOOKER EXPERIENCE */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/90">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Calendar className="h-3.5 w-3.5" /> Special Date Planner
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-primary">
              Let's Plan Our Next Special Date ✨
            </h2>
            <p className="font-serif italic text-lg text-muted-foreground mt-2">
              Pick a day & time. My favorite date is always with you.
            </p>
          </div>

          {submitted ? (
            <div className="mt-10 text-center glass-card rounded-3xl p-8 md:p-10 border border-rose/30 shadow-inner">
              <Heart className="mx-auto h-16 w-16 fill-rose text-rose animate-heartbeat drop-shadow-md" />
              <h3 className="font-display text-5xl text-primary mt-4">Yay! It's a Date 💗</h3>
              <p className="mt-4 text-foreground/90 text-lg">
                <strong>{getChosenDateString()}</strong> at <strong>{time}</strong>
                {place && (
                  <>
                    <br />
                    <span className="inline-flex items-center gap-1.5 text-primary mt-2">
                      <MapPin className="h-4 w-4" /> {place}
                    </span>
                  </>
                )}
              </p>
              {note && (
                <p className="mt-4 font-serif italic text-muted-foreground bg-white/70 p-4 rounded-2xl border border-rose/20 max-w-md mx-auto">
                  "{note}"
                </p>
              )}
              <button
                onClick={() => setSubmitted(false)}
                type="button"
                className="mt-6 inline-flex items-center gap-2 text-sm text-primary font-medium underline underline-offset-4 hover:text-rose transition-colors cursor-pointer"
              >
                Adjust Our Plans
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 space-y-6"
            >
              <div>
                <label className="block text-sm font-semibold text-foreground/90 mb-3">
                  Choose a Date Option
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "weekend", label: "This Weekend", sub: "Surprise date" },
                    { id: "dinner", label: "Sunset Dinner", sub: "Romantic evening" },
                    { id: "custom", label: "Custom Date", sub: "You choose!" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDateChoice(opt.id as typeof dateChoice)}
                      className={`rounded-2xl p-4 border-2 transition-all text-left cursor-pointer ${
                        dateChoice === opt.id
                          ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                          : "border-rose/20 bg-white/60 hover:border-primary/40"
                      }`}
                    >
                      <div className="font-serif text-lg font-bold text-primary">{opt.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {dateChoice === "custom" && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Pick Your Preferred Date</label>
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-rose/30 bg-white/90 px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Clock className="inline h-4 w-4 mr-1 text-primary" /> Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-2xl border border-rose/30 bg-white/90 px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <MapPin className="inline h-4 w-4 mr-1 text-primary" /> Where Should We Go?
                  </label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Our favorite spot ✨"
                    className="w-full rounded-2xl border border-rose/30 bg-white/90 px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">A Little Sweet Note (Optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Wear your favorite dress 💗"
                  className="w-full rounded-2xl border border-rose/30 bg-white/90 px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-rose)] px-8 py-4 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Send className="h-5 w-5" /> Confirm Our Special Date
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 text-center border-t border-rose/10">
        <Heart className="mx-auto h-7 w-7 fill-rose text-rose animate-heartbeat drop-shadow-sm" />
        <p className="font-display text-4xl text-primary mt-3">Yours, Always & Forever.</p>
        <p className="text-xs text-muted-foreground mt-2 font-medium">
          Made with endless love for Laura
        </p>
      </footer>
    </div>
  );
}

