// components/DistanceInput.tsx
import React, { useState, ChangeEvent } from 'react';

interface DistanceInputProps {
  minDistance: number;
  maxDistance: number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  distance?: string
}

const DistanceInput: React.FC<DistanceInputProps> = ({ minDistance, maxDistance, placeholder, onChange, distance }) => {
  // const [distance, setDistance] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{0,7}$/.test(value) && (value.length < 8 || (Number(value) >= minDistance && Number(value) <= maxDistance)))) {
      if (onChange) onChange(e)
    }
  };

  return (
    <div className="relative z-10 flex flex-col justify-center rounded-xl">
      <input
        type="text"
        value={distance}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-1 my-1 bg-[#f5f5f5] dark:bg-[#383838] text-[#282828] dark:text-[#F5F5F5] placeholder-[#707070] dark:placeholder-[#B3B3B3] rounded-lg outline-none"
      />
    </div>
  );
  
};

export default DistanceInput;
