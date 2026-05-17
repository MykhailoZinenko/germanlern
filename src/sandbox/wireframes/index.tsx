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

import { AWDesktopType } from "./add-flow/desktop-type";
import { AWDesktopScanEmpty } from "./add-flow/desktop-scan-empty";
import { AWDesktopScanOcr } from "./add-flow/desktop-scan-ocr";
import { AWDesktopScanResults } from "./add-flow/desktop-scan-results";
import { AWDesktopPasteEmpty } from "./add-flow/desktop-paste-empty";
import { AWDesktopPasteParsed } from "./add-flow/desktop-paste-parsed";
import { AWDesktopBufferOverlay } from "./add-flow/desktop-buffer-overlay";
import { AWMobileType } from "./add-flow/mobile-type";
import { AWMobileScanEmpty } from "./add-flow/mobile-scan-empty";
import { AWMobileScanOcr } from "./add-flow/mobile-scan-ocr";
import { AWMobileScanResults } from "./add-flow/mobile-scan-results";
import { AWMobilePasteEmpty } from "./add-flow/mobile-paste-empty";
import { AWMobilePasteParsed } from "./add-flow/mobile-paste-parsed";
import { AWMobileBufferOverlay } from "./add-flow/mobile-buffer-overlay";

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
  {
    slug: "add-flow",
    title: "Add word flow",
    screens: [
      { slug: "desktop-type", title: "Desktop · type tab", surface: "desktop", Component: AWDesktopType },
      { slug: "desktop-scan-empty", title: "Desktop · scan (empty)", surface: "desktop", Component: AWDesktopScanEmpty },
      { slug: "desktop-scan-ocr", title: "Desktop · scan (OCR running)", surface: "desktop", Component: AWDesktopScanOcr },
      { slug: "desktop-scan-results", title: "Desktop · scan (results)", surface: "desktop", Component: AWDesktopScanResults },
      { slug: "desktop-paste-empty", title: "Desktop · paste (empty)", surface: "desktop", Component: AWDesktopPasteEmpty },
      { slug: "desktop-paste-parsed", title: "Desktop · paste (parsed)", surface: "desktop", Component: AWDesktopPasteParsed },
      { slug: "desktop-buffer-overlay", title: "Desktop · buffer overlay", surface: "desktop", Component: AWDesktopBufferOverlay },
      { slug: "mobile-type", title: "Mobile · type tab", surface: "mobile", Component: AWMobileType },
      { slug: "mobile-scan-empty", title: "Mobile · scan (empty)", surface: "mobile", Component: AWMobileScanEmpty },
      { slug: "mobile-scan-ocr", title: "Mobile · scan (OCR running)", surface: "mobile", Component: AWMobileScanOcr },
      { slug: "mobile-scan-results", title: "Mobile · scan (results)", surface: "mobile", Component: AWMobileScanResults },
      { slug: "mobile-paste-empty", title: "Mobile · paste (empty)", surface: "mobile", Component: AWMobilePasteEmpty },
      { slug: "mobile-paste-parsed", title: "Mobile · paste (parsed)", surface: "mobile", Component: AWMobilePasteParsed },
      { slug: "mobile-buffer-overlay", title: "Mobile · buffer overlay", surface: "mobile", Component: AWMobileBufferOverlay },
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
