'use client'
import React, { useState } from 'react'
import UploadIcon from './icons/upload_icon'

interface UploadFormInputProps {
  onFileSelected?: (selectedFiles: File[]) => void
}

const UploadForm: React.FC<UploadFormInputProps> = ({onFileSelected}) => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number[]>([])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (files.length === 0) return

    const progressArray = new Array(files.length).fill(0)
    setUploadProgress(progressArray)

    try {
      const uploadPromises = files.map((file, index) => {
        const data = new FormData()
        data.append('file', file)

        return fetch('/api/upload', {
          method: 'POST',
          body: data,
          signal: new AbortController().signal,
          headers: {
            'X-Upload-Id': index.toString(),
          },
        })
          .then(res => {
            if (!res.ok) throw new Error(`Upload failed for ${file.name}`)
            return res
          })
          .then(() => {
            setUploadProgress(prevProgress => {
              const newProgress = [...prevProgress]
              newProgress[index] = 100
              return newProgress
            })
          })
          .catch(error => {
            console.error(error)
            setUploadProgress(prevProgress => {
              const newProgress = [...prevProgress]
              newProgress[index] = -1 // Indicates an error occurred
              return newProgress
            })
          })
      })

      await Promise.all(uploadPromises)
    } catch (e: any) {
      console.error(e)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(selectedFiles)
      if (onFileSelected) onFileSelected(selectedFiles)
      setUploadProgress(new Array(selectedFiles.length).fill(0))
    }
  }

  return (
    <div className=" w-3/4 col-span-1 px-6 py-4 mx-16 bg-white dark:bg-[#282828] rounded-3xl">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
        <div className='mb-3 home__text-container'>
               <h1 className='text-2xl font-extrabold dark:text-white'>Upload Files</h1>
            </div>
            <div className='flex  flex-col items-center'>
              <UploadIcon className='h-14 w-14 fill-[#282828] dark:fill-[#B3B3B3]'/>
                 <input
                    type="file"
                    name="file"
                    multiple
                    className="w-full px-3 py-2 border-2 dark:text-white border-[#dddddd] dark:border-[#404040] rounded-xl "
                    onChange={onFileChange}
                />
            </div>
         
        </div>
        {files.length > 0 && (
          <div className="mb-4">
            <h3 className="text-black dark:text-white text-sm font-bold mb-2">Selected files:</h3>
            <ul className="grid grid-cols-1 gap-4">
              {files.map((file, index) => (
                <li key={index} className="p-4 border border-[#dddddd] dark:border-[#404040] rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-[#F5F5F5]">{file.name}</span>
                    {uploadProgress[index] >= 0 && uploadProgress[index] < 100 ? (
                      <span className="text-gray-600 dark:text-[#F5F5F5]">{uploadProgress[index]}%</span>
                    ) : uploadProgress[index] === 100 ? (
                      <span className="text-green-500">Completed</span>
                    ) : (
                      <span className="text-red-500">Error</span>
                    )}
                  </div>
                  {uploadProgress[index] >= 0 && uploadProgress[index] < 100 && (
                    <div className="w-full bg-gray-200 dark:bg-[#B3B3B3] rounded-full h-2.5 mt-2">
                      <div
                        className="bg-black h-2.5 rounded-full"
                        style={{ width: `${uploadProgress[index]}%` }}
                      ></div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-xl dark:bg-[#181818] dark:hover:bg-black hover:bg-[#181818] transition duration-200"
          
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default UploadForm
