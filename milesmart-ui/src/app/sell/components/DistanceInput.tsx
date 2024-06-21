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
    <div className="relative z-10 flex flex-col items-center justify-center border-2 border-[#dddddd] dark:border-[#404040] dark:text-white rounded-2xl w-fit">
      <input
        type="text"
        value={distance}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-48 p-2 my-2 bg-white dark:bg-[#282828] rounded-lg outline-none"
      />
    </div>
  );
};

export default DistanceInput;
