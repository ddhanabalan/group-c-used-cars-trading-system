"use client";

import { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import { Theme } from "@radix-ui/themes";
import { ReactElement, Suspense, useEffect, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Badge from "../components/badge";
import PropsRow from "../components/props_row";
import Card from "../components/card";
import ShareIcon from "../components/icons/share_icon";
import ReportIcon from "../components/icons/report_icon";
import { useSearchParams } from "next/navigation";
import HeaderBar from "../components/header_bar";
import FavoriteIcon from "../components/icons/favorite_icon";

function ProductView() {
  const [obj, setObj] = useState(Object())
  const [selected_Image, set_Image] = useState(0)
  const [favorite, set_favorite] = useState(false)
  const dataArr = useRef([] as { 'title': string, 'description'?: string, 'timerRef': number }[])
  const [notifications, update_notifications] = useState([] as ReactElement[])
  const vid = useSearchParams().get('vid')

  const map_data = (data: { 'title': string, 'description'?: string, 'timerRef': number}, index: number ) => 
    (
      <div className="flex flex-col min-h-16 w-72 rounded-lg px-5 py-3 relative bg-white dark:bg-gray-800 shadow-lg border dark:border-none" key={index}>
        <div className="font-semibold">{data['title']}</div>
        <div className="text-xs mt-1">{data['description']}</div>
        <button
          className="text-black hover:bg-gray-200 active:bg-gray-300 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
          onClick={() => {
            dataArr.current.splice(index, 1)
            update_notifications(dataArr.current.map(map_data))
            // update_notifications(notifications.copyWithin(-1, -1))
          }}>
          <Cross2Icon/>
        </button>
      </div>
    )
  
    const make_notification = (title: string, description?: string) => {
      const item = {
        'title': title,
        'description': description,
        'timerRef': window.setTimeout(() => { 
          // console.log('Removing '+index)
          dataArr.current.splice(dataArr.current.indexOf(item), 1)
          update_notifications(dataArr.current.map(map_data)) 
        }, 5000)
      }
  
      dataArr.current.push(item)
      update_notifications(dataArr.current.map(map_data))
    }
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('backend/vehicles/'+vid)
        if (response.status == 200) setObj(await response.json())
      }
  
      fetchData().catch((e) => console.log(e))
  
      return () => {
        dataArr.current.forEach(element => {
          window.clearTimeout(element.timerRef)
        });
      }
    }, [])
    
    let Image_bottom_skel:ReactElement[] = []
  
    for (let i = 0; i < 5; i++) {
      Image_bottom_skel.push(<Card className="h-20 w-20" key={i}/>)
    }
  
    let skel = (
      <div className="flex flex-col px-4 pb-4 self-center gap-4 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl w-full animate-pulse">
        <div className="flex">
          <div className="flex-1 w-0">
            <Card className="aspect-video"/>
            <ScrollArea className="ScrollAreaRoot w-auto">
              <ScrollAreaViewport className="ScrollAreaViewport w-auto">
                <div className="flex py-4 gap-4 w-auto justify-center mx-2">
                  {Image_bottom_skel}
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="horizontal" className="ScrollAreaScrollbar bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-gray-800">
                <ScrollAreaThumb className="ScrollAreaThumb bg-gray-400 dark:bg-gray-500" />
              </ScrollAreaScrollbar>
            </ScrollArea>
          </div>
        </div>
  
        <Card className="h-48"/>
  
        <Card className="h-48"/>
  
        <div className="flex gap-4">
          <div className="flex-1 w-0">
            <ScrollArea className="ScrollAreaRoot w-auto">
              <ScrollAreaViewport className="ScrollAreaViewport w-auto">
                <div className="flex py-4 gap-4 w-auto justify-center">
                  <Card className="h-48 w-40"/>
                  <Card className="h-48 w-40"/>
                  <Card className="h-48 w-40"/>
                  <Card className="h-48 w-40"/>
                </div>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="horizontal" className="ScrollAreaScrollbar bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-gray-800">
                <ScrollAreaThumb className="ScrollAreaThumb bg-gray-400 dark:bg-gray-500" />
              </ScrollAreaScrollbar>
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  
    return (
      <Theme appearance="light">
        <main className="flex min-h-screen flex-col justify-between dark:bg-gray-950 dark:text-white">
          <div className="flex flex-col gap-4">
            <HeaderBar/>

            {'_id' in obj? (<div className="flex flex-col px-4 pb-4 self-center gap-4 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl w-full">
              <div className="flex">
                <div className="flex-1 w-0">
                  <Card className="overflow-clip">
                    <Image alt="main_image" width={-1} height={-1} src={obj['image_urls'][selected_Image]} className="aspect-video object-contain hover:outline-2 hover:outline-black"/>
                  </Card>
                  <div className="flex overflow-auto px-2">
                    <div className="flex flex-none py-4 gap-4 w-min mx-auto">
                      {
                        obj['image_urls'].map((link:string, index:number) => {
                          return (<Card key={index} className={"h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 "+(selected_Image == index?" outline-black dark:outline-white outline":"outline-gray-400 dark:outline-gray-700 hover:outline")}>
                            <Image alt="bottom_image" onClick={() => {
                              set_Image(index)
                            }} src={link} width={-1} height={-1} className="h-full w-full object-cover"/>
                          </Card>)
                        })
                      }
                    </div>
                  </div>
                  
                </div>
              </div>

              <Card className="flex-col p-4 w-auto">
                <div className="flex">
                  <div className="flex flex-col flex-1">
                    <div className="text-lg font-bold">
                      {obj['year']} {obj['manufacturer']} {obj['model']}
                    </div>
                    <div className="flex gap-1">
                      <Badge text={obj['odometer']+" KM"} />
                      <Badge text={obj['fuel']} />
                      <Badge text={obj['transmission']} />
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      &#8377; {obj['price']}/-
                    </div>
                  </div>
                  <div className="flex flex-col mr-6 gap-2">
                    <div className="flex flex-1 gap-2 flex-row-reverse ">
                      <button className="
                      px-2 py-2 duration-150 rounded-md
                      fill-black dark:fill-white 
                      hover:bg-gray-300 dark:hover:bg-gray-800 
                      active:bg-gray-400 dark:active:bg-gray-700" 
                      onClick={ () => 
                        make_notification('Feature Unavailable', 'The Share feature is under development. Hope the next demo will include that')
                      }>
                        <ShareIcon className="h-5 w-5"/>
                      </button>

                      <button className="
                      px-2 py-2 duration-150 rounded-md
                      fill-black dark:fill-white 
                      hover:bg-gray-300 dark:hover:bg-gray-800 
                      active:bg-gray-400 dark:active:bg-gray-700" 
                      onClick={ () => 
                        set_favorite(!favorite)
                      }>
                        <FavoriteIcon toggled={favorite} className="h-5 w-5"/>
                      </button>
                        
                      <button className="
                      px-2 py-2 duration-150 rounded-md h-min
                      fill-red-700 dark:fill-red-500
                      hover:bg-gray-300 dark:hover:bg-gray-800 
                      active:bg-gray-400 dark:active:bg-gray-700"
                      onClick={ () => 
                        make_notification('Feature Unavailable', 'The Report feature is under development. Hope the next demo will include that')
                      }>
                        <ReportIcon className="h-5 w-5"/>
                      </button>
                    </div>
                    <div className="flex flex-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="
                            px-4 py-1 duration-150 rounded-md h-min w-full
                            text-white 
                            bg-black dark:bg-white/20
                            hover:bg-gray-800 dark:hover:bg-white/25
                            active:bg-gray-700 dark:active:bg-white/30">Bid Now</button>
                          </DialogTrigger>
                          <DialogPortal>
                            <DialogOverlay className="bg-black/30 dark:bg-black/50 fixed inset-0" />
                            <DialogContent className="
                              fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
                              max-h-[85vh] w-[90vw] max-w-[450px] rounded-lg shadow-lg outline-none overflow-clip
                              bg-white dark:bg-gray-900 dark:text-white
                            ">
                              <div className="flex h-full">
                                <div className="bg-black dark:bg-white/10 w-20 h-auto"></div>
                                <div className="flex flex-col flex-1 h-min px-4 pb-4">
                                  <div className="text-xl font-semibold w-auto text-center p-2 mt-3">Make an Offer</div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400 ml-1 mt-4 mb-1">Your Price</div>
                                  <input className="bg-gray-100 dark:bg-gray-800 placeholder:text-gray-400 rounded px-2 py-1 outline-none" placeholder={obj['price']}/>
                                  <div className="text-xs text-green-600 bg-green-100 dark:text-green-200 dark:bg-green-800 w-min text-nowrap py-1 px-4 mt-2 self-end rounded-full ">AI Suggested Fair Price &#8377; {obj['price']}</div>
                                  <DialogClose asChild>
                                    <button className="
                                      px-4 py-1 mt-8 duration-150 rounded-md h-min w-full
                                      text-white 
                                      bg-black dark:bg-white/20
                                      hover:bg-gray-800 dark:hover:bg-white/25
                                      active:bg-gray-700 dark:active:bg-white/30" onClick={ () => 
                                        make_notification('Feature Unavailable', 'The Bid Now feature is under development. Hope the next demo will include that')
                                      }>Bid Now</button>
                                  </DialogClose>
                                </div>
                              </div>
                              <DialogClose asChild>
                                <button
                                  className="text-black hover:bg-gray-200 active:bg-gray-300 dark:text-white dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
                                  aria-label="Close"
                                >
                                  <Cross2Icon/>
                                </button>
                              </DialogClose>
                              {/* <div className="mt-[25px] flex justify-end">
                                <DialogClose asChild>
                                  <button className="bg-black text-white hover:bg-gray-900 active:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:active:bg-gray-300 rounded px-4 py-1 focus:outline-none">
                                    Bid Now
                                  </button>
                                </DialogClose>
                              </div>
                              */}
                            </DialogContent>
                          </DialogPortal>
                        </Dialog>
                    </div>
                  </div>
                </div>

                {/* <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">Description</div>
                <div className="ml-4 relative">{obj['description']}</div> */}
              </Card>

              <Card className="flex-col p-4">
                <table className="table-fixed">
                  <tbody>
                    <PropsRow type="Model" value={obj['model']} />
                    <PropsRow type="Transimission" value={obj['transmission']} />
                    <PropsRow type="Fuel Type" value={obj['fuel']} />
                    <PropsRow type="Odometer" value={obj['odometer']+" KM"} />
                    <PropsRow type="Year" value={obj['year']} />
                    {('condition' in obj) ? (<PropsRow type="Condition" value={obj['condition']} />): (<></>)}
                    {('drive' in obj) ? (<PropsRow type="Drive" value={obj['drive']} />): (<></>)} 
                    {/* <PropsRow type="Drive" value={obj['drive']} /> */}
                    <PropsRow type="Verified" value="No" />
                  </tbody>
                </table>
                <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">Description</div>
                <div className="ml-4 relative">{obj['description']}</div>
              </Card>

              <div className="flex gap-4">
                <div className="flex-1 w-0">
                  <ScrollArea className="ScrollAreaRoot w-auto">
                    <ScrollAreaViewport className="ScrollAreaViewport w-auto">
                      <div className="flex py-4 gap-4 w-auto justify-center animate-pulse">
                        <Card className="h-48 w-40"/>
                        <Card className="h-48 w-40"/>
                        <Card className="h-48 w-40"/>
                        <Card className="h-48 w-40"/>
                      </div>
                    </ScrollAreaViewport>
                    <ScrollAreaScrollbar orientation="horizontal" className="ScrollAreaScrollbar bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-gray-800">
                      <ScrollAreaThumb className="ScrollAreaThumb bg-gray-400 dark:bg-gray-500" />
                    </ScrollAreaScrollbar>
                  </ScrollArea>
                </div>
              </div>
            </div>): skel}
          </div>
          
          <div className="flex flex-col gap-2 h-min w-min absolute bottom-3 right-4">
            {notifications}
          </div>
        </main>
      </Theme>
    );
}

export default function Product() {
  return <Suspense>
    <ProductView/>
  </Suspense>
}