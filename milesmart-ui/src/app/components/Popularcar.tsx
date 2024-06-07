import React from 'react'

const Popularcar = () => {
  return (
    <div className="grid justify-center grid-cols-5 gap-2 mx-12 my-12">
      <div className="flex flex-col " id="featurecard">
        <a href="">
        <img src="/brand1.png" alt="brand1" className="object-cover w-32 h-32" />
        </a>

      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/brand2.png" alt="brand2" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/brand3.png" alt="brand3" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/brand4.png" alt="brand4" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/brand5.png" alt="brand5" className="object-cover w-32 h-32" />
        </a>
      </div>
      
    </div>
  )
}

export default Popularcar
