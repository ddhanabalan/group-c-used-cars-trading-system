"use client";

import React, { useState, FC } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import { BsChevronExpand } from "react-icons/bs";

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
        <div className="relative z-10 flex flex-col justify-center overflow-clip bg-[#f5f5f5] dark:bg-[#383838] rounded-lg">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex flex-row items-center justify-between px-4 py-1 dark:text-[#F5F5F5] text-[#282828] cursor-pointer"
          >
            <span className={selectedOption ? "text-[#282828] dark:text-[#F5F5F5]" : "text-[#707070] dark:text-[#B3B3B3]"}>
              {selectedOption || "Select an option"}
            </span>
            {/* <BsChevronExpand className="text-[#707070] dark:text-[#B3B3B3]" /> */}
          </div>
          <div
            className={`flex flex-col z-20 ${
              open ? "opacity-100 h-28" : "opacity-0 h-0"
            } transition-all duration-200 overflow-y-auto relative left-0`}
          >
            {options.map((item) => (
              <div
                key={item}
                onClick={() => handleOptionClick(item)}
                className={`flex justify-start items-center gap-x-2 px-2 py-1 hover:bg-[#E0E0E0] dark:hover:bg-[#404040] cursor-pointer ${
                  selectedOption === item ? "bg-[#E0E0E0] dark:bg-[#404040]" : ""
                }`}
              >
                {/* <AiOutlineCheck
                  className={`text-[#494949] dark:text-[#F5F5F5] ${
                    selectedOption === item ? "opacity-100" : "opacity-0"
                  }`}
                /> */}
                <span className="text-[#282828] dark:text-[#F5F5F5]">{item}</span>
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
