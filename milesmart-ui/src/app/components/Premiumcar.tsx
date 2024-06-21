import React from 'react'

const Premiumcar = () => {
  return (
    <div className="grid justify-center grid-cols-5 gap-2 mx-12 my-12">
      <div className="flex flex-col " id="featurecard">
        <a href="/results?sk=porsche">
        <img src="/premium1.png" alt="premium1" className="object-contain w-32 h-32" />
        </a>

      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=jaguar">
        <img src="/premium2.png" alt="premium2" className="object-contain w-40 h-36" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=volvo">
        <img src="/premium3.png" alt="premium3" className="object-contain w-40 h-36" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=bmw">
        <img src="/premium4.png" alt="premium4" className="object-contain w-32 h-32" />
        </a>
      </div>

      <div className="flex flex-col feature">
        <a href="/results?sk=mercedes-benz">
        <img src="/premium5.png" alt="premium5" className="object-contain w-32 h-32" />
        </a>
      </div>
      
    </div>
  )
}

export default Premiumcar
