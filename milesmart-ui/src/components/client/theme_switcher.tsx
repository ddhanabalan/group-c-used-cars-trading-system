'use client'

import { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { LightModeIcon } from '@/components/icons/light_mode'
import { DarkModeIcon } from '@/components/icons/dark_mode'
import { AutoModeIcon } from '@/components/icons/auto_mode'

export default function ThemeSwitcher() {
  const [selection, setSelection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme()
  
  const selection_bg = 'bg-black/10 dark:bg-white/10'
  const themes = useMemo(() => ['light', 'system', 'dark'], [])

  useEffect(() => {
    if (mounted) return;
    setSelection(themes.indexOf(theme ?? 'system'));
    setMounted(true);
  }, [themes, theme, mounted]);

  function handleClick(event: any, currentSelection: number) {
    event.stopPropagation();
    const newSelection = currentSelection == selection? (selection+1)%3: currentSelection;
    setSelection(newSelection);
    setTheme(themes[newSelection]);
  }

  if (!mounted) return <div hidden/>
  return (
    <div className={`flex p-1 gap-1 rounded-full ${hovered? selection_bg: ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button hidden={selection == 0? false: !hovered} onClick={(e) => handleClick(e, 0)} className={`${selection == 0 && hovered? selection_bg: ''} rounded-full `}>
        <LightModeIcon className={`h-9 w-9 p-2 dark:fill-white`} />
      </button>
      <button hidden={selection == 1? false: !hovered} onClick={(e) => handleClick(e, 1)} className={`${selection == 1 && hovered? selection_bg: ''} rounded-full `}>
        <AutoModeIcon className={`h-9 w-9 p-2 dark:fill-white`} />
      </button>
      <button hidden={selection == 2? false: !hovered} onClick={(e) => handleClick(e, 2)} className={`${selection == 2 && hovered? selection_bg: ''} rounded-full `}>
        <DarkModeIcon className={`h-9 w-9 p-2 dark:fill-white`} />
      </button>
    </div>
  )
}