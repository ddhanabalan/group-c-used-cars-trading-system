"use client";

import React, { useState, ChangeEvent } from "react";

interface DescriptionInputProps {
   placeholder?: string;
   defaultValue?: string;
   onInputChange?: (value: string) => void;
   className?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
   defaultValue = "",
   className,
   onInputChange
}) => {
   const [inputValue, setInputValue] = useState<string>(defaultValue);

   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (onInputChange) {
         onInputChange(value);
      }
   };

   return (
      <div className={`relative flex flex-col justify-center rounded-xl ${className}`}>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 my-1 bg-[#f5f5f5] dark:bg-[#383838] text-[#282828] dark:text-[#F5F5F5] placeholder-[#707070] dark:placeholder-[#B3B3B3] rounded-lg outline-none resize-none "
          rows={6}
        />
      </div>
    );
    
};

export default DescriptionInput;
