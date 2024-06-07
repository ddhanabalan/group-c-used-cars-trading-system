"use client";

import Image from "next/image";

import { CustomButton } from ".";

const Hero2 = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5 my-5">
      <div className="flex flex-col " id="featurecard">
        <img src="/girl1.png" alt="feature1" className="object-cover w-full h-full" />
        <div className="m-4">
          <p className="text-center ">Choose your cars from the best and verified profiles </p>
        </div>
      </div>

      <div className="flex flex-col feature">
        <img src="/girl2.png" alt="feature1" className="object-cover w-full h-full" />
        <div className="m-4">
          <p className="text-center ">Test drive the car before you own yourself </p>
        </div>
      </div>

      <div className="flex flex-col feature">
        <img src="/girl3.png" alt="feature1" className="object-cover w-full h-full" />
        <div className="m-4">
          <p className="text-center ">Enjoy free 1 year maintenance service after delivery </p>
        </div>
      </div>
      
    </div>
  );
};

export default Hero2;
