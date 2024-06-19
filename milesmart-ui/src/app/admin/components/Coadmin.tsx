import { CustomButton } from '@/app/components'
import React from 'react'


const Coadmin = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex justify-between mt-8 items-center'>
            <div className='home__text-container'>
                <h1 className='ml-10 p-3 text-2xl font-extrabold'>Co-admins</h1>
            </div>
            <div className=' mx-14 size-min{
                width: min-content;
                height: min-content;
            }'>
                <CustomButton
                    title='+ Add Co-admin'
                    btnType='button'
                    containerStyles='text-white rounded-xl bg-black  min-w-[100px]'
                />
            </div>
        </div>

      <div className='p-4 mx-10 my-4 border-2 shadow-md rounded-2xl' id='card1'>
        <div className='grid grid-cols-2'>

            <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold '>Sreehari ram</h2>
                <div className='flex flex-row gap-3'>
                    <p>Coadmin1</p>
                    <p>Team A</p>
                    <p>Grade 2</p>
                    <p>More</p>
                </div>
            </div>
            <div className='col-span-1 size-40 mr-10 justify-self-end'>
            <img src="https://clipground.com/images/indian-man-png-8.png" alt="profile image"
         />
      </div>   
            

        </div>
        <div className='ml-10'>
        <CustomButton
        title='Remove'
        btnType='button'
        containerStyles='text-white rounded-xl mb-3 bg-black min-w-[100px]'
        
      />
           </div>
        
          </div>

      <div className='p-4 mx-10 my-4 border-2 shadow-md rounded-2xl' id='card2'>
        <div className='grid grid-cols-2'>
            <div className='self-center col-span-1 ml-10 home__text-container'>
                <h2 className='text-xl font-bold '>Dhruv rathore</h2>
                <div className='flex flex-row gap-3'>
                    <p>Coadmin2</p>
                    <p>Team A</p>
                    <p>Grade 2</p>
                    <p>More</p>
                </div>
            </div>
            <div className='col-span-1 size-40 mr-10 justify-self-end'>
            <img src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149662.png" alt="profile image"
         />
      </div>   
        
        </div>
        <div className=' ml-10'>
        <CustomButton
        title='Remove'
        btnType='button'
        containerStyles='text-white rounded-xl mb-3 bg-black min-w-[100px]'
        
      />
           </div>
      </div>

    </div>
  )
}

export default Coadmin