'use client'

import { ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import './styles.css'
import RangeSlider from '../components/range_slider';

export default function Results() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-900">
            <div className='m-auto'>
                <RangeSlider min={0} max={100} onChange={
                    ({min, max}: {min:number, max:number}) => {
                        console.log(`min = ${min}, max = ${max}`)
                    }
                }/>
            </div>
        </main>
    )
}