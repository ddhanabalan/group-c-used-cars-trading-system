import CallIcon from '@/app/components/icons/call_icon'
import { CustomButton } from '../../components'
import React from 'react'
import IdIcon from '@/app/components/icons/id_icon'
import EmailIcon from '@/app/components/icons/email_icon'
import EditIcon from '@/app/components/icons/edit_icon'
import LogoutIcon from '@/app/components/icons/logout_icon'

const SideBar = () => {
  return (
    <div className="flex flex-col py-10 items-center mx-6 text-center bg-white dark:bg-[#282828] rounded-3xl basis-1/4 h-fit">
      <div className='flex flex-col items-center justify-center'>
      <div className="justify-center mb-3 overflow-hidden rounded-full w-36 h-36">
        <img src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" alt="profile image"
         />
      </div>   

      <div className='home__text-container'>
          <div className='text-2xl font-bold dark:text-white '>Arjun K Govind</div>
      </div>

      <div className="flex flex-col gap-0 p-3 mx-5 mt-4 mb-4 text-right border-2 border-[#f5f5f5] dark:bg-[#181818] dark:border-0 rounded-2xl ">
      <div className='flex  gap-2'>
          <div className=' h-5 w-5'><IdIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className=' dark:text-[#F5F5F5] '>ID302663</div>
        </div>
        <div className='flex  gap-2'>
          <div className=' h-5 w-5'><CallIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className='dark:text-[#F5F5F5] '>9874563210</div>
        </div>
        <div className='flex  gap-2'>
          <div className=' h-5 w-5'><EmailIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className='dark:text-[#F5F5F5]'>akshyakgovid@gmail.com</div>
        </div>
      </div>
      <div className='flex flex-col gap-2 '>
      <button className='w-32 h-10  rounded-xl bg-black text-white font-medium'><div className='flex justify-center gap-1'><EditIcon className='w-5 h-5 fill-white'/>Edit</div></button>
      <button className='w-32 h-10 rounded-xl bg-black text-white font-medium'><div className='flex justify-center gap-1'><LogoutIcon className='w-5 h-5 fill-white'/>Log out</div></button>
      </div>
      

      </div>
    </div>
    

  )
}

export default SideBar
