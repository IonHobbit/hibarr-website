'use client';

import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { BankPackage } from './PackageCard'
import { Button } from '@/components/ui/button'

type BankDetailsModalProps = {
  activePackage: BankPackage
  showBankTransferModal: boolean
  setShowBankTransferModal: (show: boolean) => void
}

export default function BankDetailsModal({ activePackage, showBankTransferModal, setShowBankTransferModal }: BankDetailsModalProps) {

  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <Dialog open={showBankTransferModal} onOpenChange={setShowBankTransferModal}>
      <DialogContent hideCloseButton className='max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl'>Bank Transfer</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-6'>
          <p>
            Please transfer the amount of €{activePackage?.price} to the following bank account:
          </p>
          <p>Account Name: Rabih Bassam Hijazi</p>
          <div className='flex flex-col gap-0.5'>
            <div className='flex items-center gap-2'>
              <p>TR050006400000268109097722</p>
              <div className='flex items-center gap-2 cursor-pointer' onClick={() => copyToClipboard('TR050006400000268109097722')}>
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
        </div>
        <Button className='w-full' type='button' onClick={() => setShowBankTransferModal(false)}>Done</Button>
      </DialogContent>
    </Dialog>
  )
}
