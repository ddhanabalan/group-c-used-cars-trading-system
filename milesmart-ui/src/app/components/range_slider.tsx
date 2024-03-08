import { useCallback, useEffect, useRef, useState } from "react";

export default function RangeSlider({min = 0, max = 100, value_min = 0, value_max = 100, onChange}: {min?:number, max?:number, value_min?:number, value_max?:number, onChange?: any}) {
    // const [minVal, setMinVal] = useState(min);
    // const [maxVal, setMaxVal] = useState(max);

    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]
    );

    // Set width of the range to decrease from the left side
    // useEffect(() => {
    // if (maxValRef.current) {
    //     const minPercent = getPercent(value_min);
    //     const maxPercent = getPercent(+maxValRef.current.value); 

    //     if (range.current) {
    //     range.current.style.left = `${minPercent}%`;
    //     range.current.style.width = `${maxPercent - minPercent}%`;
    //     }
    // }
    // }, [value_min, getPercent]);

    // // Set width of the range to decrease from the right side
    // useEffect(() => {
    // if (minValRef.current) {
    //     const minPercent = getPercent(+minValRef.current.value);
    //     const maxPercent = getPercent(value_max);

    //     if (range.current) {
    //     range.current.style.width = `${maxPercent - minPercent}%`;
    //     }
    // }
    // }, [value_max, getPercent]);

    // Get min and max values when their state changes
    // useEffect(() => {
    //     onChange({ min: value_min, max: value_max });
    // }, [value_min, value_max, onChange]);

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(value_min);
            const maxPercent = getPercent(+maxValRef.current.value); 

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [min, max, value_min, value_max])

    return (
        <div>
            <input
                type="range"
                min={min}
                max={max}
                value={value_min}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(+event.target.value, value_max - 1);
                    onChange({ min: value, max: value_max })
                    // setMinVal(value);
                    event.target.value = value.toString();
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
                    const value = Math.max(+event.target.value, value_min + 1);
                    onChange({ min: value_min, max: value })
                    // setMaxVal(value);
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