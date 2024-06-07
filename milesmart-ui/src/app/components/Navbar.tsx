import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className='absolute z-10 w-full'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex items-center justify-center'>
        <Image
          src='/logowhite.svg'
          alt='logo'
          width={118}
          height={50}
          className='object-contain'
        />
      </Link>
      
      <div className="flex flex-row gap-2">
       
      
        <CustomButton
          title='Buy Car'
          btnType='button'
          containerStyles='text-black font-bold rounded-xl bg-[#f6f6f6] min-w-[130px]'
        />

        <Link href='/sellerpage'>
        <CustomButton
                title='Sell Car '
                btnType='button'
                containerStyles='text-black font-bold rounded-xl bg-[#f6f6f6] min-w-[130px]'
              />
        </Link>
        <Link href='/profilepage'>
          <CustomButton
            title='Sign in'
            btnType='button'
            containerStyles='text-white rounded-xl bg-black min-w-[130px]'
          />
        </Link>
        
      </div>
      

      
    </nav>
  </header>
);

export default NavBar;
