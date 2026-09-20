import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Heart, ArrowLeft, Sparkles, X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Our Love Gallery 📸 | For Laura" },
      { name: "description", content: "A special photo gallery of our favorite moments together." },
    ],
  }),
  component: GalleryPage,
});

const galleryItems = [
  {
    id: 1,
    src: "/GALLERY/Laura.jpeg",
    title: "Laura, My Queen 👑",
    caption: "Radiant, beautiful, and the light of my world.",
    date: "My Favorite",
  },
  {
    id: 2,
    src: "/GALLERY/img1.jpeg",
    title: "Sweet Smiles Together",
    caption: "One of my absolute favorite photos of us, shining with pure joy.",
    date: "Cherished Moment",
  },
  {
    id: 3,
    src: "/GALLERY/img2.jpeg",
    title: "Magical Adventures",
    caption: "Every place is magical whenever I'm standing by your side.",
    date: "Special Memory",
  },
  {
    id: 4,
    src: "/GALLERY/img3.jpeg",
    title: "Unforgettable Laughs",
    caption: "Capturing the genuine happiness and laughter we share every day.",
    date: "Precious Time",
  },
  {
    id: 5,
    src: "/GALLERY/img4.jpeg",
    title: "Forever & Always",
    caption: "Looking forward to creating a thousand more memories with you.",
    date: "Always In My Heart",
  },
  {
    id: 6,
    src: "/GALLERY/pinchez.jpeg",
    title: "Unforgettable Moments ✨",
    caption: "Side by side, making memories that last a lifetime.",
    date: "Precious Memory",
  },
  {
    id: 7,
    src: "/GALLERY/pinchez2.jpeg",
    title: "Pure Happiness 💕",
    caption: "Your smile makes every ordinary day extraordinary.",
    date: "Forever Together",
  },
];

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
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

function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev! + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev! + 1));
  };

  const activeItem = selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <div className="relative min-h-screen selection:bg-rose/20 selection:text-primary">
      <FloatingHearts />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-4 z-40 mx-auto max-w-5xl px-6">
        <div className="glass-card rounded-full px-6 py-3 border border-white/90 shadow-lg flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-rose transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-rose animate-pulse" />
            <span>Laura & Me · Photo Gallery</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-5 py-2 text-xs font-semibold tracking-wide text-primary shadow-sm border border-rose/30">
          <ImageIcon className="h-4 w-4 text-rose" />
          <span>Our Precious Moments</span>
        </div>

        <h1 className="font-display mt-6 text-6xl md:text-8xl leading-none text-primary drop-shadow-sm">
          Our Love Gallery 📸
        </h1>

        <p className="font-serif italic mt-4 text-2xl md:text-3xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          A dedicated space for all our favorite photos, smiles, and unforgettable adventures.
        </p>
      </section>

      {/* GALLERY GRID */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group glass-card glass-card-hover rounded-[2rem] p-4 border border-white/90 shadow-md cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-rose/10">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-white/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/30">
                    <Maximize2 className="h-3.5 w-3.5" /> View Fullscreen
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-2xl text-primary font-semibold">{item.title}</h3>
                    <span className="text-[10px] font-semibold text-rose bg-rose/10 px-2.5 py-0.5 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-foreground/75 text-sm leading-relaxed mt-2">{item.caption}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose/10 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 text-rose font-medium">
                    <Heart className="h-3.5 w-3.5 fill-rose" /> Memory #{item.id}
                  </span>
                  <span>Tap to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <button
            onClick={() => setSelectedIndex(null)}
            type="button"
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={handlePrev}
            type="button"
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={handleNext}
            type="button"
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all cursor-pointer"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <div className="relative max-h-[70vh] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[70vh] max-w-full object-contain mx-auto rounded-3xl"
              />
            </div>

            <div className="mt-6 text-center text-white max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold mb-2">
                <Heart className="h-3.5 w-3.5 fill-rose text-rose" />
                <span>
                  Photo {selectedIndex + 1} of {galleryItems.length}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold">{activeItem.title}</h3>
              <p className="text-white/80 text-sm mt-2 font-serif italic">"{activeItem.caption}"</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 py-16 text-center border-t border-rose/10">
        <Heart className="mx-auto h-7 w-7 fill-rose text-rose animate-heartbeat drop-shadow-sm" />
        <p className="font-display text-4xl text-primary mt-3">Forever Captured With Love.</p>
        <p className="text-xs text-muted-foreground mt-2 font-medium">
          Laura & Me · Endless Memories
        </p>
      </footer>
    </div>
  );
}
