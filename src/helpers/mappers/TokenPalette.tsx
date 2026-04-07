import React from "react";
import {
  defaultBorderTokens,
  defaultRadiusTokens,
  defaultSpacePrimitives,
  defaultSpacingTokens,
} from "../../contexts/theme/default";
import { Brand, semanticTokens } from "../../contexts/theme/semantic-tokens";
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

// ── ColorTokenPalette ──────────────────────────────────────────────────────

const COLOR_GROUPS: { label: string; prefix: string }[] = [
  { label: "Text",       prefix: "--text-" },
  { label: "Stroke",     prefix: "--stroke-" },
  { label: "Icon",       prefix: "--icon-" },
  { label: "Background", prefix: "--bg-" },
  { label: "Foreground", prefix: "--fg-" },
];

const EXTRA_TOKENS = ["--link"];

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

function ColorTokenRow({ tokenName, hex }: { tokenName: string; hex: string }) {
  const textColor = isLight(hex) ? "#374151" : "#ffffff";

  return (
    <tr style={tbodyRowStyle}>
      <td style={tdNameStyle}>{tokenName}</td>
      <td style={{ padding: "10px 16px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "6px",
              background: hex,
              border: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "13px",
              background: hex,
              color: textColor,
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {hex}
          </span>
        </div>
      </td>
    </tr>
  );
}

function ColorTokenSection({ brand, groupPrefix, extraKeys = [] }: {
  brand: Brand;
  groupPrefix: string;
  extraKeys?: string[];
}) {
  const entries = Object.entries(semanticTokens[brand]).filter(
    ([k]) => k.startsWith(groupPrefix) || extraKeys.includes(k)
  );
  if (entries.length === 0) return null;

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRowStyle}>
          <th style={thStyle}>Token</th>
          <th style={thStyle}>Value</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([tokenName, hex]) => (
          <ColorTokenRow key={tokenName} tokenName={tokenName} hex={hex} />
        ))}
      </tbody>
    </table>
  );
}

export function ColorTokenPalette({ brand }: { brand: Brand }) {
  return (
    <div>
      {COLOR_GROUPS.map(({ label, prefix }) => (
        <div key={label} style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#374151", margin: "0 0 4px" }}>
            {label}
          </p>
          <ColorTokenSection
            brand={brand}
            groupPrefix={prefix}
            extraKeys={label === "Text" ? EXTRA_TOKENS : []}
          />
        </div>
      ))}
    </div>
  );
}
