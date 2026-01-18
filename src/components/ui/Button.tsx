interface ButtonProps{
 handleClick: () => void,
 text: string
}
export default function Button({handleClick, text}: ButtonProps) {
  return (
    <button className="border hover:cursor-pointer rounded-xs p-1" onClick={handleClick}>{text}</button>
  )
}