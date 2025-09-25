"use client";

export type SpacerBlock = {
  _type: 'spacer'
  preset?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  customHeight?: number
}

type Props = SpacerBlock & { className?: string }

const map = { xs: 8, sm: 16, md: 24, lg: 40, xl: 64 } as const

export default function Spacer({ preset = 'md', customHeight, className }: Props) {
  const base = preset === 'custom'
    ? (Number.isFinite(customHeight as number) ? (customHeight as number) : 0)
    : (map[(preset as keyof typeof map)] ?? map.md)

  const height = Math.max(0, Math.min(2000, base))

  return (
    <div aria-hidden="true" style={{ height, width: '100%', display: 'block' }} className={className} />
  )
}
