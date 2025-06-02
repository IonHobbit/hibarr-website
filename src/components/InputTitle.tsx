import { cn } from '@/lib/utils'
import React from 'react'

type InputTitleProps = {
  id?: string;
  title?: string;
  truncateTitle?: boolean;
  titleClassName?: string;
  required?: boolean;
  hideTitle?: boolean;
}

export default function InputTitle({ id, title, truncateTitle, titleClassName, required, hideTitle }: InputTitleProps) {
  if (!title || hideTitle) return null;
  return (
    <label htmlFor={id} className={cn("text-base text-muted-foreground", truncateTitle && "truncate max-w-60", titleClassName)}>{title} {required && <span className="text-destructive text-xs">*</span>}</label>
  )
}
