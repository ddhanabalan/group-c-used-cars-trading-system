'use client'

import Image from "next/image";
import { ComponentAttributes, User} from "../../../components/atrributes";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions";
import { PhoneIcon } from "@/components/icons/phone";
import { EditIcon } from "@/components/icons/edit";
import { EmailIcon } from "@/components/icons/email";
import { LogoutIcon } from "@/components/icons/logout";
import { TrashIcon } from "@/components/icons/trash";

type ProfileCardAttributes = ComponentAttributes & { 
    user: User
}

export function ProfileCard({className, user}: ProfileCardAttributes) {
    const router = useRouter()
    
    return (
        <div className={`flex md:flex-col flex-row min-w-96 md:min-w-64 min-h-32 md:min-h-96 py-3 pl-4 pr-3 sm:pr-8 md:px-3 gap-4 rounded-xl dark:bg-white/10 bg-white dark:text-white relative ${className}`}>
            <Image height={-1} width={-1} alt="profile" src={user.picture} className="w-28 h-28 md:my-4 self-center rounded-full dark:bg-white/10 bg-black/10"/>
            <div className="flex flex-col flex-1 md:items-center">
                <div className="text-lg">{user.name}</div>
                <div className="text-neutral-500 text-xs">{user._id}</div>
                <div className="flex mt-2 flex-wrap md:flex-col md:bg-black/5 md:dark:bg-white/5 md:self-stretch md:px-4 md:py-3 md:my-3 rounded-lg gap-2">
                    <div className={`flex bg-black/10 dark:bg-white/10 md:bg-transparent dark:md:bg-transparent pr-4 gap-2 pl-3 py-0.5 md:py-0 rounded-full ${user.phone ? '': 'hidden'}`}>
                        <PhoneIcon className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                        <div className="text-sm text-neutral-700 dark:text-neutral-200">{user.phone}</div>
                    </div>
                    <div className="flex bg-black/10 dark:bg-white/10 md:bg-transparent dark:md:bg-transparent pr-4 gap-2 pl-3 py-0.5 md:py-0 rounded-full">
                        <EmailIcon className="h-4 md:h-5 w-4 md:w-5 self-center fill-black dark:fill-white"/>
                        <div className="text-sm text-neutral-700 dark:text-neutral-200">{user.email}</div>
                    </div>
                </div>
                <div className="md:flex-1"/>
                <div className="flex flex-none md:mt-2 mt-4 gap-2">
                    <button onClick={(e) => {e.stopPropagation(); router.replace('/logout')}} className="flex gap-2 items-center pl-3 pr-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-700 dark:bg-white/10 dark:hover:bg-white/20 dark:active:bg-white/30 rounded-md">
                        <LogoutIcon className="h-4 w-4 fill-white" />
                        <div className="text-white">Logout</div>
                    </button>
                    <button onClick={(e) => {e.stopPropagation(); router.replace('/delete_account')}} className="flex gap-2 items-center pl-3 pr-4 py-1.5 bg-red-500 hover:bg-red-400 active:bg-red-300 rounded-md">
                        <TrashIcon className="h-4 w-4 fill-white" />
                        <div className="text-white">Close Account</div>
                    </button>
                </div>
            </div>
            <button
                className="p-2 hover:bg-black/10 active:bg-black/20 dark:hover:bg-white/10 dark:active:bg-white/20 absolute right-4 top-4 rounded-md disabled:opacity-50 disabled:hover:bg-transparent"
                disabled={true}>
                <EditIcon className="h-5 w-5 fill-black dark:fill-white" />
            </button>


        </div>
    )
}