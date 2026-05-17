/**
 * Add-flow · tab content patterns
 *
 * Reusable content for Type, Scan, Paste tabs — used identically
 * in desktop modal and mobile drawer.
 */
import { C, S, R, T, SZ, F, tt } from "../_shared/tokens";
import { Btn, Field, Icon, Lbl } from "../_shared/primitives";
import { AW, WordHighlight, WordInLibrary } from "./_shared";

/* ══════════════════════════════════════════════════════════════════
 * TYPE
 * ══════════════════════════════════════════════════════════════════ */

export function TypeContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[3] }}>
      <Field placeholder="German word" />
      <Field placeholder="Translation (optional)" />
      <div style={{ ...tt(T.caption), color: C.text.faint, cursor: "pointer", padding: `${S[1]}px 0` }}>
        + notes · + custom sentence
      </div>
      <Btn variant="default" style={{ width: "100%", height: SZ.btnMd }}>
        Add word
      </Btn>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
 * SCAN: empty — dropzone with upload icon, description, two buttons
 * ══════════════════════════════════════════════════════════════════ */

export function ScanEmptyContent({ mobile }: { mobile?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[3] }}>
      <div
        style={{
          height: mobile ? AW.dropzoneHMobile : AW.dropzoneH,
          borderRadius: R.xl,
          border: `2px dashed ${C.border.medium}`,
          background: C.surface.sunken,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: S[3],
          padding: S[4],
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: SZ.btnLg,
            height: SZ.btnLg,
            borderRadius: R.full,
            background: C.surface.raised,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="arrRight" size={SZ.iconMd} color={C.lumi.deep} style={{ transform: "rotate(-90deg)" }} />
        </div>
        <div>
          <div style={{ ...tt(T.body), fontWeight: 600, color: C.text.primary }}>
            {mobile ? "Tap to take a photo or upload" : "Drop an image or PDF here"}
          </div>
          <div style={{ ...tt(T.bodySm), color: C.text.muted, marginTop: S[1] }}>
            We'll extract German text and pull out unique words for you to verify.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: S[2] }}>
        <Btn
          variant="secondary"
          style={{ flex: 1, height: SZ.btnMd }}
          leading={<Icon name="files" size={SZ.iconSm} color={C.text.secondary} />}
        >
          Choose file
        </Btn>
        {mobile && (
          <Btn
            variant="secondary"
            style={{ flex: 1, height: SZ.btnMd }}
            leading={<Icon name="mic" size={SZ.iconSm} color={C.text.secondary} />}
          >
            Use camera
          </Btn>
        )}
      </div>
      <div style={{ ...tt(T.caption), color: C.text.faint, textAlign: "center" }}>
        JPG, PNG, HEIC, PDF · up to 10MB
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
 * SCAN: OCR running — file info, language tag, progress bar, status
 * ══════════════════════════════════════════════════════════════════ */

export function ScanOcrRunningContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[4] }}>
      {/* Uploaded file info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: S[3],
          padding: S[3],
          borderRadius: R.md,
          border: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
        }}
      >
        <div
          style={{
            width: SZ.btnMd,
            height: SZ.btnMd,
            borderRadius: R.md,
            background: C.surface.sunken,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name="files" size={SZ.iconMd} color={C.text.muted} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...tt(T.bodySm), fontWeight: 500, color: C.text.primary }}>buchseite-23.jpg</div>
          <div style={{ ...tt(T.caption), color: C.text.muted }}>1.2 MB · 1840 × 2456</div>
        </div>
      </div>

      {/* Language tag */}
      <div
        style={{
          ...tt(T.caption),
          color: C.text.muted,
          padding: `${S[2]}px ${S[3]}px`,
          borderRadius: R.md,
          border: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
          alignSelf: "flex-start",
        }}
      >
        OCR · de-DE
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            height: S[1],
            borderRadius: R.full,
            background: C.surface.sunken,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "65%",
              height: "100%",
              borderRadius: R.full,
              background: C.lumi.deep,
            }}
          />
        </div>
      </div>

      {/* Status + cancel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: S[2] }}>
          <div
            style={{
              width: SZ.iconMd,
              height: SZ.iconMd,
              borderRadius: R.full,
              border: `2px solid ${C.lumi.deep}`,
              borderTopColor: "transparent",
            }}
          />
          <div>
            <div style={{ ...tt(T.bodySm), fontWeight: 500, color: C.text.primary }}>Reading page…</div>
            <div style={{ ...tt(T.caption), color: C.text.muted }}>Recognising German text · about 10 seconds</div>
          </div>
        </div>
        <span style={{ ...tt(T.bodySm), color: C.text.secondary, cursor: "pointer" }}>Cancel</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
 * SCAN / PASTE: results — header with counts, highlighted text,
 * instruction, add button
 * ══════════════════════════════════════════════════════════════════ */

interface ResultPart {
  text: string;
  type: "plain" | "new" | "library";
}

const RESULT_PARTS: ResultPart[] = [
  // Paragraph 1
  { text: "Sie hatte eine ", type: "plain" },
  { text: "tiefe", type: "new" },
  { text: " ", type: "plain" },
  { text: "Sehnsucht", type: "new" },
  { text: " nach dem ", type: "plain" },
  { text: "Meer", type: "new" },
  { text: ". Der ", type: "plain" },
  { text: "Alltag", type: "library" },
  { text: " war ", type: "plain" },
  { text: "schwer", type: "new" },
  { text: ", aber sie ", type: "plain" },
  { text: "kümmerte", type: "new" },
  { text: " sich um ihre ", type: "plain" },
  { text: "Familie", type: "library" },
  { text: " mit großer ", type: "plain" },
  { text: "Geduld", type: "new" },
  { text: ".\n\n", type: "plain" },
  // Paragraph 2
  { text: "Am nächsten Morgen ", type: "plain" },
  { text: "erwachte", type: "new" },
  { text: " sie früh und ", type: "plain" },
  { text: "betrachtete", type: "new" },
  { text: " den ", type: "plain" },
  { text: "Sonnenaufgang", type: "new" },
  { text: " über den ", type: "plain" },
  { text: "Dächern", type: "new" },
  { text: ". Die ", type: "plain" },
  { text: "Stille", type: "new" },
  { text: " der ", type: "plain" },
  { text: "Straße", type: "library" },
  { text: " war ", type: "plain" },
  { text: "wohltuend", type: "new" },
  { text: ". Sie ", type: "plain" },
  { text: "bereitete", type: "new" },
  { text: " einen ", type: "plain" },
  { text: "Kaffee", type: "library" },
  { text: " zu und setzte sich an den ", type: "plain" },
  { text: "Schreibtisch", type: "new" },
  { text: ".\n\n", type: "plain" },
  // Paragraph 3
  { text: "Die ", type: "plain" },
  { text: "Aufgabe", type: "new" },
  { text: " vor ihr war ", type: "plain" },
  { text: "anspruchsvoll", type: "new" },
  { text: ", doch sie fühlte eine ", type: "plain" },
  { text: "Entschlossenheit", type: "new" },
  { text: ", die sie lange nicht ", type: "plain" },
  { text: "gespürt", type: "new" },
  { text: " hatte. Mit ", type: "plain" },
  { text: "Sorgfalt", type: "new" },
  { text: " las sie jede Zeile und machte sich ", type: "plain" },
  { text: "Notizen", type: "library" },
  { text: " am Rand. Das ", type: "plain" },
  { text: "Verständnis", type: "new" },
  { text: " kam ", type: "plain" },
  { text: "allmählich", type: "new" },
  { text: ", wie ", type: "plain" },
  { text: "Sonnenlicht", type: "new" },
  { text: " durch eine ", type: "plain" },
  { text: "Wolkendecke", type: "new" },
  { text: ".", type: "plain" },
];

function ResultsBody({ mobile }: { mobile?: boolean }) {
  const newWords = RESULT_PARTS.filter((p) => p.type === "new");
  const libWords = RESULT_PARTS.filter((p) => p.type === "library");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[3], height: "100%", minHeight: 0 }}>
      {/* Header */}
      {mobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: S[1] }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: S[2] }}>
              <Icon name="sparkle" size={SZ.iconSm} color={C.lumi.deep} />
              <span style={{ ...tt(T.bodySm), fontWeight: 600, color: C.text.primary }}>
                {newWords.length} new words
              </span>
            </div>
            <span style={{ ...tt(T.bodySm), color: C.lumi.deep, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}>
              Select all
            </span>
          </div>
          <span style={{ ...tt(T.caption), color: C.text.muted, paddingLeft: SZ.iconSm + S[2] }}>
            {newWords.length} selected · {libWords.length} already in library
          </span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: S[2] }}>
            <Icon name="sparkle" size={SZ.iconSm} color={C.lumi.deep} style={{ alignSelf: "center" }} />
            <span style={{ ...tt(T.bodySm), fontWeight: 600, color: C.text.primary }}>
              {newWords.length} new words
            </span>
            <span style={{ ...tt(T.bodySm), color: C.text.muted }}>
              · {newWords.length} selected · {libWords.length} already in library
            </span>
          </div>
          <span style={{ ...tt(T.bodySm), color: C.lumi.deep, fontWeight: 500, cursor: "pointer", flexShrink: 0 }}>
            Select all new
          </span>
        </div>
      )}

      {/* Highlighted text — scrolls when content is large */}
      <div
        style={{
          borderRadius: R.lg,
          border: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
          padding: S[4],
          ...tt(T.body),
          color: C.text.secondary,
          lineHeight: 2.4,
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {RESULT_PARTS.map((p, i) => {
          if (p.type === "new") return <WordHighlight key={i} word={p.text} />;
          if (p.type === "library") return <WordInLibrary key={i} word={p.text} />;
          return <span key={i}>{p.text}</span>;
        })}
      </div>

      {/* Instruction */}
      <div style={{ ...tt(T.caption), color: C.text.muted, textAlign: "center" }}>
        Tap any word to toggle. Words already in your library are crossed out.
      </div>

      {/* Add button */}
      <Btn variant="default" style={{ width: "100%", height: SZ.btnMd }}>
        Add {newWords.length} words to buffer
      </Btn>
    </div>
  );
}

export function ScanResultsContent({ mobile }: { mobile?: boolean }) {
  return <ResultsBody mobile={mobile} />;
}

/* ══════════════════════════════════════════════════════════════════
 * PASTE: empty — textarea with descriptive placeholder
 * ══════════════════════════════════════════════════════════════════ */

export function PasteEmptyContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: S[3] }}>
      <span style={{ ...tt(T.bodySm), color: C.text.muted }}>
        Paste any German text — AI extracts unique vocabulary
      </span>
      <div
        style={{
          height: AW.textareaH,
          borderRadius: R.md,
          border: `1px solid ${C.border.subtle}`,
          background: C.surface.raised,
          padding: S[3],
          ...tt(T.body),
          color: C.text.faint,
          whiteSpace: "pre-line",
        }}
      >
        Paste a paragraph, article, or any German text here…
      </div>
      <Btn variant="default" style={{ width: "100%", height: SZ.btnMd, opacity: 0.5 }} disabled>
        Extract words
      </Btn>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
 * PASTE: parsed — same highlighted result pattern as scan
 * ══════════════════════════════════════════════════════════════════ */

export function PasteParsedContent({ mobile }: { mobile?: boolean }) {
  return <ResultsBody mobile={mobile} />;
}
