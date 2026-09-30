import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import CityLanding, { cityHead } from "@/components/CityLanding";
import { FLORIDA } from "@/lib/city-content";
import { submitLead } from "@/lib/leads.functions";
import { getAttribution } from "@/lib/attribution";
import { showErrorToast } from "@/lib/toast";
import { LEAD_CONVERSION, reportGoogleAdsConversion } from "@/lib/google-ads";

// A/B test variant of /florida: email gate before the Avinode search.
// Canonical stays on /florida so the test page does not compete in search.
export const Route = createFileRoute("/florida-gate")({
  component: () => <CityLanding city={FLORIDA} heroCard={<EmailGateForm />} />,
  head: () => {
    const base = cityHead(FLORIDA);
    return { ...base, meta: [...base.meta, { name: "robots", content: "noindex" }] };
  },
});

function EmailGateForm() {
  const navigate = useNavigate();
  const submitLeadFn = useServerFn(submitLead);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    const a = getAttribution();
    try {
      await submitLeadFn({
        data: {
          source: "email_gate",
          full_name: null,
          phone: null,
          email,
          from_airport: null,
          to_airport: null,
          depart_date: null,
          passengers: null,
          page_path: window.location.pathname + window.location.search,
          referrer: a.referrer ?? document.referrer ?? null,
          user_agent: navigator.userAgent,
          gclid: a.gclid ?? null,
          gbraid: a.gbraid ?? null,
          wbraid: a.wbraid ?? null,
          msclkid: a.msclkid ?? null,
          fbclid: a.fbclid ?? null,
          utm_source: a.utm_source ?? null,
          utm_medium: a.utm_medium ?? null,
          utm_campaign: a.utm_campaign ?? null,
          utm_term: a.utm_term ?? null,
          utm_content: a.utm_content ?? null,
        },
      });
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "generate_lead", lead_source: "email_gate" });
      await reportGoogleAdsConversion(LEAD_CONVERSION);
      await navigate({ to: "/florida-search" });
    } catch (err) {
      console.error(err);
      setPending(false);
      void showErrorToast("We couldn't send your request", "Please check your email and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-3 py-2 text-center">
      <p className="whitespace-nowrap font-serif text-xs text-foreground sm:text-2xl">
        See live aircraft &amp; prices for your route
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          aria-label="Email"
          className="flex-1 rounded-md border border-input bg-card px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-gold px-5 py-3 text-sm font-bold text-navy-ink shadow transition-all hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Loading…" : "Show Me Available Aircraft"}
        </button>
      </div>
    </form>
  );
}
