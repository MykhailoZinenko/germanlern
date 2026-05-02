/**
 * Frame — wraps a screen render in a phone bezel or browser window so each
 * standalone wireframe page looks like the real device. Centered in the
 * viewport, with the screen scaled down if needed.
 */
import { useEffect, useState, type ReactNode } from "react";
import { wfViewport, C } from "./tokens";

interface FrameProps {
  kind: "mobile" | "desktop";
  children: ReactNode;
}

export function Frame({ kind, children }: FrameProps) {
  const target = kind === "mobile" ? wfViewport.mobile : wfViewport.desktop;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const padding = 80;
      const margin = kind === "mobile" ? 40 : 32;
      const fw = target.w + margin * 2;
      const fh = target.h + margin * 2;
      const s = Math.min(
        (window.innerWidth - padding) / fw,
        (window.innerHeight - padding) / fh,
        1,
      );
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [kind, target.w, target.h]);

  if (kind === "mobile") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#1f1b17",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <div
            style={{
              width: target.w,
              height: target.h,
              borderRadius: 44,
              border: "10px solid #0a0a0a",
              boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px #2a2a2a",
              overflow: "hidden",
              background: "#000",
              position: "relative",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                width: 120,
                height: 28,
                borderRadius: 20,
                background: "#000",
                zIndex: 100,
              }}
            />
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1f1b17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
            background: C.surface.page,
            border: "1px solid #2a2620",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              height: 36,
              background: "#2a2620",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "0 14px",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c940" }} />
            </div>
            <div
              style={{
                flex: 1,
                height: 22,
                background: "#1a1713",
                borderRadius: 5,
                color: "#7a7060",
                fontSize: 11,
                fontFamily: "ui-monospace, monospace",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
              }}
            >
              germanlern.app
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
