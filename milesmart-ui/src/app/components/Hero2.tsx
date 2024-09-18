"use client";

import Image from "next/image";

const Hero2 = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
  <div className="flex flex-col" id="featurecard">
    <div className="relative w-full h-64">
      <Image
        src="/girl1.png"
        alt="feature1"
        fill
        style={{ objectFit: 'contain' }}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="m-4">
      <p className="text-center">Choose your cars from the best and verified profiles</p>
    </div>
  </div>

  <div className="flex flex-col">
    <div className="relative w-full h-64">
      <Image
        src="/girl2.png"
        alt="feature2"
        fill
        style={{ objectFit: 'contain' }}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="m-4">
      <p className="text-center">Test drive the car before you own yourself</p>
    </div>
  </div>

  <div className="flex flex-col">
    <div className="relative w-full h-64">
      <Image
        src="/girl3.png"
        alt="feature3"
        fill
        style={{ objectFit: 'contain' }}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="m-4">
      <p className="text-center">Enjoy free 1 year maintenance service after delivery</p>
    </div>
  </div>
</div>

  );
};

export default Hero2;
