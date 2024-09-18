'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { UploadFiles } from "./upload_button"
import Image from "next/image"
import { ComponentAttributes } from "../atrributes"
import { EmptyImageIcon } from "../icons/empty_image"
import { TrashIcon } from "../icons/trash"
import { UploadIcon } from "../icons/upload"

type ImageGallaryAttributes = ComponentAttributes & {
    type?: 'localFiles'|'imageIds'|'imageUrls',
    endpoint?: string,
    src?: File[]|string[],
    fileChoosingEnabled?: boolean,
    linearFooter?: boolean
    onFilesAdded?: (files: File[]) => void
    onFileDelete?: (index: number) => void
}

export function ImageGallary({type = 'imageUrls', src, endpoint = '', fileChoosingEnabled, onFilesAdded, className, onFileDelete, linearFooter}: ImageGallaryAttributes) {
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [selection, setSelection] = useState(0)
    const [hovered, setHovered] = useState(false)
    
    useEffect(() => {
        if (type == 'localFiles') setImageUrls(src?.map((file) => URL.createObjectURL(file as File)) ?? [])
        else if (type == 'imageIds') setImageUrls(src?.map((imgId) => `${endpoint}/${imgId}`) ?? []) 
        else setImageUrls(src as string[] ?? [])
    }, [type, src, endpoint])

    function handleFileChangeEvent(event: ChangeEvent<HTMLInputElement>) {
        const files:File[] = []
        for (var i = 0; i < (event.target.files?.length ?? 0); i++) files.push(event.target.files?.item(i) as File)
        if (onFilesAdded) onFilesAdded(files)
        else setImageUrls([...imageUrls, ...files?.map((file) => URL.createObjectURL(file as File)) ?? []])
        setSelection(Math.max(Math.min(imageUrls.length-1, selection), 0))
    }

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div className="flex items-center justify-center rounded-lg overflow-clip aspect-video min-h-44 dark:bg-white/10 bg-white">
                { imageUrls.length > 0? <Image width={-1} height={-1} src={imageUrls.length > 0? imageUrls[selection]: ""} alt={`Image`} className="h-full w-full object-contain place-self-center"/>: <EmptyImageIcon className="w-2/4 max-w-72 h-2/4 max-h-72 p-8 fill-neutral-700"/> }
            </div>  
            <div className="flex overflow-auto px-1">
                <div className={`flex py-2 gap-3 mx-auto ${linearFooter? 'flex-none': 'flex-wrap'}`}>
                    {imageUrls.map((url, index) => (
                        <div key={index} className={`flex flex-col relative rounded-md h-20 w-20 flex-none overflow-clip outline-2 outline-offset-2 ${selection == index?" outline-black dark:outline-white outline":"outline-gray-400 dark:outline-gray-700 hover:outline"}`} onClick={(e) => { e.stopPropagation(); setSelection(index); }}>
                            <Image width={-1} height={-1} src={url} key={index} alt={`Image-${index}`} className="h-full w-full object-cover"/>
                            <div hidden={selection != index || type != 'localFiles'} className="w-20 h-20 hover:bg-black/40 absolute z-10 p-6" 
                            onMouseOver={(e) => {e.stopPropagation(); setHovered(true)}} 
                            onMouseLeave={(e) => {e.stopPropagation(); setHovered(false)}} 
                            onClick={(e) => {
                                e.stopPropagation()
                                if (onFileDelete) onFileDelete(selection)
                                else {
                                    imageUrls.splice(selection, 1)
                                    setImageUrls([...imageUrls]) 
                                }
                                setSelection(Math.max(selection-1, 0))
                            }}>
                                <TrashIcon className={`fill-white h-max w-max ${hovered? 'visible': 'hidden'}`}/>
                            </div>
                        </div>
                    ))}
                    <UploadFiles hidden={!fileChoosingEnabled || type != 'localFiles'} id="upload" onChange={handleFileChangeEvent} multiple>
                        <div className="flex flex-col items-center aspect-square h-20 w-20 p-2 bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 hover:dark:bg-neutral-700 active:bg-neutral-700 active:dark:bg-neutral-600 rounded-md">
                            <UploadIcon className="fill-white h-max w-max"/>
                            <div className="text-white text-sm">Upload</div>
                        </div>
                    </UploadFiles>
                </div>
            </div>
        </div>
    )
}