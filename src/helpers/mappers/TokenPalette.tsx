import React from "react";
import spacingRaw from "../../assets/tokens/spacing.css?raw";
import borderRadiusRaw from "../../assets/tokens/border-radius.css?raw";
import borderRaw from "../../assets/tokens/border.css?raw";

// ── Helpers ────────────────────────────────────────────────────────────────

function parseTier1(
  css: string,
): Record<string, { rem: string; px: number | null }> {
  const map: Record<string, { rem: string; px: number | null }> = {};
  css.split("\n").forEach((line: string) => {
    const m = line.match(/^\s*--(space-[\w-]+):\s*([^;]+);/);
    if (!m) return;
    const remVal = m[2].trim();
    const pxMatch = line.match(/\/\*\s*(\d+)px/);
    if (remVal === "0") {
      map[m[1]] = { rem: "0", px: 0 };
    } else if (pxMatch) {
      map[m[1]] = { rem: remVal, px: parseInt(pxMatch[1]) };
    } else {
      map[m[1]] = { rem: remVal, px: null };
    }
  });
  return map;
}

function pxLabel(px: number | null): string {
  if (px === 0) return "0";
  if (px !== null) return px + "px";
  return "pill";
}

function cssVal(px: number | null): string {
  if (px === 0) return "0px";
  if (px !== null) return px + "px";
  return "9999px";
}

// ── Shared table styles ────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: "8px 16px",
  textAlign: "left",
  fontWeight: 600,
  color: "#6b7280",
  fontSize: "12px",
};

const tdNameStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontFamily: "monospace",
  fontSize: "13px",
};

const tdMutedStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontFamily: "monospace",
  fontSize: "13px",
  color: "#9ca3af",
};

const tdValueStyle: React.CSSProperties = {
  padding: "10px 16px",
  fontSize: "13px",
  color: "#9ca3af",
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
  marginTop: "16px",
};

const theadRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #e2e8f0",
};
const tbodyRowStyle: React.CSSProperties = {
  borderBottom: "1px solid #f3f4f6",
};

// ── SpacingPalette ─────────────────────────────────────────────────────────

export function SpacingPalette() {
  const tier1 = parseTier1(spacingRaw);
  const tokens: { name: string; primitive: string }[] = [];
  spacingRaw.split("\n").forEach((line: string) => {
    const m = line.match(/^\s*--(spacing-[\w-]+):\s*var\(--(space-[\w-]+)\)/);
    if (m) tokens.push({ name: m[1], primitive: m[2] });
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRowStyle}>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Primitive</th>
          <th style={thStyle}>rem</th>
          <th style={thStyle}>px</th>
          <th style={thStyle}>Example</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ name, primitive }) => {
          const t1 = tier1[primitive] ?? { rem: "", px: 0 };
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitive}</td>
              <td style={tdValueStyle}>{t1.rem}</td>
              <td style={tdValueStyle}>{pxLabel(t1.px)}</td>
              <td style={{ padding: "10px 16px", width: "40%" }}>
                <div
                  style={{
                    height: "12px",
                    width: Math.max(t1.px ?? 0, 2),
                    maxWidth: "100%",
                    background: "#1b9cf7",
                    borderRadius: "3px",
                    opacity: t1.px === 0 ? 0.15 : 1,
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── RadiusPalette ──────────────────────────────────────────────────────────

export function RadiusPalette() {
  const tier1 = parseTier1(spacingRaw);
  const tokens: { name: string; primitive: string }[] = [];
  borderRadiusRaw.split("\n").forEach((line: string) => {
    const m = line.match(/^\s*--(radius-[\w-]+):\s*var\(--(space-[\w-]+)\)/);
    if (m) tokens.push({ name: m[1], primitive: m[2] });
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRowStyle}>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Primitive</th>
          <th style={thStyle}>px</th>
          <th style={thStyle}>Example</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ name, primitive }) => {
          const t1 = tier1[primitive] ?? { rem: "", px: 0 };
          const cv = cssVal(t1.px);
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitive}</td>
              <td style={tdValueStyle}>{pxLabel(t1.px)}</td>
              <td style={{ padding: "10px 16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#1b9cf7",
                    borderRadius: cv,
                    opacity: cv === "0px" ? 0.2 : 0.85,
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── BorderPalette ──────────────────────────────────────────────────────────

export function BorderPalette() {
  const tier1 = parseTier1(spacingRaw);
  const tokens: { name: string; primitive: string }[] = [];
  borderRaw.split("\n").forEach((line: string) => {
    const m = line.match(/^\s*--(border-[\w-]+):\s*var\(--(space-[\w-]+)\)/);
    if (m) tokens.push({ name: m[1], primitive: m[2] });
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRowStyle}>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Primitive</th>
          <th style={thStyle}>px</th>
          <th style={thStyle}>Example</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ name, primitive }) => {
          const t1 = tier1[primitive] ?? { rem: "", px: 0 };
          const cv = cssVal(t1.px);
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitive}</td>
              <td style={tdValueStyle}>{pxLabel(t1.px)}</td>
              <td style={{ padding: "10px 16px" }}>
                <div
                  style={{
                    width: "120px",
                    height: "32px",
                    border: cv + " solid #1b9cf7",
                    borderRadius: "4px",
                    opacity: cv === "0px" ? 0.15 : 1,
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
