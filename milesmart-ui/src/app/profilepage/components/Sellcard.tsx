import React from 'react'

const Sellcard = () => {
  return (
    <div className='flex flex-col'>
      <div className='home__text-container'>
          <h1 className='ml-10 text-2xl font-extrabold'>Your Cars</h1>
      </div>
      

      <div className='p-4 mx-10 my-4 border-2 shadow-md rounded-2xl' id='card1'>
        <div className='grid grid-cols-2'>
            <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold '>2017 Maruti Suzuki LXI</h2>
                <div className='flex flex-row gap-3'>
                    <p>25,000 KMS</p>
                    <p>Petrol</p>
                    <p>Manual</p>
                    <p>2nd Owner</p>
                </div>
                <div className='flex w-10 h-5  bg-green-500 rounded-2xl'>Sold</div>
            </div>
            <div className='col-span-1 mr-10 justify-self-end'>
                <img src="/brand1.png" alt="brand" className='w-32 h-32'/>
            </div>
        </div>
        
      </div>

      <div className='p-4 mx-10 my-4 border-2 shadow-md rounded-2xl' id='card2'>
        <div className='grid grid-cols-2'>
            <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold '>2017 Maruti Suzuki LXI</h2>
                <div className='flex flex-row gap-3'>
                    <p>25,000 KMS</p>
                    <p>Petrol</p>
                    <p>Manual</p>
                    <p>2nd Owner</p>
                </div>
            </div>
            <div className='col-span-1 mr-10 justify-self-end'>
                <img src="/brand1.png" alt="brand" className='w-32 h-32'/>
            </div>
        </div>
        
      </div>

    </div>
  )
}

export default Sellcard
