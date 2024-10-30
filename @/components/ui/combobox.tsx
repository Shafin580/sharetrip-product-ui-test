"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/libs/utils"
import { Button } from "@shad/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@shad/command"
import { Popover, PopoverContent, PopoverTrigger } from "@shad/popover"

interface ComboboxProps {
  placeholder: string
  className?: string
  hideTypeAhead?: boolean
  onChange: (value: string) => void
  items: {value: string, label: string}[]
}

export function Combobox({ className = "", hideTypeAhead = false, onChange, items, placeholder }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [options, setOptions] = React.useState<{value: string, label: string}[]>([])

  React.useEffect(() => {
    if(items){
      setOptions(items)
    }
  }, [items])

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[160px] justify-between"
          >
            {value ? options.find((data) => data.value === value)?.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] p-0">
          <Command>
            {!hideTypeAhead && <CommandInput placeholder="Search..." />}
            <CommandList>
              <CommandEmpty>No data found.</CommandEmpty>
              <CommandGroup>
                {options.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      onChange(data.label)
                      setOpen(false)
                    }}
                  >
                    {data.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
