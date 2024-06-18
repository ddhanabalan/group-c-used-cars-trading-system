"use client";

import React, { useState, ChangeEvent } from "react";

interface DescriptionInputProps {
   placeholder?: string;
   defaultValue?: string;
   onInputChange?: (value: string) => void;
   className?: string;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
   placeholder = "Enter description",
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
      <div className={`relative z-10 flex flex-col items-start justify-center border-2 border-[#dddddd] dark:border-[#404040] dark:text-white rounded-2xl ${className}`}>
         <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full p-2 my-2 bg-white dark:bg-[#282828] rounded-lg outline-none resize-none"
            rows={6}
         />
      </div>
   );
};

export default DescriptionInput;
