import React from 'react';
import Image from 'next/image';

const Popularcar = () => {
  return (
    <div className="grid justify-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mx-5 my-12">
    <div className="flex flex-col items-center" id="featurecard">
      <a href="/results?sk=ford" className="block">
        <div className="relative w-32 h-32 sm:w-40 sm:h-36">
          <Image 
            src="/brand1.png" 
            alt="brand1" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="object-contain" 
          />
        </div>
      </a>
    </div>
  
    <div className="flex flex-col items-center">
      <a href="/results?sk=chevrolet" className="block">
        <div className="relative w-36 h-36 sm:w-40 sm:h-36">
          <Image 
            src="/brand2.png" 
            alt="brand2" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="object-contain" 
          />
        </div>
      </a>
    </div>
  
    <div className="flex flex-col items-center">
      <a href="/results?sk=toyota" className="block">
        <div className="relative w-32 h-32 sm:w-40 sm:h-36">
          <Image 
            src="/brand3.png" 
            alt="brand3" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="object-contain" 
          />
        </div>
      </a>
    </div>
  
    <div className="flex flex-col items-center">
      <a href="/results?sk=ram" className="block">
        <div className="relative w-32 h-32 sm:w-48 sm:h-40">
          <Image 
            src="/brand4.png" 
            alt="brand4" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="object-contain" 
          />
        </div>
      </a>
    </div>
  
    <div className="flex flex-col items-center">
      <a href="/results?sk=jeep" className="block">
        <div className="relative w-32 h-32 sm:w-40 sm:h-36">
          <Image 
            src="/brand5.png" 
            alt="brand5" 
            fill 
            style={{ objectFit: 'contain' }} 
            className="object-contain" 
          />
        </div>
      </a>
    </div>
  </div>
  
  );
};

export default Popularcar;
