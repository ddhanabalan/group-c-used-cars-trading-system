import { CustomButton } from '../../components'
import React from 'react'

const SideBar = () => {
  return (
    <div className="flex flex-col items-center mx-6 mt-16 text-center bg-white rounded-3xl basis-1/4 h-3/4">
        <div className='flex flex-col items-center justify-center'>
      <div className="justify-center mt-8 mb-3 overflow-hidden rounded-full w-36 h-36">
        <img src="https://media.istockphoto.com/id/1316420668/vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol.jpg?s=612x612&w=0&k=20&c=AhqW2ssX8EeI2IYFm6-ASQ7rfeBWfrFFV4E87SaFhJE=" alt="profile image"
         />
      </div>   

      <div className='home__text-container'>
          <h1 className='text-2xl font-bold '>Arjun K Govind</h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 p-3 mx-5 mt-4 mb-4 border-2 border-[#f5f5f5] rounded-2xl ">
        <p className='text-center '>9874563210</p>
        <p>White Field Rd, Whitefields, Hitech City, Hyderabad, Andhra Pradesh, 500081</p>
      </div>
      <div className='space-y-3 '>
      <CustomButton
        title='Edit'
        btnType='button'
        containerStyles='text-white rounded-xl bg-black min-w-[130px]'
        
      />

      <CustomButton
        title='Log out'
        btnType='button'
        containerStyles='text-white rounded-xl bg-black min-w-[130px]'
        
      />

      </div>
      

      </div>
    </div>
    

  )
}

export default SideBar
