"use client";

export type TableBlock = {
  _type: 'table'
  caption?: string
  columns: { title: string; align?: 'left' | 'center' | 'right'; width?: number }[]
  rows?: { cells: { text?: string }[] }[]
  options?: {
    headerTone?: 'brand' | 'neutral'
    inverseHeaderText?: boolean
    borders?: 'rows' | 'grid' | 'none'
    dense?: boolean
    mobileStack?: boolean
  }
}

type Props = TableBlock & { className?: string }

export default function ContentTable({ caption, columns = [], rows = [], options = {}, className }: Props) {
  if (!columns || columns.length === 0) return null

  const {
    headerTone = 'brand',
    inverseHeaderText = true,
    borders = 'rows',
    dense = false,
    mobileStack = true,
  } = options || {}

  const headerBg = headerTone === 'brand' ? '#0F3D75' : '#F5F5F7'
  const headerColor = headerTone === 'brand' && inverseHeaderText ? '#FFFFFF' : '#0A0A0A'
  const cellPad = dense ? '10px 12px' : '14px 16px'
  const borderColor = '#C9D3E0'
  const brandLineBlue = '#053160'

  // Normalize rows to match column count; missing cells become empty
  const normalizedRows = (rows || []).map(r => {
    const cells = r?.cells || []
    const fixed = [...cells]
    if (fixed.length < columns.length) {
      for (let i = fixed.length; i < columns.length; i++) fixed.push({ text: '' })
    }
    return { cells: fixed }
  })

  return (
    <figure style={{ margin: '16px 0' }} className={className}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        {caption && (
          <caption style={{ captionSide: 'bottom', color: '#5B6B7C', paddingTop: 8 }}>{caption}</caption>
        )}
        <thead>
          <tr style={{ background: headerBg, color: headerColor }}>
            {columns.map((col, i) => {
              const isLast = i === columns.length - 1
              const headerDivider = borders === 'none' || isLast
                ? 'none'
                : `1px solid ${headerTone === 'brand' ? '#FFFFFF' : brandLineBlue}`
              return (
                <th
                  key={i}
                  scope="col"
                  style={{
                    textAlign: col.align || 'left',
                    padding: cellPad,
                    borderRight: headerDivider,
                    width: col.width ? `${col.width}%` : undefined,
                    fontWeight: 700,
                  }}
                >
                  {col.title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row, rIdx) => (
            <tr key={rIdx} style={{ borderBottom: 'none' }}>
              {columns.map((col, cIdx) => {
                const isBlueCell = headerTone === 'brand' && cIdx === 0
                const bg = isBlueCell ? headerBg : '#FFFFFF'
                const fg = isBlueCell ? headerColor : undefined
                const rightBorder = cIdx === columns.length - 1 || borders === 'none'
                  ? 'none'
                  : `1px solid ${isBlueCell ? '#FFFFFF' : brandLineBlue}`
                const topBorder = borders === 'none'
                  ? 'none'
                  : `1px solid ${isBlueCell ? '#FFFFFF' : brandLineBlue}`
                return (
                  <td
                    key={cIdx}
                    style={{
                      textAlign: col.align || 'left',
                      padding: cellPad,
                      borderRight: rightBorder,
                      borderTop: topBorder,
                      verticalAlign: 'top',
                      background: bg,
                      color: fg,
                      width: col.width ? `${col.width}%` : undefined,
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      fontWeight: isBlueCell ? 600 : undefined,
                    }}
                    data-label={mobileStack ? col.title : undefined}
                    data-first-col={cIdx === 0 ? 'true' : undefined}
                  >
                    {row.cells[cIdx]?.text || ''}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacking helper styles */}
      {mobileStack && (
        <style jsx>{`
          @media (max-width: 640px) {
            table thead { display: none; }
            table, tbody, tr, td { display: block; width: 100%; }
            tr { border-bottom: ${borders !== 'none' ? `1px solid ${borderColor}` : 'none'}; }
            td { border-right: none !important; }
            td::before {
              content: attr(data-label);
              display: block;
              font-weight: 600;
              color: #5B6B7C;
              margin-bottom: 4px;
            }
            td[data-first-col='true']::before {
              color: ${headerTone === 'brand' ? '#E6EEF8' : '#5B6B7C'};
            }
          }
        `}</style>
      )}
    </figure>
  )
}
