import React, { memo } from "react"
interface ButtonProps{
 handleClick: () => void,
 text: string
}
const Button: React.FC<ButtonProps> = ({handleClick, text}) => {
  
  return (
    <button className="border hover:cursor-pointer rounded-xs p-1" onClick={handleClick}>{text}</button>
  )
}

export default memo(Button)