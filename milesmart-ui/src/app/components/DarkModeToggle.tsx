import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('dark-mode', JSON.stringify(!isDarkMode));
  };

  return (
    <div className='flex items-center justify-center mr-2'>
      <button 
        onClick={handleToggle}
        className="transition duration-500 ease-in-out transform hover:scale-110 focus:outline-none"
      >
        <Image
          src={isDarkMode ? '/light-mode-icon.png' : '/dark-mode-icon.png'}
          alt="Toggle dark mode"
          width={26}
          height={26}
          className="transition duration-500 ease-in-out"
        />
      </button>
    </div>
  );
};

export default DarkModeToggle;
