"use client";

import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero container">
  <div className="flex-1 pt-32 padding-x">
    <div className="hero__title dark:text-white">
      Buy. Sell. <br />All with Milesmart.
    </div>

    <p className="hero__subtitle dark:text-[#F5F5F5]">
      Hassle-free and Affordable Used Car Marketplace
    </p>
  </div>
  <div className="hero__image-container">
    <div className="hero__image">
      <Image
        src="/heroman.png"
        alt="hero"
        fill
        style={{ objectFit: 'contain' }}
        className="object-contain"
      />
    </div>
  </div>
</div>

  );
};

export default Hero;
