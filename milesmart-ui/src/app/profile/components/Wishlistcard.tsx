import React from 'react'
import { CustomButton } from '../../components'
import { useRouter } from 'next/navigation'

export default function wishlistcard({wishlist, on_deleted}: {wishlist?: any[], on_deleted?: (index: number) => void}) {
  const router = useRouter()

  return (
    <div hidden={wishlist == undefined} className='flex flex-col gap-2 px-10'>
      <div className='home__text-container'>
          <h1 className='ml-4 mb-2 text-2xl font-extrabold dark:text-white'>Your Wishlist</h1>
      </div>

      {wishlist?.map((item, index) => {
        return (
          <div className='p-2 border-2 dark:border-0 py-6 shadow-md dark:bg-[#181818ac] rounded-2xl h-fit' id='card1'  onClick={() => { router.push(`/product?vid=${item['vehicle']["_id"]}`) }}>
            <div className='grid grid-cols-2'>
              <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold dark:text-white '>{item['vehicle']['manufacturer']} {item['vehicle']['model']}</h2>
                <div className='flex text-sm flex-row gap-3 dark:text-white'>
                  <p>{item['vehicle']['year']}</p>
                  <p>{item['vehicle']['odometer']} KMS</p>
                  <p>{item['vehicle']['fuel']}</p>
                  <p>{item['vehicle']['transmission']}</p>
                </div>
              </div>
              <div className='col-span-1 mr-10 justify-self-end content-center'>
                <button className='w-32 h-12  rounded-xl bg-black hover:bg-gray-800 dark:bg-[#303030] dark:hover:bg-white/10 text-white font-medium' onClick={(e) => {
                  e.stopPropagation()
                  fetch(`backend/user/wishlist/${item['_id']}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                  })
                  if (on_deleted) on_deleted(index)
                }}>Remove</button>
              </div>
            </div>
          </div>
        )
      })}

      
    </div>
  )
}
