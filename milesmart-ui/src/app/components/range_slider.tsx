import { useCallback, useEffect, useRef, useState } from "react";

export default function RangeSlider({min = 0, max = 100, value_min, value_max, onChange}: {min?:number, max?:number, value_min?:number|undefined, value_max?:number|undefined, onChange?: any}) {
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);
    // const [renderBool, setRenderBool] = useState(false);
    // const [minVal, setMinVal] = useState(value_min? value_min: min)
    // const [maxVal, setMaxVal] = useState(value_max? value_max: max)
    
    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]
    );

    // const trigger_

    const update_range = (r_min: number, r_max: number) => {
        if (maxValRef.current) {
            const minPercent = getPercent(r_min);
            const maxPercent = getPercent(r_max); 

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }

    useEffect(() => { 
        update_range(+minValRef.current!.value, +maxValRef.current!.value);
    }, [value_min, value_max])

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={value_min}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, +maxValRef.current!.value - 1);
                    if (onChange != null) onChange(value, +maxValRef.current!.value)

                    if (!value_min) update_range(+minValRef.current!.value, +maxValRef.current!.value);
                }}
                className="thumb thumb--zindex-3 [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-gray-500 dark:[&::-moz-range-thumb]:bg-gray-500"
            />
            <input
                type="range"
                min={min}
                max={max}
                value={value_max}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, +minValRef.current!.value + 1);
                    if (onChange != null) onChange(+minValRef.current!.value, value)
                    
                    if (!value_max) update_range(+minValRef.current!.value, +maxValRef.current!.value); 
                }}
                className="thumb thumb--zindex-3 [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-gray-500 dark:[&::-moz-range-thumb]:bg-gray-500"
            />
            <div className="slider">
                <div className="slider__track bg-gray-300 dark:bg-white/15" />
                <div ref={range} className="slider__range bg-black dark:bg-gray-500" />
            </div>
        </div>
    );
}