'use client'

import { usePathname } from "next/navigation";
import { ShareIcon } from "../icons/share";
import { ComponentAttributes } from "../atrributes";

export function ShareButton({id, hidden}: ComponentAttributes & {id: string}) {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Share Vehicle!',
            text: 'Share the vehicle to your friends',
            url: `http://localhost:3000/vehicle/${id}`,
          });
        //   console.log('Content shared successfully');
        } catch (error) {
        //   console.error('Error sharing content:', error);
        }
      } else {
        alert('Web Share API not supported in this browser');
      }
    };
  
    return (
        <button hidden={hidden} className={`
            p-2 duration-150 rounded-md
            fill-black dark:fill-white 
            hover:bg-black/10 active:bg-black/20 
            dark:hover:bg-white/10 dark:active:bg-white/20
            disabled:opacity-50 disabled:hover:bg-transparent`} 
            onClick={(e) => {
                e.stopPropagation();
                handleShare();
            }}>
                <ShareIcon className={`h-5 w-5`}/>
            </button>
    );
};