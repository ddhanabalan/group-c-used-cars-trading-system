import React from 'react'

const Popularcar = () => {
  return (
    <div className="grid justify-center grid-cols-5 gap-2 mx-12 my-12">
      <div className="flex flex-col " id="featurecard">
        <a href="/results?sk=ford">
        <img src="/brand1.png" alt="brand1" className=" object-contain w-40 h-36" />
        </a>

      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=chevrolet">
        <img src="/brand2.png" alt="brand2" className="object-contain w-40 h-36" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=toyota">
        <img src="/brand3.png" alt="brand3" className="object-contain w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=ram">
        <img src="/brand4.png" alt="brand4" className="object-contain w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=jeep">
        <img src="/brand5.png" alt="brand5" className="object-contain w-32 h-32" />
        </a>
      </div>
      
    </div>
  )
}

export default Popularcar
