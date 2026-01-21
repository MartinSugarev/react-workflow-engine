interface RadioButtonProps {
  text: string
}
export default function RadioButton({text}: RadioButtonProps) {
  return (
        <label className="flex items-center gap-2">
          <input type="radio" name="flow" />
          <span>{text}</span>
        </label>
  )
}
