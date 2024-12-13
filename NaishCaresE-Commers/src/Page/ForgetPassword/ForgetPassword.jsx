import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function ForgetPassword() {
  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
      <AiOutlineLoading3Quarters className='text-4xl text-blue-900 animate-spin' />
    </section>
  )
}
