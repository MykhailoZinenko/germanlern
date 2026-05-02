/**
 * Catch-all sandbox wireframes route.
 *
 * URL shape:
 *   /sandbox/wireframes                       → overview grid of all screens
 *   /sandbox/wireframes/<section>             → one section's screens
 *   /sandbox/wireframes/<section>/<screen>    → single screen, framed
 *
 * Drop this file into the host app at:
 *   src/routes/sandbox/wireframes/$.tsx
 *
 * Imports resolve against `~/sandbox/wireframes/...` — adjust the path alias
 * if your tsconfig uses a different prefix.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { SECTIONS, FramedScreen, resolveScreen } from "#/sandbox/wireframes";
import { C, S, R, T, F, tt } from "#/sandbox/wireframes/_shared/tokens";

export const Route = createFileRoute("/sandbox/wireframes/$")({
  component: WireframesCatchAll,
});

function WireframesCatchAll() {
  // splat is "" | "section" | "section/screen"
  const { _splat } = Route.useParams();
  const parts = (_splat ?? "").split("/").filter(Boolean);

  if (parts.length === 0) return <Overview />;
  if (parts.length === 1) return <SectionPage section={parts[0]} />;
  return <ScreenPage section={parts[0]} screen={parts[1]} />;
}

/* ---------- Overview ---------- */

function Overview() {
  return (
    <Page title="Wireframes" subtitle="Pick a section">
      <div style={{ display: "flex", flexDirection: "column", gap: S[6] }}>
        {SECTIONS.map((s) => (
          <div key={s.slug}>
            <SectionHeading title={s.title} slug={s.slug} />
            <ScreenGrid>
              {s.screens.map((sc) => (
                <ScreenTile
                  key={sc.slug}
                  title={sc.title}
                  surface={sc.surface}
                  to={`/sandbox/wireframes/${s.slug}/${sc.slug}`}
                />
              ))}
            </ScreenGrid>
          </div>
        ))}
      </div>
    </Page>
  );
}

function SectionPage({ section }: { section: string }) {
  const s = SECTIONS.find((x) => x.slug === section);
  if (!s) return <NotFound what={`section "${section}"`} />;
  return (
    <Page title={s.title} subtitle="All screens" backTo="/sandbox/wireframes">
      <ScreenGrid>
        {s.screens.map((sc) => (
          <ScreenTile
            key={sc.slug}
            title={sc.title}
            surface={sc.surface}
            to={`/sandbox/wireframes/${s.slug}/${sc.slug}`}
          />
        ))}
      </ScreenGrid>
    </Page>
  );
}

function ScreenPage({ section, screen }: { section: string; screen: string }) {
  const def = resolveScreen(section, screen);
  if (!def) return <NotFound what={`screen "${section}/${screen}"`} />;
  const sectionDef = SECTIONS.find((x) => x.slug === section)!;
  return (
    <Page
      title={def.title}
      subtitle={sectionDef.title}
      backTo={`/sandbox/wireframes/${section}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: `${S[6]}px ${S[4]}px`,
        }}
      >
        <FramedScreen screen={def} />
      </div>
    </Page>
  );
}

/* ---------- Layout primitives (kept local — these are dev tooling, not app UI) ---------- */

function Page({
  title,
  subtitle,
  backTo,
  children,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", background: C.surface.page }}>
      <div
        style={{
          padding: `${S[5]}px ${S[6]}px`,
          borderBottom: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
        }}
      >
        <div style={{ ...tt(T.caption), color: C.text.muted, fontFamily: F.mono }}>
          {backTo ? (
            <Link to={backTo} style={{ color: "inherit", textDecoration: "none" }}>
              ← Back
            </Link>
          ) : (
            "Wireframes sandbox"
          )}
        </div>
        <div style={{ ...tt(T.h1), fontFamily: F.heading, color: C.text.primary, marginTop: S[1] }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ ...tt(T.body), color: C.text.secondary }}>{subtitle}</div>
        )}
      </div>
      <div style={{ padding: `${S[6]}px ${S[6]}px ${S[10]}px` }}>{children}</div>
    </div>
  );
}

function SectionHeading({ title, slug }: { title: string; slug: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: S[3],
      }}
    >
      <div style={{ ...tt(T.h2), fontFamily: F.heading, color: C.text.primary }}>{title}</div>
      <Link
        to={`/sandbox/wireframes/${slug}`}
        style={{ ...tt(T.bodySm), color: C.text.secondary, textDecoration: "none" }}
      >
        Open section →
      </Link>
    </div>
  );
}

function ScreenGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: S[3],
      }}
    >
      {children}
    </div>
  );
}

function ScreenTile({
  title,
  surface,
  to,
}: {
  title: string;
  surface: "desktop" | "mobile";
  to: string;
}) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: S[4],
        borderRadius: R.md,
        border: `1px solid ${C.border.subtle}`,
        background: C.surface.raised,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ ...tt(T.caption), color: C.text.muted, fontFamily: F.mono, marginBottom: S[1] }}>
        {surface}
      </div>
      <div style={{ ...tt(T.bodyLg), fontFamily: F.heading, color: C.text.primary }}>{title}</div>
    </Link>
  );
}

function NotFound({ what }: { what: string }) {
  return (
    <Page title="Not found" backTo="/sandbox/wireframes">
      <div style={{ ...tt(T.body), color: C.text.secondary }}>
        Couldn’t resolve {what}.
      </div>
    </Page>
  );
}
