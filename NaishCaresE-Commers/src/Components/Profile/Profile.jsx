import React from 'react'
import { FaRegUser } from "react-icons/fa";

export default function Profile() {
  return (
    <div className='rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-green-600 cursor-pointer flex justify-center items-center text-white text-[22px]'>
      <FaRegUser />
    </div>
  )
}
