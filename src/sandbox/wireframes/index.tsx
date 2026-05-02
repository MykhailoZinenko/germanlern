/**
 * Wireframes index — registers every screen in groups, used by the catch-all
 * route to render either an overview grid or a single screen by slug.
 */
import React from "react";
import { Frame } from "./_shared/frame";

import { WLDesktopList } from "./word-library/desktop-list";
import { WLDesktopCards } from "./word-library/desktop-cards";
import { WLDesktopDetailList } from "./word-library/desktop-detail-list";
import { WLDesktopDetailCards } from "./word-library/desktop-detail-cards";
import { WLDesktopDetailMenu } from "./word-library/desktop-detail-menu";
import { WLMobileList } from "./word-library/mobile-list";
import { WLMobileCards } from "./word-library/mobile-cards";
import { WLMobileDetail } from "./word-library/mobile-detail";
import { WLMobileDetailMenu } from "./word-library/mobile-detail-menu";
import { WLMobileFilters } from "./word-library/mobile-filters";
import { WLMobileSearch } from "./word-library/mobile-search";

export type Surface = "desktop" | "mobile";

export interface ScreenDef {
  slug: string;
  title: string;
  surface: Surface;
  Component: React.ComponentType;
}

export interface SectionDef {
  slug: string;
  title: string;
  screens: ScreenDef[];
}

export const SECTIONS: SectionDef[] = [
  {
    slug: "word-library",
    title: "Word library",
    screens: [
      { slug: "desktop-list", title: "Desktop · list", surface: "desktop", Component: WLDesktopList },
      { slug: "desktop-cards", title: "Desktop · cards", surface: "desktop", Component: WLDesktopCards },
      { slug: "desktop-detail-list", title: "Desktop · detail (list)", surface: "desktop", Component: WLDesktopDetailList },
      { slug: "desktop-detail-cards", title: "Desktop · detail (cards)", surface: "desktop", Component: WLDesktopDetailCards },
      { slug: "desktop-detail-menu", title: "Desktop · detail (menu)", surface: "desktop", Component: WLDesktopDetailMenu },
      { slug: "mobile-list", title: "Mobile · list", surface: "mobile", Component: WLMobileList },
      { slug: "mobile-cards", title: "Mobile · cards", surface: "mobile", Component: WLMobileCards },
      { slug: "mobile-detail", title: "Mobile · detail", surface: "mobile", Component: WLMobileDetail },
      { slug: "mobile-detail-menu", title: "Mobile · detail (menu)", surface: "mobile", Component: WLMobileDetailMenu },
      { slug: "mobile-search", title: "Mobile · search", surface: "mobile", Component: WLMobileSearch },
      { slug: "mobile-filters", title: "Mobile · filters", surface: "mobile", Component: WLMobileFilters },
    ],
  },
];

/** Resolve a "section/screen" path; returns null if not found. */
export function resolveScreen(section: string, screen: string): ScreenDef | null {
  const s = SECTIONS.find((x) => x.slug === section);
  if (!s) return null;
  return s.screens.find((x) => x.slug === screen) ?? null;
}

/** Wrap a screen in the right device frame (browser chrome / phone bezel). */
export function FramedScreen({ screen }: { screen: ScreenDef }) {
  const { Component, surface } = screen;
  return (
    <Frame kind={surface}>
      <Component />
    </Frame>
  );
}
