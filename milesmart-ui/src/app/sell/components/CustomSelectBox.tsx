"use client";

import React, { useState, FC } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";

interface CustomSelectBoxProps {
   options: string[];
   placeholder?: string;
   defaultOption?: string | null;
   onOptionSelect?: (option: string) => void;
}

const CustomSelectBox: FC<CustomSelectBoxProps> = ({
   options = [],
   placeholder = "Select",
   defaultOption = null,
   onOptionSelect,
}) => {
   const [selectedOption, setSelectedOption] = useState<string>(defaultOption || placeholder);
   const [open, setOpen] = useState<boolean>(false);

   const handleOptionClick = (option: string) => {
      setSelectedOption(option);
      setOpen(false);
      if (onOptionSelect) {
         onOptionSelect(option);
      }
   };

   return (
      <>
         <div className="relative z-10 flex flex-col items-center justify-center border-2 border-[#dddddd] dark:border-[#404040] rounded-2xl w-fit">
            <div
               onClick={() => setOpen((prev) => !prev)}
               className="flex flex-row items-center justify-between w-48 p-2 my-2 dark:text-white bg-white dark:bg-[#282828] rounded-lg cursor-pointer"
            >
               <span>{selectedOption}</span>
               <BsChevronExpand className="text-gray-400 dark:text-white" />
            </div>
            <div
               className={`flex flex-col z-20 bg-white dark:text-[#F5F5F5] dark:bg-[#181818] w-48 rounded-2xl ${
                  open ? "opacity-100 h-24" : "opacity-0 h-0"
               } transition-all duration-200 overflow-y-auto relative left-0`}
            >
               {options.map((item) => (
                  <div
                     key={item}
                     onClick={() => handleOptionClick(item)}
                     className={`flex justify-start items-center gap-x-2 px-2 py-1 hover:bg-[#B3B3B3] cursor-pointer ${
                        selectedOption === item ? "bg-[#F5F5F5] dark:bg-[#404040]" : ""
                     }`}
                  >
                     <AiOutlineCheck
                        className={`text-[#494949] dark:text-[#F5F5F5] ${selectedOption === item ? "opacity-100" : "opacity-0"}`}
                     />
                     <span>{item}</span>
                  </div>
               ))}
            </div>
         </div>
         <div
            onClick={() => setOpen(false)}
            className={`bg-gray-100 dark:bg-[#282828] fixed inset-0 opacity-50 z-0 ${open ? "block" : "hidden"}`}
         ></div>
      </>
   );
};

export default CustomSelectBox;
