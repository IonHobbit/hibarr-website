import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Banking Packages',
  description: 'Banking Packages',
}

export default function BankingPackagesLayout({ children }: { children: React.ReactNode }) {
  return children
}
