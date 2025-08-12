import Navbar from '@/components/organism/navbar'
import React from 'react'

const layouts = ({ children }: { children: React.ReactNode }) => {
return (
<div className="h-screen flex flex-col">
    <Navbar />
    <div className='overflow-y-auto'>
        <main className="p-4 flex-1">{children}</main>
    </div>
</div>
)
}

export default layouts
