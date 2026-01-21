interface ButtonProps {
 text: string
}
export default function Button({text}: ButtonProps) {
  return (
    <button className="rounded-sm bg-sky-400 p-2">{text}</button>
  )
}