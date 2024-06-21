import { useRouter } from 'next/navigation'
import React from 'react'

export default function Sellcard({vehicles, on_deleted}: {vehicles?: any[], on_deleted?: (index: number) => void}) {
  const router = useRouter()
  // if (vehicles == undefined) return (<></>)
  return (
    <div hidden={vehicles == undefined} className='flex flex-col gap-2 px-10'>
      <div className='home__text-container'>
          <h1 className='ml-4 mb-2 text-2xl font-extrabold dark:text-white'>Your Cars</h1>
      </div>
      
      {vehicles?.map((v, i) => {
        return (
          <div className=' p-2 border-2 dark:border-0 py-6 shadow-md dark:bg-[#181818ac] rounded-2xl h-fit' id='card1'  onClick={() => { router.push(`/product?vid=${v["_id"]}`) }}>
            <div className='grid grid-cols-2 '>
              <div className='self-center col-span-1 gap-1 ml-10 home__text-container'>
                <div className=' flex flex-row '>
                  <h2 className='text-xl font-bold dark:text-white '>{v['manufacturer']} {v['model']}</h2>
                {/* <div className='flex w-fit ml-3 self-center px-4 py-0.5 rounded-full h-fit bg-green-300 text-green-700 dark:bg-green-700 dark:text-green-300 place-items-center justify-center'><div className=' text-xs font-semibold'>Sold</div></div>  */}
                </div>
          
                <div className=' text-sm flex flex-row gap-3 dark:text-white'>
                  <p>{v['year']}</p>
                  <p>{v['odometer']} KMS</p>
                  <p>{v['fuel']}</p>
                  <p>{v['transmission']}</p>
                  {/* <p>2nd Owner</p> */}
                </div>
                  
              </div>
              <div className='col-span-1 mr-10 justify-self-end content-center'>
                <button className='w-32 h-12  rounded-xl hover:bg-gray-800 bg-black dark:bg-[#303030] dark:hover:bg-white/10 text-white font-medium' onClick={(e) => {
                  e.stopPropagation()
                  if (on_deleted) on_deleted(i)
                }}>Remove</button>
              </div>
            </div>
          </div>
        )
      })}

          

      {/* <div className=' p-2 border-2 dark:border-0 py-6 shadow-md dark:bg-[#181818] rounded-2xl h-fit' id='card1'>
        <div className='grid grid-cols-2 '>
          <div className='self-center col-span-1 gap-1 ml-10 home__text-container'>
            <div className=' flex flex-row '>
              <h2 className='text-xl font-bold dark:text-white '>Maruti Suzuki LXI</h2>
            <div className='flex w-fit ml-3 self-center px-4 py-0.5 rounded-full h-fit bg-green-300 text-green-700 place-items-center justify-center'><div className=' text-xs font-semibold'>Sold</div></div> 
            </div>
      
            <div className=' text-sm flex flex-row gap-3 dark:text-white'>
              <p>2017</p>
              <p>25,000 KMS</p>
              <p>Petrol</p>
              <p>Manual</p>
              <p>2nd Owner</p>
            </div>
              
          </div>
          <div className='col-span-1 mr-10 justify-self-end content-center'>
            <button className='w-32 h-12  rounded-xl bg-black text-white font-medium'>Remove</button>
          </div>
        </div>
      </div> */}

    </div>
  )
}