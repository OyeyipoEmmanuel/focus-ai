import type React from "react"

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  specialKey?: any
}
const CardUi:React.FC<CardProps> = ({children, className}) => {
  return (
    <div className={`rounded-2xl bg-white px-4 py-4 shadow-sm ${className}`}>
        {children}
    </div>
  )
}

export default CardUi