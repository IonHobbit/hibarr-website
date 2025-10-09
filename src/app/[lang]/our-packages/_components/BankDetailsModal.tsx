'use client';

import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'
import { Icon } from '@/components/icons'
import React, { useState } from 'react'
import { BankPackage } from './PackageCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n-config';

type BankDetailsModalProps = {
  referenceID: string | null
  activePackage: BankPackage
  showBankTransferModal: boolean
  setShowBankTransferModal: (show: boolean) => void
}

export default function BankDetailsModal({ referenceID, activePackage, showBankTransferModal, setShowBankTransferModal }: BankDetailsModalProps) {

  const params = usePathname();
  const router = useRouter();
  const lang = params.split('/')[1] || 'en' as Locale;

  const phoneNumbers: Record<Locale, string> = {
    'en': '+90531191823', // Office Phone
    'de': '+90531191823', // Office Phone
    'tr': '+90531191823', // Office Phone
    'ru': '+90531191823', // Office Phone
  };

  const phoneNumber = phoneNumbers[lang as keyof typeof phoneNumbers];

  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = (content: string, showCopied?: boolean) => {
    navigator.clipboard.writeText(content)
    if (showCopied) {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    }
  }

  const completePayment = () => {
    setShowBankTransferModal(false)
    router.push(`/webinar`)
  }

  return (
    <Dialog open={showBankTransferModal} onOpenChange={setShowBankTransferModal}>
      <DialogContent hideCloseButton className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>Bank Transfer</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <p>
            Please transfer the amount of €{activePackage?.price} to the following bank account using this <br /> Reference ID: <span className='font-medium cursor-pointer' onClick={() => copyToClipboard(referenceID || '')}>{referenceID}</span> <br />as the payment reference.
          </p>
          <p className='font-medium text-lg'>Account Name: Rabih B. Hijazi</p>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <p className='font-medium text-lg'>TR050006400000268109097722</p>
              <div className='flex items-center gap-2 cursor-pointer' onClick={() => copyToClipboard('TR050006400000268109097722', true)}>
                <Icon icon='mdi:content-copy' className='w-4 h-4' />
                {isCopied ? <p className='text-xs'>Copied!</p> : <p className='text-xs'>Copy</p>}
              </div>
            </div>
            <p>ISBKTRISXXX</p>
          </div>
          <div className='flex flex-col gap-0.5'>
            <p>Is Bank</p>
            <p>Ecevit Cd 23</p>
            <p>Girne 99300</p>
          </div>
          <p>Land Turkei</p>

          <p>For any questions, please contact us at <Link className='text-primary font-medium hover:underline' href='mailto:info@hibarr.de'>info@hibarr.de</Link> or <Link className='text-primary font-medium hover:underline' href={`tel:${phoneNumber}`}>{phoneNumber}</Link></p>
        </div>
        <Button className='w-full' type='button' onClick={completePayment}>Done</Button>
      </DialogContent>
    </Dialog>
  )
}
