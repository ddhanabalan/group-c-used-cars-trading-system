'use client'

import { ComponentAttributes, User } from "@/components/atrributes";
import { useMemo, useState } from "react";
import Image from "next/image";
import { EmailIcon } from "@/components/icons/email";
import { PhoneIcon } from "@/components/icons/phone";
import { useRouter, useSearchParams } from "next/navigation";
import { CloseIcon } from "@/components/icons/close";

export function BuyNowDialog({user,className}: ComponentAttributes & {user:User}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hidden = useMemo(() => !searchParams.has('owner_dg') || searchParams.get('owner_dg') != 'true', [searchParams]);

    function closeDialog(e:any) {
        e.stopPropagation();
        router.back()
    }

    if (hidden) return <div hidden />
    
    return (
        <div className="fixed bg-black/70 h-screen w-screen z-20 top-0 flex flex-col items-center justify-center" onClick={(e) => closeDialog(e)}>
            <div className="flex h-min bg-white dark:bg-neutral-900 rounded-lg overflow-clip relative" onClick={(e) => e.stopPropagation()}>
                <div className="bg-black dark:bg-[#282828] w-20 h-auto"></div>
                <div className="flex flex-col flex-1 h-min px-4 pb-4">
                <div className={`flex flex-col min-w-64 min-h-64 py-3 pl-4 pr-3 px-3 gap-4 rounded-xl  dark:text-white relative ${className}`}>
                    <Image height={-1} width={-1} alt="profile" referrerPolicy="no-referrer" src={user.picture} className="w-28 h-28 my-4 self-center rounded-full dark:bg-white/10 bg-black/10"/>
                    <div className="flex flex-col flex-1 items-center">
                        <div className="text-xl font-semibold">{user.name}</div>
                        <div>
                            <a href={`tel:${user.phone}`} className={`flex mt-2 flex-row bg-black/5 dark:bg-white/5 self-stretch px-4 py-3 my-3 rounded-lg gap-2 ${user.phone ? '': 'hidden'}`}>
                                <PhoneIcon className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                                <div className="text-sm text-neutral-700 dark:text-neutral-200">{user.phone}</div>
                            </a>

                            <a href={`mailto:${user.email}`} className="flex flex-row mt-2 bg-black/5 dark:bg-white/5 self-stretch px-4 py-3 my-3 rounded-lg gap-2">
                                <EmailIcon className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                                <div className="text-sm text-neutral-700 dark:text-neutral-200">{user.email}</div>
                            </a>
                        </div>
                        
                    </div>
                </div>
                <button
                className="text-black hover:bg-neutral-200 active:bg-neutral-300 dark:text-white dark:hover:bg-neutral-700 dark:active:bg-neutral-600 rounded-full px-1.5 py-1.5 focus:outline-none absolute top-3 right-3"
                aria-label="Close"
                onClick={(e) => closeDialog(e)}>
                    <CloseIcon className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                </button>
            </div>
        </div></div>
    )
}