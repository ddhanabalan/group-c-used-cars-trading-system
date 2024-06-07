import React from 'react'

const Premiumcar = () => {
  return (
    <div className="grid justify-center grid-cols-5 gap-2 mx-12 my-12">
      <div className="flex flex-col " id="featurecard">
        <a href="">
        <img src="/premium1.png" alt="premium1" className="object-cover w-32 h-32" />
        </a>

      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/premium2.png" alt="premium2" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/premium3.png" alt="premium3" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/premium4.png" alt="premium4" className="object-cover w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="">
        <img src="/premium5.png" alt="premium5" className="object-cover w-32 h-32" />
        </a>
      </div>
      
    </div>
  )
}

export default Premiumcar
