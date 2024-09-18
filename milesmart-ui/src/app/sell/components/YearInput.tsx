// components/YearInput.tsx
import React, { ChangeEvent } from 'react';

interface YearInputProps {
  minYear: number;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  year?: string
}

const YearInput: React.FC<YearInputProps> = ({ minYear, placeholder, onChange, year }) => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Validate minYear and set a default if invalid
  const validMinYear = minYear > 0 && minYear <= currentYear ? minYear : 1900;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the input value is within valid range
    if (value === '' || (/^\d{0,4}$/.test(value) && (value.length < 4 || (Number(value) >= validMinYear && Number(value) <= currentYear)))) {
      if (onChange) onChange(e);
    }
  };

  return (
    <div className="relative z-10 flex flex-col justify-center rounded-xl">
      <input
        type="text"
        value={year}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-1 bg-[#f5f5f5] dark:bg-[#383838] text-[#282828] dark:text-[#F5F5F5] placeholder-[#707070] dark:placeholder-[#B3B3B3] rounded-lg outline-none "
      />
    </div>
  );
  
};

export default YearInput;
