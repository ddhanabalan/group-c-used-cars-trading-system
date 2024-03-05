import { useCallback, useEffect, useRef, useState } from "react";

export default function RangeSlider({min, max, onChange}: {min:number, max:number, onChange: any}) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);

    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
    if (maxValRef.current) {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(+maxValRef.current.value); 

        if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
    if (minValRef.current) {
        const minPercent = getPercent(+minValRef.current.value);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                className="thumb thumb--zindex-3 [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-gray-500 dark:[&::-moz-range-thumb]:bg-gray-500"
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(+event.target.value, minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
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