"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icon } from "@iconify/react"

type SelectProps = {
  options: {
    value: string
    label: string
  }[]
  placeholder?: string
  value: string | string[]
  onSelect: (value: string | string[]) => void
}

export function Select({ options, placeholder, value, onSelect }: SelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (_value: string) => {
    if (Array.isArray(value)) {
      const newValues = [...value];
      if (newValues.includes(_value)) {
        newValues.splice(newValues.indexOf(_value), 1);
      } else {
        newValues.push(_value);
      }
      onSelect(newValues);
    } else {
      onSelect(_value);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className="w-full rounded xl:w-auto xl:min-w-[180px] xl:max-w-[200px] flex items-center justify-between overflow-hidden py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-300"
        >
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {Array.isArray(value)
              ? value.length > 0 ? value.map((v) => options.find((option) => option.value === v)?.label).join(', ') : placeholder || "Select option..."
              : options.find((option) => option.value === value)?.label || placeholder || "Select option..."}
          </p>
          <Icon icon="mdi:chevron-down" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full xl:min-w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder || "Search option..."} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Icon icon="mdi:check" className={cn(
                    "mr-2 h-4 w-4",
                    Array.isArray(value) && value.includes(option.value) ? "opacity-100" : "opacity-0"
                  )} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
