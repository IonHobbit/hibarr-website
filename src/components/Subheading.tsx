"use client";

export type SubheadingBlock = {
  _type: "subheading";
  label: string;
  align?: "left" | "center" | "right";
  variant?: "solid" | "subtle" | "outline";
  tone?: "brand" | "neutral" | "accent" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  uppercase?: boolean;
};

type Props = SubheadingBlock & { className?: string };

const toneMap = {
  brand:  { bgSolid: "#0F3D75", textOnSolid: "#FFFFFF", subtleBg: "#E6EEF8", subtleText: "#0F3D75", outline: "#2A5EA8" },
  neutral:{ bgSolid: "#333333", textOnSolid: "#FFFFFF", subtleBg: "#F2F2F2", subtleText: "#222222", outline: "#C9C9C9" },
  accent: { bgSolid: "#7C3AED", textOnSolid: "#FFFFFF", subtleBg: "#F3E8FF", subtleText: "#5B21B6", outline: "#A78BFA" },
  info:   { bgSolid: "#0EA5E9", textOnSolid: "#FFFFFF", subtleBg: "#E0F2FE", subtleText: "#075985", outline: "#38BDF8" },
  success:{ bgSolid: "#10B981", textOnSolid: "#0A0A0A", subtleBg: "#D1FAE5", subtleText: "#065F46", outline: "#34D399" },
  warning:{ bgSolid: "#F59E0B", textOnSolid: "#0A0A0A", subtleBg: "#FEF3C7", subtleText: "#92400E", outline: "#FBBF24" },
  danger: { bgSolid: "#EF4444", textOnSolid: "#FFFFFF", subtleBg: "#FEE2E2", subtleText: "#991B1B", outline: "#F87171" },
} as const;

export default function Subheading({
  label,
  align = "left",
  variant = "solid",
  tone = "brand",
  size = "md",
  uppercase = true,
  className,
}: Props) {
  if (!label) return null;

  const justify = align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start";
  const sizes = {
    sm: { padding: "6px 10px", fontSize: 12 },
    md: { padding: "8px 12px", fontSize: 14 },
    lg: { padding: "10px 14px", fontSize: 16 },
  }[size];

  const t = toneMap[tone as keyof typeof toneMap] || toneMap.brand;

  const styleForVariant =
    variant === "subtle"
      ? { background: t.subtleBg, color: t.subtleText, border: "1px solid transparent" }
      : variant === "outline"
      ? { background: "transparent", color: t.subtleText, border: `1.5px solid ${t.outline}` }
      : { background: t.bgSolid, color: t.textOnSolid, border: "1px solid transparent" };

  return (
    <div style={{ display: "flex", justifyContent: justify, margin: "0 0 14px 0" }} className={className}>
      <span
        style={{
          display: "inline-block",
          padding: sizes.padding,
          fontSize: sizes.fontSize,
          fontWeight: 700,
          lineHeight: 1,
          borderRadius: 5,
          textTransform: uppercase ? "uppercase" : "none",
          letterSpacing: uppercase ? "0.04em" : undefined,
          whiteSpace: "normal",
          wordBreak: "break-word",
          ...styleForVariant,
        }}
        aria-label={label}
      >
        {label}
      </span>
    </div>
  );
}
