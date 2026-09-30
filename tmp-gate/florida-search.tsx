import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import AvinodeSearch from "@/components/AvinodeSearch";
import logoAsset from "@/assets/cji-logo-white.svg.asset.json";

export const Route = createFileRoute("/florida-search")({
  component: SearchPage,
  head: () => ({
    meta: [
      { title: "Search Private Jets From Florida | Charter Jets, Inc." },
      {
        name: "description",
        content:
          "Search live private jet availability and prices from Florida with the official Avinode search. Compare aircraft and book with Charter Jets, Inc.",
      },
      { property: "og:title", content: "Search Private Jets From Florida | Charter Jets, Inc." },
      {
        property: "og:description",
        content:
          "Search live private jet availability and prices from Florida with the official Avinode search.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://fly.charterjetsinc.com/florida-search" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://fly.charterjetsinc.com/florida-search" }],
  }),
});

const PHONE_DISPLAY = "+1 800-329-2944";
const PHONE_HREF = "tel:+18003292944";

function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <img src={logoAsset.url} alt="Charter Jets, Inc." className="h-9 w-auto" />
          <a
            href={PHONE_HREF}
            suppressHydrationWarning
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-ink shadow-lg transition-all hover:brightness-110"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline" suppressHydrationWarning>{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <h1 className="mb-8 text-center font-serif text-3xl text-foreground sm:text-4xl text-balance">
          Search Private Jets From Florida
        </h1>
        <AvinodeSearch />
      </main>

      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row">
          <div>
            <div className="inline-block rounded-md bg-navy px-3 py-2">
              <img src={logoAsset.url} alt="Charter Jets, Inc." className="h-7 w-auto" />
            </div>
            <address className="mt-4 text-sm not-italic leading-relaxed text-muted-foreground">
              510 Briscoe Blvd Ste 200
              <br />
              Lawrenceville, GA 30046
              <br />
              United States
            </address>
          </div>
          <div className="text-sm">
            <p className="mb-1 font-semibold text-foreground">24/7 Charter Desk</p>
            <a href={PHONE_HREF} suppressHydrationWarning className="text-gold-ink hover:underline">
              <span suppressHydrationWarning>{PHONE_DISPLAY}</span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Charter Jets, Inc. acts as an agent for its clients and arranges flights operated by
              FAA Part 135 certified air carriers.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border px-6 pt-6 text-xs text-muted-foreground">
          <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>
          </div>
          &copy; {new Date().getFullYear()} Charter Jets, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
