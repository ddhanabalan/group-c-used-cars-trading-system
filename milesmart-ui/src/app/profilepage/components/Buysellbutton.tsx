import React from 'react'
import Link from 'next/link'

const Buysellbutton = () => {
  return (
    <Link href={href}>
      <a className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
        {children}
      </a>
    </Link>
  )
}

export default Buysellbutton
