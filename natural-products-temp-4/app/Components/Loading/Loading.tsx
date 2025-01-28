import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading({ title }: { title: string }) {
    return (
        <div className='w-full h-20 flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center space-x-3'>
                <Loader2 className='animate-spin text-blue-600' size={42} />
                <p className='text-xl text-gray-700'>{title}...</p>
            </div>
        </div>
    )
}