// components/YearInput.tsx
import React, { useState, ChangeEvent } from 'react';

interface YearInputProps {
  minYear: number;
  maxYear: number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  year?: string
}

const YearInput: React.FC<YearInputProps> = ({ minYear, maxYear, placeholder, onChange, year }) => {
  // const [year, setYear] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (/^\d{0,4}$/.test(value) && (value.length < 4 || (Number(value) >= minYear && Number(value) <= maxYear)))) {
      if (onChange) onChange(e);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center border-2 border-[#dddddd] dark:border-[#404040] dark:text-white rounded-2xl w-fit">
      <input
        type="text"
        value={year}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-48 p-2 my-2 bg-white dark:bg-[#282828] rounded-lg outline-none"
      />
    </div>
  );
};

export default YearInput;
