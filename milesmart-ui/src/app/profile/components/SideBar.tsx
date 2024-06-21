import CallIcon from '@/app/components/icons/call_icon'
import { CustomButton } from '../../components'
import React, { useEffect } from 'react'
import IdIcon from '@/app/components/icons/id_icon'
import EmailIcon from '@/app/components/icons/email_icon'
import EditIcon from '@/app/components/icons/edit_icon'
import LogoutIcon from '@/app/components/icons/logout_icon'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SideBar({user_info}: {user_info?: any}) {
  const router = useRouter()

  if (user_info != undefined) return (
    <div className="flex flex-col py-10 mx-6 text-center bg-white dark:bg-[#282828] rounded-3xl basis-1/4 h-fit min-w-80 min-h-48">
      {/* <div className='flex flex-col justify-center'> */}
      <Image src={user_info['picture']} alt="profile image" width={-1} height={-1} className="justify-center self-center mb-3 rounded-full w-36 h-36"/>

      <div className='text-2xl font-bold self-center dark:text-white '>{user_info['name']}</div>
      <div className="flex flex-col gap-0 m-4 py-3 px-6 text-right bg-[#f8f8f8] dark:bg-[#181818] dark:border-0 rounded-lg">
        <div className='flex  gap-2'>
          <div className=' h-5 w-5'><IdIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className=' dark:text-[#F5F5F5] '>{user_info['_id']}</div>
        </div>
        <div className='flex  gap-2'>
          <div className=' h-5 w-5'><CallIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className='dark:text-[#F5F5F5] '>{user_info['phone']}</div>
        </div>
        <div className='flex  gap-2'>
          <div className=' h-5 w-5'><EmailIcon className=' dark:fill-[#F5F5F5]'/></div>
          <div className='dark:text-[#F5F5F5]'>{user_info['email']}</div>
        </div>
      </div>
      <div className='flex flex-col gap-2 self-center'>
        <button disabled className='w-32 h-10 dark:disabled:bg-[#181818] disabled:bg-[#404040] rounded-xl hover:bg-gray-800 dark:hover:bg-white/10 bg-black text-white font-medium'><div className='flex justify-center gap-1'><EditIcon className='w-5 h-5 fill-white'/>Edit</div></button>
        <button className='w-32 h-10 rounded-xl bg-black hover:bg-gray-800 dark:hover:bg-[#404040] text-white font-medium'><div className='flex justify-center gap-1' onClick={() => {
          const token_id = localStorage.getItem('token_id')
          const token = localStorage.getItem('token')
          localStorage.removeItem('token_id')
          localStorage.removeItem('token')
          fetch(`backend/user/tokens/${token_id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
          router.replace('/')
        }}><LogoutIcon className='w-5 h-5 fill-white'/>Log out</div></button>
      </div>
      {/* </div> */}
    </div>
  )

  else return (
    <div className="flex flex-col py-10 mx-6 text-center bg-white dark:bg-[#282828] rounded-3xl basis-1/4 h-fit min-w-80 min-h-48 gap-2">
      {/* <div className='flex flex-col justify-center'> */}
      <div className='self-center min-w-36 bg-[#f0f0f0] dark:bg-[#383838] min-h-36 rounded-full animate-pulse'/>   

      <div className='self-center mt-4 min-w-20 bg-[#f0f0f0] dark:bg-[#383838] min-h-7 rounded-lg animate-pulse'/>

      <div className='bg-[#f0f0f0] dark:bg-[#383838] min-h-28 rounded-lg animate-pulse m-4'/>

      <div className='self-center min-w-28 bg-[#f0f0f0] dark:bg-[#383838] min-h-10 rounded-lg animate-pulse'/>
      <div className='self-center min-w-28 bg-[#f0f0f0] dark:bg-[#383838] min-h-10 rounded-lg animate-pulse'/>
      {/* <div className='flex flex-col gap-2 self-center'>
        <button className='w-32 h-10  rounded-xl bg-black text-white font-medium'><div className='flex justify-center gap-1'><EditIcon className='w-5 h-5 fill-white'/>Edit</div></button>
        <button className='w-32 h-10 rounded-xl bg-black text-white font-medium'><div className='flex justify-center gap-1'><LogoutIcon className='w-5 h-5 fill-white'/>Log out</div></button>
      </div> */}
      {/* </div> */}
    </div>
  )
}
