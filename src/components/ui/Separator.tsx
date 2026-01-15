interface SeparatorProps {
    className?: string
}

export default function Separator({className}: SeparatorProps) {
  return (
    <div className={`border-t border-gray-200 ${className ?? ''}`}/>
  );
}