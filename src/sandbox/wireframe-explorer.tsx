// @ts-nocheck
import { useState } from "react";

const tk = {
  s0: "#f7f6f3",
  s1: "#ede9e0",
  s2: "#e8e3d8",
  s3: "#d4cec2",
  s4: "#c4bdb0",
  bd: "#e0dbd0",
  wh: "#fff",
  btn: "#4a4540",
  t0: "#2a2620",
  t1: "#4a4540",
  t2: "#777",
  t3: "#999",
  t4: "#bbb",
  t5: "#ddd",
  gr: "#edf3e8",
  grb: "#dde8d4",
};
const DOT = {
  backgroundImage: "radial-gradient(circle,#c0b8aa 1.2px,transparent 1.2px)",
  backgroundSize: "16px 16px",
  backgroundColor: tk.s0,
};
const PW = 340,
  PH = 700,
  PSB = 32,
  PBN = 50,
  DW = 820,
  DH = 520,
  DCH = 34,
  DTB = 48,
  DSW = 144,
  TAB_H = 212,
  STUDY_TAB_H = 188;

const TREE = [
  {
    id: "dashboard",
    label: "Dashboard",
    ch: [
      { id: "db/mob", label: "Mobile" },
      { id: "db/desk", label: "Desktop" },
    ],
  },
  {
    id: "add-word",
    label: "Add Word",
    ch: [
      { id: "aw/mob", label: "Mobile · Add drawer" },
      { id: "aw/mob-v", label: "Mobile · Verify overlay" },
      { id: "aw/desk", label: "Desktop · Add modal" },
      { id: "aw/desk-v", label: "Desktop · Verify overlay" },
    ],
  },
  {
    id: "verify",
    label: "Verify Flow",
    ch: [
      { id: "vf/mob-l", label: "Mobile · Loading" },
      { id: "vf/mob-r", label: "Mobile · Word review" },
      { id: "vf/mob-d", label: "Mobile · Done" },
      { id: "vf/desk-l", label: "Desktop · Loading" },
      { id: "vf/desk-r", label: "Desktop · Word review" },
      { id: "vf/desk-d", label: "Desktop · Done" },
    ],
  },
  {
    id: "wl",
    label: "Word Library",
    ch: [
      { id: "wl/dl", label: "Desktop · List" },
      { id: "wl/dc", label: "Desktop · Cards" },
      { id: "wl/ddl", label: "Desktop · Detail (list)" },
      { id: "wl/ddc", label: "Desktop · Detail (cards)" },
      { id: "wl/ml", label: "Mobile · List" },
      { id: "wl/mc", label: "Mobile · Cards" },
      { id: "wl/md", label: "Mobile · Detail" },
    ],
  },
  {
    id: "study",
    label: "Study Session",
    ch: [
      { id: "st/mob-cfg", label: "Mobile · Configure" },
      { id: "st/desk-cfg", label: "Desktop · Configure" },
      { id: "st/mob-sc", label: "Mobile · Single choice" },
      { id: "st/desk-sc", label: "Desktop · Single choice" },
      { id: "st/mob-mc", label: "Mobile · Multiple choice" },
      { id: "st/desk-mc", label: "Desktop · Multiple choice" },
      { id: "st/mob-tr", label: "Mobile · Translation" },
      { id: "st/desk-tr", label: "Desktop · Translation" },
      { id: "st/mob-rv", label: "Mobile · Reverse translation" },
      { id: "st/desk-rv", label: "Desktop · Reverse translation" },
      { id: "st/mob-mt", label: "Mobile · Matching" },
      { id: "st/desk-mt", label: "Desktop · Matching" },
      { id: "st/mob-end", label: "Mobile · End screen" },
      { id: "st/desk-end", label: "Desktop · End screen" },
    ],
  },
  {
    id: "reading",
    label: "Reading Module",
    ch: [
      { id: "rd/mob-lib", label: "Mobile · Library" },
      { id: "rd/desk-lib", label: "Desktop · Library" },
      { id: "rd/mob-wt", label: "Mobile · Word tap" },
      { id: "rd/desk-wt", label: "Desktop · Word tap" },
      { id: "rd/mob-st", label: "Mobile · Sentence tap" },
      { id: "rd/desk-st", label: "Desktop · Sentence tap" },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    ch: [
      { id: "dc/mob-lib", label: "Mobile · Library" },
      { id: "dc/desk-lib", label: "Desktop · Library" },
      { id: "dc/mob-pdf", label: "Mobile · PDF reader" },
      { id: "dc/desk-pdf", label: "Desktop · PDF reader" },
      { id: "dc/mob-edit", label: "Mobile · Rich text editor" },
      { id: "dc/desk-edit", label: "Desktop · Rich text editor" },
      { id: "dc/mob-read", label: "Mobile · Rich text reader" },
      { id: "dc/desk-read", label: "Desktop · Rich text reader" },
    ],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    ch: [
      { id: "ob/login-mob", label: "Mobile · Login" },
      { id: "ob/login-desk", label: "Desktop · Login" },
      { id: "ob/reg-mob", label: "Mobile · Register" },
      { id: "ob/reg-desk", label: "Desktop · Register" },
      { id: "ob/comp-mob", label: "Mobile · Companion intro" },
      { id: "ob/comp-desk", label: "Desktop · Companion intro" },
      { id: "ob/tour-mob", label: "Mobile · In-app tour" },
      { id: "ob/tour-desk", label: "Desktop · In-app tour" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    ch: [
      { id: "se/mob", label: "Mobile" },
      { id: "se/desk", label: "Desktop" },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    ch: [
      { id: "pr/mob", label: "Mobile" },
      { id: "pr/desk", label: "Desktop" },
    ],
  },
  {
    id: "companion",
    label: "Companion Mini",
    ch: [
      { id: "cp/collapsed-mob", label: "Mobile · Collapsed" },
      { id: "cp/collapsed-desk", label: "Desktop · Collapsed" },
      { id: "cp/expanded-mob", label: "Mobile · Expanded" },
      { id: "cp/expanded-desk", label: "Desktop · Expanded" },
    ],
  },
];

// ── Design system ─────────────────────────────────────────────────────────────
const Chip = ({ label, bg, c, bd }) => (
  <span
    style={{
      height: 20,
      borderRadius: 20,
      padding: "0 8px",
      fontSize: 9,
      display: "inline-flex",
      alignItems: "center",
      background: bg || tk.s1,
      color: c || tk.t4,
      border: `0.5px solid ${bd || tk.bd}`,
      whiteSpace: "nowrap",
      flexShrink: 0,
      lineHeight: 1,
    }}
  >
    {label}
  </span>
);
const GPill = ({ g }) =>
  g ? <Chip label={g} bg={tk.s2} c={tk.t3} bd={tk.bd} /> : null;
const TChip = ({ t }) => <Chip label={t} bg={tk.s1} c={tk.t4} bd={tk.bd} />;
const STCOL = {
  planted: { bg: "#ede9e0", c: "#aaa", dot: "#c8bfb4" },
  growing: { bg: "#fdf3d0", c: "#8b6914", dot: "#d4a820" },
  almost: { bg: "#dceefa", c: "#2a6090", dot: "#5a9ac0" },
  mastered: { bg: "#dff0df", c: "#2a6040", dot: "#5aac6a" },
};
const SChip = ({ s }) => {
  const col = STCOL[s] || {};
  return (
    <Chip
      label={s}
      bg={col.bg || tk.s1}
      c={col.c || tk.t4}
      bd={col.c || tk.bd}
    />
  );
};
const Due = ({ due }) => {
  const t = due === "today";
  return (
    <Chip
      label={t ? "due today" : due}
      bg={t ? "#fdf3d0" : tk.s1}
      c={t ? "#8b6914" : tk.t4}
      bd={t ? "#d4a820" : tk.bd}
    />
  );
};
const AITag = ({ label }) => (
  <Chip label={label} bg={tk.gr} c="#4a6040" bd={tk.grb} />
);
const TagChip = ({ label }) => (
  <Chip label={label} bg={tk.s1} c={tk.t4} bd={tk.bd} />
);
const StreakChip = ({ n }) =>
  n > 0 ? (
    <Chip label={`🔥 ${n} in a row`} bg="#fdf3d0" c="#8b6914" bd="#d4a820" />
  ) : null;
const SDot = ({ s }) => (
  <span
    style={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: (STCOL[s] && STCOL[s].dot) || tk.s4,
      display: "inline-block",
      flexShrink: 0,
    }}
  />
);
const Fld = ({ ph, val, style }) => (
  <div
    style={{
      height: 38,
      borderRadius: 9,
      background: "#fafaf8",
      border: `0.8px solid ${tk.bd}`,
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      fontSize: 12,
      color: val ? tk.t1 : tk.t5,
      ...style,
    }}
  >
    {val || ph}
  </div>
);
const Btn = ({ lbl, sec, style }) => (
  <div
    style={{
      height: 34,
      borderRadius: 9,
      background: sec ? "transparent" : tk.btn,
      border: sec ? `0.8px solid ${tk.s3}` : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 500,
      color: sec ? tk.t2 : "#fff",
      cursor: "default",
      ...style,
    }}
  >
    {lbl}
  </div>
);
const Lbl = ({ c, style }) => (
  <div
    style={{
      fontSize: 9,
      letterSpacing: "0.09em",
      color: tk.t4,
      marginBottom: 4,
      ...style,
    }}
  >
    {c && c.toUpperCase()}
  </div>
);
const AiRow = ({ txt }) => (
  <div
    style={{
      height: 26,
      borderRadius: 7,
      background: tk.gr,
      border: `0.6px solid ${tk.grb}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 10px",
      fontSize: 9,
      color: "#4a6040",
      marginTop: 3,
    }}
  >
    <span>
      AI suggests: <b>{txt}</b>
    </span>
    <span style={{ color: tk.t3, cursor: "default" }}>Accept</span>
  </div>
);
const SC = ({ label, val, sub }) => (
  <div
    style={{
      flex: 1,
      background: tk.s1,
      borderRadius: 10,
      padding: "9px 10px",
    }}
  >
    <Lbl c={label} />
    <div style={{ fontSize: 18, fontWeight: 500, color: tk.t1, lineHeight: 1 }}>
      {val}
    </div>
    {sub && (
      <div style={{ fontSize: 8, color: tk.t4, marginTop: 2 }}>{sub}</div>
    )}
  </div>
);

// ── Layout atoms ──────────────────────────────────────────────────────────────
const LIcon = ({ on }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 12,
          height: 1.5,
          borderRadius: 1,
          background: on ? tk.t1 : tk.t3,
        }}
      />
    ))}
  </div>
);
const GIcon = ({ on }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          width: 5,
          height: 5,
          borderRadius: 1,
          background: on ? tk.t1 : tk.t3,
        }}
      />
    ))}
  </div>
);
const VToggle = ({ active, onChange }) => {
  const iL = active === "list";
  return (
    <div
      style={{
        display: "flex",
        background: tk.s2,
        borderRadius: 8,
        padding: 2,
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
      }}
      onClick={() => onChange && onChange(iL ? "grid" : "list")}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: iL ? 2 : "calc(50%)",
          width: "calc(50% - 2px)",
          height: "calc(100% - 4px)",
          background: tk.wh,
          borderRadius: 6,
          border: `0.6px solid ${tk.bd}`,
          transition: "left 0.15s",
        }}
      />
      <div
        style={{
          width: 32,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <LIcon on={iL} />
      </div>
      <div
        style={{
          width: 32,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <GIcon on={!iL} />
      </div>
    </div>
  );
};
const StageBar = () => (
  <div style={{ display: "flex", gap: 5 }}>
    {[
      ["🌱", "42", "Planted"],
      ["🔄", "58", "Growing"],
      ["💪", "61", "Almost"],
      ["⭐", "23", "Master"],
    ].map(([e, v, l]) => (
      <div
        key={l}
        style={{
          flex: 1,
          background: tk.s1,
          borderRadius: 8,
          padding: "6px 4px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 8, color: tk.t4 }}>{l}</div>
        <div style={{ fontSize: 15, fontWeight: 500, color: tk.t2 }}>{v}</div>
      </div>
    ))}
  </div>
);
const DueTodayCard = () => (
  <div
    style={{
      background: tk.s1,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "9px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div>
      <div style={{ fontSize: 9, color: tk.t4 }}>Due today</div>
      <div style={{ fontSize: 20, fontWeight: 500, color: tk.t1 }}>
        24 words
      </div>
    </div>
    <Btn lbl="Study now" style={{ width: 82, height: 28, fontSize: 10 }} />
  </div>
);
const WordOfDay = ({ size = 18, style }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "12px",
      textAlign: "center",
      ...style,
    }}
  >
    <Lbl c="Word of the day" style={{ textAlign: "center" }} />
    <div style={{ fontSize: size, fontWeight: 500, color: tk.t0 }}>
      die Sehnsucht
    </div>
    <div style={{ fontSize: 10, color: tk.t3, marginTop: 3 }}>
      a deep longing or yearning
    </div>
    <div
      style={{
        marginTop: 5,
        display: "flex",
        gap: 4,
        justifyContent: "center",
      }}
    >
      <GPill g="die" />
      <TChip t="noun" />
    </div>
  </div>
);
const QCard = ({ label, sub }) => (
  <div
    style={{
      flex: 1,
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "10px",
    }}
  >
    <div
      style={{
        width: 28,
        height: 20,
        background: tk.s2,
        borderRadius: 5,
        marginBottom: 7,
      }}
    />
    <div style={{ fontSize: 11, fontWeight: 500, color: tk.t1 }}>{label}</div>
    <div style={{ fontSize: 9, color: tk.t4, marginTop: 2 }}>{sub}</div>
  </div>
);
const Companion = ({ size = 84, mood }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: tk.s3,
      border: `1px solid ${tk.s4}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontSize: mood ? 14 : 9,
        color: tk.t3,
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      {mood || "3D\ncomp."}
    </span>
  </div>
);
const Bubble = ({ text, style }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "6px 14px",
      fontSize: 10,
      color: tk.t2,
      ...style,
    }}
  >
    {text}
  </div>
);

// ── Shared frame components ───────────────────────────────────────────────────
const Phone = ({ children }) => (
  <div
    style={{
      width: PW,
      height: PH,
      borderRadius: 28,
      overflow: "hidden",
      border: `2px solid ${tk.s3}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        height: PSB,
        background: tk.s1,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 10, color: tk.t3 }}>9:41</span>
      <span style={{ fontSize: 9, color: tk.t3 }}>●●●</span>
    </div>
    {children}
  </div>
);
const DeskFrame = ({ children }) => (
  <div
    style={{
      width: DW,
      height: DH,
      borderRadius: 10,
      overflow: "hidden",
      border: `1.5px solid ${tk.s3}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        height: DCH,
        background: tk.s1,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        gap: 8,
        borderBottom: `0.5px solid ${tk.bd}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: tk.s3,
          }}
        />
      ))}
      <div
        style={{
          flex: 1,
          height: 20,
          borderRadius: 6,
          background: tk.s2,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          margin: "0 20px",
        }}
      >
        <span style={{ fontSize: 10, color: tk.t4 }}>
          germanlern.vercel.app
        </span>
      </div>
    </div>
    {children}
  </div>
);
const DSidebar = ({ active = "Dashboard" }) => (
  <div
    style={{
      width: DSW,
      background: tk.s1,
      borderRight: `0.5px solid ${tk.bd}`,
      padding: "10px 0",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      overflow: "hidden",
      height: "100%",
    }}
  >
    <div
      style={{
        margin: "0 8px 14px",
        padding: "7px",
        background: tk.s2,
        borderRadius: 7,
        fontSize: 11,
        fontWeight: 500,
        color: tk.t1,
        textAlign: "center",
      }}
    >
      GermanLern
    </div>
    {[
      "Dashboard",
      "Library",
      "Study",
      "Read",
      "Documents",
      "Settings",
      "Profile",
    ].map((it) => (
      <div
        key={it}
        style={{
          padding: "7px 14px",
          fontSize: 11,
          background: it === active ? tk.s2 : "none",
          color: it === active ? tk.t0 : tk.t3,
          fontWeight: it === active ? 500 : 400,
          borderLeft:
            it === active ? `2px solid ${tk.s4}` : "2px solid transparent",
        }}
      >
        {it}
      </div>
    ))}
    <div
      style={{
        marginTop: "auto",
        padding: "12px 14px",
        borderTop: `0.5px solid ${tk.bd}`,
      }}
    >
      <div style={{ fontSize: 8, color: tk.t4, letterSpacing: "0.09em" }}>
        STREAK
      </div>
      <div
        style={{ fontSize: 16, fontWeight: 500, color: tk.t2, marginBottom: 6 }}
      >
        12 days
      </div>
      <div style={{ fontSize: 8, color: tk.t4, letterSpacing: "0.09em" }}>
        WORDS
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, color: tk.t2 }}>184</div>
    </div>
  </div>
);
const TBar = ({ title, action }) => (
  <div
    style={{
      height: DTB,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <span style={{ fontSize: 13, fontWeight: 500, color: tk.t1 }}>{title}</span>
    {action && <Btn lbl={action} style={{ width: 130, height: 30 }} />}
  </div>
);
const MobTopBar = ({ title, back, right }) => (
  <div
    style={{
      height: 44,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    {back ? (
      <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
        ← {back}
      </span>
    ) : (
      <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
        {title}
      </span>
    )}
    {right && (
      <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
        {right}
      </span>
    )}
  </div>
);
const MobBottomNav = ({ active = 0 }) => (
  <div
    style={{
      height: PBN,
      background: tk.s1,
      flexShrink: 0,
      borderTop: `0.5px solid ${tk.bd}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    }}
  >
    {["Home", "Library", "Study", "Read", "Docs"].map((n, i) => (
      <span
        key={n}
        style={{
          fontSize: 10,
          color: i === active ? tk.t1 : tk.t4,
          fontWeight: i === active ? 500 : 400,
        }}
      >
        {n}
      </span>
    ))}
  </div>
);
const Wrap = ({ children }) => (
  <div
    style={{
      ...DOT,
      width: "100%",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);
const Placeholder = ({ id }) => (
  <div
    style={{
      ...DOT,
      width: "100%",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    }}
  >
    <div style={{ fontSize: 13, fontWeight: 500, color: tk.t3 }}>{id}</div>
    <div style={{ fontSize: 11, color: tk.t4 }}>Not yet discussed</div>
  </div>
);
const Scrim = ({ top = 0, children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(30,26,20,0.54)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      zIndex: 10,
    }}
  >
    {children}
  </div>
);
const BufferBadge = ({ style }) => (
  <div
    style={{
      height: 26,
      background: tk.s1,
      borderBottom: `0.5px solid ${tk.bd}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      flexShrink: 0,
      ...style,
    }}
  >
    <span style={{ fontSize: 9, color: tk.t3 }}>
      3 words in buffer · not yet verified
    </span>
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: tk.s4,
        display: "inline-block",
      }}
    />
  </div>
);

// ── Add word ──────────────────────────────────────────────────────────────────
const BTabs = ({ active, onChange }) => (
  <div style={{ display: "flex", alignItems: "flex-end" }}>
    {["Type", "Scan", "Paste"].map((tab) => {
      const a = tab === active;
      return (
        <div
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: a ? "8px 20px 10px" : "6px 18px 10px",
            background: a ? tk.wh : tk.s2,
            border: `0.8px solid ${tk.bd}`,
            borderBottom: a ? `1px solid ${tk.wh}` : "none",
            borderRadius: "8px 8px 0 0",
            fontSize: 10,
            fontWeight: a ? 500 : 400,
            color: a ? tk.t1 : tk.t4,
            cursor: "pointer",
            userSelect: "none",
            position: "relative",
            zIndex: a ? 2 : 1,
          }}
        >
          {tab}
        </div>
      );
    })}
    ;
  </div>
);
const TabContent = ({ tab }) => (
  <div
    style={{
      height: TAB_H,
      padding: "4px 16px 16px",
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    {tab === "Type" && (
      <>
        <Fld ph="German word" style={{ marginBottom: 8 }} />
        <Fld ph="Translation (optional)" style={{ marginBottom: 10 }} />
        <div style={{ fontSize: 10, color: tk.t4, marginBottom: 12 }}>
          + notes · + tags · + custom sentence
        </div>
        <Btn lbl="Add word" />
      </>
    )}
    {tab === "Scan" && (
      <>
        <div
          style={{
            height: 108,
            background: tk.s1,
            borderRadius: 10,
            border: `0.8px solid ${tk.bd}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 72,
              height: 50,
              border: `1.5px dashed ${tk.s4}`,
              borderRadius: 6,
            }}
          />
          <span style={{ fontSize: 10, color: tk.t3 }}>viewfinder</span>
        </div>
        <Btn lbl="Capture" style={{ marginBottom: 8 }} />
        <div style={{ textAlign: "center", fontSize: 10, color: tk.t4 }}>
          or upload a photo
        </div>
      </>
    )}
    {tab === "Paste" && (
      <>
        <div style={{ fontSize: 10, color: tk.t3, marginBottom: 8 }}>
          One word per line
        </div>
        <div
          style={{
            height: 100,
            background: "#fafaf8",
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 9,
            padding: "8px 14px",
            fontSize: 12,
            color: tk.t4,
            marginBottom: 10,
            lineHeight: 1.9,
          }}
        >
          Hund
          <br />
          Katze
          <br />
          Straße
        </div>
        <Btn lbl="Add 3 words to buffer" />
      </>
    )}
  </div>
);
const Drawer = ({ tab, setTab }) => (
  <div style={{ position: "absolute", bottom: PBN, left: 0, right: 0 }}>
    <BTabs active={tab} onChange={setTab} />
    <div
      style={{
        background: tk.wh,
        borderTop: `0.8px solid ${tk.bd}`,
        borderRight: `0.8px solid ${tk.bd}`,
        borderLeft: `0.8px solid ${tk.bd}`,
        borderRadius: "0 10px 0 0",
      }}
    >
      <BufferBadge style={{ borderRadius: "0 10px 0 0" }} />
      <div
        style={{
          width: 52,
          height: 4,
          background: tk.s2,
          borderRadius: 2,
          margin: "11px auto",
        }}
      />
      <TabContent tab={tab} />
    </div>
  </div>
);
const Modal = ({ tab, setTab }) => (
  <div style={{ width: 360 }}>
    <BTabs active={tab} onChange={setTab} />
    <div
      style={{
        background: tk.wh,
        border: `0.8px solid ${tk.bd}`,
        borderRadius: "0 12px 12px 12px",
      }}
    >
      <BufferBadge style={{ borderRadius: "0 12px 0 0" }} />
      <div
        style={{
          padding: "14px 16px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: tk.t0 }}>
          Add word
        </span>
        <span
          style={{
            fontSize: 16,
            color: tk.t4,
            lineHeight: 1,
            cursor: "default",
          }}
        >
          ×
        </span>
      </div>
      <TabContent tab={tab} />
    </div>
  </div>
);

// ── Verify cards ──────────────────────────────────────────────────────────────
const VOverlay = ({ w = "100%" }) => (
  <div
    style={{
      background: tk.wh,
      borderRadius: 16,
      padding: "28px 24px",
      width: w,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{ fontSize: 13, fontWeight: 500, color: tk.t1, marginBottom: 5 }}
    >
      3 unverified words
    </div>
    <div style={{ fontSize: 11, color: tk.t3, marginBottom: 20 }}>
      Verify before studying or browsing.
    </div>
    <Btn lbl="Verify now" style={{ width: "100%", marginBottom: 10 }} />
    <Btn lbl="Add more words" sec style={{ width: "100%" }} />
  </div>
);
const VLoading = ({ w = "100%" }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 16,
      padding: "28px 24px",
      width: w,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        fontSize: 13,
        fontWeight: 500,
        color: tk.t1,
        textAlign: "center",
        marginBottom: 6,
      }}
    >
      Verifying your words
    </div>
    <div
      style={{
        fontSize: 10,
        color: tk.t3,
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      won't take long
    </div>
    <div
      style={{
        height: 6,
        background: tk.s2,
        borderRadius: 3,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "66%",
          background: tk.s4,
          borderRadius: 3,
        }}
      />
    </div>
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        marginBottom: 20,
      }}
    >
      2 of 3 words processed
    </div>
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[
        ["Hund", "✓", true],
        ["Katze", "✓", true],
        ["Straße", "···", false],
      ].map(([w, s, d]) => (
        <div
          key={w}
          style={{
            padding: "4px 12px",
            borderRadius: 20,
            background: d ? tk.gr : tk.s1,
            border: `0.6px solid ${d ? tk.grb : tk.bd}`,
            fontSize: 9,
            color: d ? "#4a6040" : tk.t3,
          }}
        >
          {w} {s}
        </div>
      ))}
    </div>
  </div>
);
const VReview = ({ w = "100%" }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 16,
      padding: "18px 20px 22px",
      width: w,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span style={{ fontSize: 9, color: tk.t4, whiteSpace: "nowrap" }}>
        WORD 1 OF 3
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: tk.s2,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "33%",
            background: tk.s4,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
    <div style={{ marginBottom: 10 }}>
      <Lbl c="Word" />
      <Fld val="Strasse" />
      <AiRow txt="Straße" />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Lbl c="Translation" />
      <Fld val="jalan" />
      <AiRow txt="jalan raya · jalanan" />
    </div>
    <div style={{ marginBottom: 10 }}>
      <Lbl c="Type / Gender" />
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <Fld val="noun" style={{ height: 32, fontSize: 11 }} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 32,
              borderRadius: 9,
              background: tk.gr,
              border: `0.6px solid ${tk.grb}`,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              fontSize: 11,
              color: "#4a6040",
            }}
          >
            die · AI ✓
          </div>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: 12 }}>
      <Lbl c="Tags" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <AITag label="travel" />
        <AITag label="daily life" />
        <TagChip label="+ add" />
      </div>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      <Btn lbl="Accept all" sec style={{ flex: 1, height: 34 }} />
      <Btn lbl="Next word →" style={{ flex: 1, height: 34 }} />
    </div>
  </div>
);
const VDone = ({ w = "100%" }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 16,
      padding: "32px 24px",
      width: w,
      boxSizing: "border-box",
      textAlign: "center",
    }}
  >
    <div
      style={{ fontSize: 13, fontWeight: 500, color: tk.t1, marginBottom: 6 }}
    >
      All done
    </div>
    <div style={{ fontSize: 10, color: tk.t3, marginBottom: 20 }}>
      3 words added to your library
    </div>
    <div
      style={{
        height: 5,
        background: tk.gr,
        borderRadius: 3,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#7ab87a",
          borderRadius: 3,
        }}
      />
    </div>
    <div style={{ fontSize: 9, color: tk.t4 }}>taking you back...</div>
  </div>
);
const DimMob = ({ op = 0.35 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      padding: 14,
      overflow: "hidden",
      opacity: op,
    }}
  >
    <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
      <SC label="Streak" val="12" sub="days" />
      <SC label="Study time" val="4.2h" />
      <SC label="Words" val="184" />
    </div>
    <div
      style={{
        background: tk.wh,
        border: `0.8px solid ${tk.bd}`,
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      <Lbl c="Word stages" />
      <StageBar />
    </div>
  </div>
);
const DimDesk = ({ op = 0.35 }) => (
  <div style={{ flex: 1, padding: 18, opacity: op }}>
    <div style={{ display: "flex", gap: 10 }}>
      <QCard label="Add words" sub="184 total" />
      <QCard label="Study" sub="24 due" />
      <QCard label="Read" sub="→" />
      <QCard label="Documents" sub="→" />
    </div>
  </div>
);

// ── Word library ──────────────────────────────────────────────────────────────
const WORDS = [
  {
    w: "aufmachen",
    g: null,
    tp: "verb",
    tr: "to open",
    s: "growing",
    tags: ["daily life"],
    due: "today",
  },
  {
    w: "die Katze",
    g: "die",
    tp: "noun",
    tr: "cat",
    s: "mastered",
    tags: ["animals"],
    due: "14d",
  },
  {
    w: "der Hund",
    g: "der",
    tp: "noun",
    tr: "dog",
    s: "almost",
    tags: ["animals"],
    due: "3d",
  },
  {
    w: "essen",
    g: null,
    tp: "verb",
    tr: "to eat",
    s: "planted",
    tags: ["food"],
    due: "today",
  },
  {
    w: "schnell",
    g: null,
    tp: "adj",
    tr: "fast",
    s: "growing",
    tags: [],
    due: "5d",
  },
  {
    w: "die Straße",
    g: "die",
    tp: "noun",
    tr: "street",
    s: "growing",
    tags: ["travel"],
    due: "today",
  },
  {
    w: "schreiben",
    g: null,
    tp: "verb",
    tr: "to write",
    s: "almost",
    tags: ["academic"],
    due: "2d",
  },
  {
    w: "das Haus",
    g: "das",
    tp: "noun",
    tr: "house",
    s: "mastered",
    tags: ["home"],
    due: "21d",
  },
];
const WRow = ({ w: wo, last, sel }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 18px",
      borderBottom: last ? "none" : `0.5px solid ${tk.bd}`,
      background: sel ? tk.s2 : "none",
      cursor: "default",
    }}
  >
    <SDot s={wo.s} />
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: tk.t0,
        minWidth: 108,
        whiteSpace: "nowrap",
      }}
    >
      {wo.w}
    </span>
    <GPill g={wo.g} />
    <TChip t={wo.tp} />
    <span style={{ fontSize: 11, color: tk.t2, flex: 1 }}>{wo.tr}</span>
    <div style={{ display: "flex", gap: 4 }}>
      {wo.tags.slice(0, 2).map((t) => (
        <TagChip key={t} label={t} />
      ))}
    </div>
    <Due due={wo.due} />
  </div>
);
const WCard = ({ w: wo }) => {
  const sc = STCOL[wo.s] || {};
  return (
    <div
      style={{
        background: tk.wh,
        border: `0.8px solid ${tk.bd}`,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div style={{ height: 3, background: sc.c || tk.s3 }} />
      <div style={{ padding: "10px 12px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: tk.t0,
            marginBottom: 6,
          }}
        >
          {wo.w}
        </div>
        <div
          style={{ display: "flex", gap: 4, marginBottom: 6, minHeight: 20 }}
        >
          <TChip t={wo.tp} />
          <GPill g={wo.g} />
        </div>
        <div style={{ fontSize: 11, color: tk.t2, marginBottom: 8 }}>
          {wo.tr}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 3 }}>
            {wo.tags.slice(0, 1).map((t) => (
              <TagChip key={t} label={t} />
            ))}
          </div>
          <Due due={wo.due} />
        </div>
      </div>
    </div>
  );
};
const MiniWCard = ({ w: wo, sel }) => {
  const sc = STCOL[wo.s] || {};
  return (
    <div
      style={{
        background: sel ? tk.s2 : tk.wh,
        border: `0.8px solid ${sel ? tk.s4 : tk.bd}`,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <div style={{ height: 2, background: sc.c || tk.s3 }} />
      <div style={{ padding: "5px 7px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: sel ? 500 : 400,
            color: tk.t0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {wo.w}
        </div>
        <div style={{ fontSize: 8, color: tk.t3 }}>{wo.tr}</div>
      </div>
    </div>
  );
};
const LibTopBar = ({ view, setView }) => (
  <div
    style={{
      height: DTB,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <span style={{ fontSize: 13, fontWeight: 500, color: tk.t1 }}>
      Word Library
    </span>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 9, color: tk.t4 }}>184 words</span>
      <VToggle active={view} onChange={setView} />
    </div>
  </div>
);
const LibSearch = ({ compact }) => (
  <div
    style={{
      padding: compact ? "8px 14px 6px" : "10px 18px 8px",
      background: tk.wh,
      borderBottom: `0.5px solid ${tk.bd}`,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        height: compact ? 30 : 34,
        borderRadius: 9,
        background: tk.s1,
        border: `0.8px solid ${tk.bd}`,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        marginBottom: compact ? 5 : 8,
        fontSize: compact ? 10 : 11,
        color: tk.t4,
      }}
    >
      ⌕ {compact ? "Search..." : "Search in German or Indonesian..."}
    </div>
    <div style={{ display: "flex", gap: 5, overflow: "hidden" }}>
      {(compact
        ? ["Stage ∨", "Type ∨", "Sort ∨"]
        : ["Stage ∨", "Type ∨", "Tags ∨", "Sort: A→Z ∨"]
      ).map((f) => (
        <div
          key={f}
          style={{
            height: 24,
            borderRadius: 6,
            background: tk.s1,
            border: `0.6px solid ${tk.bd}`,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            fontSize: 9,
            color: tk.t3,
            cursor: "default",
            flexShrink: 0,
          }}
        >
          {f}
        </div>
      ))}
    </div>
  </div>
);
const WordDetail = () => (
  <>
    <div
      style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 6 }}
    >
      <GPill g="die" />
      <TChip t="noun" />
      <SChip s="growing" />
    </div>
    <div
      style={{ fontSize: 26, fontWeight: 500, color: tk.t0, marginBottom: 4 }}
    >
      die Straße
    </div>
    <div style={{ fontSize: 13, color: tk.t2, marginBottom: 14 }}>
      street, road
    </div>
    <div style={{ marginBottom: 12 }}>
      <Lbl c="Also means" />
      <div style={{ fontSize: 10, color: tk.t3 }}>jalanan · jalan raya</div>
    </div>
    <div style={{ marginBottom: 12 }}>
      <Lbl c="Example sentences" />
      {[["Die Straße ist sehr breit.", "The street is very wide."]].map(
        ([de, id]) => (
          <div
            key={de}
            style={{
              background: tk.s1,
              borderRadius: 8,
              padding: "7px 10px",
              marginBottom: 5,
            }}
          >
            <div style={{ fontSize: 11, color: tk.t1, marginBottom: 2 }}>
              {de}
            </div>
            <div style={{ fontSize: 9, color: tk.t3 }}>{id}</div>
          </div>
        ),
      )}
    </div>
    <div style={{ marginBottom: 12 }}>
      <Lbl c="Grammar · Noun" />
      <div
        style={{
          background: tk.s1,
          borderRadius: 8,
          padding: "8px 12px",
          display: "flex",
          gap: 20,
        }}
      >
        <div>
          <Lbl c="Plural" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
            die Straßen
          </div>
        </div>
        <div>
          <Lbl c="Gender" style={{ marginBottom: 2 }} />
          <div style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
            die (feminine)
          </div>
        </div>
      </div>
    </div>
    <div style={{ marginBottom: 12 }}>
      <Lbl c="Tags" />
      <div style={{ display: "flex", gap: 4 }}>
        <AITag label="travel" />
        <AITag label="daily life" />
      </div>
    </div>
    <div>
      <Lbl c="Learning stats" />
      <div
        style={{
          background: tk.s1,
          borderRadius: 8,
          padding: "8px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px 16px",
        }}
      >
        {[
          ["Reviews", "12"],
          ["Correct rate", "75%"],
          ["Next review", "in 2d"],
          ["EF", "2.1"],
        ].map(([k, v]) => (
          <div key={k}>
            <Lbl c={k} style={{ marginBottom: 1 }} />
            <div style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);
const DetailPanel = () => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: DTB,
        background: tk.s1,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
        borderBottom: `0.5px solid ${tk.bd}`,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 500, color: tk.t1 }}>
        Word detail
      </span>
      <Btn lbl="Edit" sec style={{ width: 60, height: 26, fontSize: 10 }} />
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
      <WordDetail />
    </div>
  </div>
);

// ── Study ─────────────────────────────────────────────────────────────────────
const StudyBTabs = ({ active, onChange }) => (
  <div style={{ display: "flex", alignItems: "flex-end" }}>
    {["Auto", "By tag", "Ask companion"].map((tab) => {
      const a = tab === active;
      return (
        <div
          key={tab}
          onClick={() => onChange && onChange(tab)}
          style={{
            padding: a ? "8px 14px 10px" : "6px 12px 10px",
            background: a ? tk.wh : tk.s2,
            border: `0.8px solid ${tk.bd}`,
            borderBottom: a ? `1px solid ${tk.wh}` : "none",
            borderRadius: "8px 8px 0 0",
            fontSize: 10,
            fontWeight: a ? 500 : 400,
            color: a ? tk.t1 : tk.t4,
            cursor: "pointer",
            userSelect: "none",
            position: "relative",
            zIndex: a ? 2 : 1,
            whiteSpace: "nowrap",
          }}
        >
          {tab}
        </div>
      );
    })}
    ;
  </div>
);
const StudyTabContent = ({ tab }) => (
  <div
    style={{
      height: STUDY_TAB_H,
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: "0 10px 10px 10px",
      padding: "16px",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
  >
    {tab === "Auto" && (
      <>
        <div
          style={{
            background: tk.s1,
            borderRadius: 9,
            padding: "10px 14px",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 9, color: tk.t3, marginBottom: 2 }}>
            Today's queue · SM-2
          </div>
          <div style={{ fontSize: 20, fontWeight: 500, color: tk.t1 }}>
            24 words due
          </div>
          <div style={{ fontSize: 9, color: tk.t4, marginTop: 2 }}>~10 min</div>
        </div>
        <Btn lbl="Start studying" style={{ width: "100%" }} />
      </>
    )}
    {tab === "By tag" && (
      <>
        <div style={{ fontSize: 9, color: tk.t3, marginBottom: 8 }}>
          Select tags to study
        </div>
        <div
          style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          {[
            ["animals", true],
            ["food", false],
            ["travel", true],
            ["daily life", false],
            ["academic", false],
          ].map(([t, sel]) => (
            <span
              key={t}
              style={{
                height: 24,
                borderRadius: 20,
                padding: "0 10px",
                background: sel ? tk.btn : tk.s1,
                border: `0.5px solid ${sel ? tk.btn : tk.bd}`,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 9,
                color: sel ? "#fff" : tk.t3,
                cursor: "default",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 9, color: tk.t4, marginBottom: 12 }}>
          2 tags · 18 words
        </div>
        <Btn lbl="Start session" style={{ width: "100%" }} />
      </>
    )}
    {tab === "Ask companion" && (
      <>
        <div style={{ fontSize: 9, color: tk.t3, marginBottom: 8 }}>
          Describe what you want to study
        </div>
        <div
          style={{
            height: 54,
            borderRadius: 9,
            background: "#fafaf8",
            border: `0.8px solid ${tk.bd}`,
            padding: "8px 14px",
            fontSize: 11,
            color: tk.t2,
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          I want to practice animal vocabulary...
        </div>
        <Btn lbl="Ask companion" style={{ width: "100%", marginBottom: 10 }} />
        <div style={{ fontSize: 9, color: tk.t4, textAlign: "center" }}>
          Found 15 words · ready
        </div>
      </>
    )}
  </div>
);
const MobProgress = ({ done, total, streak }) => (
  <div
    style={{
      padding: "10px 16px 8px",
      background: tk.wh,
      borderBottom: `0.5px solid ${tk.bd}`,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        height: 3,
        background: tk.s2,
        borderRadius: 2,
        marginBottom: 6,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(done / total) * 100}%`,
          background: tk.btn,
          borderRadius: 2,
        }}
      />
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 10, color: tk.t1, fontWeight: 500 }}>
        {done}
        <span style={{ color: tk.t4, fontWeight: 400 }}> / {total}</span>
      </span>
      {streak > 0 && (
        <Chip
          label={`🔥 ${streak} in a row`}
          bg="#fdf3d0"
          c="#8b6914"
          bd="#d4a820"
        />
      )}
    </div>
  </div>
);
const StudyTBar = ({ done, total, streak }) => (
  <div
    style={{
      height: 52,
      background: tk.s1,
      flexShrink: 0,
      padding: "0 20px",
      borderBottom: `0.5px solid ${tk.bd}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 6,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
        Study Session
      </span>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {streak > 0 && (
          <Chip
            label={`🔥 ${streak} in a row`}
            bg="#fdf3d0"
            c="#8b6914"
            bd="#d4a820"
          />
        )}
        <span style={{ fontSize: 10, color: tk.t3 }}>
          {done} / {total}
        </span>
        <Btn lbl="Exit" sec style={{ width: 52, height: 24, fontSize: 9 }} />
      </div>
    </div>
    <div
      style={{
        height: 3,
        background: tk.s2,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(done / total) * 100}%`,
          background: tk.btn,
          borderRadius: 2,
        }}
      />
    </div>
  </div>
);
const WordDisplay = ({ word, chips, hint }) => (
  <div style={{ textAlign: "center", padding: "22px 20px 14px" }}>
    {hint && (
      <div
        style={{
          fontSize: 9,
          color: tk.t4,
          letterSpacing: "0.09em",
          marginBottom: 10,
        }}
      >
        {hint}
      </div>
    )}
    <div
      style={{
        fontSize: 28,
        fontWeight: 500,
        color: tk.t0,
        lineHeight: 1.2,
        marginBottom: chips ? 8 : 0,
      }}
    >
      {word}
    </div>
    {chips && (
      <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
        {chips}
      </div>
    )}
  </div>
);
const OPT = {
  idle: { bg: tk.wh, c: tk.t1, bd: tk.bd },
  selected: { bg: tk.s2, c: tk.t0, bd: tk.s4 },
  correct: { bg: "#dff0df", c: "#2a6040", bd: "#5aac6a" },
  wrong: { bg: "#fce8e8", c: "#a32d2d", bd: "#e09090" },
};
const OptionBtn = ({ label, state = "idle", checkbox = false }) => {
  const s = OPT[state] || OPT.idle;
  const checked = state === "selected" || state === "correct";
  return (
    <div
      style={{
        padding: "11px 14px",
        borderRadius: 10,
        background: s.bg,
        border: `0.8px solid ${s.bd}`,
        fontSize: 12,
        color: s.c,
        cursor: "default",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {checkbox && (
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            border: `1.5px solid ${checked ? "#5aac6a" : s.bd}`,
            background: checked ? "#5aac6a" : "transparent",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {checked && (
            <span style={{ fontSize: 9, color: "#fff", lineHeight: 1 }}>✓</span>
          )}
        </div>
      )}
      <span style={{ flex: 1, textAlign: checkbox ? "left" : "center" }}>
        {label}
      </span>
    </div>
  );
};
const StudySkip = () => (
  <div style={{ padding: "10px 0 18px", textAlign: "center" }}>
    <span style={{ fontSize: 10, color: tk.t4, cursor: "default" }}>Skip</span>
  </div>
);
const StudyHint = () => (
  <div style={{ textAlign: "center", marginBottom: 12 }}>
    <span style={{ fontSize: 10, color: tk.t3, cursor: "default" }}>
      💡 Show hint
    </span>
  </div>
);
const MatchBtn = ({ label, state = "idle" }) => {
  const bg = { idle: tk.wh, selected: tk.s2, matched: tk.gr }[state] || tk.wh;
  const bd = { idle: tk.bd, selected: tk.s4, matched: tk.grb }[state] || tk.bd;
  return (
    <div
      style={{
        padding: "9px 10px",
        borderRadius: 9,
        background: bg,
        border: `0.8px solid ${bd}`,
        fontSize: 11,
        color: tk.t0,
        textAlign: "center",
        cursor: "default",
      }}
    >
      {label}
    </div>
  );
};
const MobEx = ({ done = 7, total = 20, streak = 3, children }) => (
  <Wrap>
    <Phone>
      <MobProgress done={done} total={total} streak={streak} />
      {children}
    </Phone>
  </Wrap>
);
const DeskEx = ({ done = 7, total = 20, streak = 3, children }) => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Study" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <StudyTBar done={done} total={total} streak={streak} />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "24px 40px",
              overflowY: "auto",
            }}
          >
            <div style={{ width: "100%", maxWidth: 460 }}>{children}</div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

// ── Reading module ────────────────────────────────────────────────────────────
const TEXTS = [
  {
    title: "Tiere im Park",
    date: "Apr 17",
    words: 48,
    added: 3,
    snippet: "Der Hund läuft schnell durch den Park...",
  },
  {
    title: "Die Stadt",
    date: "Apr 15",
    words: 62,
    added: 0,
    snippet: "Berlin ist eine große und bunte Stadt...",
  },
  {
    title: "Mein Alltag",
    date: "Apr 12",
    words: 55,
    added: 7,
    snippet: "Jeden Morgen trinke ich Kaffee...",
  },
  {
    title: "Das Wetter",
    date: "Apr 10",
    words: 44,
    added: 2,
    snippet: "Im Frühling ist das Wetter...",
  },
];
const TCard = ({ t }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "default",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 500, color: tk.t0 }}>
        {t.title}
      </div>
      {t.added > 0 && <AITag label={`+${t.added} words`} />}
    </div>
    <div style={{ fontSize: 9, color: tk.t4, marginBottom: 5 }}>
      {t.date} · {t.words} words
    </div>
    <div
      style={{
        fontSize: 10,
        color: tk.t4,
        lineHeight: 1.5,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {t.snippet}
    </div>
  </div>
);
const W = ({ children, lib, tap }) => (
  <span
    style={{
      borderBottom: lib && !tap ? `1.5px dotted ${tk.s4}` : undefined,
      background: tap ? "#fdf3d0" : undefined,
      borderRadius: tap ? 3 : undefined,
      padding: tap ? "0 2px" : undefined,
      cursor: "default",
    }}
  >
    {children}
  </span>
);
const S = ({ children, tap }) => (
  <span
    style={{
      background: tap ? tk.s2 : undefined,
      borderRadius: tap ? 4 : undefined,
      padding: tap ? "1px 2px" : undefined,
    }}
  >
    {children}
  </span>
);
const ReadingText = ({ wordTap = null, sentTap = false }) => (
  <div style={{ fontSize: 13, color: tk.t1, lineHeight: 2.1 }}>
    <p style={{ marginBottom: 14 }}>
      <S tap={sentTap}>
        Der{" "}
        <W lib tap={wordTap === "Hund"}>
          Hund
        </W>{" "}
        läuft{" "}
        <W lib tap={wordTap === "schnell"}>
          schnell
        </W>{" "}
        durch den Park. Er sieht eine{" "}
        <W lib tap={wordTap === "Katze"}>
          Katze
        </W>{" "}
        auf dem Weg.
      </S>
    </p>
    <p style={{ marginBottom: 14 }}>
      Die <W lib>Katze</W> schaut ihn an und läuft dann weg. Der <W lib>Hund</W>{" "}
      ist traurig.
    </p>
    <p>
      Im Frühling ist das Wetter sehr wechselhaft. Manchmal scheint die Sonne.
    </p>
  </div>
);
const ReaderBuf = () => (
  <Chip label="2 words in buffer" bg="#fdf3d0" c="#8b6914" bd="#d4a820" />
);
const WordPopup = () => (
  <>
    <div
      style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 6 }}
    >
      <GPill g="der" />
      <TChip t="noun" />
      <SChip s="almost" />
    </div>
    <div
      style={{ fontSize: 22, fontWeight: 500, color: tk.t0, marginBottom: 3 }}
    >
      der Hund
    </div>
    <div style={{ fontSize: 13, color: tk.t2, marginBottom: 14 }}>anjing</div>
    <Btn lbl="Add to buffer" style={{ width: "100%", marginBottom: 8 }} />
    <div style={{ fontSize: 9, color: tk.t4, textAlign: "center" }}>
      Already in library · Almost there 💪
    </div>
  </>
);
const SentPopup = () => (
  <>
    <Lbl c="German" />
    <div
      style={{
        background: tk.s1,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 12,
        fontSize: 11,
        color: tk.t1,
        lineHeight: 1.7,
      }}
    >
      Der Hund läuft schnell durch den Park.
    </div>
    <Lbl c="Indonesian" />
    <div
      style={{
        background: tk.s1,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 14,
        fontSize: 11,
        color: tk.t2,
        lineHeight: 1.7,
      }}
    >
      Anjing berlari dengan cepat melalui taman.
    </div>
    <Btn lbl="Add distinct words to buffer" sec style={{ width: "100%" }} />
  </>
);
const RdMobBar = ({ title }) => (
  <div
    style={{
      height: 44,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
      ← Reading
    </span>
    <ReaderBuf />
  </div>
);
const RdDeskBar = ({ title }) => (
  <div
    style={{
      height: DTB,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
        ← Reading
      </span>
      <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
        {title}
      </span>
    </div>
    <ReaderBuf />
  </div>
);

// ── Documents ─────────────────────────────────────────────────────────────────
const DOCS = [
  {
    title: "Kapitel 3 — Verben",
    type: "rich",
    date: "Apr 18",
    pages: 4,
    highlights: 6,
    bookmarks: 2,
  },
  {
    title: "Grammatik Übersicht",
    type: "pdf",
    date: "Apr 16",
    pages: 12,
    highlights: 3,
    bookmarks: 5,
  },
  {
    title: "Vokabeln Week 4",
    type: "rich",
    date: "Apr 14",
    pages: 2,
    highlights: 0,
    bookmarks: 1,
  },
  {
    title: "Lecture Notes",
    type: "pdf",
    date: "Apr 11",
    pages: 8,
    highlights: 9,
    bookmarks: 3,
  },
];
const DocTypeChip = ({ type }) => (
  <Chip
    label={type === "pdf" ? "PDF" : "Rich text"}
    bg={type === "pdf" ? "#e8edf7" : "#f0f7e8"}
    c={type === "pdf" ? "#2a4090" : "#2a6040"}
    bd={type === "pdf" ? "#90a8d8" : "#90c890"}
  />
);
const DocCard = ({ d }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 10,
      padding: "12px 14px",
      cursor: "default",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 5,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: tk.t0,
          flex: 1,
          marginRight: 8,
        }}
      >
        {d.title}
      </div>
      <DocTypeChip type={d.type} />
    </div>
    <div style={{ fontSize: 9, color: tk.t4, marginBottom: 8 }}>
      {d.date} · {d.pages} pages
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      {d.highlights > 0 && (
        <Chip
          label={`${d.highlights} highlights`}
          bg={tk.s1}
          c={tk.t4}
          bd={tk.bd}
        />
      )}
      {d.bookmarks > 0 && (
        <Chip
          label={`${d.bookmarks} bookmarks`}
          bg={tk.s1}
          c={tk.t4}
          bd={tk.bd}
        />
      )}
    </div>
  </div>
);
const AnnotPanel = () => (
  <div
    style={{
      width: 220,
      borderLeft: `0.5px solid ${tk.bd}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        height: 44,
        background: tk.s1,
        borderBottom: `0.5px solid ${tk.bd}`,
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: tk.t1 }}>
        Annotations
      </span>
      <span style={{ fontSize: 10, color: tk.t4, cursor: "default" }}>×</span>
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
      <Lbl c="Bookmarks" style={{ marginBottom: 6 }} />
      {[
        ["p.2", "Verb conjugations"],
        ["p.5", "Separable verbs"],
        ["p.8", "Key rule"],
      ].map(([pg, note]) => (
        <div
          key={note}
          style={{
            padding: "7px 10px",
            background: tk.s1,
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <div style={{ fontSize: 8, color: tk.t4, marginBottom: 1 }}>{pg}</div>
          <div style={{ fontSize: 10, color: tk.t2 }}>{note}</div>
        </div>
      ))}
      <Lbl c="Highlights" style={{ marginTop: 14, marginBottom: 6 }} />
      {[
        ["aufmachen", "to open · verb"],
        ["die Straße", "street · noun"],
        ["schnell", "fast · adj"],
      ].map(([w, d]) => (
        <div
          key={w}
          style={{
            padding: "7px 10px",
            background: "#fdf8d0",
            border: `0.5px solid #e8d840`,
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: tk.t0,
              marginBottom: 1,
            }}
          >
            {w}
          </div>
          <div style={{ fontSize: 9, color: tk.t3 }}>{d}</div>
        </div>
      ))}
    </div>
  </div>
);
const AnnotSheet = () => (
  <div
    style={{
      position: "absolute",
      bottom: PBN,
      left: 0,
      right: 0,
      background: tk.wh,
      borderRadius: "16px 16px 0 0",
      border: `0.8px solid ${tk.bd}`,
      borderBottom: "none",
      maxHeight: "55%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        width: 52,
        height: 4,
        background: tk.s2,
        borderRadius: 2,
        margin: "10px auto 0",
        flexShrink: 0,
      }}
    />
    <div
      style={{
        padding: "8px 16px",
        borderBottom: `0.5px solid ${tk.bd}`,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 500, color: tk.t1 }}>
        Annotations
      </span>
    </div>
    <div style={{ overflowY: "auto", padding: "10px 16px" }}>
      <Lbl c="Bookmarks" style={{ marginBottom: 6 }} />
      {[
        ["p.2", "Verb conjugations"],
        ["p.5", "Separable verbs"],
      ].map(([pg, note]) => (
        <div
          key={note}
          style={{
            padding: "7px 10px",
            background: tk.s1,
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <div style={{ fontSize: 8, color: tk.t4 }}>{pg}</div>
          <div style={{ fontSize: 10, color: tk.t2 }}>{note}</div>
        </div>
      ))}
      <Lbl c="Highlights" style={{ marginTop: 10, marginBottom: 6 }} />
      {[
        ["aufmachen", "to open"],
        ["schnell", "fast"],
      ].map(([w, d]) => (
        <div
          key={w}
          style={{
            padding: "7px 10px",
            background: "#fdf8d0",
            border: `0.5px solid #e8d840`,
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 500, color: tk.t0 }}>{w}</div>
          <div style={{ fontSize: 9, color: tk.t3 }}>{d}</div>
        </div>
      ))}
    </div>
  </div>
);
const PDFPage = ({ pg = 1 }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: 6,
      padding: "24px 28px",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        fontSize: 8,
        color: tk.t4,
        textAlign: "right",
        marginBottom: 16,
      }}
    >
      Seite {pg}
    </div>
    <div
      style={{ fontSize: 14, fontWeight: 500, color: tk.t0, marginBottom: 12 }}
    >
      Kapitel 3: Trennbare Verben
    </div>
    <div
      style={{ fontSize: 11, color: tk.t1, lineHeight: 2, marginBottom: 10 }}
    >
      Trennbare Verben sind Verben, die aus zwei Teilen bestehen.{" "}
      <span
        style={{ background: "#fdf8d0", borderRadius: 2, padding: "0 2px" }}
      >
        Der erste Teil ist ein Präfix
      </span>
      , der zweite Teil ist das eigentliche Verb. Zum Beispiel:{" "}
      <span style={{ fontWeight: 500 }}>aufmachen</span> = auf + machen.
    </div>
    <div style={{ fontSize: 11, color: tk.t1, lineHeight: 2 }}>
      Im Satz wird das Präfix ans Ende gestellt.{" "}
      <span
        style={{ background: "#fdf8d0", borderRadius: 2, padding: "0 2px" }}
      >
        Ich mache die Tür auf.
      </span>
    </div>
  </div>
);
const RichContent = ({ editing = false }) => (
  <div>
    {editing && (
      <div
        style={{
          height: 36,
          background: tk.s1,
          borderRadius: 8,
          border: `0.5px solid ${tk.bd}`,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {["B", "I", "U", "H1", "H2", "•", "⌘"].map((t) => (
          <span
            key={t}
            style={{ fontSize: 11, color: tk.t3, cursor: "default" }}
          >
            {t}
          </span>
        ))}
      </div>
    )}
    <div
      style={{ fontSize: 16, fontWeight: 500, color: tk.t0, marginBottom: 10 }}
    >
      Kapitel 3 — Verben
    </div>
    <div
      style={{ fontSize: 11, color: tk.t1, lineHeight: 2, marginBottom: 14 }}
    >
      Trennbare Verben bestehen aus zwei Teilen.{" "}
      <span
        style={{ background: "#fdf8d0", borderRadius: 2, padding: "0 2px" }}
      >
        aufmachen = auf + machen
      </span>
      . Im Satz: Präfix ans Ende.
    </div>
    <div
      style={{
        background: tk.s2,
        borderRadius: 8,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        border: `0.8px solid ${tk.bd}`,
      }}
    >
      <span style={{ fontSize: 10, color: tk.t4 }}>
        📷 Page photo — Übung 3.2
      </span>
    </div>
    <div style={{ fontSize: 11, color: tk.t1, lineHeight: 2 }}>
      Weitere Beispiele: zumachen, anrufen, einkaufen.{" "}
      <span
        style={{ background: "#fdf8d0", borderRadius: 2, padding: "0 2px" }}
      >
        Ich rufe dich an.
      </span>
    </div>
    {editing && (
      <div
        style={{
          marginTop: 16,
          height: 40,
          border: `1.5px dashed ${tk.s3}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 10, color: tk.t4 }}>
          + Add image or type here
        </span>
      </div>
    )}
  </div>
);
const DocReaderBar = ({ title, type, mode }) => (
  <div
    style={{
      height: DTB,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
        ← Documents
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: tk.t1,
          maxWidth: 200,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {type === "rich" && (
        <div
          style={{
            display: "flex",
            background: tk.s2,
            borderRadius: 8,
            padding: 2,
          }}
        >
          {["Read", "Edit"].map((m) => {
            const a = m.toLowerCase() === mode;
            return (
              <div
                key={m}
                style={{
                  padding: "3px 12px",
                  borderRadius: 6,
                  background: a ? tk.wh : "none",
                  border: a ? `0.5px solid ${tk.bd}` : "none",
                  fontSize: 10,
                  fontWeight: a ? 500 : 400,
                  color: a ? tk.t1 : tk.t4,
                  cursor: "pointer",
                }}
              >
                {m}
              </div>
            );
          })}
        </div>
      )}
      <Btn
        lbl="Annotations"
        sec
        style={{ height: 28, width: 100, fontSize: 10 }}
      />
    </div>
  </div>
);
const DocMobBar = ({ title, type, mode }) => (
  <div
    style={{
      height: 44,
      background: tk.s1,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      justifyContent: "space-between",
      borderBottom: `0.5px solid ${tk.bd}`,
    }}
  >
    <span style={{ fontSize: 11, color: tk.t2, cursor: "default" }}>
      ← Docs
    </span>
    {type === "rich" && (
      <div
        style={{
          display: "flex",
          background: tk.s2,
          borderRadius: 8,
          padding: 2,
        }}
      >
        {["Read", "Edit"].map((m) => {
          const a = m.toLowerCase() === mode;
          return (
            <div
              key={m}
              style={{
                padding: "2px 10px",
                borderRadius: 6,
                background: a ? tk.wh : "none",
                border: a ? `0.5px solid ${tk.bd}` : "none",
                fontSize: 9,
                fontWeight: a ? 500 : 400,
                color: a ? tk.t1 : tk.t4,
                cursor: "pointer",
              }}
            >
              {m}
            </div>
          );
        })}
      </div>
    )}
    <Btn lbl="☰" sec style={{ height: 26, width: 36, fontSize: 12 }} />
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// ALL SCREENS
// ════════════════════════════════════════════════════════════════════════════

const DashMob = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Good morning, Hana ☀" />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div
          style={{
            background: tk.s2,
            padding: "16px 0 18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Companion size={84} />
          <Bubble text="Hey Hana! Ready to grow today? 🌱" />
        </div>
        <div style={{ display: "flex", gap: 8, padding: "10px 14px" }}>
          <SC label="Streak" val="12" sub="days" />
          <SC label="Study time" val="4.2h" />
          <SC label="Words" val="184" />
        </div>
        <div
          style={{
            margin: "0 14px 10px",
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <Lbl c="Word stages" />
          <StageBar />
        </div>
        <div style={{ margin: "0 14px 10px" }}>
          <DueTodayCard />
        </div>
        <div style={{ display: "flex", gap: 8, padding: "0 14px 10px" }}>
          <QCard label="Add words" sub="184 total" />
          <QCard label="Read" sub="generate →" />
          <QCard label="Library" sub="browse →" />
        </div>
        <div style={{ margin: "0 14px 12px" }}>
          <WordOfDay />
        </div>
      </div>
      <MobBottomNav active={0} />
    </Phone>
  </Wrap>
);
const DashDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Dashboard" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TBar title="Good morning, Hana ☀" action="+ Add words" />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div
              style={{
                height: 220,
                background: tk.s2,
                padding: "16px 18px",
                display: "flex",
                gap: 14,
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 188,
                  background: tk.s3,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <Companion size={74} />
                <Bubble text="Hey Hana! 🌱" style={{ fontSize: 9 }} />
                <span
                  style={{
                    fontSize: 8,
                    color: tk.t4,
                    fontStyle: "italic",
                    textAlign: "center",
                    padding: "0 10px",
                  }}
                >
                  wanders · nudges board
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 14,
                  padding: "14px 16px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 0,
                }}
              >
                <Lbl c="Today" />
                <DueTodayCard />
                <Lbl c="Word stages" style={{ marginTop: 2 }} />
                <StageBar />
              </div>
            </div>
            <div style={{ padding: "12px 18px 10px" }}>
              <Lbl c="Quick actions" />
              <div style={{ display: "flex", gap: 10 }}>
                <QCard label="Add words" sub="184 total" />
                <QCard label="Study" sub="24 due" />
                <QCard label="Read" sub="→" />
                <QCard label="Documents" sub="3 docs" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "0 18px 16px",
                alignItems: "stretch",
              }}
            >
              <WordOfDay size={20} style={{ flex: 2 }} />
              <div
                style={{
                  flex: 1,
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <Lbl c="Last session" />
                <div style={{ fontSize: 10, color: tk.t4, marginBottom: 4 }}>
                  Yesterday · Translation
                </div>
                <div style={{ fontSize: 22, fontWeight: 500, color: tk.t1 }}>
                  18{" "}
                  <span style={{ fontSize: 12, fontWeight: 400, color: tk.t3 }}>
                    correct
                  </span>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <Lbl c="This week" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 4,
                    height: 48,
                    marginTop: 8,
                  }}
                >
                  {[18, 32, 42, 26, 38, 50, 14].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}px`,
                        borderRadius: "3px 3px 0 0",
                        background: i === 5 ? tk.s4 : tk.s3,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: 4,
                  }}
                >
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span
                      key={i}
                      style={{ fontSize: 8, color: i === 5 ? tk.t2 : tk.t4 }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const AWMob = () => {
  const [t, sT] = useState("Type");
  return (
    <Wrap>
      <Phone>
        <MobTopBar title="Good morning, Hana ☀" />
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <DimMob />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(30,26,20,0.28)",
            }}
          />
          <Drawer tab={t} setTab={sT} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: PBN,
              background: tk.s1,
              borderTop: `0.5px solid ${tk.bd}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {["Home", "Library", "Study", "Read", "Docs"].map((n, i) => (
              <span
                key={n}
                style={{
                  fontSize: 10,
                  color: i === 0 ? tk.t1 : tk.t4,
                  fontWeight: i === 0 ? 500 : 400,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </Phone>
    </Wrap>
  );
};
const AWMobV = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Good morning, Hana ☀" />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <DimMob op={0.25} />
        <Scrim>
          <VOverlay />
        </Scrim>
      </div>
      <MobBottomNav active={0} />
    </Phone>
  </Wrap>
);
const AWDesk = () => {
  const [t, sT] = useState("Type");
  return (
    <Wrap>
      <DeskFrame>
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DSidebar active="Dashboard" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <TBar title="Good morning, Hana ☀" action="+ Add words" />
            <DimDesk />
            <Scrim top={DTB}>
              <Modal tab={t} setTab={sT} />
            </Scrim>
          </div>
        </div>
      </DeskFrame>
    </Wrap>
  );
};
const AWDeskV = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Dashboard" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TBar title="Good morning, Hana ☀" action="+ Add words" />
          <DimDesk />
          <Scrim top={DTB}>
            <VOverlay w={360} />
          </Scrim>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const VFMobL = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Verifying words" />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <VLoading />
      </div>
      <MobBottomNav />
    </Phone>
  </Wrap>
);
const VFMobR = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Review words" right="1 of 3" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <VReview />
      </div>
      <MobBottomNav />
    </Phone>
  </Wrap>
);
const VFMobD = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Done" />
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <VDone />
      </div>
      <MobBottomNav />
    </Phone>
  </Wrap>
);
const VFDeskWrap = ({ title, card }) => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Dashboard" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TBar title={title} />
          <DimDesk />
          <Scrim top={DTB}>{card}</Scrim>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const VFDeskL = () => (
  <VFDeskWrap title="Verifying words" card={<VLoading w={380} />} />
);
const VFDeskR = () => (
  <VFDeskWrap title="Review words — 1 of 3" card={<VReview w={420} />} />
);
const VFDeskD = () => <VFDeskWrap title="Done" card={<VDone w={320} />} />;

const WLDeskList = () => {
  const [v, sV] = useState("list");
  return (
    <Wrap>
      <DeskFrame>
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DSidebar active="Library" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <LibTopBar view={v} setView={sV} />
            <LibSearch />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {WORDS.map((w, i) => (
                <WRow key={w.w} w={w} last={i === WORDS.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </DeskFrame>
    </Wrap>
  );
};
const WLDeskCards = () => {
  const [v, sV] = useState("grid");
  return (
    <Wrap>
      <DeskFrame>
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DSidebar active="Library" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <LibTopBar view={v} setView={sV} />
            <LibSearch />
            <div style={{ flex: 1, overflowY: "auto", padding: "12px 18px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 10,
                }}
              >
                {WORDS.map((w) => (
                  <WCard key={w.w} w={w} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DeskFrame>
    </Wrap>
  );
};
const WLDeskDL = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Library" />
        <div
          style={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            borderRight: `0.5px solid ${tk.bd}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              height: DTB,
              background: tk.s1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              justifyContent: "space-between",
              borderBottom: `0.5px solid ${tk.bd}`,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
              Word Library
            </span>
            <VToggle active="list" />
          </div>
          <div
            style={{
              padding: "8px 12px",
              borderBottom: `0.5px solid ${tk.bd}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: 28,
                borderRadius: 7,
                background: tk.s1,
                border: `0.8px solid ${tk.bd}`,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 10,
                color: tk.t4,
              }}
            >
              ⌕ Search...
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {WORDS.map((w) => (
              <div
                key={w.w}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  borderBottom: `0.5px solid ${tk.bd}`,
                  background: w.w === "die Straße" ? tk.s2 : "none",
                }}
              >
                <SDot s={w.s} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: w.w === "die Straße" ? 500 : 400,
                      color: tk.t0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {w.w}
                  </div>
                  <div style={{ fontSize: 9, color: tk.t3 }}>{w.tr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DetailPanel />
      </div>
    </DeskFrame>
  </Wrap>
);
const WLDeskDC = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Library" />
        <div
          style={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            borderRight: `0.5px solid ${tk.bd}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              height: DTB,
              background: tk.s1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              justifyContent: "space-between",
              borderBottom: `0.5px solid ${tk.bd}`,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
              Word Library
            </span>
            <VToggle active="grid" />
          </div>
          <div
            style={{
              padding: "8px 10px",
              borderBottom: `0.5px solid ${tk.bd}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: 26,
                borderRadius: 7,
                background: tk.s1,
                border: `0.8px solid ${tk.bd}`,
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 9,
                color: tk.t4,
              }}
            >
              ⌕ Search...
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
              }}
            >
              {WORDS.map((w) => (
                <MiniWCard key={w.w} w={w} sel={w.w === "die Straße"} />
              ))}
            </div>
          </div>
        </div>
        <DetailPanel />
      </div>
    </DeskFrame>
  </Wrap>
);
const WLMobList = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Word Library" />
      <div
        style={{
          padding: "8px 14px 6px",
          background: tk.wh,
          borderBottom: `0.5px solid ${tk.bd}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: 32,
            borderRadius: 9,
            background: tk.s1,
            border: `0.8px solid ${tk.bd}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            marginBottom: 6,
            fontSize: 10,
            color: tk.t4,
          }}
        >
          ⌕ Search...
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 5, flex: 1 }}>
            {["Stage ∨", "Type ∨", "Sort ∨"].map((f) => (
              <div
                key={f}
                style={{
                  height: 22,
                  borderRadius: 6,
                  background: tk.s1,
                  border: `0.6px solid ${tk.bd}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  fontSize: 9,
                  color: tk.t3,
                  cursor: "default",
                  flexShrink: 0,
                }}
              >
                {f}
              </div>
            ))}
          </div>
          <VToggle active="list" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {WORDS.map((wo, i) => (
          <div
            key={wo.w}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderBottom:
                i < WORDS.length - 1 ? `0.5px solid ${tk.bd}` : "none",
            }}
          >
            <SDot s={wo.s} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500, color: tk.t0 }}>
                  {wo.w}
                </span>
                <GPill g={wo.g} />
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: tk.t2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {wo.tr}
              </div>
            </div>
            <Due due={wo.due} />
          </div>
        ))}
      </div>
      <MobBottomNav active={1} />
    </Phone>
  </Wrap>
);
const WLMobCards = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Word Library" />
      <div
        style={{
          padding: "8px 14px 6px",
          background: tk.wh,
          borderBottom: `0.5px solid ${tk.bd}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: 32,
            borderRadius: 9,
            background: tk.s1,
            border: `0.8px solid ${tk.bd}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            marginBottom: 6,
            fontSize: 10,
            color: tk.t4,
          }}
        >
          ⌕ Search...
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 5, flex: 1 }}>
            {["Stage ∨", "Type ∨", "Sort ∨"].map((f) => (
              <div
                key={f}
                style={{
                  height: 22,
                  borderRadius: 6,
                  background: tk.s1,
                  border: `0.6px solid ${tk.bd}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  fontSize: 9,
                  color: tk.t3,
                  cursor: "default",
                  flexShrink: 0,
                }}
              >
                {f}
              </div>
            ))}
          </div>
          <VToggle active="grid" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          {WORDS.map((wo) => (
            <WCard key={wo.w} w={wo} />
          ))}
        </div>
      </div>
      <MobBottomNav active={1} />
    </Phone>
  </Wrap>
);
const WLMobDet = () => (
  <Wrap>
    <Phone>
      <MobTopBar back="Library" right="Edit" />
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        <WordDetail />
      </div>
      <MobBottomNav active={1} />
    </Phone>
  </Wrap>
);

const StCfgMob = () => {
  const [t, sT] = useState("Auto");
  return (
    <Wrap>
      <Phone>
        <MobTopBar title="Study" />
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: tk.t1,
              marginBottom: 4,
            }}
          >
            What do you want to study?
          </div>
          <div style={{ fontSize: 10, color: tk.t3, marginBottom: 16 }}>
            Choose a mode to begin
          </div>
          <StudyBTabs active={t} onChange={sT} />
          <StudyTabContent tab={t} />
        </div>
        <MobBottomNav active={2} />
      </Phone>
    </Wrap>
  );
};
const StCfgDesk = () => {
  const [t, sT] = useState("By tag");
  return (
    <Wrap>
      <DeskFrame>
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <DSidebar active="Study" />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <TBar title="Study Session" />
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
              }}
            >
              <div style={{ width: "100%", maxWidth: 480 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: tk.t1,
                    marginBottom: 4,
                  }}
                >
                  What do you want to study?
                </div>
                <div style={{ fontSize: 10, color: tk.t3, marginBottom: 18 }}>
                  Choose a mode to begin
                </div>
                <StudyBTabs active={t} onChange={sT} />
                <StudyTabContent tab={t} />
              </div>
            </div>
          </div>
        </div>
      </DeskFrame>
    </Wrap>
  );
};
const StSCMob = () => (
  <MobEx>
    <WordDisplay
      word="der Hund"
      chips={
        <>
          <GPill g="der" />
          <TChip t="noun" />
        </>
      }
    />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 16,
      }}
    >
      WHAT DOES THIS MEAN?
    </div>
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flex: 1,
      }}
    >
      <OptionBtn label="dog" state="selected" />
      <OptionBtn label="cat" />
      <OptionBtn label="horse" />
      <OptionBtn label="bird" />
    </div>
    <StudySkip />
  </MobEx>
);
const StSCDesk = () => (
  <DeskEx>
    <WordDisplay
      word="der Hund"
      chips={
        <>
          <GPill g="der" />
          <TChip t="noun" />
        </>
      }
    />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 20,
      }}
    >
      WHAT DOES THIS MEAN?
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginBottom: 16,
      }}
    >
      <OptionBtn label="dog" state="selected" />
      <OptionBtn label="cat" />
      <OptionBtn label="horse" />
      <OptionBtn label="bird" />
    </div>
    <StudySkip />
  </DeskEx>
);
const StMCMob = () => (
  <MobEx>
    <WordDisplay word="Tiere" chips={<TChip t="noun · plural" />} />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 16,
      }}
    >
      SELECT ALL ANIMALS
    </div>
    <div
      style={{
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        flex: 1,
      }}
    >
      <OptionBtn label="dog" state="selected" checkbox />
      <OptionBtn label="table" checkbox />
      <OptionBtn label="cat" state="selected" checkbox />
      <OptionBtn label="house" checkbox />
    </div>
    <div style={{ padding: "12px 16px 16px" }}>
      <Btn lbl="Confirm selection" style={{ width: "100%" }} />
    </div>
  </MobEx>
);
const StMCDesk = () => (
  <DeskEx>
    <WordDisplay word="Tiere" chips={<TChip t="noun · plural" />} />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 20,
      }}
    >
      SELECT ALL ANIMALS
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <OptionBtn label="dog" state="selected" checkbox />
      <OptionBtn label="table" checkbox />
      <OptionBtn label="cat" state="selected" checkbox />
      <OptionBtn label="house" checkbox />
    </div>
    <Btn lbl="Confirm selection" style={{ width: "100%" }} />
  </DeskEx>
);
const StTrMob = () => (
  <MobEx>
    <WordDisplay
      word="der Hund"
      chips={
        <>
          <GPill g="der" />
          <TChip t="noun" />
        </>
      }
    />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 16,
      }}
    >
      TRANSLATE TO INDONESIAN
    </div>
    <div
      style={{
        padding: "0 16px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Fld ph="Type your answer..." style={{ height: 44, fontSize: 13 }} />
      <Btn lbl="Submit" />
      <StudyHint />
    </div>
    <StudySkip />
  </MobEx>
);
const StTrDesk = () => (
  <DeskEx>
    <WordDisplay
      word="der Hund"
      chips={
        <>
          <GPill g="der" />
          <TChip t="noun" />
        </>
      }
    />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 20,
      }}
    >
      TRANSLATE TO INDONESIAN
    </div>
    <Fld
      ph="Type your answer..."
      style={{ height: 44, fontSize: 13, marginBottom: 12 }}
    />
    <Btn lbl="Submit" style={{ width: "100%", marginBottom: 10 }} />
    <StudyHint />
  </DeskEx>
);
const StRvMob = () => (
  <MobEx>
    <WordDisplay word="anjing" hint="INDONESIAN → GERMAN" />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 16,
      }}
    >
      WHAT IS THIS IN GERMAN?
    </div>
    <div
      style={{
        padding: "0 16px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Fld ph="Type in German..." style={{ height: 44, fontSize: 13 }} />
      <Btn lbl="Submit" />
      <StudyHint />
    </div>
    <StudySkip />
  </MobEx>
);
const StRvDesk = () => (
  <DeskEx>
    <WordDisplay word="anjing" hint="INDONESIAN → GERMAN" />
    <div
      style={{
        fontSize: 9,
        color: tk.t4,
        textAlign: "center",
        letterSpacing: "0.09em",
        marginBottom: 20,
      }}
    >
      WHAT IS THIS IN GERMAN?
    </div>
    <Fld
      ph="Type in German..."
      style={{ height: 44, fontSize: 13, marginBottom: 12 }}
    />
    <Btn lbl="Submit" style={{ width: "100%", marginBottom: 10 }} />
    <StudyHint />
  </DeskEx>
);
const StMtMob = () => (
  <MobEx>
    <div style={{ padding: "16px 16px 10px", textAlign: "center" }}>
      <div
        style={{
          fontSize: 9,
          color: tk.t4,
          letterSpacing: "0.09em",
          marginBottom: 6,
        }}
      >
        MATCH ALL 4 PAIRS
      </div>
      <div style={{ fontSize: 10, color: tk.t3 }}>Tap a word on each side</div>
    </div>
    <div style={{ flex: 1, padding: "0 16px", display: "flex", gap: 10 }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        {[
          ["der Hund", "matched"],
          ["die Katze", "selected"],
          ["essen", "idle"],
          ["schnell", "idle"],
        ].map(([w, s]) => (
          <MatchBtn key={w} label={w} state={s} />
        ))}
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        {[
          ["makan", "idle"],
          ["anjing", "matched"],
          ["cepat", "idle"],
          ["kucing", "idle"],
        ].map(([w, s]) => (
          <MatchBtn key={w} label={w} state={s} />
        ))}
      </div>
    </div>
    <StudySkip />
  </MobEx>
);
const StMtDesk = () => (
  <DeskEx>
    <div style={{ textAlign: "center", padding: "0 0 20px" }}>
      <div
        style={{
          fontSize: 9,
          color: tk.t4,
          letterSpacing: "0.09em",
          marginBottom: 6,
        }}
      >
        MATCH ALL 4 PAIRS
      </div>
      <div style={{ fontSize: 10, color: tk.t3 }}>
        Click a word on each side to connect
      </div>
    </div>
    <div style={{ display: "flex", gap: 14 }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}
      >
        {[
          ["der Hund", "matched"],
          ["die Katze", "selected"],
          ["essen", "idle"],
          ["schnell", "idle"],
        ].map(([w, s]) => (
          <MatchBtn key={w} label={w} state={s} />
        ))}
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}
      >
        {[
          ["makan", "idle"],
          ["anjing", "matched"],
          ["cepat", "idle"],
          ["kucing", "idle"],
        ].map(([w, s]) => (
          <MatchBtn key={w} label={w} state={s} />
        ))}
      </div>
    </div>
    <StudySkip />
  </DeskEx>
);
const StEndMob = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Session complete" />
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 16px",
        }}
      >
        <Companion size={68} mood="🎉" />
        <Bubble
          text="Luar biasa, Hana! You're on fire 🔥"
          style={{ marginTop: 10, marginBottom: 20, textAlign: "center" }}
        />
        <div
          style={{
            width: "100%",
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 14,
            padding: "16px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: tk.t1,
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            18 correct
          </div>
          <div
            style={{
              fontSize: 10,
              color: tk.t3,
              textAlign: "center",
              marginBottom: 14,
            }}
          >
            out of 20 words reviewed
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <SC label="Time" val="8m" />
            <SC label="Streak" val="🔥 4" />
            <SC label="Revisit" val="2" />
          </div>
        </div>
        <Btn lbl="Study more" style={{ width: "100%", marginBottom: 10 }} />
        <Btn lbl="Back to dashboard" sec style={{ width: "100%" }} />
      </div>
      <MobBottomNav active={2} />
    </Phone>
  </Wrap>
);
const StEndDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Study" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TBar title="Session complete" />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <div style={{ width: "100%", maxWidth: 440 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Companion size={64} mood="🎉" />
                <Bubble
                  text="Luar biasa, Hana! You're on fire 🔥"
                  style={{ marginTop: 10, textAlign: "center" }}
                />
              </div>
              <div
                style={{
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 14,
                  padding: "20px",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 500,
                    color: tk.t1,
                    textAlign: "center",
                    marginBottom: 4,
                  }}
                >
                  18 correct
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: tk.t3,
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  out of 20 words reviewed
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <SC label="Session time" val="8m" />
                  <SC label="Streak" val="🔥 4" />
                  <SC label="To revisit" val="2" />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn lbl="Study more" style={{ flex: 1 }} />
                <Btn lbl="Back to dashboard" sec style={{ flex: 1 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const RdMobLib = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Reading" />
      <div
        style={{
          padding: "10px 14px 8px",
          background: tk.wh,
          borderBottom: `0.5px solid ${tk.bd}`,
          flexShrink: 0,
          display: "flex",
          gap: 8,
        }}
      >
        <Btn
          lbl="Paste / Upload"
          sec
          style={{ flex: 1, height: 30, fontSize: 10 }}
        />
        <Btn lbl="✦ Generate" style={{ flex: 1, height: 30, fontSize: 10 }} />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {TEXTS.map((t) => (
          <TCard key={t.title} t={t} />
        ))}
      </div>
      <MobBottomNav active={3} />
    </Phone>
  </Wrap>
);
const RdDeskLib = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Read" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: DTB,
              background: tk.s1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              justifyContent: "space-between",
              borderBottom: `0.5px solid ${tk.bd}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: tk.t1 }}>
              Reading
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn
                lbl="Paste / Upload"
                sec
                style={{ height: 30, fontSize: 10, width: 120 }}
              />
              <Btn
                lbl="✦ Generate"
                style={{ height: 30, fontSize: 10, width: 110 }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
            <Lbl c="Recent texts" style={{ marginBottom: 10 }} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 10,
              }}
            >
              {TEXTS.map((t) => (
                <TCard key={t.title} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const RdMobWT = () => (
  <Wrap>
    <Phone>
      <RdMobBar title="Tiere im Park" />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 16px 200px",
            overflowY: "auto",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: tk.t0,
              marginBottom: 3,
            }}
          >
            Tiere im Park
          </div>
          <div style={{ fontSize: 9, color: tk.t4, marginBottom: 14 }}>
            Apr 17 · 48 words
          </div>
          <ReadingText wordTap="Hund" />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: tk.wh,
            borderRadius: "16px 16px 0 0",
            border: `0.8px solid ${tk.bd}`,
            borderBottom: "none",
            padding: "14px 16px 20px",
          }}
        >
          <div
            style={{
              width: 52,
              height: 4,
              background: tk.s2,
              borderRadius: 2,
              margin: "0 auto 14px",
            }}
          />
          <WordPopup />
        </div>
      </div>
    </Phone>
  </Wrap>
);
const RdDeskWT = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Read" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <RdDeskBar title="Tiere im Park" />
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div
              style={{
                flex: 1,
                padding: "20px 28px",
                overflowY: "auto",
                borderRight: `0.5px solid ${tk.bd}`,
              }}
            >
              <ReadingText wordTap="Hund" />
            </div>
            <div
              style={{
                width: 240,
                padding: "16px 18px",
                overflowY: "auto",
                flexShrink: 0,
              }}
            >
              <WordPopup />
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const RdMobST = () => (
  <Wrap>
    <Phone>
      <RdMobBar title="Tiere im Park" />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            padding: "14px 16px 220px",
            overflowY: "auto",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: tk.t0,
              marginBottom: 3,
            }}
          >
            Tiere im Park
          </div>
          <div style={{ fontSize: 9, color: tk.t4, marginBottom: 14 }}>
            Apr 17 · 48 words
          </div>
          <ReadingText sentTap />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: tk.wh,
            borderRadius: "16px 16px 0 0",
            border: `0.8px solid ${tk.bd}`,
            borderBottom: "none",
            padding: "14px 16px 20px",
          }}
        >
          <div
            style={{
              width: 52,
              height: 4,
              background: tk.s2,
              borderRadius: 2,
              margin: "0 auto 14px",
            }}
          />
          <SentPopup />
        </div>
      </div>
    </Phone>
  </Wrap>
);
const RdDeskST = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Read" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <RdDeskBar title="Tiere im Park" />
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div
              style={{
                flex: 1,
                padding: "20px 28px",
                overflowY: "auto",
                borderRight: `0.5px solid ${tk.bd}`,
              }}
            >
              <ReadingText sentTap />
            </div>
            <div
              style={{
                width: 240,
                padding: "16px 18px",
                overflowY: "auto",
                flexShrink: 0,
              }}
            >
              <SentPopup />
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const DcMobLib = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Documents" />
      <div
        style={{
          padding: "10px 14px 8px",
          background: tk.wh,
          borderBottom: `0.5px solid ${tk.bd}`,
          flexShrink: 0,
          display: "flex",
          gap: 8,
        }}
      >
        <Btn
          lbl="Upload PDF"
          sec
          style={{ flex: 1, height: 30, fontSize: 10 }}
        />
        <Btn lbl="New document" style={{ flex: 1, height: 30, fontSize: 10 }} />
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {DOCS.map((d) => (
          <DocCard key={d.title} d={d} />
        ))}
      </div>
      <MobBottomNav active={4} />
    </Phone>
  </Wrap>
);
const DcDeskLib = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Documents" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: DTB,
              background: tk.s1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              justifyContent: "space-between",
              borderBottom: `0.5px solid ${tk.bd}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500, color: tk.t1 }}>
              Documents
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn
                lbl="Upload PDF"
                sec
                style={{ height: 30, fontSize: 10, width: 100 }}
              />
              <Btn
                lbl="New document"
                style={{ height: 30, fontSize: 10, width: 120 }}
              />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 10,
              }}
            >
              {DOCS.map((d) => (
                <DocCard key={d.title} d={d} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const DcMobPDF = () => (
  <Wrap>
    <Phone>
      <DocMobBar title="Grammatik Übersicht" type="pdf" mode="read" />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px 14px 220px",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <PDFPage pg={2} />
        </div>
        <AnnotSheet />
      </div>
      <MobBottomNav active={4} />
    </Phone>
  </Wrap>
);
const DcDeskPDF = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Documents" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <DocReaderBar title="Grammatik Übersicht" type="pdf" mode="read" />
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 40px",
                background: "#f0ede6",
              }}
            >
              <PDFPage pg={2} />
              <PDFPage pg={3} />
            </div>
            <AnnotPanel />
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const DcMobEdit = () => (
  <Wrap>
    <Phone>
      <DocMobBar title="Kapitel 3 — Verben" type="rich" mode="edit" />
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        <RichContent editing />
      </div>
      <MobBottomNav active={4} />
    </Phone>
  </Wrap>
);
const DcDeskEdit = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Documents" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <DocReaderBar title="Kapitel 3 — Verben" type="rich" mode="edit" />
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 60px" }}>
              <RichContent editing />
            </div>
            <AnnotPanel />
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const DcMobRead = () => (
  <Wrap>
    <Phone>
      <DocMobBar title="Kapitel 3 — Verben" type="rich" mode="read" />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "14px 16px 220px",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <RichContent editing={false} />
        </div>
        <AnnotSheet />
      </div>
      <MobBottomNav active={4} />
    </Phone>
  </Wrap>
);
const DcDeskRead = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Documents" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <DocReaderBar title="Kapitel 3 — Verben" type="rich" mode="read" />
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 60px" }}>
              <RichContent editing={false} />
            </div>
            <AnnotPanel />
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

// ── Login & Register ─────────────────────────────────────────────────────────
const AuthForm = ({ title, sub, fields, btnLabel, footer }) => (
  <div style={{ padding: "28px 20px" }}>
    <div style={{ textAlign: "center", marginBottom: 24 }}>
      <div
        style={{ fontSize: 20, fontWeight: 600, color: tk.t0, marginBottom: 4 }}
      >
        GermanLern
      </div>
      <div style={{ fontSize: 11, color: tk.t3 }}>{sub}</div>
    </div>
    {fields.map((f) => (
      <div key={f.label} style={{ marginBottom: 12 }}>
        <Lbl c={f.label} />
        <Fld ph={f.ph} style={{ cursor: "text" }} />
      </div>
    ))}
    <Btn
      lbl={btnLabel}
      style={{ width: "100%", marginTop: 8, marginBottom: 14 }}
    />
    <div style={{ textAlign: "center", fontSize: 10, color: tk.t3 }}>
      {footer}
    </div>
  </div>
);
const loginFields = [
  { label: "Email", ph: "you@example.com" },
  { label: "Password", ph: "••••••••" },
];
const regFields = [
  { label: "Email", ph: "you@example.com" },
  { label: "Password", ph: "••••••••" },
  { label: "Confirm password", ph: "••••••••" },
];
const loginFooter = (
  <span>
    Don't have an account?{" "}
    <span style={{ color: tk.t1, fontWeight: 500, cursor: "pointer" }}>
      Register
    </span>
  </span>
);
const regFooter = (
  <span>
    Already have an account?{" "}
    <span style={{ color: tk.t1, fontWeight: 500, cursor: "pointer" }}>
      Sign in
    </span>
  </span>
);
const LoginMob = () => (
  <Wrap>
    <Phone>
      <div
        style={{
          flex: 1,
          ...DOT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            margin: "0 16px",
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 16,
          }}
        >
          <AuthForm
            sub="Welcome back"
            fields={loginFields}
            btnLabel="Sign in"
            footer={loginFooter}
          />
        </div>
      </div>
    </Phone>
  </Wrap>
);
const LoginDesk = () => (
  <Wrap>
    <DeskFrame>
      <div
        style={{
          flex: 1,
          ...DOT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 340,
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(42,38,32,0.08)",
          }}
        >
          <AuthForm
            sub="Welcome back"
            fields={loginFields}
            btnLabel="Sign in"
            footer={loginFooter}
          />
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);
const RegMob = () => (
  <Wrap>
    <Phone>
      <div
        style={{
          flex: 1,
          ...DOT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            margin: "0 16px",
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 16,
          }}
        >
          <AuthForm
            sub="Create your account"
            fields={regFields}
            btnLabel="Create account"
            footer={regFooter}
          />
        </div>
      </div>
    </Phone>
  </Wrap>
);
const RegDesk = () => (
  <Wrap>
    <DeskFrame>
      <div
        style={{
          flex: 1,
          ...DOT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 340,
            background: tk.wh,
            border: `0.8px solid ${tk.bd}`,
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(42,38,32,0.08)",
          }}
        >
          <AuthForm
            sub="Create your account"
            fields={regFields}
            btnLabel="Create account"
            footer={regFooter}
          />
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

// ── Companion Introduction ───────────────────────────────────────────────────
const ProgressDots = ({ total, current }) => (
  <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 4,
          background: i === current ? tk.btn : tk.s3,
          transition: "all 0.2s",
        }}
      />
    ))}
  </div>
);
const ChatBubble = ({ text }) => (
  <div
    style={{
      background: tk.wh,
      border: `0.8px solid ${tk.bd}`,
      borderRadius: "14px 14px 14px 4px",
      padding: "12px 16px",
      fontSize: 11,
      color: tk.t1,
      lineHeight: 1.6,
      maxWidth: 280,
      boxShadow: "0 2px 8px rgba(42,38,32,0.06)",
    }}
  >
    {text}
  </div>
);
const OnbPill = ({ label, active, onClick }) => (
  <span
    onClick={onClick}
    style={{
      height: 32,
      borderRadius: 20,
      padding: "0 16px",
      background: active ? tk.btn : tk.s1,
      border: `0.5px solid ${active ? tk.btn : tk.bd}`,
      display: "inline-flex",
      alignItems: "center",
      fontSize: 11,
      color: active ? "#fff" : tk.t2,
      cursor: "pointer",
      fontWeight: active ? 500 : 400,
    }}
  >
    {label}
  </span>
);
const GoalCard = ({ v, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      flex: 1,
      padding: "14px 10px",
      borderRadius: 12,
      background: active ? tk.btn : tk.s1,
      border: `0.8px solid ${active ? tk.btn : tk.bd}`,
      textAlign: "center",
      cursor: "pointer",
    }}
  >
    <div
      style={{
        fontSize: 20,
        fontWeight: 500,
        color: active ? "#fff" : tk.t1,
        marginBottom: 2,
      }}
    >
      {v}
    </div>
    <div
      style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.7)" : tk.t4 }}
    >
      {label}
    </div>
  </div>
);

const CompanionIntroContent = ({
  step,
  name,
  lang,
  goal,
  setLang,
  setGoal,
}) => {
  const bubbles = [
    "Hi! I'm here to help you learn German.\nWhat would you like to call me?",
    "Got it, " +
      (name || "friend") +
      "! What language should I translate German words into?",
    "Perfect! How many new words do you want to learn each day?",
  ];
  const langs = ["Indonesian", "English", "Other"];
  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <div
        style={{
          width: "40%",
          background: tk.s2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          flexShrink: 0,
          padding: 20,
          borderRight: `0.5px solid ${tk.bd}`,
        }}
      >
        <Companion size={140} />
        <div
          style={{
            fontSize: 9,
            color: tk.t4,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          your companion
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "32px 28px",
          overflow: "auto",
        }}
      >
        <ProgressDots total={3} current={step} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <ChatBubble text={bubbles[step]} />
          <div style={{ paddingLeft: 8 }}>
            {step === 0 && (
              <>
                <Fld
                  ph="e.g. Luna, Birdy, Hans..."
                  style={{ marginBottom: 16, cursor: "text", maxWidth: 260 }}
                />
                <Btn lbl="Next →" style={{ width: 260 }} />
              </>
            )}
            {step === 1 && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  {langs.map((l) => (
                    <OnbPill
                      key={l}
                      label={l}
                      active={lang === l}
                      onClick={() => setLang(l)}
                    />
                  ))}
                </div>
                <Btn lbl="Next →" style={{ width: 260 }} />
              </>
            )}
            {step === 2 && (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20,
                    maxWidth: 300,
                  }}
                >
                  <GoalCard
                    v={5}
                    label="words/day"
                    active={goal === 5}
                    onClick={() => setGoal(5)}
                  />
                  <GoalCard
                    v={10}
                    label="words/day"
                    active={goal === 10}
                    onClick={() => setGoal(10)}
                  />
                  <GoalCard
                    v={20}
                    label="words/day"
                    active={goal === 20}
                    onClick={() => setGoal(20)}
                  />
                </div>
                <Btn lbl="Let's go!" style={{ width: 260 }} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const CompanionIntroMobContent = ({
  step,
  name,
  lang,
  goal,
  setLang,
  setGoal,
}) => {
  const bubbles = [
    "Hi! I'm here to help you learn German.\nWhat would you like to call me?",
    "Got it, " +
      (name || "friend") +
      "! What language should I translate German words into?",
    "Perfect! How many new words do you want to learn each day?",
  ];
  const langs = ["Indonesian", "English", "Other"];
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "12px 16px", flexShrink: 0 }}>
        <ProgressDots total={3} current={step} />
        <div style={{ marginTop: 10 }}>
          <ChatBubble text={bubbles[step]} />
        </div>
        <div style={{ paddingLeft: 4, marginTop: 12 }}>
          {step === 0 && (
            <>
              <Fld
                ph="e.g. Luna, Birdy, Hans..."
                style={{ marginBottom: 12, cursor: "text" }}
              />
              <Btn lbl="Next →" style={{ width: "100%" }} />
            </>
          )}
          {step === 1 && (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 12,
                }}
              >
                {langs.map((l) => (
                  <OnbPill
                    key={l}
                    label={l}
                    active={lang === l}
                    onClick={() => setLang(l)}
                  />
                ))}
              </div>
              <Btn lbl="Next →" style={{ width: "100%" }} />
            </>
          )}
          {step === 2 && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <GoalCard
                  v={5}
                  label="words/day"
                  active={goal === 5}
                  onClick={() => setGoal(5)}
                />
                <GoalCard
                  v={10}
                  label="words/day"
                  active={goal === 10}
                  onClick={() => setGoal(10)}
                />
                <GoalCard
                  v={20}
                  label="words/day"
                  active={goal === 20}
                  onClick={() => setGoal(20)}
                />
              </div>
              <Btn lbl="Let's go!" style={{ width: "100%" }} />
            </>
          )}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: tk.s2,
          borderTop: `0.5px solid ${tk.bd}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Companion size={200} />
      </div>
    </div>
  );
};
const CompIntroDesk = () => {
  const [step] = useState(0);
  const [name] = useState("");
  const [lang, setLang] = useState("Indonesian");
  const [goal, setGoal] = useState(10);
  return (
    <Wrap>
      <DeskFrame>
        <CompanionIntroContent
          step={step}
          name={name}
          lang={lang}
          goal={goal}
          setLang={setLang}
          setGoal={setGoal}
        />
      </DeskFrame>
    </Wrap>
  );
};
const CompIntroMob = () => {
  const [step] = useState(0);
  const [name] = useState("");
  const [lang, setLang] = useState("Indonesian");
  const [goal, setGoal] = useState(10);
  return (
    <Wrap>
      <Phone>
        <div
          style={{
            height: 44,
            background: tk.s1,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: `0.5px solid ${tk.bd}`,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color: tk.t1 }}>
            GermanLern
          </span>
        </div>
        <CompanionIntroMobContent
          step={step}
          name={name}
          lang={lang}
          goal={goal}
          setLang={setLang}
          setGoal={setGoal}
        />
      </Phone>
    </Wrap>
  );
};

// ── In-app Onboarding Tour ───────────────────────────────────────────────────
const TOUR_STEPS_DESK = [
  {
    x: 8,
    y: 58,
    w: 128,
    h: 24,
    title: "Your home base",
    body: "This is where your companion lives and your daily summary waits.",
  },
  {
    x: 8,
    y: 82,
    w: 128,
    h: 24,
    title: "Your word library",
    body: "Every word you add lives here. Search, filter, and review them anytime.",
  },
  {
    x: 560,
    y: 38,
    w: 130,
    h: 30,
    title: "Adding words",
    body: "Tap here to add new German words. Type them, scan a photo, or paste a list.",
  },
  {
    x: 8,
    y: 106,
    w: 128,
    h: 24,
    title: "Study sessions",
    body: "This is where you practice. The app decides what you need most, or you can choose.",
  },
  {
    x: 8,
    y: 130,
    w: 128,
    h: 24,
    title: "Reading module",
    body: "Read German texts and tap any word for an instant translation.",
  },
  {
    x: 8,
    y: 154,
    w: 128,
    h: 24,
    title: "Your documents",
    body: "Store your textbooks, notes, and lecture PDFs here. Annotate and highlight freely.",
  },
  {
    x: DSW + 6,
    y: DCH + DTB + 10,
    w: 180,
    h: 170,
    title: "Your companion",
    body: "This is your companion. They'll cheer you on, answer questions, and track your progress.",
  },
];
const TOUR_STEPS_MOB = [
  {
    x: 0,
    y: PH - PBN,
    w: 68,
    h: PBN,
    title: "Your home base",
    body: "This is where your companion lives and your daily summary waits.",
  },
  {
    x: 68,
    y: PH - PBN,
    w: 68,
    h: PBN,
    title: "Your word library",
    body: "Every word you add lives here. Search, filter, and review them anytime.",
  },
  {
    x: 100,
    y: PSB + 6,
    w: 140,
    h: 32,
    title: "Adding words",
    body: "Tap here to add new German words. Type them, scan a photo, or paste a list.",
  },
  {
    x: 136,
    y: PH - PBN,
    w: 68,
    h: PBN,
    title: "Study sessions",
    body: "This is where you practice. The app decides what you need most, or you can choose.",
  },
  {
    x: 204,
    y: PH - PBN,
    w: 68,
    h: PBN,
    title: "Reading module",
    body: "Read German texts and tap any word for an instant translation.",
  },
  {
    x: 272,
    y: PH - PBN,
    w: 68,
    h: PBN,
    title: "Your documents",
    body: "Store your textbooks, notes, and lecture PDFs here. Annotate and highlight freely.",
  },
  {
    x: 40,
    y: PSB + 44 + 8,
    w: 260,
    h: 120,
    title: "Your companion",
    body: "This is your companion. They'll cheer you on, answer questions, and track your progress.",
  },
];
const InFrameTour = ({
  steps,
  current,
  onNext,
  onPrev,
  onDone,
  frameW,
  frameH,
}) => {
  const s = steps[current];
  const pad = 4;
  const isLast = current === steps.length - 1;
  const tipW = 200,
    tipH = 140;
  let tipX = s.x + s.w + 12,
    tipY = s.y;
  if (tipX + tipW > frameW) tipX = s.x - tipW - 12;
  if (tipX < 4) tipX = s.x;
  if (tipY + tipH > frameH) tipY = frameH - tipH - 8;
  if (tipY < 4) tipY = 4;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      <svg
        width={frameW}
        height={frameH}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <mask id="tour-mask">
            <rect x={0} y={0} width={frameW} height={frameH} fill="white" />
            <rect
              x={s.x - pad}
              y={s.y - pad}
              width={s.w + pad * 2}
              height={s.h + pad * 2}
              rx={8}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x={0}
          y={0}
          width={frameW}
          height={frameH}
          fill="rgba(30,26,20,0.52)"
          mask="url(#tour-mask)"
          style={{ pointerEvents: "auto" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: s.x - pad - 1,
          top: s.y - pad - 1,
          width: s.w + pad * 2 + 2,
          height: s.h + pad * 2 + 2,
          borderRadius: 9,
          border: `2px solid ${tk.s4}`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: tipX,
          top: tipY,
          width: tipW,
          background: tk.wh,
          border: `0.8px solid ${tk.bd}`,
          borderRadius: 12,
          padding: "12px 14px",
          boxShadow: "0 6px 24px rgba(42,38,32,0.16)",
          pointerEvents: "auto",
          zIndex: 21,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: tk.s3,
              border: `1px solid ${tk.s4}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 6, color: tk.t3 }}>3D</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 500, color: tk.t0 }}>
            {s.title}
          </div>
        </div>
        <div
          style={{
            fontSize: 9,
            color: tk.t2,
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {s.body}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 8, color: tk.t4 }}>
            {current + 1} / {steps.length}
          </span>
          <div style={{ display: "flex", gap: 5 }}>
            {current > 0 && (
              <div onClick={onPrev} style={{ cursor: "pointer" }}>
                <Btn
                  lbl="←"
                  sec
                  style={{ height: 24, width: 32, fontSize: 9 }}
                />
              </div>
            )}
            <div
              onClick={isLast ? onDone : onNext}
              style={{ cursor: "pointer" }}
            >
              <Btn
                lbl={isLast ? "Done!" : "Next →"}
                style={{ height: 24, width: 64, fontSize: 9 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TourDeskContent = ({ touring, current, onNext, onPrev, onDone }) => (
  <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
    <DSidebar active="Dashboard" />
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TBar title="Good morning, Hana ☀" action="+ Add words" />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div
          style={{
            height: 220,
            background: tk.s2,
            padding: "16px 18px",
            display: "flex",
            gap: 14,
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 188,
              background: tk.s3,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <Companion size={74} />
            <Bubble text="Hey Hana! 🌱" style={{ fontSize: 9 }} />
          </div>
          <div
            style={{
              flex: 1,
              background: tk.wh,
              border: `0.8px solid ${tk.bd}`,
              borderRadius: 14,
              padding: "14px 16px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minHeight: 0,
            }}
          >
            <Lbl c="Today" />
            <DueTodayCard />
            <Lbl c="Word stages" style={{ marginTop: 2 }} />
            <StageBar />
          </div>
        </div>
        <div style={{ padding: "12px 18px 10px" }}>
          <Lbl c="Quick actions" />
          <div style={{ display: "flex", gap: 10 }}>
            <QCard label="Add words" sub="184 total" />
            <QCard label="Study" sub="24 due" />
            <QCard label="Read" sub="→" />
            <QCard label="Documents" sub="3 docs" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
const TourDeskScreen = () => {
  const [touring, setTouring] = useState(true);
  const [cur, setCur] = useState(0);
  return (
    <Wrap>
      <div
        style={{
          position: "relative",
          width: DW,
          height: DH,
          borderRadius: 10,
          overflow: "hidden",
          border: `1.5px solid ${tk.s3}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: DCH,
            background: tk.s1,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: 8,
            borderBottom: `0.5px solid ${tk.bd}`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: tk.s3,
              }}
            />
          ))}
          <div
            style={{
              flex: 1,
              height: 20,
              borderRadius: 6,
              background: tk.s2,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              margin: "0 20px",
            }}
          >
            <span style={{ fontSize: 10, color: tk.t4 }}>
              germanlern.vercel.app
            </span>
          </div>
        </div>
        <div style={{ display: "flex", height: DH - DCH }}>
          <TourDeskContent />
        </div>
        {touring && (
          <InFrameTour
            steps={TOUR_STEPS_DESK}
            current={cur}
            frameW={DW}
            frameH={DH}
            onNext={() => setCur(cur + 1)}
            onPrev={() => setCur(cur - 1)}
            onDone={() => setTouring(false)}
          />
        )}
      </div>
    </Wrap>
  );
};
const TourMobScreen = () => {
  const [touring, setTouring] = useState(true);
  const [cur, setCur] = useState(0);
  return (
    <Wrap>
      <div
        style={{
          position: "relative",
          width: PW,
          height: PH,
          borderRadius: 28,
          overflow: "hidden",
          border: `2px solid ${tk.s3}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: PSB,
            background: tk.s1,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 10, color: tk.t3 }}>9:41</span>
          <span style={{ fontSize: 9, color: tk.t3 }}>●●●</span>
        </div>
        <MobTopBar title="Good morning, Hana ☀" />
        <div style={{ flex: 1, overflow: "auto", height: PH - PSB - 44 - PBN }}>
          <div
            style={{
              background: tk.s2,
              padding: "16px 0 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Companion size={84} />
            <Bubble text="Hey Hana! Ready to grow today? 🌱" />
          </div>
          <div style={{ display: "flex", gap: 8, padding: "10px 14px" }}>
            <SC label="Streak" val="12" sub="days" />
            <SC label="Study time" val="4.2h" />
            <SC label="Words" val="184" />
          </div>
          <div
            style={{
              margin: "0 14px 10px",
              background: tk.wh,
              border: `0.8px solid ${tk.bd}`,
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <Lbl c="Word stages" />
            <StageBar />
          </div>
          <div style={{ margin: "0 14px 10px" }}>
            <DueTodayCard />
          </div>
        </div>
        <MobBottomNav active={0} />
        {touring && (
          <InFrameTour
            steps={TOUR_STEPS_MOB}
            current={cur}
            frameW={PW}
            frameH={PH}
            onNext={() => setCur(cur + 1)}
            onPrev={() => setCur(cur - 1)}
            onDone={() => setTouring(false)}
          />
        )}
      </div>
    </Wrap>
  );
};

// ── Settings ─────────────────────────────────────────────────────────────────
const SettingSection = ({ children, last }) => (
  <div
    style={{
      paddingBottom: last ? 0 : 18,
      marginBottom: last ? 0 : 18,
      borderBottom: last ? "none" : `0.5px solid ${tk.bd}`,
    }}
  >
    {children}
  </div>
);
const SettingsBody = () => {
  const [lang, setLang] = useState("Indonesian");
  const [goal, setGoal] = useState(10);
  const langs = ["Indonesian", "English"];
  const goals = [5, 10, 20];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <SettingSection>
        <Lbl c="Target language" />
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {langs.map((l) => (
            <span
              key={l}
              style={{
                height: 32,
                borderRadius: 20,
                padding: "0 16px",
                background: lang === l ? tk.btn : tk.s1,
                border: `0.5px solid ${lang === l ? tk.btn : tk.bd}`,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 11,
                color: lang === l ? "#fff" : tk.t2,
                cursor: "pointer",
                fontWeight: lang === l ? 500 : 400,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </SettingSection>
      <SettingSection>
        <Lbl c="Companion name" />
        <Fld val="Luna" style={{ marginTop: 6, maxWidth: 260 }} />
      </SettingSection>
      <SettingSection last>
        <Lbl c="Daily goal" />
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {goals.map((g) => (
            <span
              key={g}
              style={{
                height: 32,
                borderRadius: 20,
                padding: "0 16px",
                background: goal === g ? tk.btn : tk.s1,
                border: `0.5px solid ${goal === g ? tk.btn : tk.bd}`,
                display: "inline-flex",
                alignItems: "center",
                fontSize: 11,
                color: goal === g ? "#fff" : tk.t2,
                cursor: "pointer",
                fontWeight: goal === g ? 500 : 400,
              }}
            >
              {g} words
            </span>
          ))}
        </div>
      </SettingSection>
      <Btn lbl="Save" style={{ width: "100%", marginTop: 24 }} />
    </div>
  );
};
const SettingsMob = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Settings" />
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>
        <SettingsBody />
      </div>
      <MobBottomNav />
    </Phone>
  </Wrap>
);
const SettingsDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Settings" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TBar title="Settings" />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "32px 20px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 480,
                background: tk.wh,
                border: `0.8px solid ${tk.bd}`,
                borderRadius: 14,
                padding: "24px 28px",
              }}
            >
              <SettingsBody />
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

// ── Profile ──────────────────────────────────────────────────────────────────
const ProfileRow = ({ label, val }) => (
  <div style={{ marginBottom: 16 }}>
    <Lbl c={label} />
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Fld val={val} style={{ flex: 1 }} />
      <span
        style={{
          fontSize: 10,
          color: tk.t1,
          fontWeight: 500,
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Change
      </span>
    </div>
  </div>
);
const ProfileBody = () => (
  <div>
    <ProfileRow label="Email" val="hana@example.com" />
    <ProfileRow label="Password" val="••••••••" />
    <div style={{ marginTop: 28 }}>
      <div
        style={{
          height: 34,
          borderRadius: 9,
          background: "transparent",
          border: "0.8px solid #e09090",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 500,
          color: "#a32d2d",
          cursor: "default",
        }}
      >
        Log out
      </div>
    </div>
  </div>
);
const ProfileMob = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Profile" />
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>
        <ProfileBody />
      </div>
      <MobBottomNav />
    </Phone>
  </Wrap>
);
const ProfileDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Profile" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <TBar title="Profile" />
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "32px 20px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 400,
                background: tk.wh,
                border: `0.8px solid ${tk.bd}`,
                borderRadius: 14,
                padding: "24px 28px",
              }}
            >
              <ProfileBody />
            </div>
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

// ── Companion Mini ───────────────────────────────────────────────────────────
const MiniWidget = () => (
  <div
    style={{
      position: "absolute",
      bottom: 20,
      right: 20,
      width: 80,
      height: 80,
      borderRadius: 16,
      background: tk.s2,
      border: `0.8px solid ${tk.bd}`,
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    }}
  >
    <Companion size={52} />
    <div
      style={{
        position: "absolute",
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: tk.s4,
      }}
    />
  </div>
);

const CpCollapsedMob = () => (
  <Wrap>
    <Phone>
      <MobTopBar title="Word Library" />
      <div
        style={{
          padding: "8px 14px 6px",
          background: tk.wh,
          borderBottom: `0.5px solid ${tk.bd}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: 32,
            borderRadius: 9,
            background: tk.s1,
            border: `0.8px solid ${tk.bd}`,
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            marginBottom: 6,
            fontSize: 10,
            color: tk.t4,
          }}
        >
          ⌕ Search...
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 5, flex: 1 }}>
            {["Stage ∨", "Type ∨", "Sort ∨"].map((f) => (
              <div
                key={f}
                style={{
                  height: 22,
                  borderRadius: 6,
                  background: tk.s1,
                  border: `0.6px solid ${tk.bd}`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  fontSize: 9,
                  color: tk.t3,
                  flexShrink: 0,
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", overflowY: "auto" }}>
        {WORDS.slice(0, 6).map((wo, i) => (
          <div
            key={wo.w}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderBottom: i < 5 ? `0.5px solid ${tk.bd}` : "none",
            }}
          >
            <SDot s={wo.s} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 500, color: tk.t0 }}>
                  {wo.w}
                </span>
                <GPill g={wo.g} />
              </div>
              <div style={{ fontSize: 10, color: tk.t2 }}>{wo.tr}</div>
            </div>
            <Due due={wo.due} />
          </div>
        ))}
        <MiniWidget />
      </div>
      <MobBottomNav active={1} />
    </Phone>
  </Wrap>
);

const CpCollapsedDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Dashboard" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TBar title="Good morning, Hana ☀" action="+ Add words" />
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div
              style={{
                height: 220,
                background: tk.s2,
                padding: "16px 18px",
                display: "flex",
                gap: 14,
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 188,
                  background: tk.s3,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <Companion size={74} />
                <Bubble text="Hey Hana! 🌱" style={{ fontSize: 9 }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 14,
                  padding: "14px 16px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 0,
                }}
              >
                <Lbl c="Today" />
                <DueTodayCard />
                <Lbl c="Word stages" style={{ marginTop: 2 }} />
                <StageBar />
              </div>
            </div>
            <div style={{ padding: "12px 18px 10px" }}>
              <Lbl c="Quick actions" />
              <div style={{ display: "flex", gap: 10 }}>
                <QCard label="Add words" sub="184 total" />
                <QCard label="Study" sub="24 due" />
                <QCard label="Read" sub="→" />
                <QCard label="Documents" sub="3 docs" />
              </div>
            </div>
          </div>
          <MiniWidget />
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const CompanionChat = () => (
  <div
    style={{
      height: 200,
      background: tk.s0,
      borderRadius: 12,
      padding: 12,
      overflowY: "auto",
      marginBottom: 12,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}
  >
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          maxWidth: "75%",
          background: tk.s1,
          borderRadius: 12,
          padding: "8px 12px",
          fontSize: 11,
          color: tk.t1,
        }}
      >
        Hey Hana! How's your German going today? 🌱
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: "75%",
          background: tk.btn,
          borderRadius: 12,
          padding: "8px 12px",
          fontSize: 11,
          color: "#fff",
        }}
      >
        Pretty good! Can you quiz me on animal words?
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          maxWidth: "75%",
          background: tk.s1,
          borderRadius: 12,
          padding: "8px 12px",
          fontSize: 11,
          color: tk.t1,
        }}
      >
        Sure! What does "der Hund" mean? 🐕
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div
        style={{
          maxWidth: "75%",
          background: tk.btn,
          borderRadius: 12,
          padding: "8px 12px",
          fontSize: 11,
          color: "#fff",
        }}
      >
        Dog!
      </div>
    </div>
  </div>
);
// Animation: companion walks from bottom-right to center via Framer Motion
// layout animation on container, walking sprite during transition
// on close: reverses back to bottom-right collapsed state
const CompanionCard = ({ w = 320 }) => (
  <div
    style={{
      width: w,
      background: tk.wh,
      borderRadius: 20,
      border: `0.8px solid ${tk.bd}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      padding: "20px",
    }}
  >
    <CompanionChat />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: tk.s3,
          border: `1px solid ${tk.s4}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 7, color: tk.t3 }}>3D</span>
      </div>
      <span style={{ fontSize: 11, color: tk.t4 }}>···</span>
    </div>
    <div style={{ display: "flex", gap: 8 }}>
      <Fld ph="Ask me anything..." style={{ flex: 1, height: 34 }} />
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          background: tk.btn,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14, color: "#fff" }}>→</span>
      </div>
    </div>
    <div
      style={{ textAlign: "center", marginTop: 10, fontSize: 9, color: tk.t4 }}
    >
      tap outside to close
    </div>
  </div>
);

