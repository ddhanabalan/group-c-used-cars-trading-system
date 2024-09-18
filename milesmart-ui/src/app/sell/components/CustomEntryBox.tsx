"use client";

import React, { useState, ChangeEvent } from "react";

interface CustomEntryBoxProps {
   placeholder?: string;
   defaultValue?: string;
   onInputChange?: (value: string) => void;
   className?: string;
}

const CustomEntryBox: React.FC<CustomEntryBoxProps> = ({
   placeholder = "Enter text",
   defaultValue = "",
   className,
   onInputChange
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (onInputChange) {
         onInputChange(value);
      }
   };

   return (
      <div className={`relative z-10 flex flex-col justify-center overflow-clip dark:text-white rounded-lg ${className}`}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="px-4 py-1 bg-[#f5f5f5] dark:bg-[#383838] text-[#282828] dark:text-[#F5F5F5] placeholder-[#707070] dark:placeholder-[#B3B3B3] rounded-lg outline-none"
        />
      </div>
    );
    
};

export default CustomEntryBox;
