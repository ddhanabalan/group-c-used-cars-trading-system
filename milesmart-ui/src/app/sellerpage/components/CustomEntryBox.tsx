"use client";

import React, { useState, ChangeEvent } from "react";

interface CustomEntryBoxProps {
   placeholder?: string;
   defaultValue?: string;
   onInputChange?: (value: string) => void;
}

const CustomEntryBox: React.FC<CustomEntryBoxProps> = ({
   placeholder = "Enter text",
   defaultValue = "",
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
      <div className="relative z-10 flex flex-col items-center justify-center border-2 border-[#dddddd] rounded-2xl w-fit">
         <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-48 p-2 my-2 bg-white rounded-lg outline-none"
         />
      </div>
   );
};

export default CustomEntryBox;
