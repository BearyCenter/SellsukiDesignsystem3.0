import React from "react";
import {
  defaultBorderTokens,
  defaultRadiusTokens,
  defaultSpacePrimitives,
  defaultSpacingTokens,
} from "../../contexts/theme/default";
// ── Helpers ────────────────────────────────────────────────────────────────

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
        {Object.entries(defaultSpacingTokens).map(([name, primitiveKey]) => {
          const t1 = defaultSpacePrimitives[primitiveKey];
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitiveKey}</td>
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
        {Object.entries(defaultRadiusTokens).map(([name, primitiveKey]) => {
          const t1 = defaultSpacePrimitives[primitiveKey];
          const cv = cssVal(t1.px);
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitiveKey}</td>
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
        {Object.entries(defaultBorderTokens).map(([name, primitiveKey]) => {
          const t1 = defaultSpacePrimitives[primitiveKey];
          const cv = cssVal(t1.px);
          return (
            <tr key={name} style={tbodyRowStyle}>
              <td style={tdNameStyle}>{name}</td>
              <td style={tdMutedStyle}>{primitiveKey}</td>
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
