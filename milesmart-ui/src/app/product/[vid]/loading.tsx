import { HeaderBar } from "@/components/server/header_bar";
import { ImageGallarySkeleton } from "@/components/skeletons/image_gallary";

export default function Loading() {
    return (
      <main className="flex min-h-screen flex-col bg-neutral-200 dark:bg-neutral-900 dark:text-white">
        <HeaderBar />
  
        <div className="flex flex-none gap-4 p-4 flex-col lg:flex-row w-xl">
          <ImageGallarySkeleton linearFooter className="min-w-0 basis-2/3 xl:basis-1/2"/>
  
          <div className="flex flex-col gap-4 basis-1/3 xl:basis-1/2 animate-pulse" >
            <div className="flex rounded-md bg-white dark:bg-white/10 p-4">
              <div className="flex flex-col flex-1 gap-2">
                <div className="h-6 w-44 rounded bg-black/10 dark:bg-white/10"/>
                <div className="flex gap-1">
                  <div className="h-5 w-24 rounded bg-black/10 dark:bg-white/10"/>
                  <div className="h-5 w-32 rounded bg-black/10 dark:bg-white/10"/>
                  <div className="h-5 w-28 rounded bg-black/10 dark:bg-white/10"/>
                  <div className="h-5 w-16 rounded bg-black/10 dark:bg-white/10"/>
                </div>
                <div className="h-6 w-32 rounded bg-black/10 dark:bg-white/10"/>
              </div>
            </div>
            <div className="flex flex-col rounded-md bg-white dark:bg-white/10 p-4">
              <div className="flex flex-1 gap-2 min-w-0">
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                  <div className="h-5 max-w-56 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-44 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-64 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-56 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                </div>
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                  <div className="h-5 max-w-56 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-44 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-64 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-56 rounded bg-black/10 dark:bg-white/10" />
                  <div className="h-5 max-w-48 rounded bg-black/10 dark:bg-white/10" />
                </div>
              </div>
              <div className="text-sm mt-3 text-gray-500 dark:text-gray-400">Description</div>
              <div className="mt-1 h-64 rounded bg-black/10 dark:bg-white/10"/>
                
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
      </main>
    )
  }