import React from 'react'

type CtaButtonProps = {
    onClick?: ()=>void;
    children?: React.ReactNode
}

const CtaButtons:React.FC<CtaButtonProps> = ({children, onClick}) => {
  return (
     <button className="bg-primaryblue-300 px-3 py-1 rounded-full flex flex-row space-x-1 text-white items-center hover:border-gray-400 hover:bg-gray-200 transition-all duration-200 hover:text-black cursor-pointer" onClick={onClick}>
        {children}
     </button>
  )
}

export default CtaButtons