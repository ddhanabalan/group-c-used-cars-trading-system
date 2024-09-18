import { backendFetch } from "@/app/actions";
import { User, Vehicle } from "@/components/atrributes";
import { FavoriteButton } from "@/components/client/favourites_button";
import { ImageGallary } from "@/components/client/image_gallary";
import ReportIcon from "@/components/icons/report_icon";
import { ShareIcon } from "@/components/icons/share";
import { Badge } from "@/components/server/badge";
import { HeaderBar } from "@/components/server/header_bar";
import { notFound } from "next/navigation";
import PropsRow from "./components/props_row";
import { setTimeout } from "timers/promises";
import { BuyNowButton } from "./components/buynow_button";
import { BuyNowDialog } from "./components/buynow_dialog";
import { ShareButton } from "@/components/client/share_button";


export default async function Product({ params }: { params: { vid: string; }; }) {
  const [vehicle_resp, user_resp] = await Promise.all([backendFetch(`vehicles/${params.vid}`), backendFetch(`user`)]);
  if (!vehicle_resp.ok) notFound();
  const vehicle: Vehicle = vehicle_resp.data
  const user: User = user_resp.data
  const authenticated = user_resp.ok;

  console.log(vehicle.owner._id == user._id);

  // await setTimeout(3000)

  return (
    <main className="flex min-h-screen flex-col bg-neutral-100 dark:bg-neutral-900 dark:text-white">
      <HeaderBar />

      <div className="flex flex-none gap-4 p-4 flex-col lg:flex-row w-xl">
        <ImageGallary linearFooter src={vehicle.image_urls} type='imageUrls' className="min-w-0 basis-2/3 xl:basis-1/2"/>

        <div className="flex flex-col gap-4 basis-1/3 xl:basis-1/2" >
          <div className="flex rounded-md bg-white dark:bg-white/10 p-4">
            <div className="flex flex-col flex-1 gap-2">
              <div className="text-xl font-bold">
                {vehicle.manufacturer} {vehicle.model}
              </div>
              <div className="flex gap-1 flex-wrap">
                <Badge text={vehicle.year.toString()} className="dark:bg-[#343434]" />
                <Badge text={vehicle.odometer + " KM"} className="dark:bg-[#343434]" />
                <Badge text={vehicle.fuel} className="dark:bg-[#343434]" />
                <Badge text={vehicle.transmission} className="dark:bg-[#343434]" />
              </div>
              <div className="mt-2 text-md font-semibold">
                $ {vehicle['price']}
              </div>
            </div>
            <div className="flex flex-col mr-4 gap-2 self-center">
              <div className="flex flex-1 gap-2 items-center flex-row-reverse ">
                {/* <button className="
                  px-2 py-2 duration-150 rounded-md h-min
                  fill-black dark:fill-white 
                  hover:bg-black/10 active:bg-black/20 
                  dark:hover:bg-white/10 dark:active:bg-white/20
                  disabled:opacity-50 disabled:hover:bg-transparent"
                  disabled={true}>
                  <ShareIcon className="h-5 w-5" />
                </button> */}
                <ShareButton id={vehicle._id}/>

                <FavoriteButton vehicle={vehicle} hidden={!authenticated} />
                <button className="
                  px-2 py-2 duration-150 rounded-md h-min
                  fill-red-500 dark:fill-red-500 
                  hover:bg-red-500/10 active:bg-red-500/20 
                  dark:hover:bg-red-500/10 dark:active:bg-red-500/20
                  disabled:opacity-50 disabled:hover:bg-transparent"
                  disabled={true}>
                  <ReportIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1">
                <BuyNowButton hidden={vehicle.owner._id == user._id}/>
              <button disabled hidden={vehicle.owner._id != user._id} className="
                  px-4 py-1 duration-150 rounded-md h-min w-full
                  text-white 
                  bg-black dark:bg-white/20
                  disabled:opacity-50 ">Edit</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-white dark:bg-white/10 p-4">
            <table className="table-fixed">
              <tbody>
                <PropsRow type="Model" value={vehicle.model} />
                <PropsRow type="Transimission" value={vehicle.transmission} />
                <PropsRow type="Fuel Type" value={vehicle.fuel} />
                <PropsRow type="Odometer" value={vehicle.odometer+" KM"} />
                <PropsRow type="Year" value={vehicle.year.toString()} />
                {('condition' in vehicle) ? (<PropsRow type="Condition" value={vehicle.condition ?? ''} />): (<></>)}
                {('drive' in vehicle) ? (<PropsRow type="Drive" value={vehicle.drive ?? ''} />): (<></>)}
                <PropsRow type="Verified" value="No" />
              </tbody>
            </table>
            <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">Description</div>
            <div className="ml-4 relative">{vehicle.description}</div>
          </div>
        </div>
      </div>

      <div className="flex overflow-auto px-1">
          <div className={`flex py-2 gap-3 mx-auto flex-none animate-pulse`}>
            <div className="rounded-md flex-none bg-white dark:bg-white/10 h-48 w-40"/>
            <div className="rounded-md flex-none bg-white dark:bg-white/10 h-48 w-40"/>
            <div className="rounded-md flex-none bg-white dark:bg-white/10 h-48 w-40"/>
            <div className="rounded-md flex-none bg-white dark:bg-white/10 h-48 w-40"/>
          </div>
        </div>
        <BuyNowDialog user={vehicle.owner}/>
    </main>
  );
}
