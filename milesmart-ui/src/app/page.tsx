import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
import Popularcar from "./components/Popularcar";
import Premiumcar from "./components/Premiumcar";


export default async function Home() {


  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width bg-[#F5F5F5]' id='feature'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>How Milesmart Works</h1>
          <p>You’ll love the way you buy the car more than your car ! </p>
        </div>
        <Hero2 />
      </div>

      <div className='mt-12 padding-x padding-y max-width' id='Suggested'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Suggested</h1>
          <p>We recommend checking out what's in your vicinity </p>
          
        </div>
      </div>

      <div className='grid grid-cols-2 mt-12 padding-x padding-y max-width' id='sellyourcar'>
        <div className='my-16 ml-24 home__text-container'>
          <h1 className='text-4xl font-extrabold'>Sell your Car</h1>
          <p className="text-xl font-medium ">Boost your visibility with Milesmart </p>
          <p className="">MileSmart offers the finest automated audience selection, guaranteeing genuine and engaged buyers from your local and nearby areas. Sign up now to sell your cars online.</p>
          
        </div>
        <img src="/sellyourcar.jpg" alt="sellyourcarimage" className="w-3/4 mx-10 " />
      </div>

      <div className='mt-12 padding-x padding-y max-width' id='popularcars'>
        <div className='flex items-center justify-center '>
          <h1 className='text-5xl font-extrabold text-center '>Popular Brands. You might like.</h1>
        </div>
        <Popularcar />
      </div>

      <div className='mt-12 padding-x padding-y max-width' id='popularcars'>
        <div className='flex items-center justify-center '>
          <h1 className='text-5xl font-extrabold text-center '>Begin Your Search for Premium Cars</h1>
        </div>
        <Premiumcar />
      </div>
      
    </main>
  );
}
