"use client";

import React, { useState, FC, useEffect, useRef } from "react";
// import { AiOutlineCheck } from "react-icons/ai";
// import { BsChevronExpand } from "react-icons/bs";

interface CustomSelectWithAddProps {
  options: string[];
  placeholder?: string;
  defaultOption?: string | null;
  onOptionSelect?: (option: string) => void;
}

const CustomSelectWithAdd: FC<CustomSelectWithAddProps> = ({
  options = [],
  placeholder = "Select",
  defaultOption = null,
  onOptionSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption || "");
  const [open, setOpen] = useState<boolean>(false);
  const [customOptions, setCustomOptions] = useState<string[]>(options);
  const [newOption, setNewOption] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open && !selectedOption) {
      setNewOption("");
    }
  }, [open, selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() && !customOptions.includes(newOption.trim())) {
      const updatedOptions = [...customOptions, newOption.trim()];
      setCustomOptions(updatedOptions);
      handleOptionClick(newOption.trim());
      setNewOption("");
    }
  };

  const filteredOptions = customOptions.filter(option =>
    option.toLowerCase().includes(newOption.toLowerCase())
  );

  return (
    <>
      <div className="relative z-10 flex flex-col justify-center overflow-clip bg-[#f5f5f5] dark:bg-[#383838] rounded-lg">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-row items-center justify-between px-4 py-1 cursor-pointer"
        >
          <input
            ref={inputRef}
            type="text"
            value={open ? newOption : selectedOption || ""}
            onChange={(e) => {
              setNewOption(e.target.value);
              setOpen(true);
            }}
            onBlur={() => {
              if (!selectedOption) {
                setNewOption("");
              }
              setOpen(false);
            }}
            placeholder={selectedOption || placeholder}
            className={`flex-1 bg-transparent outline-none ${
              selectedOption ? "text-[#282828] dark:text-[#F5F5F5]" : "text-[#707070] dark:text-[#B3B3B3]"
            } placeholder-[#707070] dark:placeholder-[#B3B3B3]`}
          />
          {/* <BsChevronExpand className="text-[#707070] dark:text-[#B3B3B3]" /> */}
        </div>
        <div
          className={`flex flex-col z-20 ${
            open ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
          } transition-all duration-200 overflow-y-auto relative left-0 bg-[#f5f5f5] dark:bg-[#383838]`}
        >
          {filteredOptions.map((item) => (
            <div
              key={item}
              onMouseDown={() => handleOptionClick(item)}
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
          {newOption && !filteredOptions.includes(newOption) && (
            <div className="flex justify-start items-center gap-x-2 px-2 py-1 cursor-pointer" onMouseDown={handleAddOption}>
              <span className="text-[#282828] dark:text-[#F5F5F5]">Add &quot;{newOption}&quot;</span>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`bg-gray-100 dark:bg-[#282828] fixed inset-0 opacity-50 z-0 ${open ? "block" : "hidden"}`}
      ></div>
    </>
  );
};

export default CustomSelectWithAdd;
