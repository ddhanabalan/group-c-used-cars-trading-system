import React from 'react';
import Image from 'next/image';

const Premiumcar = () => {
  return (
    <div className="grid justify-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mx-5 my-12">
  <div className="flex flex-col items-center" id="featurecard">
    <a href="/results?sk=porsche" className="block">
      <div className="relative w-32 h-32">
        <Image 
          src="/premium1.png" 
          alt="premium1" 
          fill 
          style={{ objectFit: 'contain' }} 
          className="object-contain" 
        />
      </div>
    </a>
  </div>

  <div className="flex flex-col items-center">
    <a href="/results?sk=jaguar" className="block">
      <div className="relative w-40 h-36">
        <Image 
          src="/premium2.png" 
          alt="premium2" 
          fill 
          style={{ objectFit: 'contain' }} 
          className="object-contain" 
        />
      </div>
    </a>
  </div>

  <div className="flex flex-col items-center">
    <a href="/results?sk=volvo" className="block">
      <div className="relative w-40 h-36">
        <Image 
          src="/premium3.png" 
          alt="premium3" 
          fill 
          style={{ objectFit: 'contain' }} 
          className="object-contain" 
        />
      </div>
    </a>
  </div>

  <div className="flex flex-col items-center">
    <a href="/results?sk=bmw" className="block">
      <div className="relative w-32 h-32">
        <Image 
          src="/premium4.png" 
          alt="premium4" 
          fill 
          style={{ objectFit: 'contain' }} 
          className="object-contain" 
        />
      </div>
    </a>
  </div>

  <div className="flex flex-col items-center">
    <a href="/results?sk=mercedes-benz" className="block">
      <div className="relative w-32 h-32">
        <Image 
          src="/premium5.png" 
          alt="premium5" 
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

export default Premiumcar;
