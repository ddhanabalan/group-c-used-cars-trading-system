'use client'

import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import './styles.css'
import RangeSlider from '../components/range_slider';

export default function Results() {
    const rangeSlider = useRef<HTMLInputElement>(null)
    const [rangeSliderValue, setRangeSliderValue] = useState(50)
    const [minVal, setMinVal] = useState(25)
    const [maxVal, setMaxVal] = useState(75)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-900">
            <div className='m-auto'>
                <RangeSlider min={0} max={100} value_min={minVal} value_max={maxVal} onChange={
                    ({min, max}: {min:number, max:number}) => {
                        console.log(`min = ${min}, max = ${max}`)
                        setMinVal(min)
                        setMaxVal(max)
                    }
                }/>
                <input ref={rangeSlider} type='range' className='m-8' value={rangeSliderValue} onChange={(e) => {
                    if (rangeSlider.current != null) setRangeSliderValue(parseInt(rangeSlider.current.value))
                    else console.log('Error')
                }} />
            </div>
        </main>
    )
}