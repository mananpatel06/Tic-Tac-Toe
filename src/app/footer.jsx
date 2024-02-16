import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='m-2 text-center text-[20px] text-white font-bold'>
        <span className="text-emerald-400">© </span> 
        <Link href={"https://mananpatel.netlify.app/"} target="_blank">Manan Patel</Link>
    </div>
  )
}

export default Footer