const CpExpandedMob = () => (
  <Wrap>
    <Phone>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            opacity: 0.3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MobTopBar title="Word Library" />
          <div
            style={{
              padding: "8px 14px 6px",
              background: tk.wh,
              borderBottom: `0.5px solid ${tk.bd}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: 32,
                borderRadius: 9,
                background: tk.s1,
                border: `0.8px solid ${tk.bd}`,
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontSize: 10,
                color: tk.t4,
              }}
            >
              ⌕ Search...
            </div>
          </div>
          <div style={{ flex: 1, padding: "10px 14px" }}>
            {WORDS.slice(0, 6).map((wo, i) => (
              <div
                key={wo.w}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 0",
                  borderBottom: i < 5 ? `0.5px solid ${tk.bd}` : "none",
                }}
              >
                <SDot s={wo.s} />
                <span style={{ fontSize: 12, color: tk.t0 }}>{wo.w}</span>
              </div>
            ))}
          </div>
          <MobBottomNav active={1} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(30,26,20,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <CompanionCard w={290} />
        </div>
      </div>
    </Phone>
  </Wrap>
);

const CpExpandedDesk = () => (
  <Wrap>
    <DeskFrame>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <DSidebar active="Dashboard" />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TBar title="Good morning, Hana ☀" action="+ Add words" />
          <div style={{ flex: 1, overflowY: "auto", opacity: 0.3 }}>
            <div
              style={{
                height: 220,
                background: tk.s2,
                padding: "16px 18px",
                display: "flex",
                gap: 14,
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: 188,
                  background: tk.s3,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <Companion size={74} />
                <Bubble text="Hey Hana! 🌱" style={{ fontSize: 9 }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: tk.wh,
                  border: `0.8px solid ${tk.bd}`,
                  borderRadius: 14,
                  padding: "14px 16px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 0,
                }}
              >
                <Lbl c="Today" />
                <DueTodayCard />
                <Lbl c="Word stages" style={{ marginTop: 2 }} />
                <StageBar />
              </div>
            </div>
            <div style={{ padding: "12px 18px 10px" }}>
              <Lbl c="Quick actions" />
              <div style={{ display: "flex", gap: 10 }}>
                <QCard label="Add words" sub="184 total" />
                <QCard label="Study" sub="24 due" />
                <QCard label="Read" sub="→" />
                <QCard label="Documents" sub="3 docs" />
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(30,26,20,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <CompanionCard w={380} />
          </div>
        </div>
      </div>
    </DeskFrame>
  </Wrap>
);

const SCREENS = {
  "db/mob": <DashMob />,
  "db/desk": <DashDesk />,
  "aw/mob": <AWMob />,
  "aw/mob-v": <AWMobV />,
  "aw/desk": <AWDesk />,
  "aw/desk-v": <AWDeskV />,
  "vf/mob-l": <VFMobL />,
  "vf/mob-r": <VFMobR />,
  "vf/mob-d": <VFMobD />,
  "vf/desk-l": <VFDeskL />,
  "vf/desk-r": <VFDeskR />,
  "vf/desk-d": <VFDeskD />,
  "wl/dl": <WLDeskList />,
  "wl/dc": <WLDeskCards />,
  "wl/ddl": <WLDeskDL />,
  "wl/ddc": <WLDeskDC />,
  "wl/ml": <WLMobList />,
  "wl/mc": <WLMobCards />,
  "wl/md": <WLMobDet />,
  "st/mob-cfg": <StCfgMob />,
  "st/desk-cfg": <StCfgDesk />,
  "st/mob-sc": <StSCMob />,
  "st/desk-sc": <StSCDesk />,
  "st/mob-mc": <StMCMob />,
  "st/desk-mc": <StMCDesk />,
  "st/mob-tr": <StTrMob />,
  "st/desk-tr": <StTrDesk />,
  "st/mob-rv": <StRvMob />,
  "st/desk-rv": <StRvDesk />,
  "st/mob-mt": <StMtMob />,
  "st/desk-mt": <StMtDesk />,
  "st/mob-end": <StEndMob />,
  "st/desk-end": <StEndDesk />,
  "rd/mob-lib": <RdMobLib />,
  "rd/desk-lib": <RdDeskLib />,
  "rd/mob-wt": <RdMobWT />,
  "rd/desk-wt": <RdDeskWT />,
  "rd/mob-st": <RdMobST />,
  "rd/desk-st": <RdDeskST />,
  "dc/mob-lib": <DcMobLib />,
  "dc/desk-lib": <DcDeskLib />,
  "dc/mob-pdf": <DcMobPDF />,
  "dc/desk-pdf": <DcDeskPDF />,
  "dc/mob-edit": <DcMobEdit />,
  "dc/desk-edit": <DcDeskEdit />,
  "dc/mob-read": <DcMobRead />,
  "dc/desk-read": <DcDeskRead />,
  "ob/login-mob": <LoginMob />,
  "ob/login-desk": <LoginDesk />,
  "ob/reg-mob": <RegMob />,
  "ob/reg-desk": <RegDesk />,
  "ob/comp-mob": <CompIntroMob />,
  "ob/comp-desk": <CompIntroDesk />,
  "ob/tour-mob": <TourMobScreen />,
  "ob/tour-desk": <TourDeskScreen />,
  "se/mob": <SettingsMob />,
  "se/desk": <SettingsDesk />,
  "pr/mob": <ProfileMob />,
  "pr/desk": <ProfileDesk />,
  "cp/collapsed-mob": <CpCollapsedMob />,
  "cp/collapsed-desk": <CpCollapsedDesk />,
  "cp/expanded-mob": <CpExpandedMob />,
  "cp/expanded-desk": <CpExpandedDesk />,
};

const SideTree = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(new Set(TREE.map((g) => g.id)));
  const toggle = (id) =>
    setOpen((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const done = new Set(Object.keys(SCREENS));
  return (
    <div
      style={{
        width: 220,
        borderRight: `0.5px solid ${tk.bd}`,
        background: tk.s1,
        overflow: "auto",
        flexShrink: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "14px 16px 10px",
          fontSize: 12,
          fontWeight: 500,
          color: tk.t1,
          borderBottom: `0.5px solid ${tk.bd}`,
          letterSpacing: "0.03em",
          flexShrink: 0,
        }}
      >
        Wireframe Explorer
      </div>
      <div style={{ padding: "8px 0", flex: 1, overflow: "auto" }}>
        {TREE.map((g) => (
          <div key={g.id}>
            <div
              onClick={() => toggle(g.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "7px 16px",
                fontSize: 11,
                fontWeight: 500,
                color: tk.t2,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span>{g.label}</span>
              <span
                style={{
                  fontSize: 9,
                  color: tk.t4,
                  display: "inline-block",
                  transform: open.has(g.id) ? "rotate(90deg)" : "none",
                  transition: "transform 0.15s",
                }}
              >
                ▶
              </span>
            </div>
            {open.has(g.id) &&
              g.ch.map((item) => {
                const sel = selected === item.id,
                  d = done.has(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    style={{
                      padding: "6px 16px",
                      paddingLeft: sel ? 26 : 28,
                      fontSize: 11,
                      color: sel ? tk.t0 : d ? tk.t2 : tk.t4,
                      background: sel ? tk.s3 : "none",
                      cursor: "pointer",
                      userSelect: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      borderLeft: sel ? `2px solid ${tk.s4}` : "none",
                    }}
                  >
                    {!d && (
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: tk.s4,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {item.label}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export function WireframeExplorer() {
  const [sel, setSel] = useState("cp/expanded-desk");
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui,-apple-system,sans-serif",
        overflow: "hidden",
        background: tk.s0,
      }}
    >
      <SideTree selected={sel} onSelect={setSel} />
      <div style={{ flex: 1, overflow: "auto" }}>
        {SCREENS[sel] || <Placeholder id={sel} />}
      </div>
    </div>
  );
}
